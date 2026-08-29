import { z } from "zod";

/**
 * Every content file in content/ is parsed through one of these before it can
 * reach a page. A file that fails throws during `next build`, so CI fails, the
 * deploy is skipped, and the live site stays on the last good version.
 */

const ORDERING = {
  order: z.number().int().default(100),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("published"),
};

/** Which lenses a record appears under. ["*"] means every lens. */
const audiences = z.array(z.string().min(1)).default(["*"]);

export const identitySchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  /** Signature element: measured before/after results, the through-line of the work. */
  deltas: z
    .array(
      z.object({
        label: z.string().min(1),
        from: z.string().min(1),
        to: z.string().min(1),
      }),
    )
    .max(4)
    .default([]),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  resume: z.string().min(1),
});

export const audienceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "audience id must be kebab-case"),
  label: z.string().min(1),
  modeLabel: z.string().min(1),
  theme: z.enum(["dark", "light"]),
  nameFont: z.enum(["mono", "serif"]),
  /** Overrides identity.tagline for this lens. Omit to use the shared one. */
  tagline: z.string().min(1).optional(),
  primaryAction: z.object({
    label: z.string().min(1),
    glyph: z.string().min(1),
    href: z.string().min(1),
  }),
  /** Section ids, in the order the status bar shows them. Each must exist in the registry. */
  sections: z.array(z.string().min(1)).min(1).max(5),
  /** Social ids to show. Omit to show all of socials.json. */
  socials: z.array(z.string().min(1)).min(1).optional(),
  order: z.number().int().default(100),
  default: z.boolean().default(false),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  kind: z.string().min(1),
  location: z.string().optional(),
  url: z.string().url().optional(),
  /** Exactly one record per collection may set this — the pulsing dot. */
  current: z.boolean().default(false),
  points: z.array(z.string().min(1)).min(1).max(6),
  stack: z.array(z.string().min(1)).default([]),
  audiences,
  ...ORDERING,
});

export const projectSchema = z.object({
  name: z.string().min(1),
  blurb: z.string().min(1),
  period: z.string().min(1),
  role: z.string().min(1),
  url: z.string().url().optional(),
  repo: z.string().url().optional(),
  current: z.boolean().default(false),
  points: z.array(z.string().min(1)).min(1).max(6),
  stack: z.array(z.string().min(1)).default([]),
  audiences,
  ...ORDERING,
});

export const writingSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  tags: z.array(z.string().min(1)).default([]),
  external: z.string().url().optional(),
  current: z.boolean().default(false),
  audiences,
  ...ORDERING,
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  blurb: z.string().min(1),
  points: z.array(z.string().min(1)).min(1).max(6),
  current: z.boolean().default(false),
  audiences,
  ...ORDERING,
});

export const socialSchema = z.object({
  id: z.enum(["github", "linkedin", "x", "email", "site"]),
  label: z.string().min(1),
  url: z.string().min(1),
  order: z.number().int().default(100),
});

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  order: z.number().int().default(100),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  qualification: z.string().min(1),
  period: z.string().min(1),
  note: z.string().optional(),
  order: z.number().int().default(100),
});

export type Identity = z.infer<typeof identitySchema>;
export type Audience = z.infer<typeof audienceSchema>;
export type Social = z.infer<typeof socialSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Education = z.infer<typeof educationSchema>;

/** A markdown record: validated frontmatter plus the optional body below it. */
export type Entry<T> = T & {
  slug: string;
  /** Rendered body HTML, or null when the file has no write-up. */
  detail: string | null;
};

export type Experience = Entry<z.infer<typeof experienceSchema>>;
export type Project = Entry<z.infer<typeof projectSchema>>;
export type Writing = Entry<z.infer<typeof writingSchema>>;
export type Service = Entry<z.infer<typeof serviceSchema>>;
