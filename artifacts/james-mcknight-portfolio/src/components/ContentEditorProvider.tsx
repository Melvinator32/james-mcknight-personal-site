import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  education,
  experience,
  interests,
  personalInfo,
  photos,
  projects,
  sideVentures,
  stats,
} from "@/data/portfolio-data";
import type {
  Education,
  Experience,
  Interest,
  PersonalInfo,
  Photo,
  Project,
  SideVenture,
  Stat,
} from "@/types/portfolio";

const STORAGE_KEY = "james-mcknight-portfolio-content-v1";

export interface PortfolioContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  sideVentures: SideVenture[];
  projects: Project[];
  interests: Interest[];
  photos: Photo[];
  education: Education[];
  stats: Stat[];
  labels: Record<string, string>;
}

const defaultContent: PortfolioContent = {
  personalInfo,
  experience,
  sideVentures,
  projects,
  interests,
  photos,
  education,
  stats,
  labels: {
    navOverview: "Overview",
    navProjects: "Passion Projects",
    navContact: "Contact",
    sidebarCta: "Get in touch",
    headerLocation: "New Orleans, Louisiana",
    aboutEyebrow: "ABOUT ME",
    photoTitle: "In Focus",
    projectsEyebrow: "PASSION PROJECTS",
    projectsTitle: "Selected work & demos",
    projectDemo: "View demo",
    projectWalkthrough: "Walkthrough",
    footerRights: "All rights reserved.",
    sectionWork: "Professional Experience",
    sectionVentures: "Side Ventures",
    sectionEducation: "Education",
    sectionSkills: "Skills",
    sectionInterests: "Interests",
    sectionContact: "Contact",
  },
};

