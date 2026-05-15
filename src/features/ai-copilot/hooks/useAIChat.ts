import { useState } from "react";
import { AICommand, AIConversationContext } from "@/types";

const AI_RESPONSES: Record<AICommand, (context: AIConversationContext) => string> = {
  SUMMARIZE_COMPANY: (ctx) =>
    `Based on the available data, ${ctx.companyName || "[Company]"} is a well-established client with strong fundamentals. Key highlights:\n\n• **Industry Position**: Leading player in its sector with stable market share\n• **Financial Health**: DSCR at 1.3x above the minimum threshold of 1.0x\n• **Relationship History**: 5-year banking relationship with clean repayment record\n• **Risk Profile**: Moderate risk with no red flags identified\n\n**Recommendation**: Continue monitoring quarterly. No immediate action required.`,

  ANALYZE_FINANCIALS: (ctx) =>
    `Financial Analysis for ${ctx.companyName || "[Company]"}\n\n**Liquidity Ratios**\n• Current Ratio: 1.5x (Healthy - above 1.2x threshold)\n• Quick Ratio: 1.2x (Adequate)\n\n**Solvency Ratios**\n• Debt-to-Equity: 2.1x (Moderate leverage)\n• Interest Coverage: 3.2x (Comfortable)\n\n**Profitability Ratios**\n• ROE: 14.2% (Above industry average of 11%)\n• ROA: 4.8% (Stable)\n• Net Profit Margin: 8.5% (Healthy)\n\n**Activity Ratios**\n• Asset Turnover: 1.2x\n• Receivable Turnover: 45 days\n\n**Conclusion**: Company demonstrates solid financial performance across all metrics. No concerns identified.`,

  GENERATE_PROPOSAL: (ctx) =>
    `**CREDIT PROPOSAL DRAFT**\n\n**Company**: ${ctx.companyName || "[Company]"}\n**Facility**: Working Capital Expansion\n**Amount**: Requested $5,000,000\n\n**1. Executive Summary**\n${ctx.companyName || "[Company]"} is requesting working capital expansion to support Q4 growth. The company has maintained a strong relationship with the bank for 5 years with clean repayment record.\n\n**2. Financial Analysis**\n• Total Exposure: $12M (existing)\n• Proposed Increase: $5M\n• New Total Exposure: $17M\n• DSCR: 1.3x (proposed)\n• Utilization: 65% (projected)\n\n**3. Risk Assessment**\n• Risk Rating: MEDIUM\n• Mitigants: Strong cash flow, established relationship, adequate collateral\n\n**4. Recommendation**\nAPPROVE with standard covenants and quarterly review.`,

  GENERATE_CALL_REPORT: (ctx) =>
    `**CALL REPORT**\n\n**Company**: ${ctx.companyName || "[Company]"}\n**Date**: ${new Date().toLocaleDateString()}\n**RM**: [RM Name]\n**Purpose**: Quarterly Review Meeting\n\n**Attendees**:\n• CFO: [Name]\n• Finance Director: [Name]\n\n**Key Discussion Points**:\n1. Q3 performance review - revenue up 8% YoY\n2. Expansion plans for Q1 next year\n3. Cash flow management improvements\n4. Request for temporary limit increase\n\n**Action Items**:\n• Prepare revised cash flow projection\n• Review collateral adequacy\n• Schedule follow-up technical discussion\n\n**Next Steps**: Present proposal at next committee meeting.`,

  EXPLAIN_RISK: (ctx) =>
    `**Risk Analysis for ${ctx.companyName || "[Company]"}**\n\n**Triggered Risk Signals**:\n\n1. **Revenue Decline** - 12% YoY decrease detected\n   - Severity: MEDIUM\n   - Context: Industry-wide softening observed\n   - Impact: Moderate on debt servicing capability\n\n2. **High Utilization** - Facility usage at 89%\n   - Severity: HIGH\n   - Context: Approaching covenant threshold\n   - Impact: Requires immediate attention\n\n**Recommended Actions**:\n• Schedule client meeting within 2 weeks\n• Request updated financial statements\n• Consider temporary moratorium on new facilities\n• Increase monitoring frequency to monthly\n\n**Overall Risk Assessment**: ELEVATED - Proactive engagement recommended.`,

  COMPARE_INDUSTRY: (ctx) =>
    `**Industry Comparison: ${ctx.companyName || "[Company]"}**\n\n| Metric | Company | Industry Avg | Rating |\n|--------|---------|--------------|--------|\n| ROE | 14.2% | 11.0% | ✅ Above |\n| Net Margin | 8.5% | 6.2% | ✅ Above |\n| Current Ratio | 1.5x | 1.3x | ✅ Above |\n| Debt/Equity | 2.1x | 2.4x | ✅ Below |\n| Asset Turnover | 1.2x | 1.0x | ✅ Above |\n\n**Conclusion**: ${ctx.companyName || "[Company]"} outperforms industry peers across most metrics, demonstrating operational efficiency and prudent financial management. The company's ROE exceeds the industry average by 29%, indicating superior returns on shareholder capital.`,

  PREPARE_COMMITTEE_QA: (ctx) =>
    `**Anticipated Committee Q&A: ${ctx.companyName || "[Company]"}**\n\n**Financial Questions**:\n\nQ: Why is DSCR at 1.3x when industry average is 1.5x?\nA: Company is in a growth phase with elevated capital expenditure. Core cash flow remains strong at $3.2M annually.\n\nQ: What is the purpose of the additional facility?\nA: Working capital for Q4 inventory buildup and partial equipment upgrade to improve operational efficiency.\n\nQ: How will this impact concentration risk?\nA: Total exposure will be $17M (27% of portfolio). Within single-obligor limits. Mitigated by diversified revenue streams.\n\n**Risk Mitigation Points**:\n• Collateral coverage at 150% (LTV 67%)\n• Personal guarantee from principal shareholder\n• Quarterly financial covenants monitoring\n\n**Recommendation**: Proceed with approval subject to standard conditions.`,

  SUMMARIZE_DOCUMENT: (ctx) =>
    `**Document Summary**\n\n**Source**: Financial Statement FY2024\n**Company**: ${ctx.companyName || "[Company]"}\n**Extracted Key Points**:\n\n• Total Revenue: $45.2M (+8% YoY)\n• Net Profit: $3.8M (+12% YoY)\n• Total Assets: $52.1M (+15% YoY)\n• Total Liabilities: $31.2M (+10% YoY)\n• Debt/Equity: 2.1x (improved from 2.4x)\n\n• Cash & Equivalents: $4.2M\n• Working Capital: $8.5M\n\n**Key Observations**:\n1. Steady revenue growth trajectory maintained\n2. Profit margins improving due to operational efficiency\n3. Balance sheet strengthening with reduced leverage\n4. Adequate liquidity buffer for operations\n\n**AI Assessment**: FAVORABLE - Document shows healthy financial performance.`,

  FREE_FORM: (ctx) =>
    `Thank you for your question about ${ctx.companyName || "[Company]"}.\n\nBased on the available data, here's my analysis:\n\n• The company demonstrates solid fundamentals with stable cash flow generation\n• Financial metrics are within acceptable ranges for the credit facility\n• No critical risk signals detected at this time\n• Relationship history shows consistent compliance with covenants\n\nWould you like me to:\n1. Generate a detailed financial analysis?\n2. Prepare a credit proposal draft?\n3. Explain any specific risk signals?\n\nSimply ask or select a command from the palette.`,
};

export function useMockAIResponse() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (
    content: string,
    command: AICommand | undefined,
    context: AIConversationContext
  ): Promise<string> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    let response: string;
    if (command && command !== "FREE_FORM") {
      response = AI_RESPONSES[command](context);
    } else {
      response = AI_RESPONSES.FREE_FORM(context);
    }

    setIsLoading(false);
    return response;
  };

  return { sendMessage, isLoading };
}