"use client";

import { RoleManagement } from "@/features/admin/components/RoleManagement";
import { Shield } from "lucide-react";

export default function AdminRolesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Role Management</h1>
        <p className="text-sm text-muted-foreground">Configure roles and their associated permissions.</p>
      </div>

      <div className="flex-1">
        <RoleManagement />
      </div>
    </div>
  );
}