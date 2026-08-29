import { useState } from "react";
import bayouBillLogo from "@/assets/bayou-bill-logo.png";
import cardWiseThumbnail from "@/assets/project-cardwise-perks-preview.jpg";
import CollapsibleText from "@/components/CollapsibleText";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * SideVenturesSection Component
 * Personal side businesses / hustles, listed in a sticky split layout
 */
export default function SideVenturesSection() {
  const { content, isEditing } = useContentEditor();
  const sideVentures = content.sideVentures;
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <section id="ventures" className="scroll-mt-24 space-y-12">
      <div className="border-b border-slate-200 pb-4"><h2 className="text-3xl font-semibold"><EditableText contentKey="labels.sectionVentures" fallback="Side Ventures" label="Side ventures section title" /></h2></div>
      <div className={`grid items-start gap-6 ${Object.values(expanded).some(Boolean) && !isEditing ? "grid-cols-1" : "md:grid-cols-2"}`}>
        {sideVentures.map((venture, index) => (
          <article key={venture.name} className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-5 flex items-start gap-4">
              {venture.name.includes("Bayou Bill") && (
                <img src={bayouBillLogo} alt="Bayou Bill logo" width={64} height={64} className="h-16 w-16 shrink-0 rounded-xl object-contain" />
              )}
              {venture.name.includes("CardWise") && (
                <img src={cardWiseThumbnail} alt="CardWise dashboard" width={64} height={64} className="h-16 w-16 shrink-0 rounded-xl object-cover object-left shadow-sm" />
              )}
              <h3 className="min-w-0 text-xl font-semibold leading-snug text-slate-900">
                <EditableText contentKey={`sideVentures.${index}.name`} fallback={venture.name} label="Side venture name" />
              </h3>
            </div>
            {isEditing ? (
              <div className="text-sm leading-relaxed text-slate-600">
                <EditableText contentKey={`sideVentures.${index}.description`} fallback={venture.description} multiline label={`${venture.name} description`} />
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-slate-600"><CollapsibleText description={venture.description} previewClassName="text-lg font-normal leading-relaxed" expandedClassName="text-base font-normal leading-relaxed" onExpandedChange={(open) => setExpanded((current) => ({ ...current, [index]: open }))} /></div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