function cloneContent(content: PortfolioContent): PortfolioContent {
  return JSON.parse(JSON.stringify(content)) as PortfolioContent;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isInterest(value: unknown): value is Interest {
  if (!isRecord(value) || !isString(value.name)) return false;
  return (
    (value.description === undefined || isString(value.description)) &&
    (value.children === undefined || (Array.isArray(value.children) && value.children.every(isInterest)))
  );
}

function isValidContent(value: unknown): value is PortfolioContent {
  if (!isRecord(value)) return false;

  const info = value.personalInfo;
  const location = isRecord(info) ? info.location : undefined;
  const hasPersonalInfo =
    isRecord(info) &&
    isString(info.name) &&
    isString(info.title) &&
    isString(info.website) &&
    isString(info.email) &&
    isString(info.avatar) &&
    isString(info.bio) &&
    isString(info.skills) &&
    isString(info.positioningTag) &&
    isString(info.heroHeadline) &&
    isString(info.heroSummary) &&
    isRecord(location) &&
    isString(location.city) &&
    isString(location.country);

  const hasExperience =
    Array.isArray(value.experience) &&
    value.experience.every(
      (item) =>
        isRecord(item) &&
        isString(item.id) &&
        isString(item.company) &&
        isString(item.role) &&
        isString(item.location) &&
        isString(item.startDate) &&
        (item.endDate === null || isString(item.endDate)) &&
        isString(item.description) &&
        isStringArray(item.highlights) &&
        typeof item.current === "boolean",
    );
  const hasVentures =
    Array.isArray(value.sideVentures) &&
    value.sideVentures.every((item) => isRecord(item) && isString(item.name) && isString(item.description));
  const hasProjects =
    Array.isArray(value.projects) &&
    value.projects.every(
      (item) =>
        isRecord(item) &&
        isString(item.id) &&
        isString(item.name) &&
        isString(item.description) &&
        isStringArray(item.techStack) &&
        (item.status === "active" || item.status === "archived"),
    );
  const hasPhotos =
    Array.isArray(value.photos) &&
    value.photos.every(
      (item) => isRecord(item) && isString(item.src) && isString(item.alt) && isString(item.caption),
    );
  const hasEducation =
    Array.isArray(value.education) &&
    value.education.every(
      (item) =>
        isRecord(item) &&
        isString(item.id) &&
        isString(item.institution) &&
        isString(item.degree) &&
        isString(item.field) &&
        isString(item.startYear) &&
        isString(item.endYear) &&
        isString(item.location) &&
        (item.details === undefined || isString(item.details)),
    );
  const hasStats =
    Array.isArray(value.stats) &&
    value.stats.every(
      (item) => isRecord(item) && isString(item.value) && isString(item.label) && isString(item.detail),
    );

  return (
    hasPersonalInfo &&
    hasExperience &&
    hasVentures &&
    hasProjects &&
    Array.isArray(value.interests) &&
    value.interests.every(isInterest) &&
    hasPhotos &&
    hasEducation &&
    hasStats &&
    isRecord(value.labels) &&
    Object.values(value.labels).every(isString)
  );
}

// Keep saved copy edits while adding photos introduced after the last local save.
function restoreInterestPhotos(saved: Interest[], defaults: Interest[]): Interest[] {
  return saved.map((interest, index) => {
    const original = defaults.find((item) => item.name === interest.name) ?? defaults[index];
    const savedPhotos = interest.name === "Sports"
      ? interest.photos?.filter((photo) => photo.alt !== "Skiing high in a snow-covered mountain range")
      : interest.name === "Collecting Houseplants / Propagating"
      ? interest.photos?.filter((photo) => photo.alt !== "A home office corner with a standing desk, three monitors, and house plants on the desk and credenza")
      : interest.photos;
    const previousNames: Record<string, string> = {
      "Collecting Houseplants / Propagating": "Houseplants",
      "Training my dachshund (or trying at least)": "Training my dachshund",
      "Learning new skills": "Learning how to do new things",
    };
    const children = ["Micro hobbies", "Indie video games"].includes(interest.name) && original?.children
      ? original.children.map((child) => {
          const savedChild = interest.children?.find((item) => item.name === child.name || item.name === previousNames[child.name]);
          return { ...child, ...savedChild, name: child.name };
        })
      : interest.children;
    return {
      ...interest,
      photos: savedPhotos
        ? [...savedPhotos, ...(original?.photos ?? []).filter((photo) => !savedPhotos.some((savedPhoto) => savedPhoto.src === photo.src))]
        : original?.photos,
      ...(children && {
        children: restoreInterestPhotos(children, original?.children ?? []),
      }),
    };
  });
}

function mergePublishedSkills(saved: string, defaults: string): string {
  const skills = saved.split(",").map((skill) => skill.trim()).filter(Boolean);
  const known = new Set(skills.map((skill) => skill.toLowerCase()));
  for (const skill of defaults.split(",").map((item) => item.trim()).filter(Boolean)) {
    if (!known.has(skill.toLowerCase())) skills.push(skill);
  }
  return skills.join(", ");
}

// Apply the published project order while retaining saved descriptions and links.
function restoreProjects(saved: Project[], defaults: Project[]): Project[] {
  const previousNames: Record<string, string[]> = {
  "demo-radio": [
    "Tuned In",
    "Tuned In — Radio Station",
    "Radio Station"
  ],
  "demo-weirwood": [
    "Weirwood — Marine Movement Intelligence"
  ],
  "proj-2": [
    "CRM Implementation & Automation Suite"
  ],
  "demo-daily-wisdom": [
    "Daily Wisdom — One Small Lesson at a Time"
  ],
  "proj-4": [
    "Print-on-Demand E-commerce Store"
  ],
  "demo-bayou-bill-tracker": [
    "Bayou Bill Shop Data Tracker"
  ],
  "demo-rewards": [
    "CardWise - Credit Card & Spend Dashboard",
    "Credit Card & Spend Dashboard",
    "Credit Card / Spend Dashboard"
  ],
  "demo-zen": [
    "Zen Garden"
  ],
  "demo-blackjack": [
    "Blackjack Strategy Trainer"
  ]
};
  return [
    ...defaults.map((current) => {
      const project = saved.find((item) => item.id === current.id);
      if (!project) return current;
      const legacyConnectionsDescription = "Led platform selection and implementation to migrate commercial and business development teams off Excel-based relationship tracking, including custom reporting logic and a proprietary activity tracker that prompts reps to re-engage customers based on relationship cadence.";
      return {
        ...project,
        description: project.id === "proj-2" && project.description === legacyConnectionsDescription ? current.description : project.description,
        techStack: project.id === "proj-2" && project.description === legacyConnectionsDescription ? current.techStack : project.techStack,
        demoUrl: project.id === "proj-2" ? current.demoUrl : project.demoUrl,
        liveUrl: project.id === "proj-4" ? current.liveUrl : project.liveUrl,
        name: previousNames[project.id]?.includes(project.name) ? current.name : project.name,
        thumbnail: ["demo-radio", "demo-daily-wisdom", "demo-rewards", "demo-bayou-bill-tracker", "proj-4"].includes(project.id) ? current.thumbnail : project.thumbnail,
      };
    }),
    ...saved.filter((project) => !defaults.some((current) => current.id === project.id)),
  ];
}

function getStoredContent(): PortfolioContent {
  if (typeof window === "undefined") return cloneContent(defaultContent);

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneContent(defaultContent);

    const parsed = JSON.parse(saved) as unknown;
    return isValidContent(parsed)
      ? {
          ...parsed,
          personalInfo: {
            ...parsed.personalInfo,
            skills: mergePublishedSkills(parsed.personalInfo.skills, defaultContent.personalInfo.skills),
            bio: parsed.personalInfo.bio === "I'm a corporate development analyst at IMTT, a bulk liquid storage terminal operator, where my work runs from underwriting capital projects and acquisitions to building the tools our team uses to do it faster. After work, I dive into my personal projects and side hustles. Almost everything I've built started as curiosity or a solution to a personal problem. About half the time, I look up and realize I've made something that would interest or help other people too. My goal with this site is to publish demos of that work, collect honest feedback, and figure out which of it is worth taking further!"
              || parsed.personalInfo.bio.replace(/\s+/g, " ").trim() === defaultContent.personalInfo.bio.replace(/\s+/g, " ").trim()
              ? defaultContent.personalInfo.bio
              : parsed.personalInfo.bio,
            heroHeadline: parsed.personalInfo.heroHeadline === "Following curiosity. Building useful tools."
              ? defaultContent.personalInfo.heroHeadline
              : parsed.personalInfo.heroHeadline,
          },
          interests: restoreInterestPhotos(parsed.interests, defaultContent.interests),
          projects: restoreProjects(parsed.projects, defaultContent.projects),
        }
      : cloneContent(defaultContent);
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // A browser may deny storage access; the in-memory default remains usable.
    }
    return cloneContent(defaultContent);
  }
}

