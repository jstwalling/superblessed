import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const topics = [
  {
    title: "Faith",
    description: "Strengthen your spiritual journey",
    href: "/topics/faith",
    emoji: "🙏",
  },
  {
    title: "Prayer",
    description: "Connect with God daily",
    href: "/topics/prayer",
    emoji: "🕊️",
  },
  {
    title: "Community",
    description: "Join fellow believers",
    href: "/topics/community",
    emoji: "🤝",
  },
  {
    title: "Scripture",
    description: "Explore God's word",
    href: "/topics/scripture",
    emoji: "📖",
  },
  {
    title: "Healing",
    description: "Find comfort & peace",
    href: "/topics/healing",
    emoji: "💝",
  },
  {
    title: "Inspiration",
    description: "Daily encouragement",
    href: "/topics/inspiration",
    emoji: "✨",
  },
];

export function TopicExplorer() {
  return (
    <section>
      {/* Header */}
      <div className="bg-card rounded-xl p-6 mb-4 shadow-sm">
        <h2 className="text-2xl font-bold">Explore Topics</h2>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link key={topic.title} href={topic.href}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{topic.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
