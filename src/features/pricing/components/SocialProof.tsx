import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";

const LOGOS = [
  {
    src: "https://www.spf.io/wp-content/uploads/2025/01/Smartsheet-bg-logo.png",
    alt: "Smartsheet",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/Pacific-Presbytery-logo-bg.png",
    alt: "Pacific Presbytery",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2022/01/Christianity-Today-logo-bg.png",
    alt: "Christianity Today",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2022/01/Netherlands-National-Football-Team-bg-logo-1.png",
    alt: "Netherlands National Football Team",
  },
  { src: "https://www.spf.io/wp-content/uploads/2024/07/Databricks-logo.png", alt: "Databricks" },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/07/Westminister-Chapel-logo.png",
    alt: "Westminister Chapel",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/Upskill-Universe-bg-logo.png",
    alt: "Upskill Universe",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/FAC-calgary-logo-bg.png",
    alt: "FAC Calgary",
  },
  { src: "https://www.spf.io/wp-content/uploads/2024/09/TPN-bg-logo.png", alt: "TPN" },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/10/Presbytery-of-San-Deiego-bg-logo.png",
    alt: "Presbytery of San Diego",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/10/International-enneagram-association-bg-logo.png",
    alt: "International Enneagram Association",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/North-Central-California-Presbytery-logo-bg.png",
    alt: "North Central California Presbytery",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/One-Voice-Fellowship-logo-bg.png",
    alt: "One Voice Fellowship",
  },
  { src: "https://www.spf.io/wp-content/uploads/2024/09/Subti-bg-logo.png", alt: "Sub-Ti" },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/Overlake-Park-logo-bg.png",
    alt: "Overlake Park Presbyterian Church",
  },
  { src: "https://www.spf.io/wp-content/uploads/2024/09/Union-logo-bg.png", alt: "Union" },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/10/Theology-of-Work-logo-bg.png",
    alt: "Theology of Work",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/09/Taichung-International-Fellowship-logo-bg.png",
    alt: "Taichung International Fellowship",
  },
  {
    src: "https://www.spf.io/wp-content/uploads/2024/10/Sunstar-Global-bg-logo.png",
    alt: "Sunstar Global",
  },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/Accenture-logo-bg.png", alt: "Accenture" },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/CES-bg-logo.png", alt: "CES" },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/Delta-logo-bg.png", alt: "Delta Airlines" },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/Panasonic-logo-bg.png", alt: "Panasonic" },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/Volvo-logo-bg.png", alt: "Volvo" },
  { src: "https://www.spf.io/wp-content/uploads/2025/01/X-corp.-bg-logo.png", alt: "X Corp" },
];

const TESTIMONIALS = [
  {
    quote:
      "I can't think of a better partner than spf.io for a global event requiring caption and translation in multiple languages at the right cost.",
    author: "Vikas Pota",
    role: "Founder and CEO of T4 Education",
  },
  {
    quote:
      "The translation results are very helpful for translators, so they don't need to translate from scratch.",
    author: "Maria Fennita",
    role: "Editorial Director at Christianity Today Indonesia",
  },
];

export function SocialProof() {
  return (
    <div className="space-y-14 sm:space-y-16">
      {/* Logo Carousel */}
      <div className="text-center space-y-6 sm:space-y-8">
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">
          Trusted by industry leaders worldwide
        </p>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling track */}
          <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
            {/* First set */}
            {LOGOS.map((logo, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center justify-center px-4 sm:px-6 shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-8 sm:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {LOGOS.map((logo, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center justify-center px-4 sm:px-6 shrink-0"
                aria-hidden="true"
              >
                <img
                  src={logo.src}
                  alt=""
                  loading="lazy"
                  className="h-8 sm:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 max-w-[800px] mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} className="border-border/50 shadow-sm">
            <CardContent className="pt-7 pb-5 px-5 sm:px-7">
              <Quote className="w-7 h-7 text-primary/15 mb-3" />
              <blockquote className="text-sm sm:text-[15px] text-text leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text leading-tight">{t.author}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 max-w-md mx-auto">
        <h3 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-[family-name:var(--font-heading)] tracking-tight">
          Ready to get started?
        </h3>
        <p className="text-text-muted text-sm sm:text-[15px] leading-relaxed">
          Join hundreds of organizations using Spf.io for multilingual accessibility.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
          <Button
            variant="primary"
            size="lg"
            className="rounded-full w-full sm:w-auto text-sm"
            asChild
          >
            <a href="https://www.spf.io/request-a-quote/">
              Request a Quote <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-full sm:w-auto text-sm"
            asChild
          >
            <a href="https://www.spf.io/demo/">Get a Demo</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
