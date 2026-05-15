"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePipelineSnapshot } from "../hooks/useDashboardData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function PipelineSnapshot() {
  const { data: pipelineRes, isLoading } = usePipelineSnapshot();
  const data = pipelineRes?.data || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short"
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 border rounded-md shadow-sm">
          <p className="text-sm font-semibold mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">
            Deals: <span className="font-medium text-slate-900 dark:text-white">{payload[0].payload.count}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Value: <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Assign colors based on stage
  const getColor = (stage: string) => {
    switch (stage) {
      case "Lead": return "#94a3b8"; // slate-400
      case "In Progress": return "#3b82f6"; // blue-500
      case "Committee": return "#eab308"; // yellow-500
      case "Won": return "#10b981"; // emerald-500
      default: return "#64748b";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base font-semibold">Pipeline Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        {isLoading ? (
          <div className="h-[200px] flex items-end justify-between gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className={`w-full ${i % 2 === 0 ? 'h-32' : 'h-48'}`} />
            ))}
          </div>
        ) : (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="stage" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.stage)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {!isLoading && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {data.map((item) => (
              <div key={item.stage} className="text-center">
                <div className="text-lg font-bold">{item.count}</div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider line-clamp-1">{item.stage}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
