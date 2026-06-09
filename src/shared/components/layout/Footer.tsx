import { Container } from "./Container";
import { Separator } from "@/shared/components/ui/separator";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "What is spf.io?", href: "https://www.spf.io/products/" },
      { label: "Demo", href: "https://www.spf.io/demo/" },
      {
        label: "Integrations",
        href: "https://www.spf.io/products/captioning-translation-integrations/",
      },
      { label: "Request a Quote", href: "https://www.spf.io/request-a-quote/" },
      { label: "Blog", href: "https://www.spf.io/resources/articles/" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Case Studies", href: "https://www.spf.io/spfio-case-studies/" },
      { label: "Church Translation", href: "https://www.spf.io/solutions/religious/" },
      { label: "Classroom Translation", href: "https://www.spf.io/solutions/education/" },
      { label: "Conference Translation", href: "https://www.spf.io/solutions/conferences/" },
      { label: "Government Translation", href: "https://www.spf.io/solutions/government/" },
      {
        label: "Theater Accessibility",
        href: "https://www.spf.io/solutions/online-zoom-theater-performance/",
      },
      { label: "Corporate Events", href: "https://www.spf.io/solutions/corporate-events/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://www.spf.io/about/" },
      {
        label: "Remote Gigs",
        href: "https://www.spf.io/sign-up-to-get-captioning-and-translation-gigs/",
      },
      { label: "Vision", href: "https://www.spf.io/category/vision/" },
      { label: "Press", href: "https://www.spf.io/press/" },
      { label: "Terms of Service", href: "https://www.spf.io/terms-of-service/" },
      { label: "Privacy Policy", href: "https://www.spf.io/privacy-policy/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "https://www.spf.io/resources/frequently-asked-questions/" },
      { label: "Help", href: "https://www.spf.io/resources/documentation/" },
      { label: "Contact Us", href: "https://www.spf.io/contact-us/" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/spfiotranslate" },
  { label: "X", icon: XIcon, href: "https://www.twitter.com/spfiotranslate" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/spfiotranslate/" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-gray-300 mt-auto">
      {/* Main footer content */}
      <Container>
        <div className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <a href="https://www.spf.io" className="inline-flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xs leading-none">S</span>
                </div>
                <span className="text-base font-bold text-white font-[family-name:var(--font-heading)] tracking-tight">
                  spf.io
                </span>
              </a>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
                AI-powered translation and accessibility platform for multilingual events, content,
                and conversations.
              </p>
            </div>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-3 sm:mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] sm:text-sm text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Separator className="bg-white/10" />

      {/* Bottom bar */}
      <Container>
        <div className="py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
                aria-label={s.label}
              >
                <s.icon className="w-3.5 h-3.5 text-gray-300" />
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            &copy; {new Date().getFullYear()} TheoTech LLC. All rights reserved.{" "}
            <a
              href="/acknowledgements"
              className="hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              Credits
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
