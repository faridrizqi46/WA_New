"use client";

import { SystemHealthDashboard } from "@/features/admin/components/SystemHealthDashboard";
import { Activity } from "lucide-react";

export default function AdminSystemHealthPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">System Health</h1>
        <p className="text-sm text-muted-foreground">Monitor system status, AI service health, and integrations.</p>
      </div>

      <div className="flex-1">
        <SystemHealthDashboard />
      </div>
    </div>
  );
}