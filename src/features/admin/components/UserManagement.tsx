"use client";

import { useState } from "react";
import { useAdminUsers } from "../hooks/useUsers";
import { AdminUser } from "@/types";
import { User, Mail, Shield, Clock } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700",
  LEAD_RM: "bg-blue-100 text-blue-700",
  RM: "bg-indigo-100 text-indigo-700",
  CREDIT_ANALYST: "bg-emerald-100 text-emerald-700",
  COMPLIANCE: "bg-amber-100 text-amber-700",
  COMMITTEE: "bg-pink-100 text-pink-700",
  AUDITOR: "bg-gray-100 text-gray-700",
};

function UserRow({ user }: { user: AdminUser }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 text-sm">{user.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${ROLE_COLORS[user.role]}`}>{user.roleName}</span>
          {!user.isActive && (
            <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">Inactive</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Mail className="w-3 h-3" /> {user.email}
          </span>
          {user.lastLoginAt && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {formatDistanceToNow(user.lastLoginAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [role, setRole] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useAdminUsers({
    role: role as any,
    search: search || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="LEAD_RM">Lead RM</option>
          <option value="RM">RM</option>
          <option value="CREDIT_ANALYST">Credit Analyst</option>
          <option value="COMPLIANCE">Compliance</option>
          <option value="COMMITTEE">Committee</option>
          <option value="AUDITOR">Auditor</option>
        </select>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[200px]"
        />
      </div>

      {isLoading ? (
        <div className="space-y-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="py-3 border-b border-gray-100 animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Users</span>
            <span className="text-xs text-gray-500">{data?.meta?.total || 0} total</span>
          </div>
          <div className="px-4 divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
            {data?.data.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}