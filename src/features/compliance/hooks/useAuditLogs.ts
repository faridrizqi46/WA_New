import { useQuery } from "@tanstack/react-query";
import { getMockAuditLogs } from "@/lib/mock-data";
import { AuditLogFilterParams } from "@/types";

export function useAuditLogs(params?: AuditLogFilterParams) {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => getMockAuditLogs(params),
    placeholderData: (prev) => prev,
  });
}