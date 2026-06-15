"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { ArrowRight, Send } from "lucide-react";

export function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section ref={rootRef} id="contact" className="relative bg-white px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="contact-el text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Contact</span>
            <h2 className="contact-el mt-4 max-w-xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
              Start Your Global Trade Journey
            </h2>
            <p className="contact-el mt-5 max-w-lg text-base leading-7 text-[#6b6560] sm:text-lg">
              Tell us about your import, export, or logistics requirements. Our trade experts will respond within 24 hours with a tailored solution.
            </p>

            <div className="contact-el mt-10 grid gap-5">
              {[
                { label: "Email", value: "trade@ractysh.com" },
                { label: "Phone", value: "+1 (555) 123-4567" },
                { label: "Office", value: "Mumbai | Dubai | Rotterdam | Singapore | New York" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="w-20 text-xs font-semibold uppercase tracking-[0.12em] text-[#b8860b]">{item.label}</span>
                  <span className="text-sm text-[#0f172a]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-el rounded-2xl border border-[#e5e1db] bg-[#f8f7f4] p-6 sm:p-8">
            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Name</label>
                  <input id="name" type="text" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Email</label>
                  <input id="email" type="email" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Your email address" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Company</label>
                <input id="company" type="text" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Your company name" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Message</label>
                <textarea id="message" rows={4} className="mt-2 block w-full resize-none rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Describe your trade requirements..." />
              </div>
              <button type="submit" className="group inline-flex h-[50px] items-center gap-2.5 bg-[#b8860b] px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-[#d4a843] hover:translate-y-[-2px]">
                Send Inquiry
                <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
