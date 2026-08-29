import PhotoLightbox from "@/components/PhotoLightbox";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";
import type { Interest } from "@/types/portfolio";

/**
 * PhotoGallerySection Component
 * Masonry-style collage of personal photos, shown below the Interests section.
 * Uses CSS columns so mixed portrait/landscape photos tile without cropping.
 */
export default function PhotoGallerySection() {
  const { content } = useContentEditor();
  const interestPhotoSources = new Set<string>();
  const collectInterestPhotos = (interests: Interest[]) => {
    for (const interest of interests) {
      interest.photos?.forEach((photo) => interestPhotoSources.add(photo.src));
      if (interest.children) collectInterestPhotos(interest.children);
    }
  };
  collectInterestPhotos(content.interests);
  const photos = content.photos.filter((photo) => !interestPhotoSources.has(photo.src));

  if (!photos.length) return null;

  return (
    <section id="photos" className="scroll-mt-24 space-y-12">
        <div className="flex items-center justify-between border-b border-[var(--pers-border)] pb-4">
          <h2 className="text-3xl font-semibold text-[var(--pers-text)]">
            <EditableText contentKey="labels.photoTitle" fallback="In Focus" label="Photo gallery title" />
          </h2>
        </div>
        <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-[var(--pers-border)] bg-[var(--pers-surface)]"
            >
              <PhotoLightbox src={photo.src} alt={photo.alt}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="block w-full transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(event) => {
                  event.currentTarget.classList.add("hidden");
                  event.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className={`photo-placeholder pattern-${(index % 6) + 1} hidden aspect-[4/5] w-full`} aria-hidden="true" />
              </PhotoLightbox>
            </figure>
          ))}
        </div>
    </section>
  );
}
