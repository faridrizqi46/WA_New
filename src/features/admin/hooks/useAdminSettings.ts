import { useQuery } from "@tanstack/react-query";
import { getMockSystemHealth, getMockAISettings, getMockIntegrations } from "@/lib/mock-data";

export function useSystemHealth() {
  return useQuery({
    queryKey: ["system-health"],
    queryFn: () => getMockSystemHealth(),
    staleTime: 1000 * 60,
  });
}

export function useAISettings() {
  return useQuery({
    queryKey: ["ai-settings"],
    queryFn: () => getMockAISettings(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useIntegrations() {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: () => getMockIntegrations(),
    placeholderData: (prev) => prev,
  });
}