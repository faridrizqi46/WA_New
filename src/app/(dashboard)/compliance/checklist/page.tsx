"use client";

import { ComplianceChecklist } from "@/features/compliance/components/ComplianceChecklist";
import { Shield } from "lucide-react";

export default function ComplianceChecklistPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">OJK Compliance Checklist</h1>
        <p className="text-sm text-muted-foreground">Track regulatory compliance status and identify gaps.</p>
      </div>

      <div className="flex-1">
        <ComplianceChecklist />
      </div>
    </div>
  );
}