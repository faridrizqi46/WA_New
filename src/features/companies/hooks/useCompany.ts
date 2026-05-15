import { useQuery } from "@tanstack/react-query";
import { getMockCompanyById } from "@/lib/mock-data";

export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getMockCompanyById(id),
    enabled: !!id,
  });
}
