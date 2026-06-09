import { useState } from "react";
import { Container } from "./Container";
import { Button } from "@/shared/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "https://www.spf.io/products/" },
  { label: "Solutions", href: "https://www.spf.io/spfio-case-studies/" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "https://www.spf.io/resources/articles/" },
  { label: "Contact", href: "https://www.spf.io/contact-us/" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <a href="https://www.spf.io" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm leading-none">S</span>
            </div>
            <span className="text-base sm:text-lg font-bold font-[family-name:var(--font-heading)] tracking-tight text-text">
              spf.io
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150",
                  link.href === "#"
                    ? "text-primary bg-primary/5"
                    : "text-text-muted hover:text-text hover:bg-gray-100/70",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full hidden sm:inline-flex text-xs text-white"
              asChild
            >
              <a href="https://www.spf.io/request-a-quote/" className="text-white">Request a Quote</a>
            </Button>

            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-3 space-y-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium rounded-lg text-text-muted hover:text-text hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
