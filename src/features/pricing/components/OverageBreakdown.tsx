import { formatCurrency, formatNumber } from "@/shared/utils/formatters";

interface OverageBreakdownProps {
  overageMinutes: number;
  overageCost: number;
  overageRate: number;
}

export function OverageBreakdown({
  overageMinutes,
  overageCost,
  overageRate,
}: OverageBreakdownProps) {
  if (overageMinutes <= 0) return null;

  return (
    <div className="text-xs text-text-muted mt-2 space-y-0.5 text-center">
      <p>
        Includes {formatCurrency(overageCost)} from {formatNumber(overageMinutes)} overage min
      </p>
      <p className="text-[11px] opacity-60">@ {formatCurrency(overageRate)}/min</p>
    </div>
  );
}
