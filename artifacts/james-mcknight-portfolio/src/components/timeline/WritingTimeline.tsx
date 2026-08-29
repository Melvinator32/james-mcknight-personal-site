import { writing } from "@/data/portfolio-data";
import TimelineItem from "./TimelineItem";

export default function WritingTimeline() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const sortedWriting = [...writing].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      {sortedWriting.map((article) => {
        const subtitle = article.contributors 
          ? `${article.publication} • Co-authored with ${article.contributors.join(", ")}`
          : article.publication;
          
        return (
          <TimelineItem
            key={article.id}
            date={formatDate(article.date)}
            title={article.title}
            subtitle={subtitle}
            link={article.url}
          />
        );
      })}
    </div>
  );
}
