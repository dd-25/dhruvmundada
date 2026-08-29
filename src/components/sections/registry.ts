import ContactSection from "./ContactSection";
import ExperienceSection from "./ExperienceSection";
import ServicesSection from "./ServicesSection";
import SkillsSection from "./SkillsSection";
import WritingSection from "./WritingSection";

/**
 * Section id -> component. A `sections` entry in an audience file that is not a
 * key here fails the build (see [section]/page.tsx), so a typo never ships as a
 * dead nav item.
 *
 * Adding a NEW KIND of section means adding a component and one line here.
 * Adding an ENTRY to an existing section is a content file and nothing else.
 */
export const SECTIONS = {
  experience: ExperienceSection,
  services: ServicesSection,
  skills: SkillsSection,
  writing: WritingSection,
  contact: ContactSection,
} as const;

export type SectionId = keyof typeof SECTIONS;

export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

export function isSectionId(id: string): id is SectionId {
  return id in SECTIONS;
}
