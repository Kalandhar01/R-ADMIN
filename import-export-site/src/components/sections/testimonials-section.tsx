"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";
import { testimonials } from "@/data/site";

export function TestimonialsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".testi-card", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={rootRef} className="relative bg-[#0f172a] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Testimonials</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Trusted by Global Leaders
          </h2>
        </div>

        <div className="testi-card relative mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <svg className="mx-auto h-10 w-10 text-[#b8860b]/30" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" /></svg>
            <blockquote className="mt-6 text-xl leading-relaxed text-white/80 sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-sm text-white/50">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[#b8860b]" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
