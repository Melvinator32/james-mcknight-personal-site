import { Fragment, type ReactNode } from "react";

/**
 * Company names that should auto-link to their official websites.
 * Longer keys are matched first so partial substrings don't shadow them.
 */
const LINK_MAP: Record<string, string> = {
  IMTT: "https://imtt.com/",
  Fidelis: "https://www.fidelisnewenergy.com/",
  Nscale: "https://www.nscale.com",
};

// Sort keys by length descending so "IMTT" never gets matched inside a longer
// hypothetical key before the longer one is tried.
const SORTED_KEYS = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

const PATTERN = new RegExp(
  `(${SORTED_KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

/**
 * Renders a string, turning any mention of a known company (IMTT, Fidelis)
 * into an outbound anchor link that opens in a new tab.
 */
export default function LinkedText({ children }: { children: string }): ReactNode {
  if (!children) return children;

  const parts = children.split(PATTERN);
  return parts.map((part, i) => {
    if (LINK_MAP[part]) {
      return (
        <a
          key={i}
          href={LINK_MAP[part]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