function readTextAtPath(content: PortfolioContent, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((current, part) => {
    if (current === null || current === undefined) return undefined;
    return (current as Record<string, unknown>)[part];
  }, content);

  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.join(", ");
  }
  return undefined;
}

function writeTextAtPath(content: PortfolioContent, path: string, value: string): PortfolioContent {
  const next = cloneContent(content);
  const parts = path.split(".");
  let cursor: Record<string, unknown> = next as unknown as Record<string, unknown>;

  for (const part of parts.slice(0, -1)) {
    const child = cursor[part];
    if (!child || typeof child !== "object") return content;
    cursor = child as Record<string, unknown>;
  }

  const finalPart = parts.at(-1) ?? "";
  const existing = cursor[finalPart];
  cursor[finalPart] = Array.isArray(existing)
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : value;
  return next;
}

interface ContentEditorContextValue {
  content: PortfolioContent;
  isEditing: boolean;
  isDirty: boolean;
  getText: (path: string, fallback: string) => string;
  updateText: (path: string, value: string) => void;
  enterEditing: () => void;
  exitEditing: () => void;
  saveChanges: () => void;
  discardChanges: () => void;
  resetContent: () => void;
  storageError: string | null;
}

const ContentEditorContext = createContext<ContentEditorContextValue | null>(null);

export function ContentEditorProvider({ children }: { children: ReactNode }) {
  const [savedContent, setSavedContent] = useState<PortfolioContent>(getStoredContent);
  const [content, setContent] = useState<PortfolioContent>(savedContent);
  const [isEditing, setIsEditing] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  const updateText = useCallback((path: string, value: string) => {
    setContent((current) => writeTextAtPath(current, path, value));
  }, []);

  const saveChanges = useCallback(() => {
    const snapshot = cloneContent(content);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      setSavedContent(snapshot);
      setStorageError(null);
    } catch {
      setStorageError("This browser could not save your edits. Keep this page open or copy the text before leaving.");
    }
  }, [content]);

  const discardChanges = useCallback(() => {
    setContent(cloneContent(savedContent));
  }, [savedContent]);

  const resetContent = useCallback(() => {
    const original = cloneContent(defaultContent);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setStorageError(null);
    } catch {
      setStorageError("This browser could not clear saved edits. The original copy is shown for now, but it may return after a refresh.");
    }
    setContent(original);
    setSavedContent(original);
  }, []);

  const value = useMemo<ContentEditorContextValue>(
    () => ({
      content,
      isEditing,
      isDirty: JSON.stringify(content) !== JSON.stringify(savedContent),
      getText: (path, fallback) => readTextAtPath(content, path) ?? fallback,
      updateText,
      enterEditing: () => setIsEditing(true),
      exitEditing: () => setIsEditing(false),
      saveChanges,
      discardChanges,
      resetContent,
      storageError,
    }),
    [content, discardChanges, isEditing, resetContent, saveChanges, savedContent, storageError, updateText],
  );

  return <ContentEditorContext.Provider value={value}>{children}</ContentEditorContext.Provider>;
}

export function useContentEditor() {
  const context = useContext(ContentEditorContext);
  if (!context) {
    throw new Error("useContentEditor must be used within ContentEditorProvider.");
  }
  return context;
}
