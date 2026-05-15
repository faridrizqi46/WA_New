"use client";

import { ApprovalMatrixConfigurator } from "@/features/admin/components/ApprovalMatrixConfigurator";
import { Layers } from "lucide-react";

export default function AdminApprovalMatrixPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Approval Matrix</h1>
        <p className="text-sm text-muted-foreground">Configure approval workflows and tier thresholds.</p>
      </div>

      <div className="flex-1">
        <ApprovalMatrixConfigurator />
      </div>
    </div>
  );
}