"use client";

import { globeConfig, sampleArcs } from "@/data/globe-routes";
import { World } from "@/components/ui/globe";

export function LogisticsGlobe() {
  return (
    <div className="absolute inset-0" aria-hidden="true" data-aceternity-globe>
      <World data={sampleArcs} globeConfig={globeConfig} className="h-full w-full" />
    </div>
  );
}
