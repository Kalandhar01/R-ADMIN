"use client";

import { cn } from "@/lib/utils";

export function SectionHeading({
  tag,
  title,
  desc,
  align,
  className,
}: {
  tag?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {tag && (
        <span className="section-tag inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8860b]">
          {tag}
        </span>
      )}
      <h2 className="mt-4 text-balance text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.01em] text-[#0f172a]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 max-w-[560px] text-[15px] font-light leading-relaxed text-[#6b6560]">
          {desc}
        </p>
      )}
    </div>
  );
}
