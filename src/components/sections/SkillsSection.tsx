import { getSkills } from "@/lib/content/loader";

import { Chips, SectionFrame } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function SkillsSection() {
  const groups = await getSkills();

  return (
    <SectionFrame title="SKILLS">
      <div className={styles.list}>
        {groups.map((group) => (
          <div key={group.group} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.kind}>{group.group.toUpperCase()}</span>
            </div>
            <div className={styles.body}>
              <Chips items={group.items} />
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
