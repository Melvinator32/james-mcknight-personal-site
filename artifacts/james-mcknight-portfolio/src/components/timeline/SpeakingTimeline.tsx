import { speaking } from "@/data/portfolio-data";
import TimelineItem from "./TimelineItem";

export default function SpeakingTimeline() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const sortedSpeaking = [...speaking].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {sortedSpeaking.map((talk) => (
        <TimelineItem
          key={talk.id}
          date={formatDate(talk.date)}
          title={talk.event}
          subtitle={talk.talk}
          location={talk.location}
          description={talk.description}
          link={talk.url}
        />
      ))}
    </div>
  );
}
