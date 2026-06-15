"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { industries } from "@/data/site";

export function IndustriesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".ind-card", {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} className="relative bg-white px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Industries</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
            Industries We Serve
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560] sm:text-lg">
            Deep domain expertise across sectors, with specialized solutions for each industry&apos;s unique logistics challenges.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.title} className="ind-card group relative flex flex-col overflow-hidden rounded-xl border border-[#e5e1db] bg-[#f8f7f4] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="relative h-44 overflow-hidden">
                <Image src={ind.image} alt={ind.title} fill sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium text-[#0f172a]">{ind.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6560]">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
