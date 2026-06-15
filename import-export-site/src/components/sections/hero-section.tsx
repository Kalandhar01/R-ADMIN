"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { Menu, X, Ship, ArrowRight } from "lucide-react";

const LogisticsGlobe = dynamic(() => import("@/components/logistics-globe").then((m) => m.LogisticsGlobe), { ssr: false });

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Network", href: "#network" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    const headline = headlineRef.current;
    if (!root || !headline) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-line", { yPercent: 110, opacity: 0, rotateX: -65, transformOrigin: "left bottom", duration: 1.05, stagger: 0.035 }, "-=0.4")
        .from(".hero-desc", { y: 30, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from(".hero-stats > *", { y: 30, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

      gsap.to(".hero-globe", { opacity: 1, duration: 1.5, delay: 0.3 });

      gsap.to(".route-cargo-1", {
        duration: 10, repeat: -1, ease: "none",
        motionPath: { path: ".hero-route-1", align: ".hero-route-1", alignOrigin: [0.5, 0.5] },
      });
      gsap.to(".route-cargo-2", {
        duration: 14, repeat: -1, ease: "none",
        motionPath: { path: ".hero-route-2", align: ".hero-route-2", alignOrigin: [0.5, 0.5] },
      });
      gsap.to(".route-cargo-3", {
        duration: 12, repeat: -1, ease: "none",
        motionPath: { path: ".hero-route-3", align: ".hero-route-3", alignOrigin: [0.5, 0.5] },
      });
    }, root);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} id="home" className="relative isolate min-h-svh overflow-hidden bg-[#0f172a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,134,11,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(30,41,59,0.6),transparent_50%)]" />

      <div className="hero-globe pointer-events-none absolute right-[-20%] top-[-10%] h-[120%] w-[70%] opacity-0">
        <LogisticsGlobe />
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1400 900" aria-hidden="true">
        <path className="hero-route-1" d="M90 560 C330 338 586 318 850 150 C1042 28 1220 95 1348 214" fill="none" stroke="rgba(184,134,11,0.35)" strokeDasharray="8 14" />
        <path className="hero-route-2" d="M120 705 C382 616 548 740 760 556 C1022 326 1166 404 1352 350" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 12" />
        <path className="hero-route-3" d="M200 400 C480 520 700 280 980 480 C1150 590 1280 420 1400 300" fill="none" stroke="rgba(184,134,11,0.25)" strokeDasharray="6 16" />
        <g className="route-cargo-1">
          <foreignObject x="-16" y="-16" width="32" height="32">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b8860b]/40 bg-[#0f172a]/80 text-[#b8860b] backdrop-blur-md">
              <Ship className="h-3.5 w-3.5" />
            </div>
          </foreignObject>
        </g>
        <g className="route-cargo-2">
          <foreignObject x="-16" y="-16" width="32" height="32">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#0f172a]/80 text-white/80 backdrop-blur-md">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </div>
          </foreignObject>
        </g>
        <g className="route-cargo-3">
          <foreignObject x="-16" y="-16" width="32" height="32">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b8860b]/30 bg-[#0f172a]/80 text-[#b8860b]/80 backdrop-blur-md">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
            </div>
          </foreignObject>
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]/80" />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <a href="#home" className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur-xl">
            <Ship className="h-5 w-5 text-[#b8860b]" />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-white">Ractysh</span>
            <span className="block text-[11px] text-white/50">Global Trade</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 text-sm text-white/70 shadow-[0_12px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]">
              {item.label}
            </a>
          ))}
        </nav>

        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b] lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {menuOpen && (
        <div className="relative z-20 mx-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl lg:hidden">
          <nav className="grid p-3">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-10 sm:pb-20 lg:px-12 lg:pt-28">
        <div className="hero-badge mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-[#b8860b] shadow-[0_0_16px_rgba(184,134,11,0.8)]" />
          Global Trade Control Tower
        </div>

        <h1 ref={headlineRef} className="max-w-4xl text-balance text-5xl font-semibold leading-[0.92] text-white sm:text-7xl lg:text-8xl">
          <span className="hero-line inline-block">Global Trade.</span>{" "}
          <span className="hero-line inline-block text-[#b8860b]">Delivered With Precision.</span>
        </h1>

        <p className="hero-desc mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
          Connecting manufacturers, suppliers, distributors and businesses through reliable international sourcing, logistics and trade solutions.
        </p>

        <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="group inline-flex h-[50px] items-center gap-2.5 bg-[#b8860b] px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-[#d4a843] hover:translate-y-[-2px]">
            Start Trading
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a href="#services" className="group inline-flex h-[50px] items-center gap-2.5 border border-white/25 bg-transparent px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-white/[0.08] hover:translate-y-[-2px]">
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="hero-stats mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
          {[["100+", "Global Partners"], ["50+", "Countries"], ["1000+", "Shipments"], ["98%", "Client Retention"]].map(([val, label]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[clamp(28px,3vw,44px)] font-semibold leading-none tracking-[-0.01em] text-white tabular-nums">{val}</span>
              <span className="font-sans text-xs font-normal tracking-[0.04em] text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
