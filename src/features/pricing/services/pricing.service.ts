import { SPF_TIER_REGISTRY } from "../constants/tier-registry";
import type {
  BillingCycle,
  CalculatedOverages,
  PricingInputs,
  TierId,
} from "../types/pricing.types";

const ANNUAL_DISCOUNT = 0.8;

export function getDiscountFactor(billingCycle: BillingCycle): number {
  return billingCycle === "annual" ? ANNUAL_DISCOUNT : 1;
}

export function calculateOverages(inputs: PricingInputs): CalculatedOverages {
  const discount = getDiscountFactor(inputs.billingCycle);
  const result = {} as CalculatedOverages;

  for (const tier of SPF_TIER_REGISTRY) {
    const overageMinutes = Math.max(0, inputs.liveMinutes - tier.limits.liveMinutesIncluded);
    const canOverage = tier.overageRatePerMinute > 0;
    const isExceeded = inputs.liveMinutes > tier.limits.liveMinutesIncluded && !canOverage;

    const overageCost = canOverage ? overageMinutes * tier.overageRatePerMinute : 0;
    const totalMonthlyCost = tier.baseMonthlyPrice * discount + overageCost;

    result[tier.id] = {
      overageMinutes,
      overageCost,
      totalMonthlyCost,
      isExceeded,
    };
  }

  return result;
}

export function determineRecommendedTier(inputs: {
  liveMinutes: number;
  documentCount: number;
  targetLanguages: number;
  requiresHumanInTheLoop: boolean;
}): TierId {
  if (inputs.liveMinutes > 500 || inputs.documentCount > 500 || inputs.targetLanguages > 25) {
    return "enterprise";
  }

  if (inputs.requiresHumanInTheLoop || inputs.targetLanguages > 5 || inputs.documentCount > 50) {
    return "scale";
  }

  return "growth";
}

export function getTierById(tierId: TierId) {
  return SPF_TIER_REGISTRY.find((t) => t.id === tierId)!;
}
