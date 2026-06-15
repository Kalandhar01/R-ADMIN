"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { networkStats } from "@/data/site";
import { Globe, Eye, Shield, TrendingDown, Headphones, ShieldCheck } from "lucide-react";

const icons = [Globe, Eye, Shield, TrendingDown, Headphones, ShieldCheck];

export function WhyChooseUsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".wcu-card", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      counterRefs.current.forEach((el) => {
        if (!el) return;
        const val = parseInt(el.dataset.value || "0", 10);
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => {
            gsap.fromTo(el, { textContent: 0 }, {
              textContent: val, duration: 2, ease: "power3.out",
              snap: { textContent: 1 },
            });
          },
        });
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#f8f7f4] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Why Choose Us</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
            Built for Global Scale
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {networkStats.map(([val, label], i) => {
            const numVal = parseInt(val, 10);
            return (
              <div key={label} className="wcu-card flex flex-col items-center gap-2 rounded-xl border border-[#e5e1db] bg-white p-8 text-center">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  data-value={numVal || 0}
                  className="text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-0.02em] text-[#0f172a] tabular-nums"
                >
                  {numVal ? "0" : val}
                </span>
                {!numVal && <span className="text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-0.02em] text-[#0f172a]">%</span>}
                <span className="text-sm font-medium text-[#6b6560]">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Global Partner Network", body: "Vetted carriers, brokers, and warehouses across all major trade corridors.", icon: Globe },
            { title: "End-to-End Visibility", body: "Real-time tracking from supplier to delivery with proactive exception management.", icon: Eye },
            { title: "Regulatory Expertise", body: "Deep customs and compliance knowledge across 50+ countries.", icon: Shield },
            { title: "Cost Optimization", body: "Strategic rate negotiation and route optimization reducing total landed cost.", icon: TrendingDown },
            { title: "Dedicated Support", body: "A human control desk that knows your lane, your cargo, and your next decision.", icon: Headphones },
            { title: "Risk Management", body: "Comprehensive cargo insurance and compliance screening for full protection.", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="wcu-card flex gap-4 rounded-xl border border-[#e5e1db] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b8860b]/10 text-[#b8860b]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-[#0f172a]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b6560]">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
