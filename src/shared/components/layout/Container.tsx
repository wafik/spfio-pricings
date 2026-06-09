import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide";
}

const sizeMap = {
  narrow: "max-w-[960px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
};

export function Container({
  as: Comp = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
