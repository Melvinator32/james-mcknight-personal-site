import BonsaiMark from "./BonsaiMark";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Linkedin, Mail, MapPin, PencilLine, FileText, Award } from "lucide-react";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";
import { useActiveSection } from "@/hooks/useActiveSection";

const resumeUrl = `${import.meta.env.BASE_URL}resume/resume.html`;

const strengthsUrl = `${import.meta.env.BASE_URL}resume/top-strengths.html`;

const sectionLinks = [
  { id: "hero", labelKey: "labels.navOverview", fallback: "Overview" },
  { id: "work", fallback: "Experience" },
  { id: "ventures", fallback: "Side Ventures" },
  { id: "education", fallback: "Education & Skills" },
  { id: "interests", fallback: "Interests" },
  { id: "contact", fallback: "Contact" },
];

function scrollToSection(id: string) {
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PortfolioSidebar() {
  const { content, enterEditing, exitEditing, isEditing } = useContentEditor();
  const activeSection = useActiveSection(180);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const onProjects = pathname === "/projects";
  useEffect(() => {
    if (pathname === "/projects") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    if (pathname !== "/" || !hash) return;
    const frame = requestAnimationFrame(() => scrollToSection(hash.slice(1)));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  const goToSection = (id: string) => {
    if (pathname === "/") scrollToSection(id);
    else navigate(`/#${id}`);
  };
  const info = content.personalInfo;
  const nameLabel = <EditableText contentKey="personalInfo.name" fallback={info.name} label="Name" />;
  const nameLink = isEditing ? nameLabel : (
    <Link
      to="/#hero"
      aria-label={`${info.name} — back to top`}
      className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      onClick={(event) => {
        if (pathname === "/" && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
          event.preventDefault();
          scrollToSection("hero");
        }
      }}
    >
      {nameLabel}
    </Link>
  );
  const linkedInUrl = "https://www.linkedin.com/in/james-r-mcknight";
  const personalRegister = !onProjects && ["interests", "contact"].includes(activeSection);
  const activeClass = personalRegister ? "bg-[var(--pers-accent)] text-[var(--pers-accent-foreground)]" : "bg-slate-900 text-white";

  return (
    <>
      <header className={`portfolio-home fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md lg:hidden ${personalRegister ? "pers-theme border-[var(--pers-border-strong)] bg-[var(--pers-surface)]/90" : "prof-theme border-slate-200 bg-white/90"}`}>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight">{nameLink}</h1>
          <p className={`hidden text-xs sm:block ${personalRegister ? "text-[var(--pers-muted)]" : "text-slate-600"}`}><EditableText contentKey="personalInfo.title" fallback={info.title} label="Professional title" /></p>
        </div>
        <div className="ml-3 flex shrink-0 items-center gap-2"><Link to="/projects" aria-current={onProjects ? "page" : undefined} className=" shrink-0 rounded-xl bg-[#263b30] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#354e40]">Projects ↗</Link><a href={resumeUrl} target="_blank" rel="noopener noreferrer" aria-label="View résumé PDF in a new tab" title="Résumé (PDF)" className="rounded-lg p-2 hover:bg-black/5 focus-visible:outline focus-visible:outline-2"><FileText size={20} aria-hidden="true" /></a><BonsaiMark /></div>
      </header>
      <aside className={`portfolio-home fixed inset-y-0 left-0 z-40 hidden w-72 flex-col justify-between overflow-y-auto border-r px-8 py-16 transition-colors duration-500 lg:flex ${personalRegister ? "pers-theme border-[var(--pers-border-strong)] bg-[var(--pers-surface)]" : "prof-theme border-slate-200 bg-white"}`}>
        <div>
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight">{nameLink}</h1>
            <p className={`mt-2 text-sm font-medium ${personalRegister ? "text-[var(--pers-muted)]" : "text-slate-600"}`}><EditableText contentKey="personalInfo.title" fallback={info.title} label="Professional title" /></p>
            <p className={`mt-4 flex items-center gap-2 text-xs ${personalRegister ? "text-[var(--pers-muted-2)]" : "text-slate-500"}`}>
              <MapPin size={14} aria-hidden="true" />
              <EditableText contentKey="labels.headerLocation" fallback="New Orleans, Louisiana" label="Location" />
            </p>
          </div>
          <nav className="space-y-1" aria-label="Main navigation">
            <Link to="/projects" aria-current={onProjects ? "page" : undefined} className="mb-4 flex w-full items-center justify-between rounded-xl bg-[#263b30] px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#354e40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              <EditableText contentKey="labels.navProjects" fallback="Passion Projects" label="Projects navigation label" /><span aria-hidden="true">↗</span>
            </Link>
            {sectionLinks.slice(0, 3).map((item) => (
              <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={`nav-link block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${!onProjects && activeSection === item.id ? `active ${activeClass}` : ""}`} aria-current={!onProjects && activeSection === item.id ? "page" : undefined}>
                {item.labelKey ? <EditableText contentKey={item.labelKey} fallback={item.fallback} label={`${item.fallback} navigation label`} /> : item.fallback}
              </button>
            ))}

            {sectionLinks.slice(3).map((item) => (
              <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={`nav-link block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${!onProjects && activeSection === item.id ? `active ${activeClass}` : ""}`} aria-current={!onProjects && activeSection === item.id ? "page" : undefined}>
                {item.labelKey ? <EditableText contentKey={item.labelKey} fallback={item.fallback} label={`${item.fallback} navigation label`} /> : item.fallback}
              </button>
            ))}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="nav-link mt-3 flex w-full items-center gap-2 rounded-lg border-t border-current/15 px-3 py-3 text-sm font-medium" aria-label="View résumé PDF in a new tab">
              <FileText size={16} aria-hidden="true" />Résumé <span className="ml-auto text-xs" aria-hidden="true">↗</span>
            </a>
            <a href={strengthsUrl} target="_blank" rel="noopener noreferrer" className="nav-link flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium" aria-label="View Top Strengths Report PDF in a new tab">
              <Award size={16} className="shrink-0" aria-hidden="true" />Top Strengths Report <span className="ml-auto text-xs" aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
        <div className="mt-12 space-y-4">
          {isEditing ? (
            <span className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white ${personalRegister ? "bg-[var(--pers-accent-strong)]" : "bg-slate-900"}`}><Mail size={16} /><EditableText contentKey="labels.sidebarCta" fallback="Get in touch" label="Sidebar CTA label" /></span>
          ) : (
            <a href={`mailto:${info.email}`} className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white ${personalRegister ? "bg-[var(--pers-accent-strong)]" : "bg-slate-900"}`}><Mail size={16} /><EditableText contentKey="labels.sidebarCta" fallback="Get in touch" label="Sidebar CTA label" /></a>
          )}
          <div className="flex items-center justify-between">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`rounded-full p-2 transition-colors ${personalRegister ? "text-[var(--pers-muted)] hover:bg-[var(--pers-border)] hover:text-[var(--pers-text)]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><Linkedin size={20} /></a>
            <button type="button" onClick={isEditing ? exitEditing : enterEditing} className={`inline-flex items-center gap-2 rounded border px-2.5 py-1.5 text-xs font-semibold transition-colors ${personalRegister ? "border-[var(--pers-border-strong)] hover:bg-[var(--pers-border)]" : "border-slate-300 hover:bg-slate-100"}`} aria-pressed={isEditing}>
              <PencilLine size={14} />{isEditing ? "Editing" : "Edit portfolio"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
