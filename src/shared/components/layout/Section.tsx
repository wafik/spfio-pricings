import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "py-8 sm:py-10",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-28 lg:py-32",
};

export function Section({
  as: Comp = "section",
  size = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn(sizeMap[size], className)} {...props}>
      {children}
    </Comp>
  );
}
