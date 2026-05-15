"use client";

import { FinancialRatios } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface RatioGridProps {
  ratios: FinancialRatios;
  benchmarks?: {
    roe: number;
    roa: number;
    netProfitMargin: number;
    currentRatio: number;
    debtToEquity: number;
  };
}

function RatioCard({
  label,
  value,
  benchmark,
  format = "number",
  higherIsBetter = true,
}: {
  label: string;
  value: number;
  benchmark?: number;
  format?: "number" | "percent" | "ratio";
  higherIsBetter?: boolean;
}) {
  const formattedValue =
    format === "percent"
      ? `${value.toFixed(1)}%`
      : format === "ratio"
      ? `${value.toFixed(2)}x`
      : value.toFixed(2);

  let comparisonIcon = null;
  let comparisonColor = "text-muted-foreground";
  if (benchmark !== undefined) {
    const diff = value - benchmark;
    const pctDiff = ((diff / benchmark) * 100).toFixed(1);
    if (Math.abs(diff) < 0.1) {
      comparisonIcon = <Minus className="h-3 w-3" />;
      comparisonColor = "text-muted-foreground";
    } else if ((diff > 0 && higherIsBetter) || (diff < 0 && !higherIsBetter)) {
      comparisonIcon = <TrendingUp className="h-3 w-3" />;
      comparisonColor = "text-emerald-600";
    } else {
      comparisonIcon = <TrendingDown className="h-3 w-3" />;
      comparisonColor = "text-red-600";
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold mt-0.5">{formattedValue}</p>
        {benchmark !== undefined && (
          <p className="text-[10px] text-muted-foreground mt-0.5">
            vs benchmark: {format === "percent" ? `${benchmark.toFixed(1)}%` : format === "ratio" ? `${benchmark.toFixed(2)}x` : benchmark.toFixed(2)}
          </p>
        )}
      </div>
      {comparisonIcon && (
        <div className={`flex items-center gap-1 ${comparisonColor}`}>
          {comparisonIcon}
        </div>
      )}
    </div>
  );
}

export function RatioGrid({ ratios, benchmarks }: RatioGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Liquidity Ratios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RatioCard
              label="Current Ratio"
              value={ratios.liquidity.currentRatio}
              benchmark={benchmarks?.currentRatio}
              format="ratio"
              higherIsBetter={true}
            />
            <RatioCard
              label="Quick Ratio"
              value={ratios.liquidity.quickRatio}
              format="ratio"
              higherIsBetter={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Solvency Ratios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RatioCard
              label="Debt-to-Equity"
              value={ratios.solvency.debtToEquity}
              benchmark={benchmarks?.debtToEquity}
              format="ratio"
              higherIsBetter={false}
            />
            <RatioCard
              label="Debt-to-Assets"
              value={ratios.solvency.debtToAssets}
              format="ratio"
              higherIsBetter={false}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Profitability Ratios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RatioCard
              label="ROE"
              value={ratios.profitability.roe}
              benchmark={benchmarks?.roe}
              format="percent"
              higherIsBetter={true}
            />
            <RatioCard
              label="ROA"
              value={ratios.profitability.roa}
              benchmark={benchmarks?.roa}
              format="percent"
              higherIsBetter={true}
            />
            <RatioCard
              label="Net Profit Margin"
              value={ratios.profitability.netProfitMargin}
              benchmark={benchmarks?.netProfitMargin}
              format="percent"
              higherIsBetter={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Activity Ratios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RatioCard
              label="Asset Turnover"
              value={ratios.activity.tato}
              format="number"
              higherIsBetter={true}
            />
            <RatioCard
              label="Receivable Turnover"
              value={ratios.activity.receivableTurnover}
              format="number"
              higherIsBetter={true}
            />
            <div className="p-3 rounded-lg border bg-card">
              <p className="text-xs text-muted-foreground">Collection Period</p>
              <p className="text-lg font-semibold mt-0.5">
                {Math.round(365 / ratios.activity.receivableTurnover)} days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}