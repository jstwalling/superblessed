import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerInput } from "@/components/home/PrayerInput";
import { TodaysBlessing } from "@/components/home/TodaysBlessing";
import { TopicExplorer } from "@/components/home/TopicExplorer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 px-4 lg:px-8 py-8 space-y-8 max-w-4xl mx-auto w-full">
        <PrayerInput />
        <TodaysBlessing />
        <TopicExplorer />
      </main>

      <Footer />
    </div>
  );
}
