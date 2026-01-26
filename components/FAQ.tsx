/**
 * @section: Objection Handling / FAQs
 * @Purpose: Answer doubts before they block conversion.
 * @Description: Use 5–8 FAQs or bullets to handle common concerns (setup, support, refund, security). Keep answers short and practical.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQItem } from "@/types";

const faqItems: FAQItem[] = [
  {
    question: "What is ShipFast?",
    answer:
      "ShipFast is a starter kit that helps you launch SaaS products faster. It includes auth, payments, UI, and basic setup so you don’t start from zero.",
  },
  {
    question: "Who is ShipFast for?",
    answer:
      "It’s for developers who want to build and ship SaaS products quickly without wasting time on boilerplate setup.",
  },
  {
    question: "What tech stack does ShipFast use?",
    answer:
      "ShipFast is built with modern tools like Next.js, Tailwind, and Stripe. Everything is ready to use and easy to change.",
  },
  {
    question: "Can I use ShipFast for commercial projects?",
    answer:
      "Yes. You can use it for your own products and client work based on the license included.",
  },
  {
    question: "Do I get future updates?",
    answer:
      "Yes. When new features or fixes are released, you get access to updates.",
  },
  {
    question: "Is ShipFast beginner friendly?",
    answer:
      "You should be comfortable with JavaScript and basic web concepts. It’s not a tutorial, but the code is clean and easy to follow.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="overflow-hidden py-20 md:py-32 w-full mx-auto max-w-7xl px-5"
    >
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <Badge className="mb-4 uppercase" variant={"secondary"}>
          {" "}
          FAQ
        </Badge>

        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-7 lg:text-6xl">
          Frequently Asked Questions
        </h2>

        <p className="text-md mx-auto max-w-xl text-center text-muted-foreground lg:text-lg">
          Got questions? We&apos;ve got answers.
        </p>

        <Accordion type="single" collapsible className="w-full max-w-2xl mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <div className="group relative block h-full w-full p-1">
                <div className="relative z-20 h-full rounded-lg bg-muted px-5 py-2">
                  <AccordionTrigger className="font-semibold hover:no-underline text-left w-full [&[data-state=open]>svg]:rotate-180">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {item.answer}
                  </AccordionContent>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
