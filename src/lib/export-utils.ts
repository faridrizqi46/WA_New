import { AuditLogEntry } from "@/types";

export function auditLogToCSV(logs: AuditLogEntry[]): string {
  const headers = [
    "ID",
    "Timestamp",
    "User",
    "Email",
    "Action",
    "Entity Type",
    "Entity ID",
    "Entity Name",
    "IP Address",
    "User Agent",
  ];

  const rows = logs.map((log) => [
    log.id,
    log.createdAt,
    log.userName,
    log.userEmail,
    log.action,
    log.entityType,
    log.entityId,
    log.entityName || "",
    log.ipAddress || "",
    log.userAgent || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  return csvContent;
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportAuditLogsAsCSV(logs: AuditLogEntry[]): Promise<void> {
  const csv = auditLogToCSV(logs);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  downloadCSV(csv, `audit-log-${timestamp}.csv`);
}