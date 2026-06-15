"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";
import { allServices } from "@/data/site";
import { Send, Search, Check } from "lucide-react";

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Netherlands", "Singapore", "China", "India", "UAE",
  "Australia", "Brazil", "South Africa", "Japan", "South Korea",
];

export function ContactPageClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceSearch, setServiceSearch] = useState("");

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.06,
        ease: "power4.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filteredServices = allServices.filter((s) =>
    s.title.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <section ref={rootRef} className="min-h-svh bg-[#f8f7f4] pt-[100px]">
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
        <div className="contact-el">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Contact</span>
          <h1 className="mt-4 max-w-2xl text-balance text-[clamp(36px,6vw,72px)] font-medium leading-[0.92] tracking-[-0.02em] text-[#0f172a]">
            Let&apos;s Talk Trade
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560]">
            Schedule a consultation with our trade experts. We&apos;ll respond within 24 hours with a tailored proposal.
          </p>
        </div>

        <div className="contact-el mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Full Name *</label>
                  <input type="text" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Email *</label>
                  <input type="email" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Company</label>
                  <input type="text" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Company name" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Phone</label>
                  <input type="tel" className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Country</label>
                <select className="mt-2 block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]">
                  <option value="">Select your country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Services You Need *</label>
                <div className="relative mt-2">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6560]" />
                  <input
                    type="text"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder="Search services..."
                    className="block w-full rounded-lg border border-[#e5e1db] bg-white px-4 py-3 pl-10 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]"
                  />
                </div>
                <div className="mt-2 flex max-h-48 flex-wrap gap-2 overflow-y-auto rounded-lg border border-[#e5e1db] bg-white p-3">
                  {filteredServices.map((svc) => (
                    <button
                      key={svc.slug}
                      type="button"
                      onClick={() => toggleService(svc.slug)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedServices.includes(svc.slug)
                          ? "bg-[#b8860b] text-white"
                          : "bg-[#f8f7f4] text-[#6b6560] hover:bg-[#e5e1db]"
                      }`}
                    >
                      {selectedServices.includes(svc.slug) && <Check className="h-3 w-3" />}
                      {svc.title}
                    </button>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <p className="mt-1 text-xs text-[#6b6560]">
                    {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">Project Details *</label>
                <textarea rows={5} className="mt-2 block w-full resize-none rounded-lg border border-[#e5e1db] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b]" placeholder="Describe your project, timeline, volume, and any specific requirements..." />
              </div>

              <button type="submit" className="group inline-flex h-[50px] items-center gap-2.5 bg-[#b8860b] px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-[#d4a843] hover:translate-y-[-2px]">
                Submit Inquiry
                <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-[#e5e1db] bg-white p-8">
              <h3 className="text-lg font-medium text-[#0f172a]">Why Work With Us?</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "24-hour response time on inquiries",
                  "Dedicated trade expert assigned to your account",
                  "Custom solutions built for your specific needs",
                  "End-to-end visibility and control tower oversight",
                  "Competitive rates through global carrier partnerships",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#6b6560]">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8860b]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-[#e5e1db] pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b8860b]">Contact Directly</h4>
                <div className="mt-3 flex flex-col gap-2 text-sm text-[#0f172a]">
                  <span>trade@ractysh.com</span>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
