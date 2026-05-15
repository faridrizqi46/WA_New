import { useQuery } from "@tanstack/react-query";
import { getMockCompanies } from "@/lib/mock-data";
import { CompanyFilterParams } from "@/types";

export function useCompanies(params: CompanyFilterParams) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => getMockCompanies(params),
    // Keep previous data while fetching new pages/filters to avoid jumping UI
    placeholderData: (previousData) => previousData,
  });
}
