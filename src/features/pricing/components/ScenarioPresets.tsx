import { Button } from "@/shared/components/ui/button";
import { MOCK_USER_SCENARIOS } from "../constants/mock-scenarios";
import type { PricingInputs } from "../types/pricing.types";

interface ScenarioPresetsProps {
  onLoadScenario: (scenario: Partial<PricingInputs>) => void;
}

const SCENARIO_ICONS: Record<string, string> = {
  smallChurch: "⛪",
  globalConference: "🎤",
  continuousSaaS: "💻",
  corporateTownHall: "🏢",
  universityLectures: "🎓",
  governmentHearing: "🏛️",
};

export function ScenarioPresets({ onLoadScenario }: ScenarioPresetsProps) {
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.15em]">
        Quick Scenarios
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(MOCK_USER_SCENARIOS).map(([key, scenario]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            className="rounded-full text-xs h-7 sm:h-8 gap-1.5 border-border/70 hover:border-primary/30 hover:bg-primary/5 px-3"
            onClick={() =>
              onLoadScenario({
                liveMinutes: scenario.liveMinutes,
                documentCount: scenario.documentCount,
                targetLanguages: scenario.targetLanguages,
                requiresHumanInTheLoop: scenario.requiresHumanInTheLoop,
              })
            }
            title={scenario.description}
          >
            <span className="text-sm leading-none">{SCENARIO_ICONS[key] ?? "📋"}</span>
            <span>{scenario.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
