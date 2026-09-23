import { PencilLine, RotateCcw, Save, Undo2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useContentEditor } from "@/components/ContentEditorProvider";

export default function PortfolioEditorToolbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const {
    discardChanges,
    exitEditing,
    isDirty,
    isEditing,
    isPublishing,
    resetContent,
    saveChanges,
    storageError,
    unlockEditing,
  } = useContentEditor();

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUnlocking(true);
    const success = await unlockEditing(accessToken);
    setUnlocking(false);
    setAccessToken("");
    if (success) setShowLogin(false);
  }

  if (!isEditing) return (
    <>
      <button type="button" onClick={() => setShowLogin(true)} className="fixed bottom-5 right-5 z-[60] rounded-full border border-border bg-background p-3 text-foreground shadow-lg" aria-label="Edit site" title="Edit site">
        <PencilLine className="h-4 w-4" aria-hidden="true" />
      </button>
      {showLogin && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowLogin(false); }}>
        <form onSubmit={unlock} className="w-full max-w-md rounded-xl bg-background p-6 text-foreground shadow-2xl" aria-label="Unlock site editing">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Edit site</h2><button type="button" aria-label="Close" onClick={() => setShowLogin(false)}><X className="h-5 w-5" /></button></div>
          <p className="mt-3 text-sm text-muted-foreground">Create a fine-grained token for Melvinator32/james-mcknight-personal-site with Contents read and write permission. Enter it below to publish edits. The token stays in this tab and is cleared when you exit editing.</p>
          <label htmlFor="site-access-token" className="mt-4 block text-sm font-medium">GitHub access token</label>
          <input id="site-access-token" type="password" autoComplete="off" required value={accessToken} onChange={(event) => setAccessToken(event.target.value)} className="mt-1 w-full rounded border border-border bg-background px-3 py-2" />
          {storageError && <p role="alert" className="mt-2 text-sm text-destructive">{storageError}</p>}
          <button type="submit" disabled={unlocking} className="mt-4 w-full rounded bg-foreground px-4 py-2 text-background disabled:opacity-50">{unlocking ? "Checking access…" : "Unlock editing"}</button>
          <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer" className="mt-3 block text-center text-xs underline">Create a fine-grained token</a>
        </form>
      </div>}
    </>
  );

  return (
    <aside
      className="fixed bottom-5 right-5 z-[60] w-[min(22rem,calc(100vw-2.5rem))] border border-foreground/20 bg-background p-4 shadow-2xl"
      aria-label="Portfolio editing controls"
    >
      <div className="flex items-start gap-3">
        <PencilLine className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-small font-semibold">Edit site content</p>
          <p className="mt-1 text-tiny text-muted-foreground">
            Edit highlighted text or add and remove photos. Save commits changes to GitHub and starts a site deployment.
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
          disabled={!isDirty || isPublishing}
          className="inline-flex items-center justify-center gap-2 bg-foreground px-3 py-2 text-small text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Save className="h-3.5 w-3.5" aria-hidden="true" />
          {isPublishing ? "Publishing…" : "Publish changes"}
        </button>
        <button
          type="button"
          onClick={discardChanges}
          disabled={!isDirty || isPublishing}
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
          if (window.confirm("Reset the editor to the original portfolio? Publish to make that change live for everyone.")) {
            resetContent();
          }
        }}
        className="mt-3 inline-flex items-center gap-2 text-tiny text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Reset editor to original content
      </button>
    </aside>
  );
}
