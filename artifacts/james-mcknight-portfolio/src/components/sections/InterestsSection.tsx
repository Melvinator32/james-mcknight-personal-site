import SportsInterests from "@/components/SportsInterests";
import PhotoLightbox from "@/components/PhotoLightbox";
import { useState } from "react";
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
        {hasPhotos && <InterestPhotos photos={node.photos!} products={node.name === "Hot Sauces"} />}
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

const damagedPhotoNames = [
  "photo-winter-bridge",
  "photo-melvin-bed",
  "photo-flyfishing-",
  "photo-duck-hunting",
  "photo-jazzfest",
  "photo-jazz-art",
  "photo-group",
  "photo-golf-",
  "photo-golf-young",
  "photo-alpine-cow",
  "photo-travel-madeira",
  "photo-poster-billy-strings",
  "photo-music-concert-group",
  "photo-home-office",
  "photo-travel-mountain",
  "photo-houseplant-bonsai",
];

function InterestPhotos({ photos, products = false }: { photos: NonNullable<Interest["photos"]>; products?: boolean }) {
  const usablePhotos = photos.filter(
    (photo) => !damagedPhotoNames.some((name) => photo.src.includes(name)),
  );

  if (usablePhotos.length === 0) return null;

  if (products) return (
    <div className="grid grid-cols-1 gap-3 pb-4 pt-3 sm:grid-cols-3">
      {usablePhotos.map(photo => (
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
      {usablePhotos.map((photo) => (
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
