"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { bentoCards } from "@/data/site";
import { BentoGrid, BentoGridItem } from "@/components/aceternity-bento-grid";
import { cn } from "@/lib/utils";
import { Globe, Search, TrendingUp, Shield, FileCheck, Truck } from "lucide-react";

const icons = [Globe, Search, TrendingUp, Shield, FileCheck, Truck];
const spans = [
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-2",
] as const;

export function WhoWeAreSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".who-card", {
        y: 60, opacity: 0, scale: 0.96, duration: 0.9, stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} id="about" className="relative bg-[#f8f7f4] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Who We Are</span>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
              Your Global Trade Partner
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#6b6560] sm:text-lg">
              We connect businesses to global markets through strategic sourcing, logistics, and trade solutions built for scale.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[["Coverage", "50+ Countries"], ["Experience", "18+ Years"]].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-[#e5e1db] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b8860b]">{k}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#0f172a]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <BentoGrid className="grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-6">
              {bentoCards.map((card, i) => {
                const Icon = icons[i] ?? Globe;
                return (
                  <BentoGridItem
                    key={card.title}
                    className={cn("who-card", spans[i], "min-h-[320px] bg-white border border-[#e5e1db] rounded-xl")}
                    eyebrow={card.eyebrow}
                    title={card.title}
                    body={card.body}
                    metric={card.metric}
                    icon={<Icon className="h-5 w-5 text-[#b8860b]" />}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
