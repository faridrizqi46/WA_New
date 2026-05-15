"use client";

import { useComplianceChecklist } from "../hooks/useComplianceChecklist";
import { ComplianceCheckItem } from "@/types";
import { CheckCircle, XCircle, Clock, HelpCircle } from "lucide-react";

const STATUS_CONFIG: Record<ComplianceCheckItem["status"], { icon: React.ElementType; color: string; bg: string }> = {
  COMPLIANT: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  NON_COMPLIANT: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  IN_PROGRESS: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  NOT_APPLICABLE: { icon: HelpCircle, color: "text-gray-400", bg: "bg-gray-50" },
};

function ChecklistItem({ item }: { item: ComplianceCheckItem }) {
  const config = STATUS_CONFIG[item.status];
  const Icon = config.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-900 text-sm">{item.requirement}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          {item.reviewedBy && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-400">Reviewed by {item.reviewedBy}</span>
            </div>
          )}
          {item.notes && (
            <p className="text-xs text-amber-600 mt-1 bg-amber-50 px-2 py-1 rounded">{item.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ComplianceChecklist() {
  const [status, setStatus] = useState<"ALL" | ComplianceCheckItem["status"]>("ALL");
  const { data, isLoading } = useComplianceChecklist(status === "ALL" ? undefined : { status });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Status:</span>
        <div className="flex gap-2 flex-wrap">
          {(["ALL", "COMPLIANT", "NON_COMPLIANT", "IN_PROGRESS", "NOT_APPLICABLE"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                status === s
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {s === "ALL" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data?.data.map((item) => (
            <ChecklistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";