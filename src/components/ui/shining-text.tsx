// src/components/ui/shining-text.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShiningTextProps {
  text: string;
  className?: string;
}

export function ShiningText({ text, className }: ShiningTextProps) {
  return (
    <span className={cn("relative inline-block px-4 py-2", className)}>
      {/* 1. THE BLOOM (Outer Background Glow) 
          This creates the "Neon on the wall" effect.
      */}
      <motion.span
        aria-hidden
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 z-0 select-none bg-[#ff0080] blur-[40px] rounded-full mix-blend-screen"
      />

      {/* 2. UNDERGLOW (Sharp Neon Shadow)
          This ensures the pink is vibrant even if the shine is elsewhere.
      */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 select-none text-[#ff0080] blur-[4px] opacity-80 text-center"
        style={{ textShadow: "0 0 15px #ff0080, 0 0 30px #ff0080" }}
      >
        {text}
      </span>

      {/* 3. BASE TEXT WITH ANIMATED GRADIENT 
          Adding 'animate-gradient-x' makes the pink-to-rose colors shift.
      */}
      <span
        className="relative z-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff0080] via-[#ff7eb9] to-[#ff0080] bg-[length:200%_auto] animate-gradient-x"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </span>

      {/* 4. THE SHINE SWEEP (Faster and more intense) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 select-none"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 0%, transparent 45%, rgba(255,255,255,1) 50%, transparent 55%, transparent 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mixBlendMode: "plus-lighter",
        }}
        initial={{ backgroundPositionX: "200%" }}
        animate={{ backgroundPositionX: "-200%" }}
        transition={{
          duration: 5, // Faster sweep for more energy
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
