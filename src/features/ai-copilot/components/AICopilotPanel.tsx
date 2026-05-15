import { useState } from "react";
import { AIChatMessage, AICommand, AIConversationContext } from "@/types";
import { AIChat } from "./AIChat";
import { AIContextPanel } from "./AIContextPanel";
import { AICommandPalette } from "./AICommandPalette";
import { useMockAIResponse } from "../hooks/useAIChat";

interface AICopilotPanelProps {
  context: AIConversationContext;
  company: any;
  alerts: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function AICopilotPanel({ context, company, alerts, isOpen, onClose }: AICopilotPanelProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const { sendMessage, isLoading } = useMockAIResponse();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative ml-auto w-[90vw] sm:w-[800px] h-full bg-background shadow-2xl flex">
        <div className="w-80 border-r flex flex-col shrink-0">
          <AICommandPalette
            contextCompanyId={context.companyId}
            contextCompanyName={context.companyName}
            onCommandSelect={(command, prompt) => { handleSendMessage(prompt, command); }}
          />
          <AIContextPanel company={company} alerts={alerts} />
        </div>
        <div className="flex-1 flex flex-col">
          <AIChat
            messages={messages}
            context={context}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}