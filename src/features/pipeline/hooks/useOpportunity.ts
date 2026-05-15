import { useQuery } from "@tanstack/react-query";
import { getMockOpportunityById } from "@/lib/mock-data";

export function useOpportunity(id: string | null) {
  return useQuery({
    queryKey: ["opportunity", id],
    queryFn: () => getMockOpportunityById(id!),
    enabled: !!id,
  });
}
