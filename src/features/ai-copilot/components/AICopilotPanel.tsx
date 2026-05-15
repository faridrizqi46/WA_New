import { useState } from "react";
import { AIChatMessage, AICommand, AIConversationContext } from "@/types";
import { AIChat } from "./AIChat";
import { AIContextPanel } from "./AIContextPanel";
import { AICommandPalette } from "./AICommandPalette";
import { useMockAIResponse } from "../hooks/useAIChat";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { Building2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AICopilotPanelProps {
  context: AIConversationContext;
  company: any;
  alerts: any[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCompany?: (companyId: string, companyName: string) => void;
}

export function AICopilotPanel({ context, company, alerts, isOpen, onClose, onSelectCompany }: AICopilotPanelProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [localContext, setLocalContext] = useState<AIConversationContext>(context);
  const [localCompany, setLocalCompany] = useState(company);
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const [showCompanySelector, setShowCompanySelector] = useState(!context.companyId && !company);
  const [showCommands, setShowCommands] = useState(true);
  const { sendMessage, isLoading } = useMockAIResponse();

  const { data: companiesResponse } = useCompanies({ limit: 100 });
  const companies = companiesResponse?.data || [];

  const handleSendMessage = async (content: string, command?: AICommand) => {
    const effectiveContext = localContext;
    const userMessage: AIChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
      command,
      companyId: effectiveContext.companyId,
      companyName: effectiveContext.companyName,
    };

    setMessages((prev) => [...prev, userMessage]);

    const response = await sendMessage(content, command, effectiveContext);

    const assistantMessage: AIChatMessage = {
      id: `msg-${Date.now()}-assistant`,
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
      companyId: effectiveContext.companyId,
      companyName: effectiveContext.companyName,
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSelectCompany = (companyId: string, companyName: string) => {
    const selected = companies.find((c) => c.id === companyId);
    setLocalContext({ companyId, companyName });
    setLocalCompany(selected);
    if (onSelectCompany) {
      onSelectCompany(companyId, companyName);
    }
    setShowCompanySelector(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} onKeyDown={(e) => e.key === "Escape" && onClose()} role="button" tabIndex={0} aria-label="Close panel" />
      <div className="relative ml-auto w-[90vw] sm:w-[800px] h-full bg-background shadow-2xl flex">
        <div className="w-80 border-r flex flex-col shrink-0 overflow-hidden">
          {showCompanySelector ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-indigo-600" />
                  <h3 className="font-semibold text-sm">Select Company</h3>
                </div>
                <button onClick={onClose} aria-label="Close panel" className="p-1 hover:bg-muted rounded">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {companies.slice(0, 20).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCompany(c.id, c.name)}
                      aria-label={`Select ${c.name}`}
                      className="w-full text-left p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{c.name}</span>
                        {c.riskRating === "HIGH" || c.riskRating === "CRITICAL" ? (
                          <Badge variant="destructive" className="text-xs h-5">
                            {c.riskRating}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs h-5">
                            {c.riskRating}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{c.industry}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-indigo-600" />
                    <h3 className="font-semibold text-sm">Quick Commands</h3>
                  </div>
                  <button
                    onClick={() => setShowCommands(!showCommands)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    {showCommands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {showCommands && (
                <div className="overflow-y-auto flex-none border-b" style={{ maxHeight: "320px" }}>
                  <AICommandPalette
                    contextCompanyId={localContext.companyId}
                    contextCompanyName={localContext.companyName}
                    onCommandSelect={(command, prompt) => { handleSendMessage(prompt, command); }}
                  />
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                <AIContextPanel company={localCompany} alerts={localAlerts} />
              </div>

              <div className="p-3 border-t bg-muted/30 shrink-0">
                {localContext.companyId ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                      {localContext.companyName}
                    </span>
                    <button
                      onClick={() => setShowCompanySelector(true)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium shrink-0"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCompanySelector(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Select Company
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">AI Copilot</span>
            </div>
            {localContext.companyId && (
              <Badge variant="outline" className="text-xs">
                {localContext.companyName}
              </Badge>
            )}
          </div>
          <AIChat
            messages={messages}
            context={localContext}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}