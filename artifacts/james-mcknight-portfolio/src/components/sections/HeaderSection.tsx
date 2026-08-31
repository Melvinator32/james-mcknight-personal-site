import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function HeaderSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;

  return (
    <section id="hero" className="space-y-12 scroll-mt-24">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] md:gap-10">
        <div className="space-y-6">
          <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <EditableText contentKey="personalInfo.positioningTag" fallback={personalInfo.positioningTag} label="Positioning tag" />
          </div>
          <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-slate-900 xl:text-6xl">
            <EditableText contentKey="personalInfo.heroHeadline" fallback={personalInfo.heroHeadline} label="Hero headline" />
          </h1>
          <Link to="/projects" className="inline-flex items-center gap-3 rounded-xl bg-[#263b30] px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#354e40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Explore projects <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <div className="aspect-square w-full max-w-xs justify-self-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:justify-self-end">
          <img
            src={personalInfo.avatar}
            alt={`${personalInfo.name} headshot`}
            width={1500}
            height={1500}
            fetchPriority="high"
            className="h-full w-full origin-top scale-[1.55] object-cover object-top"
          />
        </div>
      </div>
      <div className="max-w-3xl border-l-2 border-slate-200 pl-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-slate-500"><EditableText contentKey="labels.aboutEyebrow" fallback="ABOUT ME" label="About section label" /></p>
        <div className="space-y-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 md:text-base">
          {isEditing ? <EditableText contentKey="personalInfo.bio" fallback={personalInfo.bio} multiline label="Biography" /> : personalInfo.bio.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
