"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import apiClient from "@/lib/api";
import { PortalResponse } from "@/types/stripe";

export function ButtonBilling() {
  const [loading, setLoading] = useState(false);

  async function handleManageBilling() {
    setLoading(true);
    try {
      const data = await apiClient.post<PortalResponse>("/stripe/portal", {
        returnUrl: `${window.location.origin}/dashboard/account`,
      });

      const url = (data as unknown as PortalResponse).url;

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error managing billing:", err);
      // Error handled by apiClient interceptor
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleManageBilling}
      disabled={loading}
      className="w-full sm:flex-1"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      {loading ? "Loading..." : "Manage Billing"}
    </Button>
  );
}
