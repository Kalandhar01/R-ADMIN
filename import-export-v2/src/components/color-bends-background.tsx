"use client";

import { useEffect, useRef } from "react";

type ColorBendsBackgroundProps = {
  className?: string;
};

export function ColorBendsBackground({ className = "" }: ColorBendsBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  return (
    <div ref={rootRef} className={`color-bends ${className}`} aria-hidden="true">
      <div className="color-bends__grain" />
      <div className="color-bends__beam color-bends__beam--one" />
      <div className="color-bends__beam color-bends__beam--two" />
      <div className="color-bends__beam color-bends__beam--three" />
      <div className="color-bends__glow color-bends__glow--left" />
      <div className="color-bends__glow color-bends__glow--right" />
      <div className="color-bends__vignette" />
    </div>
  );
}
