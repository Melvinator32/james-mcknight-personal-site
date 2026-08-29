import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function EducationSection() {
  const { content, isEditing } = useContentEditor();
  const education = content.education;
  const academicRoles = content.experience
    .map((job, index) => ({ ...job, originalIndex: index }))
    .filter((job) => ["exp-4", "exp-5"].includes(job.id))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  const skills = content.personalInfo.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

  const categories = [
    { title: "Finance & Valuation", names: ["Financial Modeling", "DCF Valuation", "Project Finance", "Investment Analysis", "Acquisition Underwriting", "M&A Analysis", "Scenario & Sensitivity Analysis", "Commercial Due Diligence", "Excel", "Macabacus"] },
    { title: "Strategy & Research", names: ["Business Development", "Market Research & Intelligence", "Competitive Analysis", "Capital IQ", "Bloomberg", "Vortexa"] },
    { title: "Data & Automation", names: ["Process Improvement", "Data Visualization", "Workflow Automation", "Dashboard Development", "AI-Assisted Development", "Tableau", "Python"] },
    { title: "Communication & Delivery", names: ["Executive Presentations", "PowerPoint", "Microsoft Project", "Photoshop", "Brand Creation", "Mockup / Rendering Creation"] },
  ];
  const knownSkills = new Set(categories.flatMap(category => category.names.map(name => name.toLowerCase())));
  const groups = categories.map(category => ({ title: category.title, skills: skills.filter(skill => category.names.some(name => name.toLowerCase() === skill.toLowerCase())) }));
  groups.push({ title: "Additional Skills", skills: skills.filter(skill => !knownSkills.has(skill.toLowerCase())) });

  return (
    <section id="education" className="scroll-mt-24 space-y-12">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionEducation" fallback="Education" label="Education section title" /> &amp; <EditableText contentKey="labels.sectionSkills" fallback="Skills" label="Skills section title" /></h2></div>
      <div className="space-y-10">
        {education.map((edu, index) => (
          <article key={edu.id} className="flex flex-col justify-between gap-6 rounded-3xl bg-[#8F9D8C] p-8 text-[#15261b] shadow-xl md:flex-row md:p-10">
            <div className="max-w-lg space-y-2">
              <h3 className="text-2xl font-semibold"><EditableText contentKey={`education.${index}.institution`} fallback={edu.institution} label="Institution" /></h3>
              <p className="text-lg font-medium text-[#203126]"><EditableText contentKey={`education.${index}.degree`} fallback={edu.degree} label="Degree" /></p>
              <p className="text-sm leading-relaxed text-[#203126]"><EditableText contentKey={`education.${index}.field`} fallback={edu.field} label="Field of study" /><br /><EditableText contentKey={`education.${index}.location`} fallback={edu.location} label="Education location" /></p>
              {edu.id === "edu-1" && (
                <div className="mt-6 space-y-5 border-t border-[#677663] pt-5">
                  {academicRoles.map((job) => (
                    <div key={job.id} className="space-y-1">
                      <p className="text-sm font-semibold text-[#15261b]"><EditableText contentKey={`experience.${job.originalIndex}.company`} fallback={job.company} label="Academic program" /></p>
                      <p className="text-sm text-[#203126]"><EditableText contentKey={`experience.${job.originalIndex}.role`} fallback={job.role} label="Academic role" /> · {job.startDate.slice(0, 4)}</p>
                      <p className="text-sm leading-relaxed text-[#203126]"><EditableText contentKey={`experience.${job.originalIndex}.description`} fallback={job.description} label="Academic experience summary" /></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-col justify-center border-t border-[#677663] pt-4 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="mt-1 text-3xl font-bold tracking-tight text-[#15261b] sm:text-4xl"><EditableText contentKey={`education.${index}.startYear`} fallback={edu.startYear} label="Education start year" /> – <EditableText contentKey={`education.${index}.endYear`} fallback={edu.endYear} label="Education end year" /></div>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Technical &amp; Professional Arsenal</h3>
        {isEditing ? <EditableText contentKey="personalInfo.skills" fallback={content.personalInfo.skills} multiline label="Skills, separated by commas" className="text-slate-700" /> : (
          <div className="grid gap-5 sm:grid-cols-2">
            {groups.filter(group => group.skills.length > 0).map(group => (
              <section key={group.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h4 className="mb-4 text-base font-semibold text-[#263b30]">{group.title}</h4>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map(skill => <li key={skill} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-snug text-slate-700">{skill}</li>)}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
