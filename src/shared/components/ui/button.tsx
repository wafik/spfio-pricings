import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-gray-900 hover:bg-accent/90 active:bg-accent/80 shadow-sm",
        secondary:
          "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/90 shadow-sm",
        outline: "border border-border bg-white hover:bg-gray-50 active:bg-gray-100 text-text",
        ghost: "hover:bg-gray-100 active:bg-gray-200 text-text-muted hover:text-text",
        destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
