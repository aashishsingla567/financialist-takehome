"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

export interface PasswordInputProps extends InputProps {
  showPasswordByDefault?: boolean;
  showPasswordToggle?: boolean;
}

function PasswordInput({
  className,
  onChange,
  invalid,
  showPasswordByDefault,
  showPasswordToggle = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(
    showPasswordByDefault ?? false
  );

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        onChange={onChange}
        invalid={invalid}
        {...props}
      />
      {showPasswordToggle && (
        <div
          className={cn(
            "absolute inset-y-0 right-0 border-l-1",
            invalid && "border-destructive"
          )}
        >
          <Button
            variant="outline"
            type="button"
            className="border-none bg-transparent rounded-l-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeClosedIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export { PasswordInput };
