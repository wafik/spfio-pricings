import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { BillingCycle } from "../types/pricing.types";

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

export function BillingCycleToggle({ value, onChange }: BillingCycleToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full text-xs h-7 px-3 transition-all",
          value === "monthly"
            ? "bg-white shadow-sm text-text font-semibold"
            : "text-text-muted font-medium",
        )}
        onClick={() => onChange("monthly")}
      >
        Monthly
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full text-xs h-7 px-3 transition-all gap-1",
          value === "annual"
            ? "bg-white shadow-sm text-text font-semibold"
            : "text-text-muted font-medium",
        )}
        onClick={() => onChange("annual")}
      >
        Annual
        <Badge variant="success" className="text-[9px] px-1.5 py-0 leading-tight">
          -20%
        </Badge>
      </Button>
    </div>
  );
}
