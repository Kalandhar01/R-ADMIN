"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { routeMarkers, tradeRoutes } from "@/data/site";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

export function WorldMap() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trade-route",
        { strokeDasharray: 900, strokeDashoffset: 900, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
          },
        },
      );

      gsap.to(".flow-dot", {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#061426]/70 p-2 shadow-[0_30px_120px_rgba(0,0,0,0.4)]">
      <svg viewBox="0 0 1000 600" className="h-auto w-full" role="img" aria-label="Interactive world trade route map">
        <defs>
          <linearGradient id="routeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d8b15f" />
            <stop offset="55%" stopColor="#2aa8ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="600" fill="url(#mapGrid)" opacity="0" />
        <g opacity="0.23" fill="#8ec9ff">
          <path d="M148 225 198 191 272 202 315 243 295 293 217 302 161 278Z" />
          <path d="M284 346 344 330 387 379 365 468 304 439Z" />
          <path d="M448 174 532 154 619 199 604 276 517 286 448 248Z" />
          <path d="M561 330 638 318 690 378 660 463 576 444 532 388Z" />
          <path d="M684 229 794 187 874 234 858 326 772 344 691 304Z" />
          <path d="M744 398 831 424 846 492 765 502 713 464Z" />
        </g>

        <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          {Array.from({ length: 11 }).map((_, index) => (
            <path key={`lat-${index}`} d={`M70 ${100 + index * 42} C300 ${80 + index * 18} 720 ${80 + index * 18} 930 ${100 + index * 42}`} />
          ))}
          {Array.from({ length: 12 }).map((_, index) => (
            <path key={`lng-${index}`} d={`M${100 + index * 76} 70 C${80 + index * 70} 220 ${80 + index * 70} 400 ${100 + index * 76} 530`} />
          ))}
        </g>

        <g filter="url(#routeGlow)" fill="none" strokeLinecap="round" strokeWidth="2.2">
          {tradeRoutes.map((route) => (
            <path key={`${route.from}-${route.to}`} className="trade-route" d={route.path} stroke="url(#routeGradient)" />
          ))}
        </g>

        {routeMarkers.map((marker) => (
          <motion.g
            key={marker.city}
            className="group cursor-pointer"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ scale: 1.2 }}
          >
            <circle className="flow-dot origin-center opacity-60" cx={marker.x * 10} cy={marker.y * 6} r="15" fill="#2aa8ff" opacity="0.12" />
            <circle cx={marker.x * 10} cy={marker.y * 6} r="5" fill="#d8b15f" />
            <circle cx={marker.x * 10} cy={marker.y * 6} r="2.5" fill="#ffffff" />
            <text x={marker.x * 10 + 12} y={marker.y * 6 - 9} fill="#ffffff" fontSize="14" fontWeight="600" opacity="0.84">
              {marker.city}
            </text>
            <text x={marker.x * 10 + 12} y={marker.y * 6 + 9} fill="#9ecbff" fontSize="10" opacity="0.68">
              {marker.region}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
