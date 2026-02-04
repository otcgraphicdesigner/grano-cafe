// src/components/valentines/Timeline.tsx
"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { TimelineNode } from "./TimelineNode";
import { timelineHours } from "@/data/mockData";
import { ShiningText } from "../ui/shining-text";

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const scrollAreaRef = useRef<HTMLElement | null>(null);
  const hours = useMemo(() => timelineHours, []);
  const count = hours.length;

  useLayoutEffect(() => {
    if (!scrollAreaRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

      // Initial State
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 1, // Start everyone low
      });

      // Show the first card
      gsap.set(cards[0], { opacity: 1, pointerEvents: "auto", zIndex: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollAreaRef.current,
          start: "top top",
          end: () => `+=${(count - 1) * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const nextCard = cards[i + 1];

        tl.to(
          card,
          {
            opacity: 0,
            yPercent: -10,
            pointerEvents: "none",
            onStart: () => gsap.set(card, { zIndex: 1 }), // Drop Z-Index when leaving
            duration: 1,
          },
          i,
        ).fromTo(
          nextCard,
          { opacity: 0, yPercent: 20, pointerEvents: "none", zIndex: 1 },
          {
            opacity: 1,
            yPercent: 0,
            pointerEvents: "auto",
            zIndex: 50, // Raise Z-Index as it enters
            duration: 1,
            // Safety: ensure interaction is off if we scroll back up mid-transition
            onReverseComplete: () =>
              gsap.set(nextCard, { pointerEvents: "none", zIndex: 1 }),
          },
          i,
        );
      });
    }, scrollAreaRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <section className="relative bg-background">
      <div className="relative z-30 py-10 px-4 md:px-8 bg-background">
        <motion.div className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase mb-6">
            The Journey
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Your <ShiningText text="Love Affair" /> Awaits
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A curated flow of intimacy — from playful beginnings to heartfelt
            endings.
          </p>
        </motion.div>
      </div>

      <section
        ref={scrollAreaRef}
        className="relative h-[100dvh] w-full overflow-hidden"
      >
        <div className="relative h-full w-full">
          {hours.map((hour) => (
            <div key={hour.id} className="timeline-card">
              <TimelineNode hour={hour} />
            </div>
          ))}
        </div>
      </section>
      {/* <div className="h-[20vh] bg-background" /> */}
    </section>
  );
};
