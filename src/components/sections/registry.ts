import BeyondSection from "./BeyondSection";
import CustomersSection from "./CustomersSection";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";
import LearningsSection from "./LearningsSection";
import ProductsSection from "./ProductsSection";
import ServicesSection from "./ServicesSection";
import SkillsSection from "./SkillsSection";

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
  products: ProductsSection,
  learnings: LearningsSection,
  services: ServicesSection,
  customers: CustomersSection,
  skills: SkillsSection,
  beyond: BeyondSection,
  profile: ProfileSection,
} as const;

export type SectionId = keyof typeof SECTIONS;

export function isSectionId(id: string): id is SectionId {
  return id in SECTIONS;
}
