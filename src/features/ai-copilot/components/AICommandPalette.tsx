import { AICommand, AICommandSuggestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  BarChart3,
  FileText,
  Phone,
  AlertTriangle,
  TrendingUp,
  Users,
  FileCheck,
  Sparkles,
} from "lucide-react";

const COMMAND_SUGGESTIONS: AICommandSuggestion[] = [
  {
    command: "SUMMARIZE_COMPANY",
    label: "Summarize Company",
    description: "Get a quick overview of the company profile",
    prompt: "Summarize the company profile and key metrics for [Company Name]",
    icon: "Building2",
  },
  {
    command: "ANALYZE_FINANCIALS",
    label: "Analyze Financials",
    description: "Review financial statements and ratios",
    prompt: "Analyze the financial statements and key ratios for [Company Name]",
    icon: "BarChart3",
  },
  {
    command: "GENERATE_PROPOSAL",
    label: "Generate Proposal",
    description: "Draft a credit proposal for the committee",
    prompt: "Generate a draft credit proposal for [Company Name] working capital request",
    icon: "FileText",
  },
  {
    command: "GENERATE_CALL_REPORT",
    label: "Generate Call Report",
    description: "Create a visit call report from notes",
    prompt: "Generate a call report summary from the recent visit notes for [Company Name]",
    icon: "Phone",
  },
  {
    command: "EXPLAIN_RISK",
    label: "Explain Risk",
    description: "Understand triggered risk signals",
    prompt: "Explain the risk signals detected for [Company Name] and recommended actions",
    icon: "AlertTriangle",
  },
  {
    command: "COMPARE_INDUSTRY",
    label: "Compare Industry",
    description: "Benchmark against industry peers",
    prompt: "Compare [Company Name] financial performance against industry peers",
    icon: "TrendingUp",
  },
  {
    command: "PREPARE_COMMITTEE_QA",
    label: "Prepare Committee Q&A",
    description: "Anticipate committee questions",
    prompt: "Prepare anticipated Q&A for the credit committee review of [Company Name]",
    icon: "Users",
  },
  {
    command: "SUMMARIZE_DOCUMENT",
    label: "Summarize Document",
    description: "Extract key points from documents",
    prompt: "Summarize the key points from the uploaded financial document for [Company Name]",
    icon: "FileCheck",
  },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  BarChart3,
  FileText,
  Phone,
  AlertTriangle,
  TrendingUp,
  Users,
  FileCheck,
};

interface AICommandPaletteProps {
  contextCompanyId?: string;
  contextCompanyName?: string;
  onCommandSelect: (command: AICommand, prompt: string) => void;
}

export function AICommandPalette({ contextCompanyId, contextCompanyName, onCommandSelect }: AICommandPaletteProps) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-indigo-600" />
        <h3 className="font-semibold text-sm">Quick Commands</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {COMMAND_SUGGESTIONS.map((cmd) => {
          const IconComponent = ICONS[cmd.icon] || FileText;
          return (
            <Button
              key={cmd.command}
              variant="outline"
              className="h-auto p-3 flex-col items-start gap-2 text-left"
              onClick={() => onCommandSelect(cmd.command, cmd.prompt)}
            >
              <div className="flex items-center gap-2">
                <IconComponent className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">{cmd.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">{cmd.description}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}