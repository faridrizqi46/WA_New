"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface FinancialTabProps { company: CompanyDetail; }

export function FinancialTab({ company }: FinancialTabProps) {
  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);

  const sorted = [...company.financials].sort((a, b) => a.year - b.year);

  const latestYear = sorted[sorted.length - 1];
  const prevYear = sorted[sorted.length - 2];
  const revenueGrowth = prevYear ? ((latestYear.revenue - prevYear.revenue) / prevYear.revenue) * 100 : 0;

  const dscrStatus = latestYear?.dscr < 1.0 ? "CRITICAL" : latestYear?.dscr < 1.2 ? "WARNING" : "HEALTHY";

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Revenue (Latest)", value: fmt(latestYear?.revenue ?? 0), sub: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}% YoY`, positive: revenueGrowth >= 0 },
          { label: "Net Profit", value: fmt(latestYear?.netProfit ?? 0), sub: `${((latestYear?.netProfit / latestYear?.revenue) * 100).toFixed(1)}% margin` },
          { label: "Total Assets", value: fmt(latestYear?.totalAssets ?? 0), sub: "Latest period" },
          { label: "DSCR", value: latestYear?.dscr.toFixed(2), sub: dscrStatus, alert: dscrStatus !== "HEALTHY" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-5">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{kpi.label}</div>
              <div className={`text-2xl font-bold ${kpi.alert ? "text-red-600" : ""}`}>{kpi.value}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${kpi.alert ? "text-red-500" : kpi.positive ? "text-emerald-600" : "text-muted-foreground"}`}>
                {kpi.alert && <AlertTriangle className="h-3 w-3" />}
                {kpi.positive !== undefined && !kpi.alert && (kpi.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
                {kpi.sub}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue & Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sorted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickFormatter={(v) => fmt(v)} tickLine={false} axisLine={false} fontSize={11} />
                  <Tooltip formatter={(v) => typeof v === "number" ? fmt(v) : v} />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.85} />
                  <Bar dataKey="netProfit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DSCR Trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">DSCR Trend</CardTitle>
              <Badge variant="outline" className={dscrStatus === "HEALTHY" ? "border-emerald-200 text-emerald-700" : dscrStatus === "WARNING" ? "border-yellow-200 text-yellow-700" : "border-red-200 text-red-700"}>
                {dscrStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sorted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 2]} />
                  <Tooltip />
                  {/* Covenant line at 1.2 */}
                  <Line type="monotone" dataKey="dscr" name="DSCR" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Covenant threshold: 1.2x</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Historical Financials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Metric", ...sorted.map((f) => f.year)].map((h) => (
                    <th key={h} className="text-left pb-2 pr-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { label: "Revenue", key: "revenue" as const, fmt: true },
                  { label: "Net Profit", key: "netProfit" as const, fmt: true },
                  { label: "Total Assets", key: "totalAssets" as const, fmt: true },
                  { label: "Total Liabilities", key: "totalLiabilities" as const, fmt: true },
                  { label: "DSCR", key: "dscr" as const, fmt: false },
                  { label: "Leverage", key: "leverage" as const, fmt: false },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="py-2.5 pr-6 font-medium text-muted-foreground">{row.label}</td>
                    {sorted.map((f) => (
                      <td key={f.year} className={`py-2.5 pr-6 font-medium ${row.key === "dscr" && f.dscr < 1.0 ? "text-red-600" : ""}`}>
                        {row.fmt ? fmt(f[row.key] as number) : (f[row.key] as number).toFixed(2)}
                        {row.key === "dscr" && f.dscr < 1.0 && " ⚠"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
