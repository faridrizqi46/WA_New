"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  KanbanSquare,
  MapPin,
  Bot,
  BarChart3,
  ShieldAlert,
  Landmark,
  Users,
  BellRing,
  FileText,
  Settings,
  ScrollText,
  ClipboardCheck,
  UserCog,
  Shield,
  Layers,
  Workflow,
  Activity,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Visits", href: "/visits", icon: MapPin },
  { name: "Meeting", href: "/meetings", icon: Mic },
  { name: "AI Copilot", href: "/ai-copilot", icon: Bot },
  { name: "Credit Analysis", href: "/credit-analysis", icon: BarChart3 },
  { name: "Risk Monitoring", href: "/risk-monitoring", icon: ShieldAlert },
  { name: "Collateral", href: "/collateral", icon: Landmark },
  { name: "Committee", href: "/committee", icon: Users },
  { name: "Notifications", href: "/notifications", icon: BellRing },
];

const COMPLIANCE_ITEMS = [
  { name: "Audit Log", href: "/compliance/audit-log", icon: ScrollText },
  { name: "Compliance Checklist", href: "/compliance/checklist", icon: ClipboardCheck },
];

const ADMIN_ITEMS = [
  { name: "Users", href: "/admin/users", icon: UserCog },
  { name: "Roles", href: "/admin/roles", icon: Shield },
  { name: "Approval Matrix", href: "/admin/approval-matrix", icon: Layers },
  { name: "Workflow", href: "/admin/workflow", icon: Workflow },
  { name: "System Health", href: "/admin/system-health", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-slate-50 dark:bg-slate-950">
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-lg font-bold tracking-tight">RM Workbench</h1>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            )}
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.name}
          </Link>
        ))}

        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance</div>
          {COMPLIANCE_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ml-2",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin</div>
          {ADMIN_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ml-2",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
