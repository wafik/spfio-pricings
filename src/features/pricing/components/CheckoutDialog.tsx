import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";
import { formatCurrency } from "@/shared/utils/formatters";
import { ArrowRight } from "lucide-react";
import type { PricingTier, TierCalculation } from "../types/pricing.types";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: PricingTier | null;
  calculation: TierCalculation | null;
  discountFactor: number;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  tier,
  calculation,
  discountFactor,
}: CheckoutDialogProps) {
  if (!tier || !calculation) return null;

  const discountedBase = tier.baseMonthlyPrice * discountFactor;
  const isAnnualDiscounted = discountFactor < 1;
  const annualSavings = tier.baseMonthlyPrice - discountedBase;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-[family-name:var(--font-heading)] tracking-tight">
            Simulated Cart Checkout
          </DialogTitle>
          <DialogDescription className="text-sm">
            Review your configuration before proceeding
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Selected Plan</span>
            <span className="font-semibold text-text">{tier.name}</span>
          </div>

          <Separator />

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Base Monthly Fee</span>
              <span className="tabular-nums font-medium">
                {formatCurrency(tier.baseMonthlyPrice)}/mo
              </span>
            </div>
            {isAnnualDiscounted && tier.baseMonthlyPrice > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted flex items-center gap-1.5">
                  Annual Discount
                  <Badge variant="success" className="text-[10px]">
                    20% off
                  </Badge>
                </span>
                <span className="text-emerald-600 tabular-nums font-medium">
                  -{formatCurrency(annualSavings)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Monthly Overage</span>
              <span className="tabular-nums font-medium">
                {formatCurrency(calculation.overageCost)}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-text">Estimated Due</span>
            <span className="text-xl font-bold text-primary tabular-nums">
              {formatCurrency(calculation.totalMonthlyCost)}
              <span className="text-xs font-normal text-text-muted ml-0.5">/mo</span>
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 px-6 pb-6 pt-2 sm:flex-col">
          <Button variant="primary" className="w-full rounded-full" size="lg">
            Proceed with Selected Setup <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            variant="ghost"
            className="w-full rounded-full text-sm"
            onClick={() => onOpenChange(false)}
          >
            Return to Simulator Workspace
          </Button>
          <p className="text-center text-xs text-text-muted mt-1">
            Need a custom plan?{" "}
            <a
              href="https://www.spf.io/request-a-quote/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Request a Quote
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
