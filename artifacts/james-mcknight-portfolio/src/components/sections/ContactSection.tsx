import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";
import { Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio-data";
import { useState } from "react";

/**
 * ContactSection Component
 * Split layout with vertical divider
 */
export default function ContactSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;
  const [imageFailed, setImageFailed] = useState(false);
  const linkedin = socialLinks.find((link) => link.platform === "LinkedIn");
  const initials = personalInfo.name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--pers-border)] py-12">
      <div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-[2.5rem] border border-[var(--pers-border)] bg-[var(--pers-surface)] p-8 md:flex-row md:gap-20 md:p-16">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--pers-accent)]/10 blur-3xl" />
        <div className="monogram-bg relative flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--pers-border)] shadow-2xl md:h-64 md:w-64">
          {!imageFailed && <img src={personalInfo.avatar} alt={personalInfo.name} onError={() => setImageFailed(true)} className="absolute inset-0 h-full w-full object-cover" />}
          {imageFailed && <span className="text-6xl font-bold tracking-tighter text-[var(--pers-text)] md:text-7xl">{initials}</span>}
        </div>
        <div className="relative z-10 space-y-8 text-center md:text-left">
          <div><h2 className="text-4xl font-semibold text-[var(--pers-text)] md:text-5xl"><EditableText contentKey="labels.sectionContact" fallback="Contact" label="Contact section title" /></h2><p className="mt-2 text-lg text-[var(--pers-muted)]">Always open to discussing new opportunities, market trends, or the next show in town over lunch or a beer!</p></div>
          <div className="space-y-4">
            {isEditing ? <p className="flex items-center justify-center gap-4 text-lg font-medium text-[var(--pers-text-3)] md:justify-start"><Mail size={20} /><EditableText contentKey="personalInfo.email" fallback={personalInfo.email} label="Email address" /></p> : <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center gap-4 text-lg font-medium text-[var(--pers-text-3)] transition-colors hover:text-[var(--pers-accent)] md:justify-start"><Mail size={20} />{personalInfo.email}</a>}
            {linkedin && (isEditing ? <p className="flex items-center justify-center gap-4 text-lg font-medium text-[var(--pers-text-3)] md:justify-start"><Linkedin size={20} /><EditableText contentKey="personalInfo.website" fallback={personalInfo.website} label="Website address" /></p> : <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 text-lg font-medium text-[var(--pers-text-3)] transition-colors hover:text-[var(--pers-accent)] md:justify-start"><Linkedin size={20} />{personalInfo.website}</a>)}
          </div>
        </div>
      </div>
    </section>
  );
}
