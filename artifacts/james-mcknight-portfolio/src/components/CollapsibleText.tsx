import { useState } from "react";

interface CollapsibleTextProps {
  /** full description; paragraphs separated by \n\n */
  description: string;
  /** max characters of the preview before a "Read more" toggle appears */
  previewLimit?: number;
  expandedClassName?: string;
  previewClassName?: string;
  onExpandedChange?: (expanded: boolean) => void;
}

/**
 * Renders a long description with a collapsed preview and a "Read more / Read less"
 * toggle. The first paragraph is always shown (truncated if very long); remaining
 * paragraphs are revealed on expand.
 */
export default function CollapsibleText({
  description,
  previewLimit = 220,
  expandedClassName,
  previewClassName,
  onExpandedChange,
}: CollapsibleTextProps) {
  const [open, setOpen] = useState(false);

  const paragraphClass = open && expandedClassName ? expandedClassName : (previewClassName ?? "text-body leading-relaxed");

  const paragraphs = description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const first = paragraphs[0] ?? "";
  const rest = paragraphs.slice(1);
  const firstTooLong = first.length > previewLimit;

  const preview =
    !open && firstTooLong
      ? first.slice(0, previewLimit).trimEnd() + "…"
      : first;

  const hasMore = rest.length > 0 || firstTooLong;

  return (
    <div className="space-y-3">
      <p className={paragraphClass}>{preview}</p>
      {open &&
        rest.map((para, i) => (
          <p key={i} className={paragraphClass}>
            {para}
          </p>
        ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => {
            const next = !open;
            setOpen(next);
            onExpandedChange?.(next);
          }}
          aria-expanded={open}
          className="text-small underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {open ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
