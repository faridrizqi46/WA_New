"use client";

import { useState } from "react";
import { useAuditLogs } from "../hooks/useAuditLogs";
import { AuditLogEntry, AuditEntityType } from "@/types";
import { FileText, Eye, Edit, Trash2, LogIn, LogOut, Upload, CheckCircle, AlertTriangle, Settings, Download } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import { exportAuditLogsAsCSV } from "@/lib/export-utils";

const ACTION_ICONS: Record<string, React.ElementType> = {
  COMPANY_VIEWED: Eye,
  VISIT_CHECKIN: CheckCircle,
  USER_ROLE_CHANGED: Settings,
  PIPELINE_STAGE_CHANGED: Edit,
  COLLATERAL_APPRAISAL_UPDATED: Edit,
  APPROVAL_MATRIX_UPDATED: Settings,
  DOCUMENT_UPLOADED: Upload,
  CREDIT_ANALYSIS_SUBMITTED: FileText,
  COMMITTEE_VOTE_CAST: CheckCircle,
  WORKFLOW_SETTING_UPDATED: Settings,
  RISK_ALERT_ACKNOWLEDGED: AlertTriangle,
  USER_CREATED: LogIn,
};

const ENTITY_TYPE_LABELS: Record<AuditEntityType, string> = {
  COMPANY: "Company",
  VISIT: "Visit",
  PIPELINE: "Pipeline",
  DOCUMENT: "Document",
  COLLATERAL: "Collateral",
  CREDIT_ANALYSIS: "Credit Analysis",
  COMMITTEE: "Committee",
  USER: "User",
  SYSTEM: "System",
};

function AuditLogRow({ log }: { log: AuditLogEntry }) {
  const Icon = ACTION_ICONS[log.action] || FileText;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 text-sm">{log.action.replace(/_/g, " ")}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{ENTITY_TYPE_LABELS[log.entityType]}</span>
        </div>
        {log.entityName && (
          <p className="text-sm text-gray-600 mt-0.5 truncate">{log.entityName}</p>
        )}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-400">{log.userName}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">{formatDistanceToNow(log.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

interface AuditLogTableProps {
  onExport?: () => void;
}

export function AuditLogTable({ onExport }: AuditLogTableProps) {
  const [entityType, setEntityType] = useState<AuditEntityType | "ALL">("ALL");
  const [action, setAction] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const { data, isLoading } = useAuditLogs({ entityType, action, limit: 50 });
  const { data: allData } = useAuditLogs({ entityType, action, limit: 1000 });

  const handleExport = async () => {
    if (!allData?.data.length) return;
    setIsExporting(true);
    try {
      await exportAuditLogsAsCSV(allData.data);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value as AuditEntityType | "ALL")}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Entity Types</option>
          <option value="COMPANY">Company</option>
          <option value="VISIT">Visit</option>
          <option value="PIPELINE">Pipeline</option>
          <option value="DOCUMENT">Document</option>
          <option value="COLLATERAL">Collateral</option>
          <option value="CREDIT_ANALYSIS">Credit Analysis</option>
          <option value="COMMITTEE">Committee</option>
          <option value="USER">User</option>
          <option value="SYSTEM">System</option>
        </select>
        <input
          type="text"
          placeholder="Search action..."
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[200px]"
        />
        {onExport ? (
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Export
          </button>
        ) : (
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <span className="animate-pulse">Exporting...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export CSV
              </>
            )}
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="py-3 border-b border-gray-100">
              <div className="animate-pulse flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Activity Log</span>
            <span className="text-xs text-gray-500">{data?.data.length || 0} entries</span>
          </div>
          <div className="px-4 divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
            {data?.data.map((log) => (
              <AuditLogRow key={log.id} log={log} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}