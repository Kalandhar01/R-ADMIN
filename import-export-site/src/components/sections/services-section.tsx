"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { featuredServices } from "@/data/site";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-card", {
        y: 80, opacity: 0, scale: 0.95, duration: 1, stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} id="services" className="relative bg-[#f8f7f4] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Our Services</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
            Global Trade Services
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560] sm:text-lg">
            Comprehensive import, export, and logistics solutions for modern global businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((svc) => (
            <Link key={svc.slug} href={`/services#${svc.slug}`} className="svc-card group relative flex flex-col overflow-hidden rounded-xl border border-[#e5e1db] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="relative h-56 overflow-hidden">
                <Image src={svc.image} alt={svc.title} fill sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium text-[#0f172a]">{svc.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b6560]">{svc.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#b8860b] transition-all duration-500 group-hover:gap-3">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="group inline-flex h-[50px] items-center gap-2.5 border border-[#0f172a]/20 bg-white px-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f172a] transition-all duration-500 hover:bg-[#0f172a] hover:text-white hover:translate-y-[-2px]">
            View All Services
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
