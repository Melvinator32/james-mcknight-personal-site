import titans from "@/assets/teams/titans.png";
import saints from "@/assets/teams/saints.png";
import tulane from "@/assets/teams/tulane-wave.png";
import vanderbilt from "@/assets/teams/vanderbilt.png";
import pelicans from "@/assets/teams/pelicans.png";
import predators from "@/assets/teams/predators.png";

// Team artwork from ESPN's public team-logo CDN, saved locally to avoid hotlinks.
const teamLogos: Record<string, string> = {
  "Tennessee Titans": titans,
  Titans: titans,
  "New Orleans Saints": saints,
  Saints: saints,
  Tulane: tulane,
  Vanderbilt: vanderbilt,
  "New Orleans Pelicans": pelicans,
  Pelicans: pelicans,
  "Nashville Predators": predators,
  Predators: predators,
};
const teamNames = /\b(Tennessee Titans|New Orleans Saints|New Orleans Pelicans|Nashville Predators|Tulane|Vanderbilt|Titans|Saints|Pelicans|Predators)\b/g;

export default function TeamMentions({ text }: { text: string }) {
  return <>{text.split(teamNames).map((part, index) => teamLogos[part] ? (
    <span key={index} className="inline-flex items-center gap-1.5 whitespace-nowrap align-middle">
      <img src={teamLogos[part]} alt="" aria-hidden="true" loading="lazy" width={28} height={28} className="h-7 w-7 shrink-0 object-contain" />
      <span>{part}</span>
    </span>
  ) : part)}</>;
}
