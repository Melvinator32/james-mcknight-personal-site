import SplitSection from "@/components/ui/split-section";
import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * SkillsSection Component
 * 3-column bulleted list with individual Lucide icons as the bullets.
 */
const SKILL_ICONS: Record<string, string> = {
  "Financial Modeling": "Calculator",
  "DCF Valuation": "TrendingUp",
  "Project Finance": "Landmark",
  "Business Development": "Handshake",
  "Market Research & Intelligence": "Search",
  "Investment Analysis": "ChartSpline",
  "Executive Presentations": "Presentation",
  "Process Improvement": "Workflow",
  Excel: "FileSpreadsheet",
  Macabacus: "SquareSigma",
  "Capital IQ": "Brain",
  Bloomberg: "Tv",
  Vortexa: "Radar",
  Tableau: "ChartBar",
  Python: "Code",
  PowerPoint: "MonitorPlay",
  "Microsoft Project": "ListTodo",
};

function SkillIcon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}

export default function SkillsSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;
  const skillsList = personalInfo.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <SplitSection title="Skills" titleKey="labels.sectionSkills" id="skills">
      {isEditing ? (
        <div className="text-body leading-relaxed">
          <EditableText contentKey="personalInfo.skills" fallback={personalInfo.skills} multiline label="Skills, separated by commas" />
        </div>
      ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 list-none p-0">
        {skillsList.map((skill, index) => {
          const iconName = SKILL_ICONS[skill] ?? "CircleDot";
          return (
            <li
              key={index}
              className="flex items-center gap-3 text-small text-foreground"
            >
              <SkillIcon
                name={iconName}
                size={18}
                className="shrink-0 text-accent"
                strokeWidth={2}
              />
              <span>{skill}</span>
            </li>
          );
        })}
      </ul>
      )}
    </SplitSection>
  );
}
