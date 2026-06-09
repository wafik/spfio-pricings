import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Info } from "lucide-react";
import { formatNumber } from "@/shared/utils/formatters";
import { cn } from "@/lib/utils";
import { SPF_TIER_REGISTRY } from "../constants/tier-registry";
import type { TierId, PricingInputs } from "../types/pricing.types";

interface UsageGaugePanelProps {
  inputs: PricingInputs;
  recommendedTierId: TierId;
}

function CapacityBar({
  label,
  value,
  max,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const isOver = value > max;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-muted font-medium">{label}</span>
        <span className="font-semibold tabular-nums text-text text-[13px]">
          {formatNumber(value)}
          <span className="text-text-muted font-normal"> / {formatNumber(max)}</span>{" "}
          <span className="text-text-muted font-normal">{unit}</span>
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out",
            isOver ? "bg-red-400" : pct > 80 ? "bg-amber-400" : "bg-primary",
          )}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
        {isOver && (
          <div className="absolute inset-y-0 right-0 w-1.5 bg-red-500 animate-pulse rounded-r-full" />
        )}
      </div>
      <p className="text-[11px] text-text-muted text-right tabular-nums">{pct}%</p>
    </div>
  );
}

export function UsageGaugePanel({ inputs, recommendedTierId }: UsageGaugePanelProps) {
  const tier = SPF_TIER_REGISTRY.find((t) => t.id === recommendedTierId)!;
  const upgradeReason = getUpgradeReason(inputs, recommendedTierId);

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-1.5">
          Capacity Status
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3.5 h-3.5 text-text-muted/60 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Shows your usage against the recommended tier limits</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        <CapacityBar
          label="Live Minutes"
          value={inputs.liveMinutes}
          max={tier.limits.liveMinutesIncluded}
          unit="min"
        />
        <CapacityBar
          label="Documents"
          value={inputs.documentCount}
          max={tier.limits.maxDocsPerMonth}
          unit="docs"
        />
        <CapacityBar
          label="Languages"
          value={inputs.targetLanguages}
          max={tier.limits.maxLanguages}
          unit="langs"
        />

        {upgradeReason && (
          <div className="rounded-lg bg-amber-50 border border-amber-200/60 px-3.5 py-3 text-xs">
            <p className="font-semibold text-amber-900">Upgraded to {tier.name}</p>
            <p className="mt-1 text-amber-700 leading-relaxed">{upgradeReason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getUpgradeReason(inputs: PricingInputs, recommended: TierId): string | null {
  const growth = SPF_TIER_REGISTRY[0];

  if (recommended === "enterprise") {
    if (inputs.liveMinutes > 500)
      return `Live minutes (${formatNumber(inputs.liveMinutes)}) exceed Scale Enterprise capacity of 2,500.`;
    if (inputs.documentCount > 500)
      return `Document count (${inputs.documentCount}) exceeds Scale Enterprise limit of 500.`;
    if (inputs.targetLanguages > 25)
      return `Language count (${inputs.targetLanguages}) exceeds Scale Enterprise limit of 25.`;
  }

  if (recommended === "scale") {
    if (inputs.requiresHumanInTheLoop)
      return "Human-in-the-Loop toggle requires Scale Enterprise or higher.";
    if (inputs.targetLanguages > growth.limits.maxLanguages)
      return `Language count (${inputs.targetLanguages}) exceeds Growth Pack limit of ${growth.limits.maxLanguages}.`;
    if (inputs.documentCount > growth.limits.maxDocsPerMonth)
      return `Document count (${inputs.documentCount}) exceeds Growth Pack limit of ${growth.limits.maxDocsPerMonth}.`;
  }

  return null;
}
