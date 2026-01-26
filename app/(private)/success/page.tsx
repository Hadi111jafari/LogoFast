"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session_id from URL parameters
    const params = new URLSearchParams(window.location.search);
    const session = params.get("session_id");
    setSessionId(session);

    // Verify payment with your backend (optional)
    if (session) {
      // You can make an API call here to verify the session
      // fetch(`/api/verify-payment?session_id=${session}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     // Handle verification
      //     setLoading(false);
      //   });

      // For now, just set loading to false after a brief delay
      setTimeout(() => setLoading(false), 500);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && sessionId) {
      // Firework confetti animation
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Create confetti from two points (firework effect)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [loading, sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Invalid Session</h1>
            <p className="text-muted-foreground">
              No payment session found. Please try again or contact support.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 bg-foreground text-background rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <CheckCircle
              className="w-24 h-24 text-green-500 relative z-10"
              strokeWidth={1.5}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Payment Successful! 🎉
            </h1>

            <p className="text-muted-foreground lg:text-xl">
              Welcome aboard! Your account is ready and you can start building
              right away.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 w-full max-w-md space-y-3">
            <p className="text-sm text-muted-foreground">
              Check your email for:
            </p>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Your receipt and invoice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Access credentials and setup guide</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Getting started documentation</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant={"default"}
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              variant={"outline"}
              onClick={() => (window.location.href = "/docs")}
              className="px-8 py-3 border border-border rounded-md font-semibold hover:bg-muted transition-colors"
            >
              View Documentation
            </Button>
          </div>

          {sessionId && (
            <p className="text-xs text-muted-foreground">
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
