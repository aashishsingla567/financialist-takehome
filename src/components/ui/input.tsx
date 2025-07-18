import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange: (value: string) => void;
  invalid?: boolean;
}

function Input({ className, type, onChange, invalid, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        invalid
          ? "focus-visible:border-destructive focus-visible:ring-destructive/50 focus-visible:ring-[3px]"
          : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        invalid && "border-destructive",
        className
      )}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}

export { Input };
