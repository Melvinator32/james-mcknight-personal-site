import { PencilLine, RotateCcw, Save, Undo2, X } from "lucide-react";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function PortfolioEditorToolbar() {
  const {
    discardChanges,
    exitEditing,
    isDirty,
    isEditing,
    resetContent,
    saveChanges,
    storageError,
  } = useContentEditor();

  if (!isEditing) return null;

  return (
    <aside
      className="fixed bottom-5 right-5 z-[60] w-[min(22rem,calc(100vw-2.5rem))] border border-foreground/20 bg-background p-4 shadow-2xl"
      aria-label="Portfolio editing controls"
    >
      <div className="flex items-start gap-3">
        <PencilLine className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-small font-semibold">Editing this browser only</p>
          <p className="mt-1 text-tiny text-muted-foreground">
            Click any highlighted text to update it. Save keeps your changes after a refresh.
          </p>
        </div>
        <button
          type="button"
          onClick={exitEditing}
          className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Exit editing mode"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={saveChanges}
          disabled={!isDirty}
          className="inline-flex items-center justify-center gap-2 bg-foreground px-3 py-2 text-small text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Save className="h-3.5 w-3.5" aria-hidden="true" />
          Save changes
        </button>
        <button
          type="button"
          onClick={discardChanges}
          disabled={!isDirty}
          className="inline-flex items-center justify-center gap-2 border border-foreground/20 px-3 py-2 text-small transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
          Discard
        </button>
      </div>
      {storageError && (
        <p role="alert" className="mt-3 text-tiny leading-relaxed text-destructive">
          {storageError}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Reset all browser-saved portfolio text to the original copy?")) {
            resetContent();
          }
        }}
        className="mt-3 inline-flex items-center gap-2 text-tiny text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Reset to original portfolio text
      </button>
    </aside>
  );
}