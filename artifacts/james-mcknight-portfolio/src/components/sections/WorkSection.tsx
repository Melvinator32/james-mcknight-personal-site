import moondanceLogo from "@/assets/timeline/moondance.jpg";
import fidelisLogo from "@/assets/timeline/fidelis.jpg";
import imttLogo from "@/assets/timeline/imtt.png";
import tulaneLogo from "@/assets/timeline/tulane.png";
import mbaLogo from "@/assets/timeline/mba.jpg";
import { format } from "date-fns";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * WorkSection Component
 * Split layout with all roles listed
 */
export default function WorkSection() {
  const { content, isEditing } = useContentEditor();
  const logos: Record<string, string> = { "exp-1": imttLogo, "exp-3": fidelisLogo, "exp-6": moondanceLogo };
  const companyLinks: Record<string, string> = { "exp-1": "https://imtt.com/", "exp-3": "https://www.fidelisinfra.com/", "exp-6": "https://moondanceadventures.com/" };
  const experience = content.experience
    .map((job, index) => ({ ...job, originalIndex: index }))
    .filter((job) => !["exp-4", "exp-5"].includes(job.id))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  const displayYear = (date: string | null) => {
    if (!date) return "Present";
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? date : format(parsed, "yyyy");
  };

  return (
    <section id="work" className="scroll-mt-24 space-y-6">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionWork" fallback="Professional Experience" label="Experience section title" /></h2></div>
      <div className="space-y-6" aria-label="Education and career timeline">
        {experience.map((job) => {
          const index = job.originalIndex;
          const startYear = displayYear(job.startDate);
          const endYear = displayYear(job.endDate);

          return (
            <div key={job.id} className="timeline-item group" style={{ paddingLeft: "7rem" }}>
              <div className="timeline-line" /><div className="timeline-dot transition-transform group-hover:scale-125" />
              <a href={companyLinks[job.id]} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${job.company}`} className="absolute left-8 top-0 flex h-14 w-16 items-center justify-center overflow-hidden rounded-md bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <img src={logos[job.id]} alt="" className={`h-full w-full object-contain ${job.id === "exp-3" ? "scale-[2.1]" : "p-1"}`} />
              </a>
              <div className="space-y-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <h3 className="text-base font-semibold text-slate-900"><EditableText contentKey={`experience.${index}.role`} fallback={job.role} label={`Role at ${job.company}`} /></h3>
                  <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-lg font-bold text-slate-700">{isEditing ? <><EditableText contentKey={`experience.${index}.startDate`} fallback={job.startDate} label="Start date" /> – <EditableText contentKey={`experience.${index}.endDate`} fallback={job.endDate ?? "Present"} label="End date" /></> : `${startYear} – ${endYear}`}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{isEditing ? <EditableText contentKey={`experience.${index}.company`} fallback={job.company} label="Company" /> : <a href={companyLinks[job.id]} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">{job.company}</a>}
                  {job.id === "exp-3" && <> · <a href="https://www.nscale.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Nscale ↗</a></>}</p>
                <p className="text-xs text-slate-500"><EditableText contentKey={`experience.${index}.location`} fallback={job.location} label="Location" /></p>
              </div>
            </div>
          );
        })}
        {content.education.map((edu, index) => (
          <div key={edu.id} className="timeline-item" style={{ paddingLeft: "7rem" }}>
            <div className="timeline-line" /><div className="timeline-dot" />
            <img src={tulaneLogo} alt="" className="absolute left-8 top-0 h-14 w-16 rounded-md bg-white object-contain p-1" />
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
              <h3 className="text-base font-semibold text-slate-900"><EditableText contentKey={`education.${index}.institution`} fallback={edu.institution} label="University" /></h3>
              <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-lg font-bold text-slate-700">{edu.startYear} – {edu.endYear}</span>
            </div>
            <p className="text-sm text-slate-600"><EditableText contentKey={`education.${index}.degree`} fallback={edu.degree} /> · <EditableText contentKey={`education.${index}.field`} fallback={edu.field} /></p>
            <p className="text-xs text-slate-500">{edu.location}</p>
          </div>
        ))}
        <div className="timeline-item" style={{ paddingLeft: "7rem" }}>
          <div className="timeline-line" /><div className="timeline-dot" />
          <img src={mbaLogo} alt="" className="absolute left-8 top-0 h-14 w-16 rounded-md bg-white object-contain p-1" />
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
            <h3 className="text-base font-semibold text-slate-900"><EditableText contentKey="timeline.highSchool.name" fallback="Montgomery Bell Academy" label="High school" /></h3>
            <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-lg font-bold text-slate-700">2018</span>
          </div>
          <p className="text-sm text-slate-600">High School · <EditableText contentKey="timeline.highSchool.location" fallback="Nashville, TN" label="High school location" /></p>
        </div>
      </div>
    </section>
  );
}
