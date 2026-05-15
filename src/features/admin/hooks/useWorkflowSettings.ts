import { useQuery } from "@tanstack/react-query";
import { getMockWorkflowSettings } from "@/lib/mock-data";
import { WorkflowSettingsFilterParams } from "@/types";

export function useWorkflowSettings(params?: WorkflowSettingsFilterParams) {
  return useQuery({
    queryKey: ["workflow-settings", params],
    queryFn: () => getMockWorkflowSettings(params),
    placeholderData: (prev) => prev,
  });
}