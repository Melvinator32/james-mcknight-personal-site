import { experience } from "@/data/portfolio-data";
import TimelineItem from "./TimelineItem";

export default function ExperienceTimeline() {
  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const startMonth = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    
    if (!endDate) {
      return `${startMonth} — Present`;
    }
    
    const end = new Date(endDate);
    const endMonth = end.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    
    return `${startMonth} — ${endMonth}`;
  };

  return (
    <div>
      {experience.map((exp) => (
        <TimelineItem
          key={exp.id}
          date={formatDateRange(exp.startDate, exp.endDate)}
          title={`${exp.role} at ${exp.company}`}
          location={exp.location}
          description={exp.description}
          media={exp.media}
        />
      ))}
    </div>
  );
}
