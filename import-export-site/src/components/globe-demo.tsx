"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { globeConfig, sampleArcs } from "@/data/globe-routes";

const World = dynamic(() => import("@/components/ui/globe").then((module) => module.World), {
  ssr: false,
});

export default function GlobeDemo() {
  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center overflow-hidden bg-[#061426] py-20">
      <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:h-[40rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-center text-xl font-bold text-white md:text-4xl">Global trade routes in motion</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-white/62 md:text-lg">
            Interactive import and export corridors powered by Aceternity UI.
          </p>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 select-none bg-gradient-to-b from-transparent to-[#061426]" />
        <div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">
          <World data={sampleArcs} globeConfig={globeConfig} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
