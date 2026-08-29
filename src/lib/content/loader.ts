import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

import { renderMarkdown } from "./markdown";
import {
  audienceSchema,
  clientSchema,
  educationSchema,
  experienceSchema,
  identitySchema,
  learningSchema,
  projectSchema,
  serviceSchema,
  skillGroupSchema,
  socialSchema,
  writingSchema,
  type Audience,
  type Client,
  type Education,
  type Entry,
  type Experience,
  type Identity,
  type Learning,
  type Project,
  type Service,
  type SkillGroup,
  type Social,
  type Writing,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ALL_AUDIENCES = "*";

class ContentError extends Error {
  constructor(file: string, detail: string) {
    super(`content/${file}\n${detail}`);
    this.name = "ContentError";
  }
}

function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) throw new ContentError(file, z.prettifyError(result.error));
  return result.data;
}

async function readJson<T>(relPath: string, schema: z.ZodType<T>): Promise<T> {
  const raw = await readFile(path.join(CONTENT_DIR, relPath), "utf8");
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (cause) {
    throw new ContentError(relPath, `not valid JSON — ${(cause as Error).message}`);
  }
  return parseOrThrow(schema, data, relPath);
}

/** Reads every .md in a directory, validating frontmatter and rendering the body. */
async function readCollection<T extends { order: number; current: boolean }>(
  dir: string,
  schema: z.ZodType<T>,
): Promise<Entry<T>[]> {
  let files: string[];
  try {
    files = (await readdir(path.join(CONTENT_DIR, dir))).filter((f) => f.endsWith(".md"));
  } catch (cause) {
    // A missing directory means "nothing written yet" — git does not track empty
    // dirs, so content/writing and content/clients legitimately vanish on checkout.
    // Anything else (permissions, a bad mount) must fail the build, not quietly
    // render an empty section.
    if ((cause as NodeJS.ErrnoException).code !== "ENOENT") throw cause;
    return [];
  }

  const entries = await Promise.all(
    files.map(async (file) => {
      const relPath = `${dir}/${file}`;
      const raw = await readFile(path.join(CONTENT_DIR, dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...parseOrThrow(schema, data, relPath),
        slug: file.replace(/\.md$/, ""),
        detail: await renderMarkdown(content),
      };
    }),
  );

  const live = entries.filter((e) => (e as { status?: string }).status !== "draft");

  const current = live.filter((e) => e.current);
  if (current.length > 1) {
    const names = current.map((e) => e.slug).join(", ");
    throw new ContentError(dir, `only one entry may set current: true — found ${names}`);
  }

  return live.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

function byOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

/** Records tagged "*" show under every lens. */
export function forAudience<T extends { audiences: string[] }>(
  items: T[],
  audienceId: string,
): T[] {
  return items.filter(
    (item) => item.audiences.includes(ALL_AUDIENCES) || item.audiences.includes(audienceId),
  );
}

// Build reads each collection many times (once per audience x section page).
// Memoising keeps that to one pass over the filesystem.
const cache = new Map<string, Promise<unknown>>();
function once<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as Promise<T>;
}

export const getIdentity = (): Promise<Identity> =>
  once("identity", () => readJson("identity.json", identitySchema));

export const getSocials = (): Promise<Social[]> =>
  once("socials", async () => byOrder(await readJson("socials.json", z.array(socialSchema))));

export const getSkills = (): Promise<SkillGroup[]> =>
  once("skills", async () => byOrder(await readJson("skills.json", z.array(skillGroupSchema))));

export const getEducation = (): Promise<Education[]> =>
  once("education", async () =>
    byOrder(await readJson("education.json", z.array(educationSchema))),
  );

export const getExperience = (): Promise<Experience[]> =>
  once("experience", () => readCollection("experience", experienceSchema));

export const getProjects = (): Promise<Project[]> =>
  once("projects", () => readCollection("projects", projectSchema));

export const getLearnings = (): Promise<Learning[]> =>
  once("learnings", () => readCollection("learnings", learningSchema));

export const getClients = (): Promise<Client[]> =>
  once("clients", () => readCollection("clients", clientSchema));

export const getWriting = (): Promise<Writing[]> =>
  once("writing", () => readCollection("writing", writingSchema));

export const getServices = (): Promise<Service[]> =>
  once("services", () => readCollection("services", serviceSchema));

export const getAudiences = (): Promise<Audience[]> =>
  once("audiences", async () => {
    const dir = path.join(CONTENT_DIR, "audiences");
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));

    const audiences = await Promise.all(
      files.map((file) => readJson(`audiences/${file}`, audienceSchema)),
    );

    if (audiences.length === 0) throw new ContentError("audiences", "no audience files found");

    const defaults = audiences.filter((a) => a.default);
    if (defaults.length !== 1) {
      throw new ContentError(
        "audiences",
        `exactly one audience must set default: true — found ${defaults.length}`,
      );
    }

    const known = new Set<string>((await getSocials()).map((s) => s.id));
    for (const audience of audiences) {
      const unknown = (audience.socials ?? []).filter((id) => !known.has(id));
      if (unknown.length > 0) {
        throw new ContentError(
          `audiences/${audience.id}.json`,
          `socials lists ${unknown.join(", ")}, which socials.json does not define`,
        );
      }
    }

    return byOrder(audiences);
  });

export async function getDefaultAudience(): Promise<Audience> {
  const audiences = await getAudiences();
  return audiences.find((a) => a.default) ?? audiences[0];
}

export async function getAudienceById(id: string): Promise<Audience | undefined> {
  return (await getAudiences()).find((a) => a.id === id);
}
