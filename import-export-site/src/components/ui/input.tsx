import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d8b15f]/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#d8b15f]/20",
        className,
      )}
      {...props}
    />
  );
}
