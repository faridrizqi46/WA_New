"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import { format } from "date-fns";

interface DocumentsTabProps { company: CompanyDetail; }

const docTypeLabels: Record<string, string> = {
  FINANCIAL_STATEMENT: "Financial",
  LEGAL: "Legal",
  COLLATERAL: "Collateral",
  COMPLIANCE: "Compliance",
  OTHER: "Other",
};

const statusStyles: Record<string, string> = {
  VALID: "bg-emerald-100 text-emerald-800 border-emerald-200",
  EXPIRED: "bg-red-100 text-red-800 border-red-200",
  PENDING: "bg-yellow-100 text-yellow-900 border-yellow-200",
};

export function DocumentsTab({ company }: DocumentsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{company.documents.length} document(s) on file</p>
        <Button size="sm" className="gap-1.5">
          <Upload className="h-3.5 w-3.5" />
          Upload Document
        </Button>
      </div>
      {company.documents.map((doc) => (
        <Card key={doc.id}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[10px]">{docTypeLabels[doc.type]}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Uploaded {format(new Date(doc.uploadedAt), "dd MMM yyyy")}
                    </span>
                    {doc.expiresAt && (
                      <span className={`text-xs ${new Date(doc.expiresAt) < new Date() ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                        • Expires {format(new Date(doc.expiresAt), "dd MMM yyyy")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="outline" className={statusStyles[doc.status]}>{doc.status}</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
