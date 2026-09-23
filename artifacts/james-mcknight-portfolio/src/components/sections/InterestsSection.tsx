import SportsInterests from "@/components/SportsInterests";
import PhotoLightbox from "@/components/PhotoLightbox";
import { useState, type ChangeEvent } from "react";
import type { Interest } from "@/types/portfolio";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * InterestsSection Component
 * Personal interests listed in a sticky split layout. Each interest is
 * collapsed by default; click the name to reveal its description / children.
 */
export default function InterestsSection() {
  const { content } = useContentEditor();
  const interests = content.interests;

  return (
    <section id="interests" className="scroll-mt-24 rounded-3xl border border-[var(--pers-border)] bg-[var(--pers-surface)] p-8 md:p-12">
      <h2 className="mb-8 text-3xl font-semibold text-[var(--pers-text)]"><EditableText contentKey="labels.sectionInterests" fallback="Interests" label="Interests section title" /> &amp; Pursuits</h2>
      <div className="grid gap-x-12 md:grid-cols-2">
        {[interests.slice(0, Math.ceil(interests.length / 2)), interests.slice(Math.ceil(interests.length / 2))].map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-0">
            {column.map((interest, index) => {
              const actualIndex = columnIndex === 0 ? index : index + Math.ceil(interests.length / 2);
              return <InterestNode key={`${interest.name}-${actualIndex}`} node={interest} depth={0} contentKey={`interests.${actualIndex}`} />;
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * A recursive node. It is collapsible when it has a description, children, or photos;
 * otherwise (leaf name only) it renders as a plain, non-collapsible line.
 */
function InterestNode({ node, depth, contentKey }: { node: Interest; depth: number; contentKey: string }) {
  const [open, setOpen] = useState(false);
  const { isEditing } = useContentEditor();

  const hasChildren = !!node.children && node.children.length > 0;
  const hasDescription = !!node.description;
  const hasPhotos = !!node.photos && node.photos.length > 0;
  const collapsible = hasChildren || hasDescription || hasPhotos;

  const paragraphs = (node.description ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const indent = depth === 1 ? "pl-4" : depth > 1 ? "pl-8" : "";
  const nameClass =
    depth === 0
      ? "text-lg font-medium text-[var(--pers-text-2)]"
      : depth === 1
      ? "text-base font-medium !font-sans text-[var(--pers-text-3)]"
      : "text-sm !font-sans text-[var(--pers-muted)]";

  if (isEditing) {
    return (
      <div className={`border-b border-dashed border-[var(--pers-border)] last:border-0 ${indent}`}>
        <h3 className={`py-2 ${nameClass}`}>
          <EditableText contentKey={`${contentKey}.name`} fallback={node.name} label="Interest name" />
        </h3>
        {hasDescription && (
          <div className="pb-3 text-sm leading-relaxed text-[var(--pers-muted)]">
            <EditableText
              contentKey={`${contentKey}.description`}
              fallback={node.description ?? ""}
              multiline
              label={`${node.name} description`}
            />
          </div>
        )}
        {hasChildren && (
          <div className="space-y-1 pb-3">
            {node.children!.map((child, index) => (
              <InterestNode
                key={`${child.name}-${index}`}
                node={child}
                depth={depth + 1}
                contentKey={`${contentKey}.children.${index}`}
              />
            ))}
          </div>
        )}
        <InterestPhotos photos={node.photos ?? []} products={node.name === "Hot Sauces"} contentKey={`${contentKey}.photos`} />
      </div>
    );
  }

  if (!collapsible) {
    return (
      <div className={`border-b border-dashed border-[var(--pers-border)] last:border-0 ${indent}`}>
        <p className={`py-2 ${nameClass}`}>{node.name}</p>
      </div>
    );
  }

  return (
    <div className={`border-b border-dashed border-[var(--pers-border)] last:border-0 ${indent}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:text-[var(--pers-accent)]"
      >
        <h3 className={nameClass}>{node.name}</h3>
        <span className="shrink-0 text-sm text-[var(--pers-muted-2)]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="space-y-1 pb-3">
          {node.name === "Sports" ? <SportsInterests paragraphs={paragraphs} /> : paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-[var(--pers-muted)]">
              {para}
            </p>
          ))}
          {hasChildren && (
            <div className="space-y-1">
              {node.children!.map((child) => (
                <InterestNode key={child.name} node={child} depth={depth + 1} contentKey={`${contentKey}.children.${node.children!.indexOf(child)}`} />
              ))}
            </div>
          )}
          {hasPhotos && <InterestPhotos photos={node.photos!} products={node.name === "Hot Sauces"} />}
        </div>
      )}
    </div>
  );
}

async function readPhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/") || file.size > 10_000_000) throw new Error("Choose an image under 10 MB.");
  const source = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = source;
    await image.decode();
    const scale = Math.min(1, 1800 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not process this image.");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(source);
  }
}

function InterestPhotos({ photos, products = false, contentKey }: { photos: NonNullable<Interest["photos"]>; products?: boolean; contentKey?: string }) {
  const { isEditing, updatePhotos } = useContentEditor();
  const [error, setError] = useState<string | null>(null);
  async function addPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !contentKey) return;
    try {
      const src = await readPhoto(file);
      const title = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      updatePhotos(contentKey, [...photos, { src, alt: title, caption: title }]);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not add photo.");
    }
    event.target.value = "";
  }

  if (isEditing && contentKey) return (
    <div className="pb-4 pt-2">
      <div className="grid max-w-xl grid-cols-2 gap-3">
        {photos.map((photo, index) => (
          <div key={`${photo.src}-${index}`} className="relative rounded-xl border border-[var(--pers-border)] bg-white p-2 text-slate-800">
            <img src={photo.src} alt={photo.alt} className="h-32 w-full rounded-lg object-cover" />
            <button type="button" onClick={() => updatePhotos(contentKey, photos.filter((_, i) => i !== index))} className="absolute right-3 top-3 rounded bg-black/80 px-2 py-1 text-xs text-white" aria-label={`Delete ${photo.alt}`}>Delete</button>
            <label className="mt-2 block text-xs">Caption<input value={photo.caption} onChange={(event) => updatePhotos(contentKey, photos.map((item, i) => i === index ? { ...item, caption: event.target.value } : item))} className="mt-1 w-full rounded border px-2 py-1" /></label>
            <label className="mt-2 block text-xs">Alt text<input value={photo.alt} onChange={(event) => updatePhotos(contentKey, photos.map((item, i) => i === index ? { ...item, alt: event.target.value } : item))} className="mt-1 w-full rounded border px-2 py-1" /></label>
          </div>
        ))}
      </div>
      <label className="mt-3 inline-block cursor-pointer rounded border border-[var(--pers-border)] px-3 py-2 text-sm">Add photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={addPhoto} className="sr-only" /></label>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
  if (products) return (
    <div className="grid grid-cols-1 gap-3 pb-4 pt-3 sm:grid-cols-3">
      {photos.map(photo => (
        <figure key={photo.src} className="overflow-hidden rounded-xl bg-[#E1E2D8] text-[#263229]">
          <PhotoLightbox src={photo.src} alt={photo.alt}>
            <img src={photo.src} alt={photo.alt} loading="lazy" className="h-44 w-full bg-white p-3 object-contain" />
          </PhotoLightbox>
          <figcaption className="px-3 py-3 text-center text-xs font-medium leading-relaxed">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <div className="grid max-w-xl grid-cols-2 gap-3 pb-4 pt-1">
      {photos.map((photo) => (
        <PhotoLightbox key={photo.src} src={photo.src} alt={photo.alt}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-36 w-full rounded-xl border border-[var(--pers-border)] object-cover shadow-sm"
        />
        </PhotoLightbox>
      ))}
    </div>
  );
}
