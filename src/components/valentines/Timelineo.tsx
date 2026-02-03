"use client";

import { Timeline } from "@/components/ui/timeline";
import { timelineHours } from "@/data/mockData";
import { Check, Snowflake, Heart, Flame } from "lucide-react";

const iconMap = {
  ice: Snowflake,
  heart: Heart,
  flame: Flame,
};

export const Timelineo = () => {
  const data = timelineHours.map((hour) => {
    const Icon = iconMap[hour.icon];

    return {
      title: `Hour ${hour.id}`,
      content: (
        <div className="pb-20">
          {/* Icon + Phase */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <span className="px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm">
              {hour.phase}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-display mb-3">
            Hour {hour.id}: {hour.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            {hour.description}
          </p>

          {/* Activities */}
          <div className="space-y-3 mb-8">
            {hour.activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>{activity}</span>
              </div>
            ))}
          </div>

          {/* Games */}
          {hour.games.length > 0 && (
            <div className="mt-6">
              {/* your existing GameDeck */}
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-20">
        <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm uppercase tracking-wider">
          The 3-Hour Journey
        </span>
        <h2 className="text-5xl font-display mt-6">
          Your <span className="text-primary">Love Affair</span> Awaits
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Three hours of curated intimacy, from playful beginnings to heartfelt endings.
        </p>
      </div>

      <Timeline data={data} />
    </section>
  );
};
