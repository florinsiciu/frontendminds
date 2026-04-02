"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { logoText, navItems, navCta, mobileMenuItems } from "@/lib/content/navigation";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-aware backdrop blur
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled || mobileOpen
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-heading text-[1.2rem] font-bold tracking-tight text-foreground">
          Frontend<span className="text-indigo-400">Minds</span>
        </Link>

        {/* Desktop: nav links + CTA grouped on the right */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navCta.href}
            className={cn(
              buttonVariants({ shape: "pill" }),
              "px-6 py-2.5 text-[0.8rem]"
            )}
          >
            {navCta.text}
          </Link>
        </div>

        {/* Mobile: hamburger only (CTA is in the mobile menu panel) */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center w-12 h-12 -mr-2 text-foreground"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-background border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {mobileMenuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center min-h-12 py-3 text-base border-b border-border/50 last:border-b-0 transition-colors",
                  pathname === item.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </header>
  );
}
