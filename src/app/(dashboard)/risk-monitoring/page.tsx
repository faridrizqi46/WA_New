"use client";

import { useState } from "react";
import { useRiskAlerts } from "@/features/risk-monitoring/hooks/useRiskAlerts";
import { AlertFilters } from "@/features/risk-monitoring/components/AlertFilters";
import { AlertCard } from "@/features/risk-monitoring/components/AlertCard";
import { AlertDetailDrawer } from "@/features/risk-monitoring/components/AlertDetailDrawer";
import { RiskAlertFilterParams, RiskAlert } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export default function RiskMonitoringPage() {
  const [filters, setFilters] = useState<RiskAlertFilterParams>({ page: 1, limit: 50 });
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);

  const { data: response, isLoading } = useRiskAlerts(filters);
  const alerts = response?.data || [];

  const handleFilterChange = (newFilters: Partial<RiskAlertFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleAcknowledge = (id: string) => {
    console.log(`Acknowledging alert ${id}`);
  };

  const handleAlertClick = (alert: RiskAlert) => {
    setSelectedAlert(alert);
  };

  const criticalCount = alerts.filter(a => a.severity === "CRITICAL" && !a.acknowledgedAt).length;
  const highCount = alerts.filter(a => a.severity === "HIGH" && !a.acknowledgedAt).length;
  const pendingCount = alerts.filter(a => !a.acknowledgedAt).length;

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Risk Monitoring</h1>
        <p className="text-sm text-muted-foreground">Real-time portfolio risk command center.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg border bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
          <p className="text-xs text-muted-foreground">Critical Alerts</p>
        </div>
        <div className="p-4 rounded-lg border bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
          <p className="text-2xl font-bold text-orange-600">{highCount}</p>
          <p className="text-xs text-muted-foreground">High Alerts</p>
        </div>
        <div className="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900">
          <p className="text-2xl font-bold text-yellow-600">{alerts.filter(a => a.severity === "MEDIUM" && !a.acknowledgedAt).length}</p>
          <p className="text-xs text-muted-foreground">Medium Alerts</p>
        </div>
        <div className="p-4 rounded-lg border bg-muted">
          <p className="text-2xl font-bold">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">Pending Action</p>
        </div>
      </div>

      <AlertFilters filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ShieldAlert className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No risk alerts</p>
            <p className="text-xs mt-1">Your portfolio is looking healthy!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                onClick={handleAlertClick}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDetailDrawer
        alert={selectedAlert}
        open={!!selectedAlert}
        onOpenChange={(open) => {
          if (!open) setSelectedAlert(null);
        }}
      />
    </div>
  );
}