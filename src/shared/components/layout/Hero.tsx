import { Container } from "./Container";
import { Section } from "./Section";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <Section size="lg" className="bg-white text-center">
      <Container size="narrow">
        <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold font-[family-name:var(--font-heading)] leading-[1.15] tracking-[-0.02em] text-text">
          {title}
        </h1>
        <p className="mt-4 sm:mt-5 text-base sm:text-[1.125rem] text-text-muted max-w-[640px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      </Container>
    </Section>
  );
}
