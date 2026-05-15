"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Table2, ArrowRight, History, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDocumentHistory, useProcessDocument, useExtractedDocument } from "./hooks/useDocumentIntelligence";
import type { ExtractedField, ExtractedTable, DocumentHistoryItem } from "@/types";

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  FINANCIAL_STATEMENT: "Financial Statement",
  LEGAL: "Legal Document",
  COMPLIANCE: "Compliance",
  COLLATERAL: "Collateral",
  ID_CARD: "ID Card",
  CONTRACT: "Contract",
  OTHER: "Other",
};

export function DocumentIntelligencePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");

  const { data: historyData, isLoading: historyLoading } = useDocumentHistory();
  const { data: extractedData, isLoading: extractedLoading } = useExtractedDocument();
  const processDocument = useProcessDocument();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateUpload();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            setShowResults(true);
            processDocument.mutate({} as File);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Document Intelligence</h1>
            <p className="text-sm text-slate-500 mt-1">
              OCR text extraction, table extraction, and auto-classification
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeTab === "upload" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("upload")}
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("history")}
            >
              <History className="h-4 w-4" />
              History
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === "upload" ? (
          <div className="space-y-6">
            {!showResults ? (
              <>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    border-2 border-dashed rounded-lg p-12 text-center transition-colors
                    ${isDragging ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"}
                  `}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-slate-100 p-4">
                      <Upload className="h-8 w-8 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-medium">Drag PDF/image file here</p>
                      <p className="text-sm text-slate-500">or click to browse</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FileText className="h-4 w-4" />
                      Supported: PDF, PNG, JPG, JPEG
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,image/*,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="doc-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("doc-upload")?.click()}>
                      Select File
                    </Button>
                  </div>

                  {uploadProgress !== null && (
                    <div className="mt-6 max-w-md mx-auto">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Uploading and processing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : extractedLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                <span className="ml-3 text-slate-500">Extracting document data...</span>
              </div>
            ) : extractedData?.data ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Extraction Results</h2>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Confidence: {extractedData.data.confidence}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      ORIGINAL DOCUMENT
                    </h3>
                    <div className="bg-slate-100 border rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-slate-400 mx-auto" />
                        <p className="text-sm text-slate-500 mt-2">{extractedData.data.originalFileName}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      AI EXTRACTED DATA
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Document Type:</span>
                        <Badge variant="secondary">{DOCUMENT_TYPE_LABELS[extractedData.data.documentType]}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Company:</span>
                        <span className="font-medium">{extractedData.data.companyName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Year:</span>
                        <span className="font-medium">{extractedData.data.year}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="font-medium mb-3">EXTRACTED FIELDS</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {extractedData.data.extractedFields.map((field: ExtractedField, i: number) => (
                      <div key={i} className="border rounded-lg p-3">
                        <p className="text-xs text-slate-500">{field.label}</p>
                        <p className="font-medium text-sm">{field.value}</p>
                        {field.confidence && (
                          <p className="text-xs text-slate-400 mt-1">{field.confidence}% confidence</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {extractedData.data.extractedTables.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Table2 className="h-4 w-4" />
                      EXTRACTED TABLES
                    </h3>
                    <div className="space-y-6">
                      {extractedData.data.extractedTables.map((table: ExtractedTable, i: number) => (
                        <div key={i}>
                          <p className="text-sm font-medium mb-2">{table.title}</p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {table.headers.map((header: string, h: number) => (
                                  <TableHead key={h} className="font-medium">{header}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {table.rows.map((row: string[], r: number) => (
                                <TableRow key={r}>
                                  {row.map((cell: string, c: number) => (
                                    <TableCell key={c}>{cell}</TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-4 border-slate-200">
                  <h3 className="font-medium mb-3">AUTO-CLASSIFICATION</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Financial Statement (92% confidence)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Audited (85% confidence)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-sm">Annual Report (78% confidence)</span>
                    </div>
                  </div>
                </Card>

                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    <Upload className="h-4 w-4" />
                    Upload Another
                  </Button>
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4" />
                    Link to Company
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Processing History</h2>
              <Badge variant="secondary">{historyData?.data.length ?? 0} documents</Badge>
            </div>

            {historyLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            ) : historyData?.data.length ? (
              <div className="space-y-3">
                {historyData.data.map((doc: DocumentHistoryItem) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="font-medium">{doc.fileName}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                            <Badge variant="outline" className="text-xs">
                              {DOCUMENT_TYPE_LABELS[doc.documentType]}
                            </Badge>
                            <span>{doc.linkedCompanyName}</span>
                            <span>•</span>
                            <span>{formatDate(doc.processedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {doc.status === "COMPLETED" ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {doc.confidence}%
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 mt-3">No documents processed yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}