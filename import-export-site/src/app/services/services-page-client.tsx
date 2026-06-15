"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";
import { allServices, servicesDetail } from "@/data/site";
import { ArrowRight, Search, Ship, X } from "lucide-react";

const categories = ["All", "Core", "Sourcing", "Freight", "Compliance", "Logistics", "Advisory", "Risk"];

export function ServicesPageClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-item", {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const filtered = allServices.filter((s) => {
    if (activeCat !== "All" && s.category !== activeCat) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const detail = selected ? servicesDetail[selected] : null;

  return (
    <section ref={rootRef} className="min-h-svh bg-[#f8f7f4] pt-[100px]">
      <header className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Services</span>
        <h1 className="mt-4 max-w-3xl text-balance text-[clamp(36px,6vw,72px)] font-medium leading-[0.92] tracking-[-0.02em] text-[#0f172a]">
          All Services
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560]">
          Twenty-five specialized services covering every aspect of international trade and logistics.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
                  activeCat === cat
                    ? "bg-[#b8860b] text-white"
                    : "border border-[#e5e1db] bg-white text-[#6b6560] hover:border-[#b8860b] hover:text-[#b8860b]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6560]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-full border border-[#e5e1db] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#b8860b] sm:w-64"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc) => (
            <button
              key={svc.slug}
              type="button"
              onClick={() => setSelected(svc.slug)}
              className={`svc-item flex items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                selected === svc.slug
                  ? "border-[#b8860b] bg-white shadow-[0_4px_24px_rgba(184,134,11,0.08)]"
                  : "border-[#e5e1db] bg-white hover:border-[#b8860b]/40 hover:shadow-sm"
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#b8860b]">{svc.category}</span>
                <h3 className="mt-1 text-base font-medium text-[#0f172a]">{svc.title}</h3>
              </div>
              <ArrowRight className={`h-4 w-4 shrink-0 transition-colors ${selected === svc.slug ? "text-[#b8860b]" : "text-[#e5e1db]"}`} />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-[#6b6560]">No services match your search criteria.</p>
        )}

        {detail && selected && (
          <div className="svc-item mt-8 rounded-2xl border border-[#b8860b]/20 bg-white p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8860b]">
                  {allServices.find((s) => s.slug === selected)?.category}
                </span>
                <h2 className="mt-2 text-3xl font-medium text-[#0f172a]">
                  {allServices.find((s) => s.slug === selected)?.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6b6560]">{detail.desc}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {detail.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#0f172a]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8860b]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e1db] text-[#6b6560] transition-colors hover:border-[#b8860b] hover:text-[#b8860b]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/contact" className="group inline-flex h-[46px] items-center gap-2.5 bg-[#b8860b] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-[#d4a843] hover:translate-y-[-2px]">
                Inquire About This Service
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#e5e1db] bg-[#0f172a] px-6 py-12 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/60">Need a custom trade solution? Our team is ready to help.</p>
          <Link href="/contact" className="group inline-flex h-[44px] items-center gap-2 border border-white/20 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-white hover:text-[#0f172a]">
            Contact Us <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
