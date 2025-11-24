import { Bookmark, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TodaysBlessing() {
  return (
    <section className="bg-primary text-primary-foreground rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-bold">Today&apos;s Blessing</h2>
      </div>

      {/* Quote */}
      <div className="px-6 pb-6">
        <blockquote className="text-xl lg:text-2xl font-bold leading-relaxed mb-4">
          For I know the plans I have for you, declares the LORD, plans to
          prosper you and not to harm you, plans to give you hope and a future.
        </blockquote>
        <div className="flex items-center gap-2 text-primary-foreground/80">
          <Bookmark className="w-4 h-4" />
          <cite className="not-italic">Jeremiah 29:11</cite>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-background text-foreground p-4 flex items-center justify-between">
        {/* Social proof */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"
              />
            ))}
          </div>
          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
            +248
          </span>
          <span className="text-sm text-muted-foreground">people loved this</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="w-4 h-4" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </section>
  );
}
