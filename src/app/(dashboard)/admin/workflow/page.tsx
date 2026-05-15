"use client";

import { WorkflowSettingsPanel } from "@/features/admin/components/WorkflowSettingsPanel";
import { Settings } from "lucide-react";

export default function AdminWorkflowPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Workflow Settings</h1>
        <p className="text-sm text-muted-foreground">Configure mandatory fields, checklist templates, and workflow rules.</p>
      </div>

      <div className="flex-1">
        <WorkflowSettingsPanel />
      </div>
    </div>
  );
}