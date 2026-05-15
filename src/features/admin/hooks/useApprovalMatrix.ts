import { useQuery } from "@tanstack/react-query";
import { getMockApprovalMatrix } from "@/lib/mock-data";
import { ApprovalMatrixFilterParams } from "@/types";

export function useApprovalMatrix(params?: ApprovalMatrixFilterParams) {
  return useQuery({
    queryKey: ["approval-matrix", params],
    queryFn: () => getMockApprovalMatrix(params),
    placeholderData: (prev) => prev,
  });
}