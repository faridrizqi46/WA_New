"use client";

import { useApprovalMatrix } from "../hooks/useApprovalMatrix";
import { ApprovalMatrixEntry } from "@/types";
import { Layers, ChevronRight } from "lucide-react";

const TRIGGER_LABELS: Record<string, string> = {
  CREDIT_ANALYSIS_SUBMIT: "Credit Analysis Submission",
  COMMITTEE_APPROVAL: "Committee Approval",
  COLLATERAL_APPRAISAL: "Collateral Appraisal",
  FACILITY_RENEWAL: "Facility Renewal",
  LIMIT_INCREASE: "Limit Increase",
};

function MatrixEntry({ entry }: { entry: ApprovalMatrixEntry }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-900">{entry.triggerLabel}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${entry.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          {entry.isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="space-y-2">
        {entry.tiers.map((tier, i) => (
          <div key={tier.tier} className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-400 w-24">
              <span className="font-medium">{tier.tierLabel}</span>
              {tier.thresholdLabel && <span className="text-gray-400">({tier.thresholdLabel})</span>}
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <div className="flex items-center gap-1 flex-wrap">
              {tier.approverRoles.map((role) => (
                <span key={role} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{role}</span>
              ))}
              {tier.requireAllApprovers && (
                <span className="text-xs text-gray-400">(require all)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ApprovalMatrixConfigurator() {
  const { data, isLoading } = useApprovalMatrix();

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        data?.data.map((entry) => (
          <MatrixEntry key={entry.id} entry={entry} />
        ))
      )}
    </div>
  );
}