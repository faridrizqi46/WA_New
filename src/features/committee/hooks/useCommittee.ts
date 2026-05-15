import { useQuery } from "@tanstack/react-query";
import { getMockCommitteeSessions, getMockCommitteeSessionById } from "@/lib/mock-data";
import { CommitteeFilterParams } from "@/types";

export function useCommitteeSessions(params: CommitteeFilterParams) {
  return useQuery({
    queryKey: ["committee-sessions", params],
    queryFn: () => getMockCommitteeSessions(params),
    placeholderData: (prev) => prev,
  });
}

export function useCommitteeSession(id: string | null) {
  return useQuery({
    queryKey: ["committee-session", id],
    queryFn: () => getMockCommitteeSessionById(id!),
    enabled: !!id,
  });
}