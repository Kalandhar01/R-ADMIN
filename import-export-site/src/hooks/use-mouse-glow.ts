"use client";

import { useCallback } from "react";

export function useMouseGlow<T extends HTMLElement>() {
  const onMouseMove = useCallback((event: React.MouseEvent<T>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  }, []);

  const onMouseLeave = useCallback((event: React.MouseEvent<T>) => {
    event.currentTarget.style.setProperty("--mouse-x", "50%");
    event.currentTarget.style.setProperty("--mouse-y", "50%");
  }, []);

  return { onMouseMove, onMouseLeave };
}
