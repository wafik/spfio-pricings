import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Check, X, Info, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber } from "@/shared/utils/formatters";
import { OverageBreakdown } from "./OverageBreakdown";
import type { PricingTier, TierCalculation } from "../types/pricing.types";

interface PricingCardProps {
  tier: PricingTier;
  calculation: TierCalculation;
  discountFactor: number;
  isRecommended: boolean;
  onSelect: () => void;
}

export function PricingCard({
  tier,
  calculation,
  discountFactor,
  isRecommended,
  onSelect,
}: PricingCardProps) {
  const { isExceeded, overageMinutes, overageCost, totalMonthlyCost } = calculation;
  const discountedBase = tier.baseMonthlyPrice * discountFactor;
  const isAnnualDiscounted = discountFactor < 1;

  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-200",
        isRecommended && "scale-[1.02] sm:scale-[1.03] border-2 border-emerald-500 shadow-lg z-10",
        isExceeded && "opacity-50 grayscale pointer-events-none",
        !isRecommended &&
          !isExceeded &&
          "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
      )}
    >
      {/* Badges */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <Badge
            variant="success"
            className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold shadow-sm whitespace-nowrap"
          >
            <Crown className="w-3 h-3" />
            BEST MATCH
          </Badge>
        </div>
      )}
      {tier.isPopular && !isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <Badge
            variant="accent"
            className="px-3 py-1 text-[10px] font-bold shadow-sm whitespace-nowrap"
          >
            MOST POPULAR
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pt-7 pb-0 px-5">
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] tracking-tight">
          {tier.name}
        </h3>
        <p className="text-xs text-text-muted mt-1.5 leading-relaxed min-h-[2.25rem]">
          {tier.tagline}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-5 pt-4 pb-0">
        {/* Price */}
        <div className="text-center mb-5">
          {isExceeded ? (
            <div className="py-2">
              <p className="text-base font-semibold text-red-500">Plan Limits Exceeded</p>
              <p className="text-xs text-text-muted mt-1">
                {formatNumber(tier.limits.liveMinutesIncluded)} min capacity
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-baseline justify-center gap-1">
                {isAnnualDiscounted && tier.baseMonthlyPrice > 0 && (
                  <span className="text-sm text-text-muted line-through">
                    {formatCurrency(tier.baseMonthlyPrice)}
                  </span>
                )}
                <span className="text-[2rem] sm:text-[2.25rem] font-bold text-text tabular-nums leading-none">
                  {formatCurrency(discountedBase)}
                </span>
                <span className="text-sm text-text-muted font-medium">/mo</span>
              </div>
              <OverageBreakdown
                overageMinutes={overageMinutes}
                overageCost={overageCost}
                overageRate={tier.overageRatePerMinute}
              />
              {overageMinutes > 0 && (
                <p className="text-sm font-semibold text-text mt-2 tabular-nums">
                  Total: {formatCurrency(totalMonthlyCost)}/mo
                </p>
              )}
            </>
          )}
        </div>

        {/* Capacity summary */}
        <div className="space-y-0 mb-4 bg-gray-50 rounded-lg divide-y divide-border/50">
          {[
            { label: "Live Minutes", value: formatNumber(tier.limits.liveMinutesIncluded) },
            { label: "Languages", value: String(tier.limits.maxLanguages) },
            {
              label: "Docs / month",
              value:
                tier.limits.maxDocsPerMonth === 9999
                  ? "Unlimited"
                  : formatNumber(tier.limits.maxDocsPerMonth),
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-3 py-2 text-xs">
              <span className="text-text-muted">{row.label}</span>
              <span className="font-semibold text-text tabular-nums">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-4 flex-1">
          {tier.includedFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {!tier.limits.hasHumanOverrideCanvas && (
            <li className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
              <X className="w-3.5 h-3.5 text-gray-300 mt-0.5 shrink-0" />
              <span>Human-in-the-Loop Override</span>
            </li>
          )}
        </ul>

        {/* Support */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted cursor-help mb-1">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tier.supportTier.split("(")[0].trim()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[240px]">
            <p>{tier.supportTier}</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>

      <CardFooter className="px-5 pt-3 pb-5">
        <Button
          variant="primary"
          className="w-full rounded-full text-sm"
          size="lg"
          disabled={isExceeded}
          onClick={onSelect}
        >
          {isExceeded
            ? "Plan Limits Exceeded"
            : tier.id === "enterprise"
              ? "Contact Sales"
              : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
}
