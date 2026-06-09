import { useState } from "react";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { Container, Section, Navbar, Hero, Footer } from "@/shared/components/layout";
import { BillingCycleToggle } from "./BillingCycleToggle";
import { WorkloadSliders } from "./WorkloadSliders";
import { PricingCardGrid } from "./PricingCardGrid";
import { UsageGaugePanel } from "./UsageGaugePanel";
import { ScenarioPresets } from "./ScenarioPresets";
import { CheckoutDialog } from "./CheckoutDialog";
import { SocialProof } from "./SocialProof";
import { usePricingEngine } from "../hooks/usePricingEngine";
import { getTierById } from "../services/pricing.service";
import type { PricingInputs, TierId } from "../types/pricing.types";

const DEFAULT_INPUTS: PricingInputs = {
  liveMinutes: 300,
  documentCount: 10,
  targetLanguages: 2,
  requiresHumanInTheLoop: false,
  billingCycle: "monthly",
};

export function PricingWorkspace() {
  const [inputs, setInputs] = useState<PricingInputs>(DEFAULT_INPUTS);
  const [checkoutTierId, setCheckoutTierId] = useState<TierId | null>(null);

  const {
    overages,
    recommendedTierId,
    discountFactor,
    setLiveMinutes,
    setDocumentCount,
    setTargetLanguages,
    setRequiresHumanInTheLoop,
    setBillingCycle,
    loadScenario,
  } = usePricingEngine(inputs, setInputs);

  const checkoutTier = checkoutTierId ? getTierById(checkoutTierId) : null;
  const checkoutCalc = checkoutTierId ? overages[checkoutTierId] : null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          <Hero
            title="Find the right plan for your team"
            subtitle="Configure your workload below. Our engine instantly recommends the best tier and shows real-time cost estimates."
          />

          {/* Scenario Presets */}
          <Section size="sm" className="pt-0 pb-6 sm:pb-8">
            <Container>
              <ScenarioPresets onLoadScenario={loadScenario} />
            </Container>
          </Section>

          {/* Main Workspace */}
          <Section size="md" className="pt-0">
            <Container>
              {/* Billing Cycle Toggle */}
              <div className="flex items-center justify-center mb-8">
                <BillingCycleToggle value={inputs.billingCycle} onChange={setBillingCycle} />
              </div>

              <div className="grid gap-6 lg:gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr] items-start">
                {/* Panel A: Controls */}
                <div className="space-y-5 lg:sticky lg:top-20">
                  <WorkloadSliders
                    inputs={inputs}
                    setLiveMinutes={setLiveMinutes}
                    setDocumentCount={setDocumentCount}
                    setTargetLanguages={setTargetLanguages}
                    setRequiresHumanInTheLoop={setRequiresHumanInTheLoop}
                  />
                  <UsageGaugePanel inputs={inputs} recommendedTierId={recommendedTierId} />
                </div>

                {/* Panel B: Pricing Cards */}
                <PricingCardGrid
                  overages={overages}
                  recommendedTierId={recommendedTierId}
                  discountFactor={discountFactor}
                  onSelectTier={(id) => setCheckoutTierId(id)}
                />
              </div>
            </Container>
          </Section>

          {/* Social Proof */}
          <Section size="lg" className="bg-white border-t border-border">
            <Container>
              <SocialProof />
            </Container>
          </Section>
        </main>

        <Footer />

        <CheckoutDialog
          open={checkoutTierId !== null}
          onOpenChange={(open) => {
            if (!open) setCheckoutTierId(null);
          }}
          tier={checkoutTier}
          calculation={checkoutCalc}
          discountFactor={discountFactor}
        />
      </div>
    </TooltipProvider>
  );
}
