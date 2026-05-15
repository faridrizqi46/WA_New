"use client";

import { use } from "react";
import { useCompany } from "@/features/companies/hooks/useCompany";
import { CompanyHeader } from "@/features/companies/components/CompanyHeader";
import { StickyActionBar } from "@/features/companies/components/StickyActionBar";
import { OverviewTab } from "@/features/companies/components/tabs/OverviewTab";
import { FinancialTab } from "@/features/companies/components/tabs/FinancialTab";
import { FacilitiesTab } from "@/features/companies/components/tabs/FacilitiesTab";
import { RelationshipTab } from "@/features/companies/components/tabs/RelationshipTab";
import { DocumentsTab } from "@/features/companies/components/tabs/DocumentsTab";
import { CollateralTab } from "@/features/companies/components/tabs/CollateralTab";
import { RiskTab } from "@/features/companies/components/tabs/RiskTab";
import { AIInsightsTab } from "@/features/companies/components/tabs/AIInsightsTab";
import { AuditTrailTab } from "@/features/companies/components/tabs/AuditTrailTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = use(params);
  const { data: response, isLoading } = useCompany(id);
  const company = response?.data;

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "financial", label: "Financial" },
    { value: "facilities", label: "Facilities" },
    { value: "relationship", label: "Relationship" },
    { value: "documents", label: "Documents" },
    { value: "collateral", label: "Collateral" },
    { value: "risk", label: "Risk" },
    { value: "ai-insights", label: "AI Insights" },
    { value: "audit-trail", label: "Audit Trail" },
  ];

  return (
    <div className="-mx-6 -mt-6 flex flex-col min-h-screen">
      {/* Sticky Header */}
      <CompanyHeader company={company} isLoading={isLoading} />

      {/* Sticky Action Bar */}
      {!isLoading && company && <StickyActionBar />}

      {/* Tab Content */}
      <div className="flex-1 px-6 py-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              {tabs.map((t) => <Skeleton key={t.value} className="h-9 w-24 rounded-md" />)}
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        ) : company ? (
          <Tabs defaultValue="overview">
            <TabsList className="mb-6 flex-wrap h-auto gap-1">
              {tabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="text-sm">
                  {t.label}
                  {t.value === "risk" && company.activeAlerts > 0 && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                      {company.activeAlerts}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview"><OverviewTab company={company} /></TabsContent>
            <TabsContent value="financial"><FinancialTab company={company} /></TabsContent>
            <TabsContent value="facilities"><FacilitiesTab company={company} /></TabsContent>
            <TabsContent value="relationship"><RelationshipTab company={company} /></TabsContent>
            <TabsContent value="documents"><DocumentsTab company={company} /></TabsContent>
            <TabsContent value="collateral"><CollateralTab company={company} /></TabsContent>
            <TabsContent value="risk"><RiskTab company={company} /></TabsContent>
            <TabsContent value="ai-insights"><AIInsightsTab company={company} /></TabsContent>
            <TabsContent value="audit-trail"><AuditTrailTab company={company} /></TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="text-lg font-medium">Company not found</p>
            <p className="text-sm mt-1">The company you&apos;re looking for doesn&apos;t exist or was removed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
