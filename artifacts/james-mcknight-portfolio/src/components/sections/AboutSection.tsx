import LinkedText from "@/components/LinkedText";
import EditableText from "@/components/EditableText";
import { useContentEditor } from "@/components/ContentEditorProvider";

/**
 * AboutSection Component
 * Centered about section with large text
 */
export default function AboutSection() {
  const { content, isEditing } = useContentEditor();
  const personalInfo = content.personalInfo;
  // Take only the first paragraph for minimal design
  const firstParagraph = personalInfo.bio.split('\n\n')[0];
  
  return (
    <section id="about" className="flex items-center justify-center px-8 md:px-16 lg:px-24 pt-10 md:pt-12 pb-16 md:pb-20">
      <div className="w-full max-w-4xl text-center space-y-10 md:space-y-12">
        <h2 className="text-tiny tracking-widest">
          <EditableText contentKey="labels.aboutEyebrow" fallback="ABOUT ME" label="About section label" />
        </h2>
        <div className="text-body leading-relaxed max-w-3xl mx-auto">
          {isEditing ? (
            <EditableText contentKey="personalInfo.bio" fallback={personalInfo.bio} multiline label="Biography" />
          ) : (
            <LinkedText>{firstParagraph}</LinkedText>
          )}
        </div>
      </div>
    </section>
  );
}
