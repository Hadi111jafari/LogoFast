"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { ButtonLoginProps } from "@/types";

export default function ButtonLogin({
  className,
  variant = "default",
}: ButtonLoginProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    router.push(`${config.auth.loginUrl}?returnTo=${config.auth.returnTo}`);
  };

  useHotkeys("l", handleLogin, { preventDefault: true });

  return (
    <Button
      onClick={handleLogin}
      variant={variant}
      size="lg"
      disabled={isLoading}
      className={cn(className)}
    >
      <span className="mr-2 hidden items-center gap-1 sm:inline-flex">
        <Kbd>L</Kbd>
      </span>
      <span>{isLoading ? "Logging in..." : "Get Started"}</span>
    </Button>
  );
}
