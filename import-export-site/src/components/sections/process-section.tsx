"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { processSteps } from "@/data/site";
import { ArrowRight } from "lucide-react";

export function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} id="process" className="relative bg-white px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Our Process</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
            How We Deliver
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560] sm:text-lg">
            A proven seven-step process from requirement analysis to final delivery.
          </p>
        </div>

        <div ref={sectionRef} className="relative mt-14 overflow-hidden">
          <div ref={trackRef} className="flex gap-6 pb-8">
            {processSteps.map((step, i) => (
              <div key={step.title} className="step-card flex w-[300px] shrink-0 flex-col rounded-xl border border-[#e5e1db] bg-[#f8f7f4] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <span className="font-sans text-xs font-semibold tracking-[0.08em] text-[#b8860b]">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-medium text-[#0f172a]">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b6560]">{step.body}</p>
                <ArrowRight className="mt-4 h-4 w-4 text-[#b8860b]/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
