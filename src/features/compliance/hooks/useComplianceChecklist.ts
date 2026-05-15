import { useQuery } from "@tanstack/react-query";
import { getMockComplianceChecklist } from "@/lib/mock-data";
import { ComplianceChecklistFilterParams } from "@/types";

export function useComplianceChecklist(params?: ComplianceChecklistFilterParams) {
  return useQuery({
    queryKey: ["compliance-checklist", params],
    queryFn: () => getMockComplianceChecklist(params),
    placeholderData: (prev) => prev,
  });
}