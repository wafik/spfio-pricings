export interface TierLimits {
  liveMinutesIncluded: number;
  maxLanguages: number;
  maxFileSizeMb: number;
  maxDocsPerMonth: number;
  hasHumanOverrideCanvas: boolean;
  dedicatedHardwareAvailable: boolean;
}

export interface PricingTier {
  id: "growth" | "scale" | "enterprise";
  name: string;
  tagline: string;
  baseMonthlyPrice: number;
  overageRatePerMinute: number;
  isPopular: boolean;
  limits: TierLimits;
  includedFeatures: string[];
  supportTier: string;
}

export type BillingCycle = "monthly" | "annual";

export interface PricingInputs {
  liveMinutes: number;
  documentCount: number;
  targetLanguages: number;
  requiresHumanInTheLoop: boolean;
  billingCycle: BillingCycle;
}

export interface TierCalculation {
  overageMinutes: number;
  overageCost: number;
  totalMonthlyCost: number;
  isExceeded: boolean;
}

export type TierId = PricingTier["id"];

export type CalculatedOverages = Record<TierId, TierCalculation>;
