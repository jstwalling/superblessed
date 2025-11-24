"use client";

import { useState } from "react";
import { Mic, Heart, Loader2, Bookmark, Share2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SuggestResponse } from "@/lib/validation";

const MAX_LENGTH = 1000;

export function PrayerInput() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestResponse | null>(null);

  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate blessing");
      }

      const data: SuggestResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setText("");
    setError(null);
  };

  // Show result view after successful generation
  if (result) {
    return (
      <section className="bg-primary text-primary-foreground rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold">Your Blessing</h2>
        </div>

        {/* Blessing content */}
        <div className="px-6 pb-6">
          <p className="text-lg mb-4">{result.blessing}</p>
          <blockquote className="text-xl lg:text-2xl font-bold leading-relaxed mb-4">
            {result.verse}
          </blockquote>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Bookmark className="w-4 h-4" />
            <cite className="not-italic">{result.reference}</cite>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-background text-foreground p-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            New Prayer
          </Button>
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

  // Input view
  return (
    <section className="bg-card rounded-xl p-6 shadow-sm">
      <h1 className="text-3xl lg:text-4xl font-bold mb-2">
        What&apos;s on your heart today?
      </h1>
      <p className="text-muted-foreground mb-6">
        Share your thoughts, prayers, or questions with our community
      </p>

      {/* Input Area */}
      <div className="bg-background rounded-lg border p-4 mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Hey friend! What's on your mind today? Share something you're grateful for, a prayer need, or just how you're feeling..."
          className="w-full min-h-[120px] resize-none bg-transparent outline-none placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="text-sm text-muted-foreground">
            {text.length}/{MAX_LENGTH}
          </span>
          <Button size="icon" variant="default" className="rounded-full" disabled={isLoading}>
            <Mic className="w-5 h-5" />
            <span className="sr-only">Voice input</span>
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive mb-4">{error}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Your message is private and safe
        </p>
        <Button
          className="gap-2"
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          {isLoading ? "Generating..." : "Lift It Up"}
        </Button>
      </div>
    </section>
  );
}
