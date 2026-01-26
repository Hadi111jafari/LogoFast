/**
 * @section: Header / Navigation
 * @Purpose: Provide easy access to main sections and actions.
 * @Description: Includes the logo, navigation links, and primary CTA buttons (like "Sign Up" or "Buy Now").
 * Should be sticky or clearly visible. Keep links minimal to reduce distraction.
 */
"use client";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import { Book, Menu, Trees } from "lucide-react";
import { useState } from "react";
import type { HeaderProps, MenuItem } from "@/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonLogin from "@/components/ButtonLogin";
import Link from "next/link";

const DEFAULT_LOGO = {
  url: "/",
  src: config.logoUrl,
  alt: `${config.name} logo`,
  title: config.name,
};

const DEFAULT_MENU: MenuItem[] = [
  {
    title: "Resources",
    url: "/#resources",
    items: [
      {
        title: "terms-of-service",
        description: "Read our terms of service",
        icon: <Book className="size-5 shrink-0" />,
        url: "/tos",
      },
      {
        title: "Privacy Policy",
        description: "Learn about how we handle your data",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/privacy",
      },
    ],
  },
  {
    title: "Pricing",
    url: "/#pricing",
  },
  { title: "Docs", url: "/docs" },
];

const SubMenuLink = ({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate?: () => void;
}) => (
  <Link
    className="flex min-w-80 flex-row gap-4 rounded p-3 leading-none no-underline transition-all duration-150 ease-out outline-none select-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
    href={item.url}
    onClick={onNavigate}
  >
    <div className="text-foreground" aria-hidden="true">
      {item.icon}
    </div>
    <div>
      <div className="text-sm font-semibold text-foreground">{item.title}</div>
      {item.description && (
        <p className="text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);

const DesktopMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent transition-all duration-150 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground motion-reduce:transition-none">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground border border-border">
          {item.items.map((subItem) => (
            <NavigationMenuLink key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-10 items-center justify-center rounded bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-all duration-150 ease-out hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileMenuItem = ({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) => {
  if (item.items) {
    return (
      <AccordionItem value={item.title} className="border-0">
        <AccordionTrigger className="py-2 text-base font-semibold text-foreground hover:text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink
              key={subItem.title}
              item={subItem}
              onNavigate={onNavigate}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      href={item.url}
      onClick={onNavigate}
      className="block py-2 text-base font-semibold text-foreground transition-colors duration-150 ease-out hover:text-accent-foreground motion-reduce:transition-none"
    >
      {item.title}
    </a>
  );
};

const Header = ({
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
  className,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header"
      className={cn(
        "p-4 bg-background border-b border-border max-w-7xl mx-auto",
        className,
      )}
    >
      <div className="container">
        {/* Desktop */}
        <nav
          className="hidden items-center justify-between lg:flex"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-6">
            <Link
              href={logo.url}
              className="flex items-center gap-2 transition-opacity duration-150 ease-out hover:opacity-80 motion-reduce:transition-none"
            >
              <img src={logo.src} className="h-6 dark:invert" alt={logo.alt} />
              <span className="text-lg font-semibold text-foreground">
                {logo.title}
              </span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <DesktopMenuItem key={item.title} item={item} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <ButtonLogin />
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href={logo.url}
              className="flex items-center gap-2 transition-opacity duration-150 ease-out hover:opacity-80 motion-reduce:transition-none"
            >
              <img src={logo.src} className="h-6 dark:invert" alt={logo.alt} />
              <span className="sr-only">{logo.title}</span>
            </Link>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-card text-card-foreground">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-6 p-4"
                  aria-label="Mobile navigation"
                >
                  <Accordion
                    type="single"
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => (
                      <MobileMenuItem
                        key={item.title}
                        item={item}
                        onNavigate={closeMobileMenu}
                      />
                    ))}
                  </Accordion>
                  <ButtonLogin />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
