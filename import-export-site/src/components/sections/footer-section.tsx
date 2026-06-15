"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";
import { Ship, ArrowUp } from "lucide-react";

export function FooterSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer-el", { y: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power4.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={rootRef} className="relative border-t border-[#e5e1db] bg-[#0f172a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-16">
          <div className="footer-el lg:col-span-1">
            <Link href="#home" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                <Ship className="h-5 w-5 text-[#b8860b]" />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.28em]">Ractysh</span>
                <span className="block text-[10px] text-white/40">Global Trade</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Connecting manufacturers, suppliers, distributors and businesses through reliable international sourcing, logistics and trade solutions.
            </p>
          </div>

          <div className="footer-el">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b8860b]">Quick Links</h4>
            <nav className="mt-5 flex flex-col gap-3">
              {[
                ["Home", "#home"],
                ["Services", "/services"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-el">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b8860b]">Services</h4>
            <nav className="mt-5 flex flex-col gap-3">
              {["Import Services", "Export Services", "Global Sourcing", "Freight Forwarding", "Customs Clearance"].map((label) => (
                <Link key={label} href="/services" className="text-sm text-white/60 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-el">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b8860b]">Contact</h4>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <span>trade@ractysh.com</span>
              <span>+1 (555) 123-4567</span>
              <span>Mumbai · Dubai · Rotterdam<br />Singapore · New York</span>
            </div>
          </div>
        </div>

        <div className="footer-el mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Ractysh Global Trade. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["LinkedIn", "Twitter", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-xs text-white/40 transition-colors hover:text-white">
                {s}
              </a>
            ))}
            <button type="button" onClick={scrollToTop} className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-white/40 hover:text-white">
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
