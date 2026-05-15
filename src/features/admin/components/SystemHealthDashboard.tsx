"use client";

import { useSystemHealth, useAISettings, useIntegrations } from "../hooks/useAdminSettings";
import { SystemHealthMetric } from "@/types";
import { Activity, Wifi, WifiOff, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const STATUS_ICONS: Record<SystemHealthMetric["status"], React.ElementType> = {
  HEALTHY: CheckCircle,
  WARNING: AlertTriangle,
  CRITICAL: XCircle,
};

const STATUS_COLORS: Record<SystemHealthMetric["status"], string> = {
  HEALTHY: "text-green-600 bg-green-50",
  WARNING: "text-amber-600 bg-amber-50",
  CRITICAL: "text-red-600 bg-red-50",
};

function HealthCard({ metric }: { metric: SystemHealthMetric }) {
  const Icon = STATUS_ICONS[metric.status];
  const colorClass = STATUS_COLORS[metric.status];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 text-sm">{metric.name}</span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{metric.value}</p>
        {metric.description && (
          <p className="text-xs text-gray-400 mt-0.5">{metric.description}</p>
        )}
      </div>
    </div>
  );
}

export function SystemHealthDashboard() {
  const { data: healthData, isLoading: healthLoading } = useSystemHealth();
  const { data: aiData, isLoading: aiLoading } = useAISettings();
  const { data: intData, isLoading: intLoading } = useIntegrations();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">System Status</h3>
        {healthLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-200 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {healthData?.data.map((metric) => (
              <HealthCard key={metric.id} metric={metric} />
            ))}
          </div>
        )}
      </div>

      {aiData && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">AI Service</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Model: {aiData.data.model}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${aiData.data.isEnabled ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {aiData.data.isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500">Daily Usage</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(aiData.data.usageLimits.currentUsageDaily / aiData.data.usageLimits.dailyLimit) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{aiData.data.usageLimits.currentUsageDaily}/{aiData.data.usageLimits.dailyLimit}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Monthly Usage</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(aiData.data.usageLimits.currentUsageMonthly / aiData.data.usageLimits.monthlyLimit) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{aiData.data.usageLimits.currentUsageMonthly}/{aiData.data.usageLimits.monthlyLimit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Integrations</h3>
        {intLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {intData?.data.map((int) => (
              <div key={int.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${int.status === "CONNECTED" ? "bg-green-50" : int.status === "ERROR" ? "bg-red-50" : "bg-gray-100"}`}>
                  {int.status === "CONNECTED" ? <Wifi className="w-4 h-4 text-green-600" /> : int.status === "ERROR" ? <XCircle className="w-4 h-4 text-red-600" /> : <WifiOff className="w-4 h-4 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">{int.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{int.type}</span>
                  </div>
                  {int.lastSyncAt && (
                    <p className="text-xs text-gray-400 mt-0.5">Last sync: {new Date(int.lastSyncAt).toLocaleString()}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${int.status === "CONNECTED" ? "bg-green-50 text-green-600" : int.status === "ERROR" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}