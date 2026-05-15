"use client";

import { AuditLogTable } from "@/features/compliance/components/AuditLogTable";

export default function AuditLogPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Audit Log</h1>
        <p className="text-sm text-muted-foreground">Immutable record of all user actions across the system.</p>
      </div>

      <div className="flex-1">
        <AuditLogTable />
      </div>
    </div>
  );
}