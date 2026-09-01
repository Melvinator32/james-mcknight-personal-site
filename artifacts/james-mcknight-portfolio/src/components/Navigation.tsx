import { Link, useLocation } from "react-router-dom";
import { useContentEditor } from "@/components/ContentEditorProvider";
import EditableText from "@/components/EditableText";

interface NavigationProps {
  scrolled?: boolean;
}

export default function Navigation(_props: NavigationProps) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border px-8 md:px-16 lg:px-24"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{personalInfo.name}</span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-muted-foreground">{personalInfo.title}</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {isEditing ? (
              <>
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                  <EditableText contentKey="labels.navProjects" fallback="Passion Projects" label="Projects navigation label" />
                </span>
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                  <EditableText contentKey="labels.navContact" fallback="Contact" label="Contact navigation label" />
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/projects"
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hover:text-muted-foreground transition-colors"
                  aria-current={pathname === "/projects" ? "page" : undefined}
                >
                  <EditableText contentKey="labels.navProjects" fallback="Passion Projects" label="Projects navigation label" />
                </Link>
                <Link
                  to={onHome ? "#contact" : "/#contact"}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hover:text-muted-foreground transition-colors"
                >
                  <EditableText contentKey="labels.navContact" fallback="Contact" label="Contact navigation label" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
