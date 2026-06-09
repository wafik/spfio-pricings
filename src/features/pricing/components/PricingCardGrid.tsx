import { SPF_TIER_REGISTRY } from "../constants/tier-registry";
import { PricingCard } from "./PricingCard";
import type { CalculatedOverages, TierId } from "../types/pricing.types";

interface PricingCardGridProps {
  overages: CalculatedOverages;
  recommendedTierId: TierId;
  discountFactor: number;
  onSelectTier: (tierId: TierId) => void;
}

export function PricingCardGrid({
  overages,
  recommendedTierId,
  discountFactor,
  onSelectTier,
}: PricingCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-start">
      {SPF_TIER_REGISTRY.map((tier) => (
        <PricingCard
          key={tier.id}
          tier={tier}
          calculation={overages[tier.id]}
          discountFactor={discountFactor}
          isRecommended={tier.id === recommendedTierId}
          onSelect={() => onSelectTier(tier.id)}
        />
      ))}
    </div>
  );
}
