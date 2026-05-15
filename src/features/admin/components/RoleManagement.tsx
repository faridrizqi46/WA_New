"use client";

import { useRoles } from "../hooks/useUsers";
import { PermissionRole } from "@/types";
import { Shield, Check } from "lucide-react";

const PERMISSION_GROUP_LABELS: Record<string, string> = {
  VIEW_COMPANIES: "View Companies",
  EDIT_COMPANIES: "Edit Companies",
  DELETE_COMPANIES: "Delete Companies",
  VIEW_PIPELINE: "View Pipeline",
  EDIT_PIPELINE: "Edit Pipeline",
  VIEW_VISITS: "View Visits",
  EDIT_VISITS: "Edit Visits",
  VIEW_CREDIT_ANALYSIS: "View Credit Analysis",
  EDIT_CREDIT_ANALYSIS: "Edit Credit Analysis",
  APPROVE_CREDIT_ANALYSIS: "Approve Credit Analysis",
  VIEW_COMMITTEE: "View Committee",
  EDIT_COMMITTEE: "Edit Committee",
  VIEW_COLLATERAL: "View Collateral",
  EDIT_COLLATERAL: "Edit Collateral",
  VIEW_AUDIT_LOG: "View Audit Log",
  EXPORT_AUDIT_LOG: "Export Audit Log",
  MANAGE_USERS: "Manage Users",
  MANAGE_ROLES: "Manage Roles",
  MANAGE_APPROVAL_MATRIX: "Manage Approval Matrix",
  MANAGE_WORKFLOWS: "Manage Workflows",
  VIEW_RISK_ALERTS: "View Risk Alerts",
  ACKNOWLEDGE_RISK_ALERTS: "Acknowledge Risk Alerts",
  VIEW_NOTIFICATIONS: "View Notifications",
  MANAGE_AI_SETTINGS: "Manage AI Settings",
  SYSTEM_ADMIN: "System Admin",
};

const PERMISSION_GROUPS = [
  { key: "COMPANIES", permissions: ["VIEW_COMPANIES", "EDIT_COMPANIES", "DELETE_COMPANIES"] },
  { key: "PIPELINE", permissions: ["VIEW_PIPELINE", "EDIT_PIPELINE"] },
  { key: "VISITS", permissions: ["VIEW_VISITS", "EDIT_VISITS"] },
  { key: "CREDIT", permissions: ["VIEW_CREDIT_ANALYSIS", "EDIT_CREDIT_ANALYSIS", "APPROVE_CREDIT_ANALYSIS"] },
  { key: "COMMITTEE", permissions: ["VIEW_COMMITTEE", "EDIT_COMMITTEE"] },
  { key: "COLLATERAL", permissions: ["VIEW_COLLATERAL", "EDIT_COLLATERAL"] },
  { key: "AUDIT", permissions: ["VIEW_AUDIT_LOG", "EXPORT_AUDIT_LOG"] },
  { key: "ADMIN", permissions: ["MANAGE_USERS", "MANAGE_ROLES", "MANAGE_APPROVAL_MATRIX", "MANAGE_WORKFLOWS", "SYSTEM_ADMIN"] },
  { key: "RISK", permissions: ["VIEW_RISK_ALERTS", "ACKNOWLEDGE_RISK_ALERTS"] },
  { key: "OTHER", permissions: ["VIEW_NOTIFICATIONS", "MANAGE_AI_SETTINGS"] },
];

function RoleCard({ role }: { role: PermissionRole }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="font-medium text-gray-900">{role.displayName}</span>
        {role.isSystem && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">System</span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3">{role.description}</p>
      <div className="space-y-1">
        {PERMISSION_GROUPS.map((group) => {
          const groupPerms = group.permissions.filter((p) => role.permissions.includes(p as any));
          if (groupPerms.length === 0) return null;
          return (
            <div key={group.key} className="text-xs">
              <span className="text-gray-400 font-medium">{group.key}: </span>
              <span className="text-gray-600">{groupPerms.map(p => PERMISSION_GROUP_LABELS[p]).join(", ")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RoleManagement() {
  const { data, isLoading } = useRoles();

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </div>
  );
}