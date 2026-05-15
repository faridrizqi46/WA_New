"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { getMockExtractedDocument, getMockDocumentHistory } from "@/lib/mock-data";
import { ApiResponse, ExtractedDocument, DocumentHistoryItem } from "@/types";

export function useExtractedDocument() {
  return useQuery<ApiResponse<ExtractedDocument>>({
    queryKey: ["extracted-document"],
    queryFn: getMockExtractedDocument,
    enabled: false,
  });
}

export function useDocumentHistory() {
  return useQuery<ApiResponse<DocumentHistoryItem[]>>({
    queryKey: ["document-history"],
    queryFn: getMockDocumentHistory,
  });
}

export function useProcessDocument() {
  return useMutation({
    mutationFn: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getMockExtractedDocument();
    },
  });
}