/**
 * @section: How It Works / Steps
 * @Purpose: Reduce friction by showing the process.
 * @Description: Use 3 simple steps or a short flow to explain how users get started.
 * Can be visual (icons/illustrations) or text-based. Keep it short and easy to scan.
 */
import { Rocket, Palette, TrendingUp, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const steps = [
  {
    icon: User,
    number: "01",
    title: "Get Started",
    description: "Sign up and create your account in just a few clicks.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Customize",
    description: "Customize your settings and preferences to match your needs.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch",
    description: "Deploy your solution and start seeing results immediately.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Grow",
    description: "See your results improve and scale your success over time.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-background my-16 md:my-20 mx-auto max-w-5xl w-full"
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-5">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="mb-4 uppercase" variant={"secondary"}>
            see in the flow
          </Badge>
          <h2
            id="pricing-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
          >
            {" "}
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-pretty">
            All these features are already configured and ready for you to ship
            your startup.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 rounded-xl border py-6 relative w-full border-none shadow-none md:py-16">
          <div className="relative flex flex-col items-center p-0 md:mt-12">
            {/* Horizontal line */}
            <div className="absolute -top-8 left-0 hidden h-px w-full bg-border md:block"></div>

            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={index} className="relative space-y-2">
                    {/* Mobile vertical line */}
                    <div className="absolute top-6 left-2.5 w-px h-full bg-border block md:hidden"></div>

                    {/* Icon container */}
                    <div className="absolute top-4 -left-6 z-10 mb-5 flex size-18 items-center justify-center rounded-full bg-background p-1 md:-top-17 md:-left-4">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-1">
                        <div className="flex size-full items-center justify-center rounded-md bg-muted">
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-13 md:pl-0">
                      <p className="mt-10 text-sm text-muted-foreground">
                        {/*{phase.date}*/}
                      </p>
                      <h2 className="text-xl font-bold tracking-tighter">
                        {step.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
