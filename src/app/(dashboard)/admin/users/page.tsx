"use client";

import { UserManagement } from "@/features/admin/components/UserManagement";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">User Management</h1>
        <p className="text-sm text-muted-foreground">Manage users, roles, and access permissions.</p>
      </div>

      <div className="flex-1">
        <UserManagement />
      </div>
    </div>
  );
}