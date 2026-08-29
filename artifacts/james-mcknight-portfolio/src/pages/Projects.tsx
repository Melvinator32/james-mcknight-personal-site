import { ExternalLink, icons } from "lucide-react";
import Layout from "@/components/Layout";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function withBasePath(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}

/**
 * Projects Page
 * Large thumbnail grid linking out to live app demos
 */
export default function Projects() {
  const { content, isEditing } = useContentEditor();
  const projects = content.projects;

  return (
    <Layout>
      <PortfolioSidebar />
      <section className="portfolio-home min-h-screen bg-white px-6 pb-20 pt-32 text-slate-900 md:px-16 md:pb-24 lg:ml-72 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 inline-block rounded-full bg-[#E1E2D8] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#263b30]">
            <EditableText contentKey="labels.projectsEyebrow" fallback="PASSION PROJECTS" label="Projects section label" />
          </p>
          <h1 className="mb-12 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            <EditableText contentKey="labels.projectsTitle" fallback="Selected work & demos" label="Projects page title" />
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = project.icon
                ? (icons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[
                    project.icon
                  ]
                : undefined;
              const media = (
                <div className="group/preview relative aspect-[4/3] w-full overflow-hidden border-b border-slate-200 bg-[#E1E2D8]">
                  {project.id === "proj-2" && project.demoUrl && !isEditing ? (
                    <iframe
                      src={withBasePath(project.demoUrl)}
                      title="Connections dashboard preview"
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none h-full w-full border-0 bg-[#E1E2D8]"
                    />
                  ) : project.thumbnail ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        loading="lazy"
                        className={`w-full h-full ${["demo-radio", "demo-daily-wisdom", "demo-rewards", "demo-bayou-bill-tracker", "proj-4"].includes(project.id) ? "object-contain" : "object-cover"}`}
                        onError={(event) => {
                          event.currentTarget.classList.add("hidden");
                          event.currentTarget.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <div className="hidden w-full h-full flex-col items-center justify-center gap-6 bg-[#E1E2D8] p-8 text-center text-[#263b30]">
                        {Icon && <Icon className="w-10 h-10" strokeWidth={1.25} />}
                        <span className="text-large leading-tight">
                          <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-[#E1E2D8] p-8 text-center text-[#263b30]">
                      {Icon && <Icon className="w-10 h-10" strokeWidth={1.25} />}
                      <span className="text-large leading-tight">
                        <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                      </span>
                    </div>
                  )}
                  {project.demoUrl && !isEditing && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-[#263b30]/95 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#263b30]">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Open live demo
                    </span>
                  )}
                </div>
              );

              const details = (
                <div className="space-y-4 p-6">
                  <h2 className="flex items-center gap-3 text-2xl font-semibold leading-tight text-slate-900">
                    {Icon && <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />}
                    <EditableText contentKey={`projects.${index}.name`} fallback={project.name} label="Project name" />
                  </h2>

                  <div className="text-sm leading-relaxed text-slate-600">
                    {project.id === "demo-radio" && !isEditing ? (
                      <TunedInDescription description={project.description} />
                    ) : (
                      <EditableText contentKey={`projects.${index}.description`} fallback={project.description} multiline label={`${project.name} description`} />
                    )}
                  </div>
                  <div className="rounded-lg bg-[#E1E2D8]/60 px-3 py-2 text-xs leading-relaxed text-[#455348]">
                    <EditableText contentKey={`projects.${index}.techStack`} fallback={project.techStack.join(", ")} label={`${project.name} skills, separated by commas`} />
                  </div>
                  <div className="flex items-center gap-5 pt-1">
                    {project.liveUrl && !isEditing && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#263b30] underline decoration-[#8F9D8C] underline-offset-4 hover:decoration-[#263b30]">
                        {project.id === "proj-4" ? "Visit store" : "Visit website"}
                      </a>
                    )}
                    {project.demoUrl && (
                      isEditing ? (
                        <span className="text-small">
                          <EditableText contentKey="labels.projectDemo" fallback="View demo" label="Project demo link label" />
                        </span>
                      ) : (
                        <a
                          href={withBasePath(project.demoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#263b30] underline decoration-[#8F9D8C] underline-offset-4 hover:decoration-[#263b30]"
                        >
                          <EditableText contentKey="labels.projectDemo" fallback="View demo" label="Project demo link label" />
                        </a>
                      )
                    )}
                    {project.walkthroughUrl && (
                      isEditing ? (
                        <span className="text-small">
                          <EditableText contentKey="labels.projectWalkthrough" fallback="Walkthrough" label="Project walkthrough link label" />
                        </span>
                      ) : (
                        <a
                          href={withBasePath(project.walkthroughUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#263b30] underline decoration-[#8F9D8C] underline-offset-4 hover:decoration-[#263b30]"
                        >
                          <EditableText contentKey="labels.projectWalkthrough" fallback="Walkthrough" label="Project walkthrough link label" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              );

              return (
                <div key={project.id} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-md">
                  {(project.liveUrl || project.demoUrl) && !isEditing ? (
                    <a
                      href={project.liveUrl || withBasePath(project.demoUrl!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-preview-link block"
                      aria-label={`Open ${project.name} in a new tab`}
                    >
                      {media}
                    </a>
                  ) : (
                    media
                  )}
                  {details}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function TunedInDescription({ description }: { description: string }) {
  const previewLimit = 140;
  const preview = description.length > previewLimit
    ? `${description.slice(0, previewLimit).trimEnd()}…`
    : description;

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>{preview}</p>
      {description.length > previewLimit && (
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="font-medium text-[#263b30] underline decoration-[#8F9D8C] underline-offset-4 hover:decoration-[#263b30]">
              Read more
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[85dvh] max-w-2xl overflow-y-auto rounded-2xl border-slate-200 bg-white p-7 text-slate-900 sm:p-9">
            <DialogTitle className="pr-8 text-2xl font-semibold">Tuned In</DialogTitle>
            <DialogDescription className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {description}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
