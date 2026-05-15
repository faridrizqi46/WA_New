"use client";

import { useState } from "react";
import { AICopilotPanel } from "@/features/ai-copilot/components/AICopilotPanel";
import { AICommandPalette } from "@/features/ai-copilot/components/AICommandPalette";
import { AIContextPanel } from "@/features/ai-copilot/components/AIContextPanel";
import { AIChat } from "@/features/ai-copilot/components/AIChat";
import { useMockAIResponse } from "@/features/ai-copilot/hooks/useAIChat";
import { AIChatMessage, AIConversationContext, AICommand } from "@/types";
import { Bot, Sparkles, Building2, X, PanelRightOpen } from "lucide-react";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useRiskAlerts } from "@/features/risk-monitoring/hooks/useRiskAlerts";
import { Badge } from "@/components/ui/badge";

export default function AICopilotPage() {
  const [context, setContext] = useState<AIConversationContext>({});
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const { sendMessage, isLoading } = useMockAIResponse();

  const { data: companiesResponse } = useCompanies({ limit: 100 });
  const companies = companiesResponse?.data || [];
  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const { data: alertsResponse } = useRiskAlerts({ limit: 50 });
  const alerts = alertsResponse?.data || [];
  const companyAlerts = selectedCompanyId
    ? alerts.filter((a) => a.companyId === selectedCompanyId)
    : [];

  const handleSendMessage = async (content: string, command?: AICommand) => {
    const userMessage: AIChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
      command,
      companyId: context.companyId,
      companyName: context.companyName,
    };

    setMessages((prev) => [...prev, userMessage]);

    const response = await sendMessage(content, command, context);

    const assistantMessage: AIChatMessage = {
      id: `msg-${Date.now()}-assistant`,
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
      companyId: context.companyId,
      companyName: context.companyName,
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSelectCompany = (companyId: string, companyName: string) => {
    setContext((prev) => ({ ...prev, companyId, companyName }));
    setSelectedCompanyId(companyId);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
            <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Copilot</h1>
            <p className="text-sm text-muted-foreground">Your intelligent banking assistant</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[320px_1fr] gap-6 flex-1 min-h-0">
        <div className="border rounded-xl bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-muted/30">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Select Company Context
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {companies.slice(0, 10).map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSelectCompany(company.id, company.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCompanyId === company.id
                      ? "border-primary bg-primary/5"
                      : "bg-card hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{company.name}</span>
                    {company.riskRating === "HIGH" || company.riskRating === "CRITICAL" ? (
                      <Badge variant="destructive" className="text-xs h-5">
                        {company.riskRating}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs h-5">
                        {company.riskRating}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{company.industry}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border rounded-xl bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Chat
            </h3>
            {context.companyId && (
              <Badge variant="outline" className="text-xs">
                Context: {context.companyName}
              </Badge>
            )}
          </div>

          <AIChat
            messages={messages}
            context={context}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-xl bg-muted/30">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          Quick Commands
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { cmd: "SUMMARIZE_COMPANY", label: "Summarize Company" },
            { cmd: "ANALYZE_FINANCIALS", label: "Analyze Financials" },
            { cmd: "GENERATE_PROPOSAL", label: "Generate Proposal" },
            { cmd: "EXPLAIN_RISK", label: "Explain Risk" },
            { cmd: "COMPARE_INDUSTRY", label: "Compare Industry" },
            { cmd: "PREPARE_COMMITTEE_QA", label: "Committee Q&A" },
          ].map((item) => (
            <button
              key={item.cmd}
              onClick={() => handleSendMessage(
                item.cmd === "SUMMARIZE_COMPANY"
                  ? `Summarize the company profile for ${context.companyName || "[Company]"}`
                  : item.cmd === "ANALYZE_FINANCIALS"
                  ? `Analyze financial statements for ${context.companyName || "[Company]"}`
                  : item.cmd === "GENERATE_PROPOSAL"
                  ? `Generate a credit proposal for ${context.companyName || "[Company]"}`
                  : item.cmd === "EXPLAIN_RISK"
                  ? `Explain risk signals for ${context.companyName || "[Company]"}`
                  : item.cmd === "COMPARE_INDUSTRY"
                  ? `Compare ${context.companyName || "[Company]"} against industry peers`
                  : `Prepare committee Q&A for ${context.companyName || "[Company]"}`,
                item.cmd as AICommand
              )}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}