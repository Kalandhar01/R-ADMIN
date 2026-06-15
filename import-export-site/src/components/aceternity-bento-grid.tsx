"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useMouseGlow } from "@/hooks/use-mouse-glow";
import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={cn("grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-8", className)}
    >
      {children}
    </motion.div>
  );
}

type BentoGridItemProps = {
  className?: string;
  eyebrow: string;
  title: string;
  body: string;
  metric?: string;
  icon?: ReactNode;
};

export function BentoGridItem({ className, eyebrow, title, body, metric, icon }: BentoGridItemProps) {
  const glow = useMouseGlow<HTMLDivElement>();

  return (
    <motion.article
      onMouseMove={glow.onMouseMove}
      onMouseLeave={glow.onMouseLeave}
      variants={{
        hidden: { y: 42, opacity: 0, rotateX: 8 },
        visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -8, rotateX: 3, rotateY: -3, scale: 1.012 }}
      className={cn(
        "glow-card group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl [transform-style:preserve-3d]",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-px rounded-[1.94rem] bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(216,177,95,0.22),transparent_19rem)]" />
      </div>
      <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#d8b15f] shadow-[0_0_40px_rgba(216,177,95,0.18)]">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8b15f]/90">{eyebrow}</p>
      <div className="relative z-10 mt-16">
        {metric ? <p className="mb-4 text-3xl font-semibold tracking-tight text-white">{metric}</p> : null}
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/58">{body}</p>
      </div>
      <div className="absolute -bottom-20 -right-14 h-48 w-48 rounded-full bg-[#1677ff]/18 blur-3xl transition group-hover:bg-[#d8b15f]/18" />
    </motion.article>
  );
}
