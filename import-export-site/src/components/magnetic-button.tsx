"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "border-[#d8b15f]/50 bg-[#d8b15f] text-[#061426] shadow-[0_0_46px_rgba(216,177,95,0.32)] hover:bg-[#f2ce7a]",
  secondary:
    "border-white/18 bg-white/[0.08] text-white shadow-[0_0_34px_rgba(20,126,251,0.22)] hover:bg-white/[0.14]",
};

export function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.55 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.32);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.32);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border px-6 text-sm font-bold transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b15f]",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <span className="absolute left-[var(--spot-x,50%)] top-[var(--spot-y,50%)] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-2xl" />
      </span>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  );

  const sharedProps = {
    className: classes,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.045 },
    whileTap: { scale: 0.97 },
    style: { x: springX, y: springY },
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...sharedProps}>
      {content}
    </motion.button>
  );
}
