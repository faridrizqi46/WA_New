import { useQuery } from "@tanstack/react-query";
import { getMockRiskAlerts, getMockRiskAlertById, getMockRiskAlertsFiltered } from "@/lib/mock-data";
import { RiskAlertFilterParams } from "@/types";

export function useRiskAlerts(params: RiskAlertFilterParams) {
  return useQuery({
    queryKey: ["risk-alerts", params],
    queryFn: () => getMockRiskAlertsFiltered(params),
    placeholderData: (prev) => prev,
  });
}

export function useRiskAlert(id: string | null) {
  return useQuery({
    queryKey: ["risk-alert", id],
    queryFn: () => getMockRiskAlertById(id!),
    enabled: !!id,
  });
}