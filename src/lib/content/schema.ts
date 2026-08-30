import { z } from "zod";

/**
 * Every content file in content/ is parsed through one of these before it can
 * reach a page. A file that fails throws during `next build`, so CI fails, the
 * deploy is skipped, and the live site stays on the last good version.
 */

const ORDERING = {
  order: z.number().int().default(100),
  status: z.enum(["draft", "published"]).default("published"),
};

/** Which lenses a record appears under. ["*"] means every lens. */
const audiences = z.array(z.string().min(1)).default(["*"]);

export const identitySchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
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

export const productSchema = z.object({
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

export const serviceSchema = z.object({
  name: z.string().min(1),
  blurb: z.string().min(1),
  points: z.array(z.string().min(1)).min(1).max(6),
  current: z.boolean().default(false),
  audiences,
  ...ORDERING,
});

export const learningSchema = z.object({
  title: z.string().min(1),
  /** Where it came from — a company, a project, or nothing for a general one. */
  source: z.string().optional(),
  kind: z.enum(["work", "general"]).default("general"),
  /** Rendered as "Jun 2025" by LearningsSection, so the month must be real. */
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "date must be YYYY-MM"),
  /** The whole note at a glance. The body below the frontmatter is the long version. */
  points: z.array(z.string().min(1)).min(1).max(3),
  current: z.boolean().default(false),
  audiences,
  ...ORDERING,
});

/** Anything worth showing that is not a job — teaching, sport, a side channel. */
export const beyondSchema = z.object({
  title: z.string().min(1),
  /** Omit for an ongoing or undated thing — the row then has no meta column. */
  period: z.string().optional(),
  url: z.string().url().optional(),
  points: z.array(z.string().min(1)).min(1).max(3),
  current: z.boolean().default(false),
  audiences,
  ...ORDERING,
});

export const customerSchema = z.object({
  name: z.string().min(1),
  /** The product they came through — a client of a service, a buyer of a product. */
  via: z.string().min(1),
  industry: z.string().optional(),
  since: z.string().optional(),
  /** One line on who they are. This is a client list, not a case study. */
  outcome: z.string().min(1),
  url: z.string().url().optional(),
  quote: z.string().optional(),
  quoteBy: z.string().optional(),
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

/** Anything worth listing under the profile that is not a role — a hackathon, a rank. */
export const achievementSchema = z.object({
  title: z.string().min(1),
  note: z.string().optional(),
  year: z.string().optional(),
  url: z.string().url().optional(),
  order: z.number().int().default(100),
});

export const educationSchema = z.object({
  /** The left-column label — "B.Tech", "12th", "10th". */
  level: z.string().min(1),
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
export type Achievement = z.infer<typeof achievementSchema>;

/** A markdown record: validated frontmatter plus the optional body below it. */
export type Entry<T> = T & {
  slug: string;
  /** Rendered body HTML, or null when the file has no write-up. */
  detail: string | null;
};

export type Experience = Entry<z.infer<typeof experienceSchema>>;
export type Product = Entry<z.infer<typeof productSchema>>;
export type Learning = Entry<z.infer<typeof learningSchema>>;
export type Customer = Entry<z.infer<typeof customerSchema>>;
export type Beyond = Entry<z.infer<typeof beyondSchema>>;
export type Service = Entry<z.infer<typeof serviceSchema>>;
