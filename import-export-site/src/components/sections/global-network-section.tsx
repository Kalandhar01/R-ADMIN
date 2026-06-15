"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";
import { routeMarkers } from "@/data/site";
import { Globe } from "lucide-react";

export function GlobalNetworkSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".marker-dot", {
        scale: 0, opacity: 0, duration: 0.6, stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
      gsap.from(".net-line", {
        strokeDashoffset: 500, duration: 1.2, stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  const bezierPath = (from: typeof routeMarkers[0], to: typeof routeMarkers[0]) => {
    const x1 = from.x + 10, y1 = from.y + 6;
    const x2 = to.x + 10, y2 = to.y + 6;
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 12;
    return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
  };

  const routePairs = [
    [routeMarkers[0], routeMarkers[1]],
    [routeMarkers[1], routeMarkers[2]],
    [routeMarkers[3], routeMarkers[4]],
    [routeMarkers[5], routeMarkers[2]],
    [routeMarkers[0], routeMarkers[7]],
    [routeMarkers[6], routeMarkers[1]],
    [routeMarkers[8], routeMarkers[3]],
  ];

  return (
    <section ref={rootRef} id="network" className="relative bg-[#f8f7f4] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b8860b]">Global Network</span>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-medium leading-[0.95] text-[#0f172a] sm:text-5xl lg:text-6xl">
            Our Global Reach
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#6b6560] sm:text-lg">
            Active trade corridors connecting major markets across six continents.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-[#e5e1db] bg-white p-6 sm:p-10">
          <div className="relative mx-auto aspect-[2/1] w-full max-w-4xl">
            <svg className="h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="glow"><stop offset="0%" stopColor="#b8860b" stopOpacity="0.5" /><stop offset="100%" stopColor="#b8860b" stopOpacity="0" /></radialGradient>
              </defs>
              {routePairs.map(([from, to], i) => (
                <path key={i} className="net-line" d={bezierPath(from, to)} fill="none" stroke="#b8860b" strokeWidth="0.12" strokeDasharray="4" strokeDashoffset="500" opacity="0.4" />
              ))}
              {routeMarkers.map((m) => (
                <g key={m.city} className="marker-dot">
                  <circle cx={m.x + 10} cy={m.y + 6} r="0.6" fill="#b8860b" />
                  <circle cx={m.x + 10} cy={m.y + 6} r="2" fill="url(#glow)" />
                </g>
              ))}
            </svg>

            <div className="absolute inset-0">
              <svg className="h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
                {routeMarkers.map((m) => (
                  <g key={m.city}>
                    <foreignObject x={m.x + 3} y={m.y + 2} width="18" height="5">
                      <span className="text-[2.8px] font-semibold text-[#0f172a]">{m.city}</span>
                    </foreignObject>
                    <foreignObject x={m.x + 3} y={m.y + 6} width="14" height="4">
                      <span className="text-[2.2px] text-[#6b6560]">{m.region}</span>
                    </foreignObject>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {routeMarkers.map((m) => (
              <div key={m.city} className="flex items-center gap-2 rounded-lg border border-[#e5e1db] bg-[#f8f7f4] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#b8860b]" />
                <span className="text-xs font-medium text-[#0f172a]">{m.city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
