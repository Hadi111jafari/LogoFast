"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { Loader2, KeySquare } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import apiClient from "@/lib/api";
import { config } from "@/config";
import { CheckoutButtonProps } from "@/types";

export default function ButtonCheckout({
  priceId,
  className = "",
  variant = "default",
  shortcut,
  showLogo = true,
}: CheckoutButtonProps) {
  const { user, isLoading: isAuthLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleCheckout = async () => {
    if (isLoading || isAuthLoading) return;

    if (!priceId) {
      toast.error("Price not configured");
      return;
    }

    if (!user) {
      setShowAuthAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const data = (await apiClient.post("/stripe/checkout", {
        priceId,
        successUrl: config.stripe.successUrl,
        cancelUrl: config.stripe.cancelUrl,
      })) as { url: string };

      const { url } = data;

      if (url) {
        window.location.href = url;
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  useHotkeys(shortcut || "", handleCheckout, {
    preventDefault: true,
    enabled: !isLoading && !!shortcut,
  });

  const isDisabled = isLoading || isAuthLoading || !priceId;

  return (
    <>
      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <KeySquare />
            </AlertDialogMedia>
            <AlertDialogTitle>Sign in required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to sign in to proceed to checkout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href={`${config.auth.loginUrl}?returnTo=/#pricing`}>
                Sign in
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={handleCheckout}
        variant={variant}
        className={className}
        size="lg"
        disabled={isDisabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {showLogo && (
              <Image
                src={config.logoUrl}
                alt=""
                className="mr-2 h-6 w-6"
                width={24}
                height={24}
              />
            )}
            {shortcut && (
              <span className="mr-2 hidden items-center gap-1 sm:inline-flex">
                <Kbd>{shortcut.toUpperCase()}</Kbd>
              </span>
            )}
            <span>Get {config.name}</span>
          </>
        )}
      </Button>
    </>
  );
}
