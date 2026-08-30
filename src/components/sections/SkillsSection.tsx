import { getEducation, getSkills } from "@/lib/content/loader";

import { Chips, SectionFrame } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function SkillsSection() {
  const [groups, education] = await Promise.all([getSkills(), getEducation()]);

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

        {education.map((entry) => (
          <div key={entry.institution} className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.period}>{entry.period}</span>
              <span className={styles.kind}>EDUCATION</span>
            </div>
            <div className={styles.body}>
              <h2 className={styles.heading}>
                <span className={styles.strong}>{entry.qualification}</span>
              </h2>
              <p className={styles.pointText}>
                {entry.institution}
                {entry.note ? ` · ${entry.note}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
