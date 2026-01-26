import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase";
import { getSubscription } from "@/lib/stripe";
import { formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ButtonBilling } from "@/components/ButtonBilling";

export default async function AccountPage() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/auth/login");

  const user = session.user;
  const displayName = user.name || user.email?.split("@")[0] || "User";

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("customer_id, price_id, has_access")
    .eq("id", user.sub)
    .single();

  const subscription = await getSubscription(
    profile?.customer_id || null,
    profile?.price_id || null,
    profile?.has_access || false,
  );

  const hasCustomerId = !!profile?.customer_id;
  const isActive = subscription.status === "active";
  const hasNoSubscription = subscription.status === "none";

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={user.picture} alt={displayName} />
              <AvatarFallback className="text-xl font-bold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {displayName}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Info */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Your account details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </span>
                  <span className="text-sm font-semibold">
                    {user.name || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold">
                    {user.email ?? "—"}
                  </span>
                </div>
                <div className="pt-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    User ID
                  </p>
                  <p className="font-mono text-xs break-all text-muted-foreground bg-muted/50 p-2 rounded">
                    {user.sub}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card
            className={
              hasNoSubscription
                ? "overflow-hidden border-dashed"
                : "overflow-hidden"
            }
          >
            <CardHeader
              className={
                hasNoSubscription
                  ? "bg-muted/30 border-b border-dashed"
                  : "bg-muted/30 border-b"
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    hasNoSubscription
                      ? "p-2 rounded-lg bg-muted"
                      : "p-2 rounded-lg bg-primary/10"
                  }
                >
                  <ShieldCheck
                    className={
                      hasNoSubscription
                        ? "h-5 w-5 text-muted-foreground"
                        : "h-5 w-5 text-primary"
                    }
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">Subscription</CardTitle>
                  <CardDescription className="text-sm">
                    {hasNoSubscription
                      ? "Get started with a plan"
                      : "Manage your plan & billing"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {hasNoSubscription ? (
                <>
                  <div className="bg-muted/50 border border-dashed rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm mb-1">
                          No active subscription
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Choose a plan to unlock all features and start
                          building.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href="/#pricing" className="block">
                    <Button className="w-full" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      View Plans
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-2xl font-bold">
                          {subscription.plan}
                        </h3>
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className="font-semibold"
                        >
                          {subscription.status.toUpperCase()}
                        </Badge>
                      </div>
                      {subscription.currentPeriodEnd && (
                        <p className="text-sm text-muted-foreground">
                          {subscription.cancelAtPeriodEnd
                            ? `Access until ${formatDate(subscription.currentPeriodEnd)}`
                            : isActive
                              ? `Renews on ${formatDate(subscription.currentPeriodEnd)}`
                              : `Your subscription is ${subscription.status}`}
                        </p>
                      )}
                    </div>
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <Alert
                      variant="destructive"
                      className="border-destructive/50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Your subscription will be canceled at the end of the
                        billing period. Reactivate anytime via the billing
                        portal.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
                    {!hasCustomerId ? (
                      <Link href="/#pricing" className="w-full sm:flex-1">
                        <Button variant="outline" className="w-full" size="lg">
                          Subscribe Now
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/#pricing" className="w-full sm:flex-1">
                          <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                          >
                            Change Plan
                          </Button>
                        </Link>
                        <ButtonBilling />
                      </>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
