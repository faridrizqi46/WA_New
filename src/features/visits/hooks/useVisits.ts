import { useQuery } from "@tanstack/react-query";
import { getMockVisits, getMockVisitChecklist } from "@/lib/mock-data";
import { VisitFilterParams } from "@/types";

export function useVisits(params: VisitFilterParams) {
  return useQuery({
    queryKey: ["visits", params],
    queryFn: () => getMockVisits(params),
    placeholderData: (prev) => prev,
  });
}

export function useVisitChecklist(visitId: string) {
  return useQuery({
    queryKey: ["visit-checklist", visitId],
    queryFn: () => getMockVisitChecklist(visitId),
    enabled: !!visitId,
  });
}