/**
 * Portfolio Type Definitions
 * TypeScript interfaces for portfolio data structures
 */

export interface PersonalInfo {
  name: string;
  title: string;
  location: { city: string; country: string };
  website: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string;
  positioningTag: string;
  heroHeadline: string;
  heroSummary: string;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  /** short, high-level summary shown by default */
  description: string;
  /** detailed bullet points revealed behind a "Show details" toggle */
  highlights: string[];
  media?: string;
  current: boolean;
  /** connector between role and company, defaults to "at" */
  connector?: string;
}

export interface Writing {
  id: string;
  title: string;
  publication: string;
  date: string;
  url: string;
  contributors?: string[];
  featured: boolean;
}

export interface Speaking {
  id: string;
  event: string;
  date: string;
  location: string;
  talk: string;
  description?: string;
  url?: string;
  recordingUrl?: string;
  slidesUrl?: string;
  upcoming: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  /** path or url to a written walkthrough/guide */
  walkthroughUrl?: string;
  thumbnail?: string;
  /** lucide-react icon name, e.g. "Radio" */
  icon?: string;
  status: "active" | "archived";
}

export interface Interest {
  name: string;
  description?: string;
  /** nested sub-interests, rendered as an indented list */
  children?: Interest[];
  /** photos shown as small thumbnails inside the expanded interest */
  photos?: Photo[];
}

export interface SideVenture {
  name: string;
  description: string;
}

export interface Photo {
  src: string;
  alt: string;
  caption: string;
}


export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  details?: string;
}

export interface SocialLink {
  platform: string;
  username?: string;
  url: string;
}
