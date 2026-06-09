import { useMemo, useCallback } from "react";
import type {
  BillingCycle,
  CalculatedOverages,
  PricingInputs,
  TierId,
} from "../types/pricing.types";
import {
  calculateOverages,
  determineRecommendedTier,
  getDiscountFactor,
} from "../services/pricing.service";

interface UsePricingEngineResult {
  overages: CalculatedOverages;
  recommendedTierId: TierId;
  discountFactor: number;
  setLiveMinutes: (v: number) => void;
  setDocumentCount: (v: number) => void;
  setTargetLanguages: (v: number) => void;
  setRequiresHumanInTheLoop: (v: boolean) => void;
  setBillingCycle: (v: BillingCycle) => void;
  loadScenario: (scenario: Partial<PricingInputs>) => void;
}

export function usePricingEngine(
  inputs: PricingInputs,
  setInputs: React.Dispatch<React.SetStateAction<PricingInputs>>,
): UsePricingEngineResult {
  const overages = useMemo(() => calculateOverages(inputs), [inputs]);

  const recommendedTierId = useMemo(
    () =>
      determineRecommendedTier({
        liveMinutes: inputs.liveMinutes,
        documentCount: inputs.documentCount,
        targetLanguages: inputs.targetLanguages,
        requiresHumanInTheLoop: inputs.requiresHumanInTheLoop,
      }),
    [
      inputs.liveMinutes,
      inputs.documentCount,
      inputs.targetLanguages,
      inputs.requiresHumanInTheLoop,
    ],
  );

  const discountFactor = useMemo(
    () => getDiscountFactor(inputs.billingCycle),
    [inputs.billingCycle],
  );

  const setLiveMinutes = useCallback(
    (v: number) => setInputs((s) => ({ ...s, liveMinutes: v })),
    [setInputs],
  );
  const setDocumentCount = useCallback(
    (v: number) => setInputs((s) => ({ ...s, documentCount: v })),
    [setInputs],
  );
  const setTargetLanguages = useCallback(
    (v: number) => setInputs((s) => ({ ...s, targetLanguages: v })),
    [setInputs],
  );
  const setRequiresHumanInTheLoop = useCallback(
    (v: boolean) => setInputs((s) => ({ ...s, requiresHumanInTheLoop: v })),
    [setInputs],
  );
  const setBillingCycle = useCallback(
    (v: BillingCycle) => setInputs((s) => ({ ...s, billingCycle: v })),
    [setInputs],
  );
  const loadScenario = useCallback(
    (scenario: Partial<PricingInputs>) => setInputs((s) => ({ ...s, ...scenario })),
    [setInputs],
  );

  return {
    overages,
    recommendedTierId,
    discountFactor,
    setLiveMinutes,
    setDocumentCount,
    setTargetLanguages,
    setRequiresHumanInTheLoop,
    setBillingCycle,
    loadScenario,
  };
}
