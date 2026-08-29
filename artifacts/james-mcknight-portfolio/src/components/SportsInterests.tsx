import TeamMentions from "@/components/TeamMentions";

/** Keep editable sports copy intact while separating teams from commentary. */
export default function SportsInterests({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 pb-3 text-sm leading-relaxed text-[var(--pers-muted)]">
      {paragraphs.map((paragraph, index) => {
        const group = paragraph.match(/^(Football(?: teams)?|Basketball|Hockey):\s*(.+)$/i);
        if (!group) return <p key={index}>{paragraph}</p>;
        const [teamList, ...notes] = group[2].split(/\.\s+(?=\()/);
        const teams = teamList.replace(/\.$/, "").split(/,\s*/);
        return (
          <section key={index} className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--pers-text)]">{group[1].replace(/ teams$/i, "")}</h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {teams.map(team => (
                <li key={team} className="rounded-lg border border-[var(--pers-border)] bg-white/10 px-3 py-2.5 text-[var(--pers-text)]">
                  <TeamMentions text={team} />
                </li>
              ))}
            </ul>
            {notes.map((note, noteIndex) => <p key={noteIndex} className="text-xs leading-relaxed">{note.replace(/^\(|\)$/g, "")}</p>)}
          </section>
        );
      })}
    </div>
  );
}
