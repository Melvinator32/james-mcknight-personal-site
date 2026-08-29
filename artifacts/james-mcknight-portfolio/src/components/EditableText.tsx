import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useContentEditor } from "@/components/ContentEditorProvider";

interface EditableTextProps {
  contentKey: string;
  fallback: string;
  multiline?: boolean;
  className?: string;
  label?: string;
}

export default function EditableText({
  contentKey,
  fallback,
  multiline = false,
  className,
  label,
}: EditableTextProps) {
  const { getText, isEditing, updateText } = useContentEditor();
  const ref = useRef<HTMLSpanElement>(null);
  const value = getText(contentKey, fallback);
  const [multilineDraft, setMultilineDraft] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || document.activeElement === element) return;
    if (element.textContent !== value) element.textContent = value;
  }, [value]);

  useEffect(() => {
    setMultilineDraft(value);
  }, [value]);

  if (!isEditing) return <>{value}</>;

  if (multiline) {
    return (
      <textarea
        value={multilineDraft}
        onChange={(event) => setMultilineDraft(event.target.value)}
        onBlur={(event) => updateText(contentKey, event.target.value)}
        aria-label={label ?? "Editable text"}
        rows={Math.min(Math.max(value.split("\n").length + 1, 3), 10)}
        className={cn(
          "block min-h-24 w-full resize-y rounded-sm border border-accent/50 bg-accent/10 px-2 py-1.5 text-inherit font-inherit leading-inherit outline-none focus:border-accent focus:ring-2 focus:ring-accent",
          className,
        )}
      />
    );
  }

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={label ?? "Editable text"}
      aria-multiline={false}
      tabIndex={0}
      onBlur={(event) => updateText(contentKey, event.currentTarget.textContent ?? "")}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      className={cn(
        "inline rounded-sm outline-none ring-1 ring-accent/50 bg-accent/10 px-1.5 py-0.5 cursor-text focus:ring-2 focus:ring-accent",
        className,
      )}
    >
      {value}
    </span>
  );
}