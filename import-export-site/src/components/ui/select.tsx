import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-[#081629] px-4 text-sm text-white outline-none transition focus:border-[#d8b15f]/70 focus:ring-2 focus:ring-[#d8b15f]/20",
        className,
      )}
      {...props}
    />
  );
}
