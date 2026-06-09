import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Slider } from "@/shared/components/ui/slider";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { formatNumber } from "@/shared/utils/formatters";
import type { PricingInputs } from "../types/pricing.types";

interface WorkloadSlidersProps {
  inputs: PricingInputs;
  setLiveMinutes: (v: number) => void;
  setDocumentCount: (v: number) => void;
  setTargetLanguages: (v: number) => void;
  setRequiresHumanInTheLoop: (v: boolean) => void;
}

const LIVE_MINUTE_PRESETS = [
  { label: "Single Event (4h)", value: 240 },
  { label: "Weekly Broadcaster (20h)", value: 1200 },
];

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  ariaLabel,
  presets,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  ariaLabel: string;
  presets?: { label: string; value: number }[];
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-sm font-medium text-text leading-none">{label}</Label>
        <span className="text-sm font-bold text-primary tabular-nums bg-primary/5 px-2 py-0.5 rounded-md leading-none">
          {formatNumber(value)}
          {unit && <span className="font-normal text-primary/70 ml-0.5">{unit}</span>}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
      />
      {presets && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {presets.map((p) => (
            <Button
              key={p.value}
              variant="ghost"
              size="sm"
              className="text-[11px] text-text-muted h-6 px-2 rounded-md"
              onClick={() => onChange(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export function WorkloadSliders({
  inputs,
  setLiveMinutes,
  setDocumentCount,
  setTargetLanguages,
  setRequiresHumanInTheLoop,
}: WorkloadSlidersProps) {
  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-[11px] font-bold text-text-muted uppercase tracking-[0.15em]">
          Workload Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-6">
        <SliderField
          label="Live Stream Volume"
          value={inputs.liveMinutes}
          min={0}
          max={12000}
          step={10}
          unit="min"
          onChange={setLiveMinutes}
          ariaLabel={`Live stream volume: ${inputs.liveMinutes} minutes`}
          presets={LIVE_MINUTE_PRESETS}
        />

        <SliderField
          label="Documents per Month"
          value={inputs.documentCount}
          min={0}
          max={1500}
          step={1}
          onChange={setDocumentCount}
          ariaLabel={`Documents per month: ${inputs.documentCount}`}
        />

        <SliderField
          label="Concurrent Languages"
          value={inputs.targetLanguages}
          min={1}
          max={50}
          step={1}
          onChange={setTargetLanguages}
          ariaLabel={`Concurrent languages: ${inputs.targetLanguages}`}
        />

        <button
          type="button"
          className={`flex items-start gap-3 w-full rounded-xl border p-4 text-left transition-all duration-200 ${
            inputs.requiresHumanInTheLoop
              ? "border-primary bg-primary/5"
              : "border-border hover:border-gray-300 hover:bg-gray-50/50"
          }`}
          onClick={() => setRequiresHumanInTheLoop(!inputs.requiresHumanInTheLoop)}
        >
          <Checkbox
            checked={inputs.requiresHumanInTheLoop}
            onCheckedChange={(checked) => setRequiresHumanInTheLoop(checked === true)}
            className="mt-0.5 shrink-0"
          />
          <div className="min-w-0">
            <Label className="text-sm font-medium text-text cursor-pointer leading-none">
              Enable Human Translation Override
            </Label>
            <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
              Access the manual correction canvas for AI-assisted translations
            </p>
          </div>
        </button>
      </CardContent>
    </Card>
  );
}
