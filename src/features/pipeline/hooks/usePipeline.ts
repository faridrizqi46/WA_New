import { useQuery } from "@tanstack/react-query";
import { getMockOpportunities, getMockPipelineSummary } from "@/lib/mock-data";
import { PipelineFilterParams } from "@/types";

export function usePipeline(params: PipelineFilterParams) {
  return useQuery({
    queryKey: ["pipeline", params],
    queryFn: () => getMockOpportunities(params),
    placeholderData: (prev) => prev,
  });
}

export function usePipelineSummary() {
  return useQuery({
    queryKey: ["pipeline-summary"],
    queryFn: getMockPipelineSummary,
  });
}
