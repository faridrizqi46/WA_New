import { useQuery } from "@tanstack/react-query";
import { getMockCreditAnalyses, getMockCreditAnalysisById } from "@/lib/mock-data";
import { CreditAnalysisFilterParams } from "@/types";

export function useCreditAnalyses(params: CreditAnalysisFilterParams) {
  return useQuery({
    queryKey: ["credit-analyses", params],
    queryFn: () => getMockCreditAnalyses(params),
    placeholderData: (prev) => prev,
  });
}

export function useCreditAnalysis(id: string | null) {
  return useQuery({
    queryKey: ["credit-analysis", id],
    queryFn: () => getMockCreditAnalysisById(id!),
    enabled: !!id,
  });
}