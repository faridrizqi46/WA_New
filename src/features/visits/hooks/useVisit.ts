import { useQuery } from "@tanstack/react-query";
import { getMockVisitById } from "@/lib/mock-data";

export function useVisit(id: string | null) {
  return useQuery({
    queryKey: ["visit", id],
    queryFn: () => getMockVisitById(id!),
    enabled: !!id,
  });
}