import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b15f] disabled:pointer-events-none disabled:opacity-50",
        "bg-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl hover:bg-white/15",
        className,
      )}
      {...props}
    />
  );
}
