"use client";

import { useQuery } from "@tanstack/react-query";
import { getMockMeetings, getMockRecentUploads } from "@/lib/mock-data";
import { ApiResponse, Meeting, RecentUpload } from "@/types";

export function useMeetings() {
  return useQuery<ApiResponse<Meeting[]>>({
    queryKey: ["meetings"],
    queryFn: getMockMeetings,
  });
}

export function useRecentUploads() {
  return useQuery<ApiResponse<RecentUpload[]>>({
    queryKey: ["recent-uploads"],
    queryFn: getMockRecentUploads,
  });
}

export function useLiveTranscript() {
  const mockTranscript = [
    { speaker: "RM", text: "Good morning, thank you for joining us today." },
    { speaker: "Client", text: "Good morning, we're excited to discuss this opportunity." },
    { speaker: "RM", text: "Let's start with your proposal for the credit facility." },
    { speaker: "Client", text: "We need approximately IDR 5 billion for working capital." },
    { speaker: "RM", text: "What tenor are you looking for?" },
    { speaker: "Client", text: "We're thinking 36 months with possible extension." },
    { speaker: "RM", text: "That works for us. What collateral are you proposing?" },
    { speaker: "Client", text: "We have land and building in South Jakarta as primary collateral." },
    { speaker: "RM", text: "That should cover our requirements. Let's discuss the interest rate." },
    { speaker: "Client", text: "We're targeting JIBOR + 2% if possible." },
  ];

  return useQuery({
    queryKey: ["live-transcript"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockTranscript;
    },
    refetchInterval: 5000,
  });
}