"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import { AICopilotPanel } from "./AICopilotPanel";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useRiskAlerts } from "@/features/risk-monitoring/hooks/useRiskAlerts";

interface AIFloatingButtonProps {
  className?: string;
}

export function AIFloatingButton({ className = "" }: AIFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<{ companyId?: string; companyName?: string }>({});
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const { data: companiesResponse } = useCompanies({ limit: 100 });
  const companies = companiesResponse?.data || [];
  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const { data: alertsResponse } = useRiskAlerts({ limit: 50 });
  const alerts = alertsResponse?.data || [];
  const companyAlerts = selectedCompanyId
    ? alerts.filter((a) => a.companyId === selectedCompanyId)
    : [];

  const handleSelectCompany = (companyId: string, companyName: string) => {
    setContext({ companyId, companyName });
    setSelectedCompanyId(companyId);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 ${className}`}
      >
        <Bot className="h-5 w-5" />
        <span className="text-sm font-medium">AI Copilot</span>
      </button>

      <AICopilotPanel
        context={context}
        company={selectedCompany}
        alerts={companyAlerts}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectCompany={handleSelectCompany}
      />
    </>
  );
}