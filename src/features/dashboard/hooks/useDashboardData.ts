import { useQuery } from "@tanstack/react-query";
import { 
  getMockDashboardKPIs, 
  getMockAIInsights, 
  getMockActionItems, 
  getMockRiskAlerts, 
  getMockPipelineSnapshot 
} from "@/lib/mock-data";

export function useDashboardKPIs() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: getMockDashboardKPIs,
  });
}

export function useAIInsights() {
  return useQuery({
    queryKey: ["dashboard", "ai-insights"],
    queryFn: getMockAIInsights,
  });
}

export function useActionItems() {
  return useQuery({
    queryKey: ["dashboard", "action-items"],
    queryFn: getMockActionItems,
  });
}

export function useRiskAlerts() {
  return useQuery({
    queryKey: ["dashboard", "risk-alerts"],
    queryFn: getMockRiskAlerts,
  });
}

export function usePipelineSnapshot() {
  return useQuery({
    queryKey: ["dashboard", "pipeline"],
    queryFn: getMockPipelineSnapshot,
  });
}
