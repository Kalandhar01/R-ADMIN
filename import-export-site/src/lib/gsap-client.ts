"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, ScrollSmoother);
  registered = true;
}

export { gsap, MotionPathPlugin, ScrollSmoother, ScrollTrigger, SplitText };
