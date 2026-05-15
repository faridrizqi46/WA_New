import {
  User,
  ApiResponse,
  DashboardKPIs,
  AIInsight,
  ActionItem,
  RiskAlert,
  RiskAlertDetail,
  RiskAlertFilterParams,
  AlertSeverity,
  AlertCategory,
  PipelineStageCount,
  PipelineOpportunity,
  OpportunityDetail,
  PipelineFilterParams,
  PipelineStageSummary,
  PipelineStage,
  Visit,
  VisitStatus,
  VisitType,
  VisitFilterParams,
  VisitChecklistItem,
  Notification,
  NotificationCategory,
  NotificationPriority,
  NotificationFilterParams,
  CreditAnalysis,
  CreditAnalysisFilterParams,
  CommitteeSession,
  CommitteeFilterParams,
  CommitteeStatus,
  CollateralAsset,
  CollateralFilterParams,
  CollateralType,
  CollateralStatus,
  AuditLogEntry,
  AuditLogFilterParams,
  AuditEntityType,
  AdminUser,
  PermissionRole,
  AdminRole,
  Permission,
  UserFilterParams,
  ApprovalMatrixEntry,
  ApprovalTrigger,
  ApprovalTier,
  ApprovalMatrixFilterParams,
  WorkflowSetting,
  WorkflowEntityType,
  WorkflowSettingsFilterParams,
  SystemHealthMetric,
  AISettings,
  IntegrationSetting,
  ComplianceCheckItem,
  ComplianceChecklistFilterParams,
  DocumentVersion,
} from "@/types";


// Simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Users ──────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    email: "rm@bank.com",
    name: "Alex Relationship Manager",
    role: "RM",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "admin@bank.com",
    name: "System Admin",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getMockUsers(): Promise<ApiResponse<User[]>> {
  await delay(400);
  return {
    success: true,
    data: MOCK_USERS,
    meta: { page: 1, limit: 20, total: MOCK_USERS.length },
  };
}

export async function loginMockUser(email: string): Promise<ApiResponse<{ token: string; user: User }>> {
  await delay(600);
  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
      data: null as any,
    };
  }

  return {
    success: true,
    data: {
      token: "mock-jwt-token-abc-123",
      user,
    },
  };
}

// ─── Dashboard ──────────────────────────────────────────────
export const MOCK_DASHBOARD_KPIS: DashboardKPIs = {
  totalPortfolioValue: 124000000,
  activeCustomers: 42,
  pendingApprovals: 8,
  highRiskAccounts: 3,
  unusedLimits: 15000000,
  upcomingRenewals: 5,
  todaysTasks: 12,
};

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: "ai-1",
    type: "RISK",
    title: "Revenue Decline Detected",
    description: "TechCorp Inc. shows a 15% YoY revenue decline in their latest Q3 financials.",
    companyName: "TechCorp Inc.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ai-2",
    type: "OPPORTUNITY",
    title: "Upsell Opportunity",
    description: "Global Logistics is operating near their $5M facility limit for 3 consecutive months.",
    companyName: "Global Logistics",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "ai-3",
    type: "INFO",
    title: "Industry Trend",
    description: "Manufacturing sector showing positive recovery signs in Q4.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const MOCK_ACTION_ITEMS: ActionItem[] = [
  {
    id: "act-1",
    type: "APPROVAL",
    title: "Credit Proposal Review",
    description: "Awaiting your approval for TechCorp Inc.",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    status: "PENDING",
    companyName: "TechCorp Inc.",
  },
  {
    id: "act-2",
    type: "DOCUMENT",
    title: "Missing NPWP",
    description: "Global Logistics annual review is missing updated NPWP document.",
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    status: "PENDING",
    companyName: "Global Logistics",
  },
  {
    id: "act-3",
    type: "TASK",
    title: "Site Visit: PT Maju Bersama",
    description: "Quarterly physical verification.",
    dueDate: new Date(Date.now() + 3600000).toISOString(),
    status: "PENDING",
    companyName: "PT Maju Bersama",
  },
];

export const MOCK_PIPELINE_SNAPSHOT: PipelineStageCount[] = [
  { stage: "Lead", count: 12, value: 34000000 },
  { stage: "In Progress", count: 8, value: 45000000 },
  { stage: "Committee", count: 3, value: 18000000 },
  { stage: "Won", count: 5, value: 27000000 },
];

export async function getMockDashboardKPIs(): Promise<ApiResponse<DashboardKPIs>> {
  await delay(300);
  return { success: true, data: MOCK_DASHBOARD_KPIS };
}

export async function getMockAIInsights(): Promise<ApiResponse<AIInsight[]>> {
  await delay(400);
  return { success: true, data: MOCK_AI_INSIGHTS };
}

export async function getMockActionItems(): Promise<ApiResponse<ActionItem[]>> {
  await delay(350);
  return { success: true, data: MOCK_ACTION_ITEMS };
}

export async function getMockRiskAlerts(): Promise<ApiResponse<RiskAlert[]>> {
  await delay(500);
  return { success: true, data: MOCK_RISK_ALERTS, meta: { page: 1, limit: 50, total: MOCK_RISK_ALERTS.length } };
}

export async function getMockPipelineSnapshot(): Promise<ApiResponse<PipelineStageCount[]>> {
  await delay(200);
  return { success: true, data: MOCK_PIPELINE_SNAPSHOT };
}

// ─── Companies ──────────────────────────────────────────────
import { Company, CompanyFilterParams, CompanyDetail } from "@/types";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-1",
    name: "TechCorp Inc.",
    groupName: "Tech Group Global",
    industry: "Technology",
    region: "Jakarta",
    riskRating: "HIGH",
    totalExposure: 25000000,
    utilizationPct: 85,
    rmId: "user-1",
    rmName: "Alex RM",
    activeAlerts: 2,
    lastActivity: new Date(Date.now() - 86400000 * 2).toISOString(),
    facilityType: "Term Loan",
    revenueRange: "$50M - $100M",
  },
  {
    id: "comp-2",
    name: "PT Sentosa Jaya",
    groupName: "Sentosa Holdings",
    industry: "Manufacturing",
    region: "Surabaya",
    riskRating: "MEDIUM",
    totalExposure: 12000000,
    utilizationPct: 45,
    rmId: "user-1",
    rmName: "Alex RM",
    activeAlerts: 1,
    lastActivity: new Date(Date.now() - 86400000 * 5).toISOString(),
    facilityType: "Working Capital",
    revenueRange: "$10M - $50M",
  },
  {
    id: "comp-3",
    name: "Agro Nusantara",
    groupName: "Nusantara Group",
    industry: "Agriculture",
    region: "Medan",
    riskRating: "CRITICAL",
    totalExposure: 8500000,
    utilizationPct: 95,
    rmId: "user-2",
    rmName: "System Admin",
    activeAlerts: 3,
    lastActivity: new Date(Date.now() - 86400000 * 1).toISOString(),
    facilityType: "Trade Finance",
    revenueRange: "$1M - $10M",
  },
  {
    id: "comp-4",
    name: "Global Logistics",
    groupName: "Global Group",
    industry: "Transportation",
    region: "Jakarta",
    riskRating: "LOW",
    totalExposure: 50000000,
    utilizationPct: 92, // Upsell
    rmId: "user-1",
    rmName: "Alex RM",
    activeAlerts: 0,
    lastActivity: new Date(Date.now() - 86400000 * 12).toISOString(),
    facilityType: "Term Loan",
    revenueRange: "$100M+",
  },
  {
    id: "comp-5",
    name: "Bintang Retail",
    industry: "Retail",
    region: "Bandung",
    riskRating: "MEDIUM",
    totalExposure: 4000000,
    utilizationPct: 60,
    rmId: "user-1",
    rmName: "Alex RM",
    activeAlerts: 0,
    lastActivity: new Date(Date.now() - 86400000 * 20).toISOString(), // Renewal Soon (simulated)
    facilityType: "Working Capital",
    revenueRange: "$10M - $50M",
  },
];

export async function getMockCompanies(params?: CompanyFilterParams): Promise<ApiResponse<Company[]>> {
  await delay(500); // Simulate network
  let filtered = [...MOCK_COMPANIES];

  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.groupName?.toLowerCase().includes(q)
      );
    }
    if (params.segment && params.segment !== "All") {
      if (params.segment === "High Risk") {
        filtered = filtered.filter((c) => c.riskRating === "HIGH" || c.riskRating === "VERY_HIGH" || c.riskRating === "CRITICAL");
      } else if (params.segment === "Upsell") {
        filtered = filtered.filter((c) => c.utilizationPct > 80 && c.riskRating === "LOW");
      } else if (params.segment === "Renewal") {
        // Just simulate by picking some
        filtered = filtered.filter((c) => c.name.includes("Bintang"));
      }
    }
    if (params.industry && params.industry !== "All") {
      filtered = filtered.filter((c) => c.industry === params.industry);
    }
    if (params.riskRating && params.riskRating !== "All") {
      filtered = filtered.filter((c) => c.riskRating === params.riskRating);
    }
    if (params.rmOwner && params.rmOwner !== "All") {
      filtered = filtered.filter((c) => c.rmName === params.rmOwner);
    }
    
    // Sort
    if (params.sortBy) {
      const key = params.sortBy as keyof Company;
      filtered.sort((a, b) => {
        const valA = a[key] ?? "";
        const valB = b[key] ?? "";
        if (valA < valB) return params.sortOrder === "desc" ? 1 : -1;
        if (valA > valB) return params.sortOrder === "desc" ? -1 : 1;
        return 0;
      });
    }

    // Paginate
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginated,
      meta: {
        page,
        limit,
        total: filtered.length,
      },
    };
  }

  return {
    success: true,
    data: filtered,
    meta: {
      page: 1,
      limit: 10,
      total: filtered.length,
    },
  };
}

// ─── Company Detail ──────────────────────────────────────────────

const MOCK_COMPANY_DETAILS: Record<string, Omit<CompanyDetail, keyof Company>> = {
  "comp-1": {
    address: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    taxId: "01.234.567.8-901.000",
    legalStatus: "Perseroan Terbatas (PT)",
    incorporatedDate: "2005-03-15",
    website: "https://techcorp.id",
    description: "TechCorp Inc. is a leading software and IT services company serving major banks and financial institutions across Southeast Asia.",
    facilities: [
      { id: "fac-1", type: "Term Loan", limit: 15000000, outstanding: 12750000, utilizationPct: 85, interestRate: 9.5, maturityDate: "2027-06-30", status: "ACTIVE", collateralCoverage: 125 },
      { id: "fac-2", type: "Working Capital", limit: 10000000, outstanding: 8500000, utilizationPct: 85, interestRate: 10.25, maturityDate: "2026-12-31", status: "ACTIVE", collateralCoverage: 110 },
    ],
    financials: [
      { year: 2023, revenue: 75000000, netProfit: 5250000, totalAssets: 120000000, totalLiabilities: 85000000, dscr: 0.8, leverage: 2.4 },
      { year: 2022, revenue: 88000000, netProfit: 7040000, totalAssets: 115000000, totalLiabilities: 78000000, dscr: 1.2, leverage: 2.1 },
      { year: 2021, revenue: 82000000, netProfit: 6560000, totalAssets: 108000000, totalLiabilities: 72000000, dscr: 1.4, leverage: 1.9 },
    ],
    contacts: [
      { id: "con-1", name: "Budi Santoso", title: "CFO", email: "budi.s@techcorp.id", phone: "+62-21-5551234", isPrimary: true },
      { id: "con-2", name: "Rina Wahyuni", title: "Director", email: "rina.w@techcorp.id", isPrimary: false },
    ],
    documents: [
      { id: "doc-1", name: "Audited Financial Statement 2023", type: "FINANCIAL_STATEMENT", uploadedAt: new Date(Date.now() - 86400000 * 30).toISOString(), status: "VALID" },
      { id: "doc-2", name: "Insurance Policy", type: "COLLATERAL", uploadedAt: new Date(Date.now() - 86400000 * 90).toISOString(), expiresAt: new Date(Date.now() - 86400000 * 2).toISOString(), status: "EXPIRED" },
      { id: "doc-3", name: "NPWP Certificate", type: "COMPLIANCE", uploadedAt: new Date(Date.now() - 86400000 * 60).toISOString(), status: "VALID" },
    ],
    collaterals: [
      { id: "col-1", type: "Land & Building", description: "Office complex at Jl. Gatot Subroto, 1,200 sqm", appraisedValue: 18000000, appraisalDate: "2023-08-15", coverageRatio: 141, status: "VALID" },
      { id: "col-2", type: "Machinery & Equipment", description: "Server farm & networking equipment", appraisedValue: 4500000, appraisalDate: "2023-05-10", coverageRatio: 35, status: "PENDING_APPRAISAL" },
    ],
    riskAlerts: [
      { id: "risk-1", companyId: "comp-1", companyName: "TechCorp Inc.", category: "FINANCIAL", severity: "HIGH", title: "DSCR below 1.0x", description: "Latest financial statement indicates Debt Service Coverage Ratio dropped to 0.8x, below the covenant threshold of 1.2x.", createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(), createdBy: "user-4", updatedBy: "user-4" },
      { id: "risk-x2", companyId: "comp-1", companyName: "TechCorp Inc.", category: "COMPLIANCE", severity: "MEDIUM", title: "Expired Collateral Insurance", description: "Insurance policy for office complex collateral expired 2 days ago.", createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString(), createdBy: "user-4", updatedBy: "user-4" },
    ],
    aiInsights: [
      { id: "ai-c1", type: "RISK", title: "Revenue Decline Trend", description: "Revenue has declined 15% YoY in 2023. If this continues in 2024, covenant breach is likely within 2 quarters.", companyId: "comp-1", companyName: "TechCorp Inc.", createdAt: new Date().toISOString() },
      { id: "ai-c2", type: "OPPORTUNITY", title: "Cross-sell FX Hedging", description: "TechCorp has significant USD-denominated contracts. FX hedging product could reduce their currency risk and generate fee income.", companyId: "comp-1", companyName: "TechCorp Inc.", createdAt: new Date(Date.now() - 3600000).toISOString() },
    ],
    auditLogs: [
      { id: "aud-1", action: "Financial Statement Updated", performedBy: "Alex RM", performedAt: new Date(Date.now() - 86400000 * 30).toISOString(), notes: "Q3 2023 audited financials uploaded" },
      { id: "aud-2", action: "Risk Rating Changed: MEDIUM → HIGH", performedBy: "Risk Team", performedAt: new Date(Date.now() - 86400000 * 14).toISOString(), notes: "DSCR below covenant threshold" },
      { id: "aud-3", action: "Site Visit Completed", performedBy: "Alex RM", performedAt: new Date(Date.now() - 86400000 * 7).toISOString() },
    ],
  },
};

export async function getMockCompanyById(id: string): Promise<ApiResponse<CompanyDetail>> {
  await delay(600);
  const base = MOCK_COMPANIES.find((c) => c.id === id);
  if (!base) {
    return { success: false, message: "Company not found", data: null as any };
  }
  const detail = MOCK_COMPANY_DETAILS[id];
  // For companies without detailed mock data, generate placeholder data
  const fullDetail: CompanyDetail = {
    ...base,
    address: detail?.address ?? "Jl. Sudirman No. 1, Jakarta",
    taxId: detail?.taxId ?? "99.999.999.9-999.000",
    legalStatus: detail?.legalStatus ?? "Perseroan Terbatas (PT)",
    incorporatedDate: detail?.incorporatedDate ?? "2010-01-01",
    description: detail?.description ?? `${base.name} is one of the companies in your portfolio under the ${base.industry ?? "General"} sector.`,
    facilities: detail?.facilities ?? [
      { id: "fac-gen-1", type: base.facilityType ?? "Working Capital", limit: base.totalExposure, outstanding: base.totalExposure * (base.utilizationPct / 100), utilizationPct: base.utilizationPct, interestRate: 9.75, maturityDate: "2027-01-01", status: "ACTIVE", collateralCoverage: 120 },
    ],
    financials: detail?.financials ?? [
      { year: 2023, revenue: 30000000, netProfit: 2100000, totalAssets: 50000000, totalLiabilities: 30000000, dscr: 1.5, leverage: 1.8 },
      { year: 2022, revenue: 28000000, netProfit: 1960000, totalAssets: 47000000, totalLiabilities: 28000000, dscr: 1.6, leverage: 1.7 },
    ],
    contacts: detail?.contacts ?? [
      { id: "con-gen-1", name: "Direktur Utama", title: "CEO", email: `ceo@${base.name.toLowerCase().replace(/\s/g, "")}.id`, isPrimary: true },
    ],
    documents: detail?.documents ?? [
      { id: "doc-gen-1", name: "Audited Financial Statement 2023", type: "FINANCIAL_STATEMENT", uploadedAt: new Date(Date.now() - 86400000 * 45).toISOString(), status: "VALID" },
    ],
    collaterals: detail?.collaterals ?? [
      { id: "col-gen-1", type: "Land & Building", description: "Primary collateral", appraisedValue: base.totalExposure * 1.3, appraisalDate: "2023-06-01", coverageRatio: 130, status: "VALID" },
    ],
    riskAlerts: detail?.riskAlerts ?? [],
    aiInsights: detail?.aiInsights ?? [
      { id: `ai-gen-${id}`, type: "INFO", title: "Portfolio Performance", description: `${base.name} is performing within expected parameters. No immediate action required.`, companyId: id, companyName: base.name, createdAt: new Date().toISOString() },
    ],
    auditLogs: detail?.auditLogs ?? [
      { id: "aud-gen-1", action: "Account Onboarded", performedBy: base.rmName, performedAt: base.lastActivity, notes: "Initial account setup completed" },
    ],
  };
  return { success: true, data: fullDetail };
}

// ─── Pipeline ──────────────────────────────────────────────

export const PIPELINE_STAGE_CONFIG: Record<PipelineStage, { label: string; color: string; isTerminal: boolean }> = {
  LEAD:                 { label: "Lead",               color: "#94a3b8", isTerminal: false },
  INITIAL_CONTACT:      { label: "Initial Contact",    color: "#60a5fa", isTerminal: false },
  FINANCIAL_COLLECTION: { label: "Financial Docs",     color: "#a78bfa", isTerminal: false },
  ANALYSIS:             { label: "Analysis",           color: "#f59e0b", isTerminal: false },
  PROPOSAL:             { label: "Proposal",           color: "#fb923c", isTerminal: false },
  COMMITTEE:            { label: "Committee",          color: "#f97316", isTerminal: false },
  APPROVED:             { label: "Approved",           color: "#10b981", isTerminal: true  },
  REJECTED:             { label: "Rejected",           color: "#ef4444", isTerminal: true  },
};

export const MOCK_OPPORTUNITIES: PipelineOpportunity[] = [
  { id: "opp-1", title: "Working Capital Expansion", companyId: "comp-1", companyName: "TechCorp Inc.", industry: "Technology", rmId: "user-1", rmName: "Alex RM", stage: "ANALYSIS", dealValue: 5000000, probability: 60, notes: "Client needs additional working capital to fund Q4 expansion.", createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "opp-2", title: "Term Loan Refinancing", companyId: "comp-2", companyName: "PT Sentosa Jaya", industry: "Manufacturing", rmId: "user-1", rmName: "Alex RM", stage: "PROPOSAL", dealValue: 8000000, probability: 75, notes: "Refinancing existing 3-year term loan at better rate.", createdAt: new Date(Date.now() - 86400000 * 45).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: "opp-3", title: "Trade Finance Facility", companyId: "comp-3", companyName: "Agro Nusantara", industry: "Agriculture", rmId: "user-2", rmName: "System Admin", stage: "INITIAL_CONTACT", dealValue: 3000000, probability: 25, createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: "opp-4", title: "Fleet Financing", companyId: "comp-4", companyName: "Global Logistics", industry: "Transportation", rmId: "user-1", rmName: "Alex RM", stage: "COMMITTEE", dealValue: 12000000, probability: 85, notes: "Financing for 15 new trucks for fleet expansion.", createdAt: new Date(Date.now() - 86400000 * 60).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: "opp-5", title: "Store Renovation Loan", companyId: "comp-5", companyName: "Bintang Retail", industry: "Retail", rmId: "user-1", rmName: "Alex RM", stage: "LEAD", dealValue: 1500000, probability: 15, createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "opp-6", title: "Digital Transformation Loan", companyId: "comp-1", companyName: "TechCorp Inc.", industry: "Technology", rmId: "user-1", rmName: "Alex RM", stage: "APPROVED", dealValue: 7500000, probability: 100, notes: "Approved in last committee session.", createdAt: new Date(Date.now() - 86400000 * 90).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 7).toISOString() },
  { id: "opp-7", title: "Inventory Financing", companyId: "comp-2", companyName: "PT Sentosa Jaya", industry: "Manufacturing", rmId: "user-1", rmName: "Alex RM", stage: "FINANCIAL_COLLECTION", dealValue: 2500000, probability: 40, createdAt: new Date(Date.now() - 86400000 * 20).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "opp-8", title: "Export Financing", companyId: "comp-3", companyName: "Agro Nusantara", industry: "Agriculture", rmId: "user-2", rmName: "System Admin", stage: "REJECTED", dealValue: 4000000, probability: 0, notes: "Rejected due to insufficient DSCR.", createdAt: new Date(Date.now() - 86400000 * 120).toISOString(), updatedAt: new Date(Date.now() - 86400000 * 14).toISOString() },
];

const MOCK_OPPORTUNITY_DETAILS: Record<string, Omit<OpportunityDetail, keyof PipelineOpportunity>> = {
  "opp-1": {
    activities: [
      { id: "act-1", opportunityId: "opp-1", type: "STAGE_CHANGE", description: "Stage moved from Financial Collection to Analysis", performedBy: "Alex RM", performedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: "act-2", opportunityId: "opp-1", type: "MEETING", description: "Follow-up meeting with CFO Budi Santoso. Discussed Q4 revenue projections.", performedBy: "Alex RM", performedAt: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: "act-3", opportunityId: "opp-1", type: "NOTE", description: "Client confirmed they need funds by end of October.", performedBy: "Alex RM", performedAt: new Date(Date.now() - 86400000 * 14).toISOString() },
    ],
    tasks: [
      { id: "task-1", opportunityId: "opp-1", title: "Request latest financial statements", completed: true, dueDate: new Date(Date.now() - 86400000 * 10).toISOString() },
      { id: "task-2", opportunityId: "opp-1", title: "Complete financial ratio analysis", completed: false, dueDate: new Date(Date.now() + 86400000 * 2).toISOString() },
      { id: "task-3", opportunityId: "opp-1", title: "Prepare credit proposal draft", completed: false, dueDate: new Date(Date.now() + 86400000 * 5).toISOString() },
    ],
    documents: [
      { id: "pdoc-1", name: "Audited Financials 2023.pdf", uploadedAt: new Date(Date.now() - 86400000 * 12).toISOString(), uploadedBy: "Alex RM" },
      { id: "pdoc-2", name: "Company Profile.pdf", uploadedAt: new Date(Date.now() - 86400000 * 25).toISOString(), uploadedBy: "Alex RM" },
    ],
  },
};

export async function getMockOpportunities(params?: PipelineFilterParams): Promise<ApiResponse<PipelineOpportunity[]>> {
  await delay(400);
  let filtered = [...MOCK_OPPORTUNITIES];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(o => o.title.toLowerCase().includes(q) || o.companyName.toLowerCase().includes(q));
    }
    if (params.stage && params.stage !== "ALL") {
      filtered = filtered.filter(o => o.stage === params.stage);
    }
    if (params.rmOwner && params.rmOwner !== "All") {
      filtered = filtered.filter(o => o.rmName === params.rmOwner);
    }
    if (params.industry && params.industry !== "All") {
      filtered = filtered.filter(o => o.industry === params.industry);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockOpportunityById(id: string): Promise<ApiResponse<OpportunityDetail>> {
  await delay(500);
  const base = MOCK_OPPORTUNITIES.find(o => o.id === id);
  if (!base) return { success: false, message: "Opportunity not found", data: null as any };
  const detail = MOCK_OPPORTUNITY_DETAILS[id];
  return {
    success: true,
    data: {
      ...base,
      activities: detail?.activities ?? [{ id: `act-gen-${id}`, opportunityId: id, type: "NOTE", description: "Opportunity created.", performedBy: base.rmName, performedAt: base.createdAt }],
      tasks: detail?.tasks ?? [
        { id: `task-gen-1-${id}`, opportunityId: id, title: "Initial client contact", completed: true },
        { id: `task-gen-2-${id}`, opportunityId: id, title: "Collect required documents", completed: false, dueDate: new Date(Date.now() + 86400000 * 7).toISOString() },
      ],
      documents: detail?.documents ?? [],
    },
  };
}

export async function getMockPipelineSummary(): Promise<ApiResponse<PipelineStageSummary[]>> {
  await delay(300);
  const stages: PipelineStage[] = ["LEAD", "INITIAL_CONTACT", "FINANCIAL_COLLECTION", "ANALYSIS", "PROPOSAL", "COMMITTEE", "APPROVED", "REJECTED"];
  const summary: PipelineStageSummary[] = stages.map(stage => {
    const config = PIPELINE_STAGE_CONFIG[stage];
    const opps = MOCK_OPPORTUNITIES.filter(o => o.stage === stage);
    return { stage, label: config.label, count: opps.length, totalValue: opps.reduce((s, o) => s + o.dealValue, 0), isTerminal: config.isTerminal };
  });
  return { success: true, data: summary, meta: { page: 1, limit: 8, total: 8 } };
}

// ─── Visits ──────────────────────────────────────────────

export const MOCK_VISITS: Visit[] = [
  {
    id: "visit-1",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    rmId: "user-1",
    rmName: "Alex RM",
    visitType: "VERIFICATION",
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: "SCHEDULED",
    purpose: "Physical asset verification for collateral",
    location: "Jakarta, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "visit-2",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    rmId: "user-1",
    rmName: "Alex RM",
    visitType: "RELATIONSHIP",
    scheduledAt: new Date(Date.now() + 86400000 * 1).toISOString(),
    status: "SCHEDULED",
    purpose: "Quarterly relationship review with CFO",
    location: "Surabaya, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "visit-3",
    companyId: "comp-3",
    companyName: "Agro Nusantara",
    rmId: "user-2",
    rmName: "System Admin",
    visitType: "COMPLIANCE",
    scheduledAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    checkedInAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "COMPLETED",
    latitude: -6.2088,
    longitude: 106.8456,
    summary: "On-site compliance check completed. All documents verified. Asset condition good.",
    notes: "Client was very cooperative. All NPWP and SIUP documents presented.",
    location: "Bandung, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "visit-4",
    companyId: "comp-4",
    companyName: "Global Logistics",
    rmId: "user-1",
    rmName: "Alex RM",
    visitType: "COLLECTION",
    scheduledAt: new Date().toISOString(),
    checkedInAt: new Date().toISOString(),
    status: "IN_PROGRESS",
    latitude: -7.2575,
    longitude: 112.7521,
    purpose: "Collection follow-up for overdue payment",
    location: "Semarang, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "visit-5",
    companyId: "comp-5",
    companyName: "Bintang Retail",
    rmId: "user-1",
    rmName: "Alex RM",
    visitType: "RENEWAL",
    scheduledAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    checkedInAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    status: "COMPLETED",
    latitude: -6.1751,
    longitude: 106.865,
    summary: "Facility renewal discussion. Client committed to submitting renewal application by end of month.",
    notes: "Positive meeting. Client satisfied with current terms.",
    location: "Jakarta, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: "visit-6",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    rmId: "user-1",
    rmName: "Alex RM",
    visitType: "VERIFICATION",
    scheduledAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    checkedInAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    status: "COMPLETED",
    latitude: -6.2088,
    longitude: 106.8456,
    summary: "Machine verification at warehouse. Equipment condition verified as per agreement.",
    location: "Jakarta, Indonesia",
    createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

export const MOCK_VISIT_CHECKLIST: VisitChecklistItem[] = [
  { id: "chk-1", visitId: "visit-1", label: "Verify physical location address", checked: false, order: 1 },
  { id: "chk-2", visitId: "visit-1", label: "Photo of collateral asset", checked: false, order: 2 },
  { id: "chk-3", visitId: "visit-1", label: "Photo of company signboard", checked: false, order: 3 },
  { id: "chk-4", visitId: "visit-1", label: "Verify asset condition", checked: false, order: 4 },
  { id: "chk-5", visitId: "visit-1", label: "Obtain signature on checklist", checked: false, order: 5 },
  { id: "chk-6", visitId: "visit-3", label: "Verify NPWP document", checked: true, order: 1 },
  { id: "chk-7", visitId: "visit-3", label: "Verify SIUP document", checked: true, order: 2 },
  { id: "chk-8", visitId: "visit-3", label: "Photo of business premises", checked: true, order: 3 },
  { id: "chk-9", visitId: "visit-3", label: "Photo of equipment", checked: true, order: 4 },
  { id: "chk-10", visitId: "visit-5", label: "Discuss renewal terms", checked: true, order: 1 },
  { id: "chk-11", visitId: "visit-5", label: "Collect updated financial statements", checked: true, order: 2 },
  { id: "chk-12", visitId: "visit-5", label: "Obtain client signature on renewal intent", checked: true, order: 3 },
];

export async function getMockVisits(params?: VisitFilterParams): Promise<ApiResponse<Visit[]>> {
  await delay(400);
  let filtered = [...MOCK_VISITS];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(v => v.companyName.toLowerCase().includes(q) || v.purpose?.toLowerCase().includes(q));
    }
    if (params.status && params.status !== "ALL") {
      filtered = filtered.filter(v => v.status === params.status);
    }
    if (params.visitType && params.visitType !== "ALL") {
      filtered = filtered.filter(v => v.visitType === params.visitType);
    }
    if (params.rmOwner && params.rmOwner !== "All") {
      filtered = filtered.filter(v => v.rmName === params.rmOwner);
    }
    if (params.companyId) {
      filtered = filtered.filter(v => v.companyId === params.companyId);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockVisitById(id: string): Promise<ApiResponse<Visit>> {
  await delay(400);
  const visit = MOCK_VISITS.find(v => v.id === id);
  if (!visit) return { success: false, message: "Visit not found", data: null as any };
  return { success: true, data: visit };
}

export async function getMockVisitChecklist(visitId: string): Promise<ApiResponse<VisitChecklistItem[]>> {
  await delay(200);
  const items = MOCK_VISIT_CHECKLIST.filter(c => c.visitId === visitId);
  return { success: true, data: items, meta: { page: 1, limit: 50, total: items.length } };
}

export const VISIT_TYPE_CONFIG: Record<VisitType, { label: string; color: string; icon: string }> = {
  VERIFICATION: { label: "Verification", color: "#f59e0b", icon: "ShieldCheck" },
  RELATIONSHIP: { label: "Relationship", color: "#60a5fa", icon: "Users" },
  COMPLIANCE: { label: "Compliance", color: "#ef4444", icon: "ClipboardCheck" },
  COLLECTION: { label: "Collection", color: "#10b981", icon: "Banknote" },
  RENEWAL: { label: "Renewal", color: "#8b5cf6", icon: "FileText" },
};

export const VISIT_STATUS_CONFIG: Record<VisitStatus, { label: string; color: string; bgColor: string }> = {
  SCHEDULED: { label: "Scheduled", color: "#94a3b8", bgColor: "bg-slate-100" },
  IN_PROGRESS: { label: "In Progress", color: "#f59e0b", bgColor: "bg-amber-100" },
  COMPLETED: { label: "Completed", color: "#10b981", bgColor: "bg-emerald-100" },
  CANCELLED: { label: "Cancelled", color: "#ef4444", bgColor: "bg-red-100" },
};

// ─── Notifications ──────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "High Risk Alert Triggered",
    description: "PT Sentosa Jaya has triggered a high-risk alert due to 30% revenue decline.",
    category: "RISK",
    priority: "HIGH",
    isRead: false,
    actionUrl: "/risk-monitoring",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "notif-2",
    title: "Approval Required",
    description: "Working Capital Expansion deal requires your approval before committee.",
    category: "APPROVAL",
    priority: "HIGH",
    isRead: false,
    actionUrl: "/pipeline/opp-1",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "notif-3",
    title: "Visit Completed",
    description: "Compliance visit to Agro Nusantara has been completed and awaiting review.",
    category: "RELATIONSHIP",
    priority: "MEDIUM",
    isRead: true,
    actionUrl: "/visits/visit-3",
    companyId: "comp-3",
    companyName: "Agro Nusantara",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    readAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "notif-4",
    title: "Document Expiring Soon",
    description: "NPWP document for Bintang Retail will expire in 30 days. Please follow up.",
    category: "COMPLIANCE",
    priority: "MEDIUM",
    isRead: false,
    actionUrl: "/companies/comp-5",
    companyId: "comp-5",
    companyName: "Bintang Retail",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "notif-5",
    title: "New Committee Session",
    description: "A new committee session has been scheduled for Term Loan Refinancing proposal.",
    category: "APPROVAL",
    priority: "CRITICAL",
    isRead: false,
    actionUrl: "/committee",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "notif-6",
    title: "Task Reminder",
    description: "Complete financial ratio analysis for TechCorp Inc. by tomorrow.",
    category: "TASKS",
    priority: "LOW",
    isRead: true,
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    readAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

export async function getMockNotifications(params?: NotificationFilterParams): Promise<ApiResponse<Notification[]>> {
  await delay(300);
  let filtered = [...MOCK_NOTIFICATIONS];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(n => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q));
    }
    if (params.category && params.category !== "ALL") {
      filtered = filtered.filter(n => n.category === params.category);
    }
    if (params.priority && params.priority !== "ALL") {
      filtered = filtered.filter(n => n.priority === params.priority);
    }
    if (params.isRead !== undefined) {
      filtered = filtered.filter(n => n.isRead === params.isRead);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

// ─── Risk Alerts ──────────────────────────────────────────────

export const MOCK_RISK_ALERTS: RiskAlert[] = [
  {
    id: "alert-1",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    category: "FINANCIAL",
    severity: "CRITICAL",
    title: "Revenue Decline >20% YoY",
    description: "Company reported 32% revenue decline compared to last year. Immediate analysis required.",
    acknowledgedAt: undefined,
    acknowledgedBy: undefined,
    assignedTo: "user-1",
    assignedToName: "Alex RM",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdBy: "system",
    updatedBy: "system",
  },
  {
    id: "alert-2",
    companyId: "comp-3",
    companyName: "Agro Nusantara",
    category: "OPERATIONAL",
    severity: "HIGH",
    title: "Supplier Payment Overdue",
    description: "Major supplier payment overdue by 45 days. May indicate cash flow issues.",
    acknowledgedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    acknowledgedBy: "user-2",
    assignedTo: "user-2",
    assignedToName: "System Admin",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    createdBy: "system",
    updatedBy: "user-2",
  },
  {
    id: "alert-3",
    companyId: "comp-4",
    companyName: "Global Logistics",
    category: "COMPLIANCE",
    severity: "HIGH",
    title: "Missing Mandatory Document",
    description: "Annual audited financial statements overdue by 60 days. Compliance action required.",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdBy: "system",
    updatedBy: "system",
  },
  {
    id: "alert-4",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    category: "UTILIZATION",
    severity: "MEDIUM",
    title: "Unused Credit Limit >60 Days",
    description: "Working capital facility has been unused for 75 days. Consider re-engagement.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    createdBy: "system",
    updatedBy: "system",
  },
  {
    id: "alert-5",
    companyId: "comp-5",
    companyName: "Bintang Retail",
    category: "FRAUD",
    severity: "CRITICAL",
    title: "Suspicious Transaction Pattern",
    description: "Unusual transaction patterns detected. Multiple large transfers to new beneficiaries.",
    acknowledgedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    acknowledgedBy: "user-1",
    assignedTo: "user-1",
    assignedToName: "Alex RM",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    createdBy: "system",
    updatedBy: "user-1",
  },
  {
    id: "alert-6",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    category: "LEGAL",
    severity: "MEDIUM",
    title: "Litigation Detected",
    description: "Company named as defendant in civil lawsuit. Potential liability exposure.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    createdBy: "system",
    updatedBy: "system",
  },
];

export const ALERT_SEVERITY_CONFIG: Record<AlertSeverity, { label: string; color: string; bgColor: string }> = {
  CRITICAL: { label: "Critical", color: "#dc2626", bgColor: "bg-red-100" },
  HIGH: { label: "High", color: "#ea580c", bgColor: "bg-orange-100" },
  MEDIUM: { label: "Medium", color: "#ca8a04", bgColor: "bg-yellow-100" },
  LOW: { label: "Low", color: "#65a30d", bgColor: "bg-green-100" },
};

export const ALERT_CATEGORY_CONFIG: Record<AlertCategory, { label: string; color: string }> = {
  FINANCIAL: { label: "Financial", color: "#3b82f6" },
  OPERATIONAL: { label: "Operational", color: "#f97316" },
  LEGAL: { label: "Legal", color: "#ef4444" },
  COMPLIANCE: { label: "Compliance", color: "#8b5cf6" },
  UTILIZATION: { label: "Utilization", color: "#06b6d4" },
  FRAUD: { label: "Fraud", color: "#dc2626" },
};

export async function getMockRiskAlertsFiltered(params?: RiskAlertFilterParams): Promise<ApiResponse<RiskAlert[]>> {
  await delay(400);
  let filtered = [...MOCK_RISK_ALERTS];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.companyName.toLowerCase().includes(q));
    }
    if (params.severity && params.severity !== "ALL") {
      filtered = filtered.filter(a => a.severity === params.severity);
    }
    if (params.category && params.category !== "ALL") {
      filtered = filtered.filter(a => a.category === params.category);
    }
    if (params.companyId) {
      filtered = filtered.filter(a => a.companyId === params.companyId);
    }
    if (params.assignedTo) {
      filtered = filtered.filter(a => a.assignedTo === params.assignedTo);
    }
    if (params.isAcknowledged !== undefined) {
      filtered = filtered.filter(a => (!!a.acknowledgedAt) === params.isAcknowledged);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockRiskAlertById(id: string): Promise<ApiResponse<RiskAlert>> {
  await delay(300);
  const alert = MOCK_RISK_ALERTS.find(a => a.id === id);
  if (!alert) return { success: false, message: "Alert not found", data: null as any };
  return { success: true, data: alert };
}

export const NOTIFICATION_CATEGORY_CONFIG: Record<NotificationCategory, { label: string; color: string }> = {
  RISK: { label: "Risk", color: "#ef4444" },
  APPROVAL: { label: "Approval", color: "#f59e0b" },
  RELATIONSHIP: { label: "Relationship", color: "#60a5fa" },
  COMPLIANCE: { label: "Compliance", color: "#8b5cf6" },
  TASKS: { label: "Tasks", color: "#10b981" },
  COMMERCIAL: { label: "Commercial", color: "#06b6d4" },
};

export const NOTIFICATION_PRIORITY_CONFIG: Record<NotificationPriority, { label: string; color: string }> = {
  CRITICAL: { label: "Critical", color: "#dc2626" },
  HIGH: { label: "High", color: "#ea580c" },
  MEDIUM: { label: "Medium", color: "#ca8a04" },
  LOW: { label: "Low", color: "#65a30d" },
};

// ─── Credit Analysis ──────────────────────────────────────────────

const generateYearlyData = (base: number, variance: number, years: number = 3) => {
  return Array.from({ length: years }, (_, i) => ({
    year: new Date().getFullYear() - (years - 1 - i),
    value: base + (Math.random() - 0.5) * variance * 2,
  }));
};

export const MOCK_CREDIT_ANALYSES: CreditAnalysis[] = [
  {
    id: "ca-1",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    analysisDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    analystName: "Alex RM",
    status: "APPROVED",
    financialData: {
      revenue: generateYearlyData(45000000, 5000000),
      ebitda: generateYearlyData(8500000, 1000000),
      netProfit: generateYearlyData(3800000, 500000),
      totalAssets: generateYearlyData(52000000, 3000000),
      totalLiabilities: generateYearlyData(31200000, 2000000),
      operatingCashFlow: generateYearlyData(6500000, 800000),
      dscr: [
        { year: new Date().getFullYear() - 2, value: 1.25 },
        { year: new Date().getFullYear() - 1, value: 1.32 },
        { year: new Date().getFullYear(), value: 1.38 },
      ],
      netProfitMargin: [
        { year: new Date().getFullYear() - 2, value: 7.2 },
        { year: new Date().getFullYear() - 1, value: 8.1 },
        { year: new Date().getFullYear(), value: 8.5 },
      ],
    },
    ratios: {
      liquidity: { currentRatio: 1.52, quickRatio: 1.18 },
      solvency: { debtToEquity: 2.15, debtToAssets: 0.60 },
      profitability: { roe: 14.2, roa: 4.8, netProfitMargin: 8.5 },
      activity: { tato: 1.22, receivableTurnover: 45 },
    },
    aiAnalysis: {
      strengths: [
        "Steady revenue growth trajectory averaging 8% YoY",
        "DSCR consistently above 1.2x threshold",
        "Improved leverage ratio from 2.4x to 2.15x over 3 years",
        "Net profit margin expansion from 7.2% to 8.5%",
      ],
      weaknesses: [
        "Working capital efficiency slightly below industry average",
        "Receivable collection period of 45 days higher than peers at 35 days",
        "Heavy reliance on revolving credit facility",
      ],
      anomalies: [
        { description: "Revenue acceleration in Q4 2024 - verify sustainable demand", severity: "MEDIUM" },
        { description: "Inventory turnover decreased from 6.2x to 5.1x", severity: "LOW" },
      ],
      riskSummary: "Company demonstrates solid fundamentals with improving trends. No critical concerns identified. Financial performance is consistent with approved credit parameters.",
      recommendation: "RECOMMENDATION: APPROVE renewal with current facility structure. Continue quarterly monitoring. No changes to covenants required.",
    },
    industryBenchmarks: {
      roe: 11.0,
      roa: 3.5,
      netProfitMargin: 6.2,
      currentRatio: 1.30,
      debtToEquity: 2.40,
    },
  },
  {
    id: "ca-2",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    analysisDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    analystName: "Alex RM",
    status: "IN_REVIEW",
    financialData: {
      revenue: generateYearlyData(32000000, 4000000),
      ebitda: generateYearlyData(4800000, 800000),
      netProfit: generateYearlyData(2100000, 400000),
      totalAssets: generateYearlyData(38000000, 2500000),
      totalLiabilities: generateYearlyData(25800000, 1800000),
      operatingCashFlow: generateYearlyData(3800000, 600000),
      dscr: [
        { year: new Date().getFullYear() - 2, value: 1.18 },
        { year: new Date().getFullYear() - 1, value: 1.08 },
        { year: new Date().getFullYear(), value: 0.95 },
      ],
      netProfitMargin: [
        { year: new Date().getFullYear() - 2, value: 6.8 },
        { year: new Date().getFullYear() - 1, value: 5.2 },
        { year: new Date().getFullYear(), value: 4.1 },
      ],
    },
    ratios: {
      liquidity: { currentRatio: 1.08, quickRatio: 0.85 },
      solvency: { debtToEquity: 2.82, debtToAssets: 0.68 },
      profitability: { roe: 8.2, roa: 2.8, netProfitMargin: 4.1 },
      activity: { tato: 0.95, receivableTurnover: 62 },
    },
    aiAnalysis: {
      strengths: [
        "Strong market position in manufacturing sector",
        "Diversified revenue streams across 3 product lines",
        "Long-term relationships with blue-chip customers",
      ],
      weaknesses: [
        "DSCR declined to 0.95x - below minimum threshold of 1.0x",
        "Debt-to-equity ratio increased to 2.82x (industry: 2.4x)",
        "Net profit margin compressed from 6.8% to 4.1%",
        "Receivable collection period extended to 62 days",
      ],
      anomalies: [
        { description: "DSCR below 1.0x threshold - immediate attention required", severity: "HIGH" },
        { description: "Revenue decline of 12% YoY in latest quarter", severity: "HIGH" },
        { description: "Inventory buildup of 25% QoQ - potential demand slowdown", severity: "MEDIUM" },
      ],
      riskSummary: "ELEVATED RISK: Company is experiencing financial stress with DSCR dropping below minimum threshold. Declining profitability and extended collection periods indicate potential cash flow pressure. Immediate RM engagement and covenant review recommended.",
      recommendation: "RECOMMENDATION: HOLD new facilities pending RM engagement. Schedule meeting within 2 weeks to discuss refinancing options. Consider temporary moratorium on limit increases.",
    },
    industryBenchmarks: {
      roe: 10.5,
      roa: 3.2,
      netProfitMargin: 5.8,
      currentRatio: 1.25,
      debtToEquity: 2.50,
    },
  },
  {
    id: "ca-3",
    companyId: "comp-3",
    companyName: "Agro Nusantara",
    analysisDate: new Date(Date.now() - 86400000 * 14).toISOString(),
    analystName: "System Admin",
    status: "DRAFT",
    financialData: {
      revenue: generateYearlyData(18000000, 2000000),
      ebitda: generateYearlyData(2900000, 400000),
      netProfit: generateYearlyData(1400000, 250000),
      totalAssets: generateYearlyData(24000000, 1500000),
      totalLiabilities: generateYearlyData(14400000, 1000000),
      operatingCashFlow: generateYearlyData(2200000, 400000),
      dscr: [
        { year: new Date().getFullYear() - 2, value: 1.35 },
        { year: new Date().getFullYear() - 1, value: 1.28 },
        { year: new Date().getFullYear(), value: 1.22 },
      ],
      netProfitMargin: [
        { year: new Date().getFullYear() - 2, value: 8.2 },
        { year: new Date().getFullYear() - 1, value: 7.6 },
        { year: new Date().getFullYear(), value: 7.8 },
      ],
    },
    ratios: {
      liquidity: { currentRatio: 1.42, quickRatio: 1.05 },
      solvency: { debtToEquity: 2.0, debtToAssets: 0.60 },
      profitability: { roe: 11.5, roa: 4.2, netProfitMargin: 7.8 },
      activity: { tato: 0.88, receivableTurnover: 38 },
    },
    aiAnalysis: {
      strengths: [
        "Healthy DSCR maintained above 1.2x",
        "Stable profitability with consistent net margins",
        "Efficient inventory management with 38-day collection period",
      ],
      weaknesses: [
        "Asset turnover lower than industry average of 1.0x",
        "Moderate leverage at 2.0x debt-to-equity",
        "Revenue growth slower than sector average of 12%",
      ],
      anomalies: [],
      riskSummary: "MODERATE RISK: Company maintains adequate financial metrics within approved parameters. No immediate concerns but monitoring recommended due to slower growth trajectory.",
      recommendation: "RECOMMENDATION: APPROVE facility renewal with existing terms. Continue annual review cycle.",
    },
    industryBenchmarks: {
      roe: 9.5,
      roa: 3.0,
      netProfitMargin: 6.5,
      currentRatio: 1.20,
      debtToEquity: 2.30,
    },
  },
];

export async function getMockCreditAnalyses(params?: CreditAnalysisFilterParams): Promise<ApiResponse<CreditAnalysis[]>> {
  await delay(400);
  let filtered = [...MOCK_CREDIT_ANALYSES];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(a => a.companyName.toLowerCase().includes(q));
    }
    if (params.companyId) {
      filtered = filtered.filter(a => a.companyId === params.companyId);
    }
    if (params.status && params.status !== "ALL") {
      filtered = filtered.filter(a => a.status === params.status);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockCreditAnalysisById(id: string): Promise<ApiResponse<CreditAnalysis>> {
  await delay(300);
  const analysis = MOCK_CREDIT_ANALYSES.find(a => a.id === id);
  if (!analysis) return { success: false, message: "Analysis not found", data: null as any };
  return { success: true, data: analysis };
}

// ─── Committee ──────────────────────────────────────────────

export const MOCK_COMMITTEE_SESSIONS: CommitteeSession[] = [
  {
    id: "comm-1",
    title: "Term Loan Refinancing - PT Sentosa Jaya",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    analysisId: "ca-2",
    status: "UNDER_REVIEW",
    quorum: 3,
    presentMembers: ["user-1", "user-3", "user-4", "user-5"],
    votes: [
      { memberId: "user-3", memberName: "Head of Credit", decision: "APPROVE", votedAt: new Date(Date.now() - 3600000 * 2).toISOString(), comments: "Strong collateral coverage" },
    ],
    discussions: [
      { id: "disc-1", memberId: "user-1", memberName: "Alex RM", message: "Client has been a 5-year relationship with clean repayment record", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
      { id: "disc-2", memberId: "user-3", memberName: "Head of Credit", message: "Concerned about declining DSCR. Recommend additional collateral.", createdAt: new Date(Date.now() - 3600000 * 3).toISOString() },
      { id: "disc-3", memberId: "user-4", memberName: "Risk Manager", message: "Risk team flagged operational risk due to key supplier dependency. Can mitigate with insurance.", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
    ],
    scheduledAt: new Date(Date.now() + 3600000 * 24).toISOString(),
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: "comm-2",
    title: "Working Capital Expansion - TechCorp Inc.",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    analysisId: "ca-1",
    status: "DRAFT",
    quorum: 3,
    presentMembers: [],
    votes: [],
    discussions: [],
    scheduledAt: new Date(Date.now() + 3600000 * 48).toISOString(),
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "comm-3",
    title: "Fleet Financing - Global Logistics",
    companyId: "comp-4",
    companyName: "Global Logistics",
    analysisId: "",
    status: "FINAL",
    quorum: 3,
    presentMembers: ["user-1", "user-3", "user-4", "user-5", "user-6"],
    votes: [
      { memberId: "user-3", memberName: "Head of Credit", decision: "APPROVE", votedAt: new Date(Date.now() - 86400000 * 5).toISOString(), comments: "Healthy cash flow, adequate collateral" },
      { memberId: "user-4", memberName: "Risk Manager", decision: "APPROVE", votedAt: new Date(Date.now() - 86400000 * 5).toISOString() },
      { memberId: "user-5", memberName: "Treasury Head", decision: "APPROVE", votedAt: new Date(Date.now() - 86400000 * 5).toISOString(), comments: "LTV within appetite" },
    ],
    discussions: [
      { id: "disc-4", memberId: "user-1", memberName: "Alex RM", message: "Company expanding fleet by 15 trucks, all under long-term contracts", createdAt: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: "disc-5", memberId: "user-3", memberName: "Head of Credit", message: "Financials look solid. DSCR at 1.4x. Approving.", createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
    ],
    scheduledAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    concludedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "comm-4",
    title: "Digital Transformation Loan - TechCorp Inc.",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    analysisId: "",
    status: "REJECTED",
    quorum: 3,
    presentMembers: ["user-1", "user-3", "user-4", "user-5"],
    votes: [
      { memberId: "user-3", memberName: "Head of Credit", decision: "REJECT", votedAt: new Date(Date.now() - 86400000 * 14).toISOString(), comments: "Technology sector volatility too high for this facility type" },
      { memberId: "user-4", memberName: "Risk Manager", decision: "REJECT", votedAt: new Date(Date.now() - 86400000 * 14).toISOString() },
    ],
    discussions: [
      { id: "disc-6", memberId: "user-3", memberName: "Head of Credit", message: "Recommend SME financing instead of corporate term loan", createdAt: new Date(Date.now() - 86400000 * 14).toISOString() },
    ],
    scheduledAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    concludedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];

export const COMMITTEE_STATUS_CONFIG: Record<CommitteeStatus, { label: string; color: string; bgColor: string }> = {
  DRAFT: { label: "Draft", color: "#64748b", bgColor: "bg-slate-100" },
  UNDER_REVIEW: { label: "Under Review", color: "#f59e0b", bgColor: "bg-amber-100" },
  VOTED: { label: "Voted", color: "#3b82f6", bgColor: "bg-blue-100" },
  FINAL: { label: "Approved", color: "#10b981", bgColor: "bg-emerald-100" },
  REJECTED: { label: "Rejected", color: "#ef4444", bgColor: "bg-red-100" },
};

export async function getMockCommitteeSessions(params?: CommitteeFilterParams): Promise<ApiResponse<CommitteeSession[]>> {
  await delay(400);
  let filtered = [...MOCK_COMMITTEE_SESSIONS];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.companyName.toLowerCase().includes(q));
    }
    if (params.status && params.status !== "ALL") {
      filtered = filtered.filter(c => c.status === params.status);
    }
    if (params.companyId) {
      filtered = filtered.filter(c => c.companyId === params.companyId);
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockCommitteeSessionById(id: string): Promise<ApiResponse<CommitteeSession>> {
  await delay(300);
  const session = MOCK_COMMITTEE_SESSIONS.find(c => c.id === id);
  if (!session) return { success: false, message: "Session not found", data: null as any };
  return { success: true, data: session };
}

// ─── Collateral ──────────────────────────────────────────────

export const COLLATERAL_TYPE_CONFIG: Record<CollateralType, { label: string; color: string }> = {
  REAL_ESTATE: { label: "Real Estate", color: "#3b82f6" },
  VEHICLE: { label: "Vehicle", color: "#10b981" },
  MACHINERY: { label: "Machinery", color: "#f59e0b" },
  INVENTORY: { label: "Inventory", color: "#8b5cf6" },
  RECEIVABLES: { label: "Receivables", color: "#06b6d4" },
  FIXED_DEPOSIT: { label: "Fixed Deposit", color: "#ec4899" },
  OTHER: { label: "Other", color: "#64748b" },
};

export const COLLATERAL_STATUS_CONFIG: Record<CollateralStatus, { label: string; color: string; bgColor: string }> = {
  VALID: { label: "Valid", color: "#10b981", bgColor: "bg-emerald-100" },
  EXPIRED: { label: "Expired", color: "#ef4444", bgColor: "bg-red-100" },
  PENDING_APPRAISAL: { label: "Pending Appraisal", color: "#f59e0b", bgColor: "bg-amber-100" },
  REJECTED: { label: "Rejected", color: "#64748b", bgColor: "bg-slate-100" },
};

export const MOCK_COLLATERALS: CollateralAsset[] = [
  {
    id: "col-1",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    type: "REAL_ESTATE",
    description: "Office Building - Jl. Sudirman No. 123, Jakarta Selatan",
    appraisedValue: 15000000000,
    appraisalDate: new Date(Date.now() - 86400000 * 180).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 185).toISOString(),
    coverageRatio: 1.35,
    status: "VALID",
    location: "Jakarta, Indonesia",
    latitude: -6.2088,
    longitude: 106.8456,
    insuranceExpiry: new Date(Date.now() + 86400000 * 90).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 365).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 180).toISOString(),
  },
  {
    id: "col-2",
    companyId: "comp-1",
    companyName: "TechCorp Inc.",
    type: "MACHINERY",
    description: "CNC Machine - 5 units DMG MORI NLX 2500",
    appraisedValue: 8500000000,
    appraisalDate: new Date(Date.now() - 86400000 * 90).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 275).toISOString(),
    coverageRatio: 1.20,
    status: "VALID",
    location: "Jakarta, Indonesia",
    latitude: -6.2088,
    longitude: 106.8456,
    createdAt: new Date(Date.now() - 86400000 * 400).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    id: "col-3",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    type: "REAL_ESTATE",
    description: "Factory Land & Building - Surabaya Industrial Estate",
    appraisedValue: 22000000000,
    appraisalDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 335).toISOString(),
    coverageRatio: 1.45,
    status: "VALID",
    location: "Surabaya, Indonesia",
    latitude: -7.2575,
    longitude: 112.7521,
    insuranceExpiry: new Date(Date.now() + 86400000 * 200).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 500).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: "col-4",
    companyId: "comp-3",
    companyName: "Agro Nusantara",
    type: "INVENTORY",
    description: "Agricultural Commodities Stock - Warehouse A",
    appraisedValue: 4500000000,
    appraisalDate: new Date(Date.now() - 86400000 * 45).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 320).toISOString(),
    coverageRatio: 1.15,
    status: "PENDING_APPRAISAL",
    location: "Bandung, Indonesia",
    latitude: -6.9175,
    longitude: 107.6195,
    createdAt: new Date(Date.now() - 86400000 * 200).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: "col-5",
    companyId: "comp-4",
    companyName: "Global Logistics",
    type: "VEHICLE",
    description: "Commercial Trucks - 15 units Hino 500",
    appraisedValue: 12000000000,
    appraisalDate: new Date(Date.now() - 86400000 * 60).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 305).toISOString(),
    coverageRatio: 1.30,
    status: "VALID",
    location: "Semarang, Indonesia",
    latitude: -6.9547,
    longitude: 110.5833,
    insuranceExpiry: new Date(Date.now() - 86400000 * 10).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 300).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: "col-6",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    type: "FIXED_DEPOSIT",
    description: "Time Deposit - Bank BCA Account #123456",
    appraisedValue: 3000000000,
    appraisalDate: new Date(Date.now() - 86400000 * 15).toISOString(),
    coverageRatio: 1.10,
    status: "VALID",
    createdAt: new Date(Date.now() - 86400000 * 150).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: "col-7",
    companyId: "comp-5",
    companyName: "Bintang Retail",
    type: "RECEIVABLES",
    description: "Trade Receivables - Key Customer Accounts",
    appraisedValue: 2500000000,
    appraisalDate: new Date(Date.now() - 86400000 * 120).toISOString(),
    nextAppraisalDate: new Date(Date.now() + 86400000 * 245).toISOString(),
    coverageRatio: 1.05,
    status: "EXPIRED",
    location: "Jakarta, Indonesia",
    latitude: -6.1751,
    longitude: 106.865,
    createdAt: new Date(Date.now() - 86400000 * 250).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 120).toISOString(),
  },
];

export async function getMockCollaterals(params?: CollateralFilterParams): Promise<ApiResponse<CollateralAsset[]>> {
  await delay(400);
  let filtered = [...MOCK_COLLATERALS];
  if (params) {
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(c => c.description.toLowerCase().includes(q) || c.companyName.toLowerCase().includes(q));
    }
    if (params.type && params.type !== "ALL") {
      filtered = filtered.filter(c => c.type === params.type);
    }
    if (params.status && params.status !== "ALL") {
      filtered = filtered.filter(c => c.status === params.status);
    }
    if (params.companyId) {
      filtered = filtered.filter(c => c.companyId === params.companyId);
    }
    if (params.expirySoon) {
      const thirtyDaysFromNow = Date.now() + 86400000 * 30;
      filtered = filtered.filter(c =>
        (c.insuranceExpiry && new Date(c.insuranceExpiry).getTime() < thirtyDaysFromNow) ||
        (c.nextAppraisalDate && new Date(c.nextAppraisalDate).getTime() < thirtyDaysFromNow)
      );
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

export async function getMockCollateralById(id: string): Promise<ApiResponse<CollateralAsset>> {
  await delay(300);
  const collateral = MOCK_COLLATERALS.find(c => c.id === id);
  if (!collateral) return { success: false, message: "Collateral not found", data: null as any };
  return { success: true, data: collateral };
}

// ─── Audit Logs ──────────────────────────────────────────────

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit-1",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "COMPANY_VIEWED",
    entityType: "COMPANY",
    entityId: "comp-1",
    entityName: "PT Maju Bersama",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "audit-2",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "VISIT_CHECKIN",
    entityType: "VISIT",
    entityId: "visit-1",
    entityName: "Visit to PT Maju Bersama",
    metadata: { latitude: -6.2088, longitude: 106.8456 },
    ipAddress: "192.168.1.100",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "audit-3",
    userId: "user-2",
    userName: "System Admin",
    userEmail: "admin@bank.com",
    action: "USER_ROLE_CHANGED",
    entityType: "USER",
    entityId: "user-3",
    entityName: "John Credit Analyst",
    oldValue: { role: "RM" },
    newValue: { role: "CREDIT_ANALYST" },
    ipAddress: "192.168.1.101",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "audit-4",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "PIPELINE_STAGE_CHANGED",
    entityType: "PIPELINE",
    entityId: "opp-1",
    entityName: "New Facility - PT Sumber Rejeki",
    oldValue: { stage: "INITIAL_CONTACT" },
    newValue: { stage: "FINANCIAL_COLLECTION" },
    ipAddress: "192.168.1.100",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "audit-5",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "COLLATERAL_APPRAISAL_UPDATED",
    entityType: "COLLATERAL",
    entityId: "coll-1",
    entityName: "Land - PT Maju Bersama",
    oldValue: { appraisedValue: 15000000000 },
    newValue: { appraisedValue: 17500000000 },
    ipAddress: "192.168.1.100",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "audit-6",
    userId: "user-2",
    userName: "System Admin",
    userEmail: "admin@bank.com",
    action: "APPROVAL_MATRIX_UPDATED",
    entityType: "SYSTEM",
    entityId: "matrix-1",
    entityName: "Credit Analysis Approval Matrix",
    oldValue: { tiers: 3 },
    newValue: { tiers: 4 },
    ipAddress: "192.168.1.101",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: "audit-7",
    userId: "user-4",
    userName: "Sarah Compliance Officer",
    userEmail: "compliance@bank.com",
    action: "DOCUMENT_UPLOADED",
    entityType: "DOCUMENT",
    entityId: "doc-1",
    entityName: "Financial Statement Q4 2024",
    metadata: { fileSize: 2048576, mimeType: "application/pdf" },
    ipAddress: "192.168.1.103",
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: "audit-8",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "CREDIT_ANALYSIS_SUBMITTED",
    entityType: "CREDIT_ANALYSIS",
    entityId: "ca-1",
    entityName: "Credit Analysis - PT Maju Bersama",
    ipAddress: "192.168.1.100",
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
  {
    id: "audit-9",
    userId: "user-5",
    userName: "Michael Committee Chair",
    userEmail: "committee@bank.com",
    action: "COMMITTEE_VOTE_CAST",
    entityType: "COMMITTEE",
    entityId: "comm-1",
    entityName: "Committee Session - PT Maju Bersama",
    newValue: { decision: "APPROVE" },
    ipAddress: "192.168.1.104",
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
  },
  {
    id: "audit-10",
    userId: "user-2",
    userName: "System Admin",
    userEmail: "admin@bank.com",
    action: "WORKFLOW_SETTING_UPDATED",
    entityType: "SYSTEM",
    entityId: "wf-1",
    entityName: "Visit Workflow Settings",
    oldValue: { mandatoryFields: ["photos", "checklist"] },
    newValue: { mandatoryFields: ["photos", "checklist", "gps"] },
    ipAddress: "192.168.1.101",
    createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
  },
  {
    id: "audit-11",
    userId: "user-1",
    userName: "Alex Relationship Manager",
    userEmail: "rm@bank.com",
    action: "RISK_ALERT_ACKNOWLEDGED",
    entityType: "COMPANY",
    entityId: "comp-3",
    entityName: "PT Risiko Tinggi",
    metadata: { alertId: "risk-3" },
    ipAddress: "192.168.1.100",
    createdAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
  },
  {
    id: "audit-12",
    userId: "user-2",
    userName: "System Admin",
    userEmail: "admin@bank.com",
    action: "USER_CREATED",
    entityType: "USER",
    entityId: "user-6",
    entityName: "New RM User",
    newValue: { role: "RM", email: "newrm@bank.com" },
    ipAddress: "192.168.1.101",
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
  },
];

export async function getMockAuditLogs(params?: AuditLogFilterParams): Promise<ApiResponse<AuditLogEntry[]>> {
  await delay(400);
  let filtered = [...MOCK_AUDIT_LOGS];

  if (params?.userId) {
    filtered = filtered.filter(l => l.userId === params.userId);
  }
  if (params?.entityType && params.entityType !== "ALL") {
    filtered = filtered.filter(l => l.entityType === params.entityType);
  }
  if (params?.action) {
    filtered = filtered.filter(l => l.action.toLowerCase().includes(params.action!.toLowerCase()));
  }
  if (params?.fromDate) {
    filtered = filtered.filter(l => l.createdAt >= params.fromDate!);
  }
  if (params?.toDate) {
    filtered = filtered.filter(l => l.createdAt <= params.toDate!);
  }

  if (params?.page && params?.limit) {
    const page = params.page;
    const limit = params.limit;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { success: true, data: paginated, meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 50, total: filtered.length } };
}

// ─── Admin — Roles ──────────────────────────────────────────────

const MOCK_ROLES: PermissionRole[] = [
  {
    id: "role-1",
    name: "ADMIN",
    displayName: "Administrator",
    description: "Full system access",
    permissions: ["SYSTEM_ADMIN", "MANAGE_USERS", "MANAGE_ROLES", "MANAGE_APPROVAL_MATRIX", "MANAGE_WORKFLOWS", "VIEW_AUDIT_LOG", "EXPORT_AUDIT_LOG", "MANAGE_AI_SETTINGS"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-2",
    name: "RM",
    displayName: "Relationship Manager",
    description: "Manage portfolio companies, visits, pipeline",
    permissions: ["VIEW_COMPANIES", "EDIT_COMPANIES", "VIEW_PIPELINE", "EDIT_PIPELINE", "VIEW_VISITS", "EDIT_VISITS", "VIEW_COLLATERAL", "EDIT_COLLATERAL", "VIEW_CREDIT_ANALYSIS", "EDIT_CREDIT_ANALYSIS", "VIEW_RISK_ALERTS", "ACKNOWLEDGE_RISK_ALERTS", "VIEW_NOTIFICATIONS"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-3",
    name: "LEAD_RM",
    displayName: "Lead RM",
    description: "Senior RM with team oversight",
    permissions: ["VIEW_COMPANIES", "EDIT_COMPANIES", "DELETE_COMPANIES", "VIEW_PIPELINE", "EDIT_PIPELINE", "VIEW_VISITS", "EDIT_VISITS", "VIEW_COLLATERAL", "EDIT_COLLATERAL", "VIEW_CREDIT_ANALYSIS", "EDIT_CREDIT_ANALYSIS", "APPROVE_CREDIT_ANALYSIS", "VIEW_RISK_ALERTS", "ACKNOWLEDGE_RISK_ALERTS", "VIEW_NOTIFICATIONS", "VIEW_AUDIT_LOG"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-4",
    name: "CREDIT_ANALYST",
    displayName: "Credit Analyst",
    description: "Analyze credit and financial data",
    permissions: ["VIEW_COMPANIES", "VIEW_PIPELINE", "VIEW_VISITS", "VIEW_COLLATERAL", "VIEW_CREDIT_ANALYSIS", "EDIT_CREDIT_ANALYSIS", "APPROVE_CREDIT_ANALYSIS", "VIEW_RISK_ALERTS", "VIEW_NOTIFICATIONS"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-5",
    name: "COMMITTEE",
    displayName: "Committee Member",
    description: "Vote on credit proposals",
    permissions: ["VIEW_COMPANIES", "VIEW_CREDIT_ANALYSIS", "VIEW_COMMITTEE", "EDIT_COMMITTEE"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-6",
    name: "COMPLIANCE",
    displayName: "Compliance Officer",
    description: "Ensure regulatory compliance",
    permissions: ["VIEW_COMPANIES", "VIEW_PIPELINE", "VIEW_VISITS", "VIEW_COLLATERAL", "VIEW_CREDIT_ANALYSIS", "VIEW_AUDIT_LOG", "EXPORT_AUDIT_LOG", "VIEW_RISK_ALERTS", "ACKNOWLEDGE_RISK_ALERTS"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "role-7",
    name: "AUDITOR",
    displayName: "Auditor",
    description: "Read-only audit access",
    permissions: ["VIEW_COMPANIES", "VIEW_PIPELINE", "VIEW_VISITS", "VIEW_COLLATERAL", "VIEW_CREDIT_ANALYSIS", "VIEW_AUDIT_LOG", "EXPORT_AUDIT_LOG", "VIEW_RISK_ALERTS"],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getMockRoles(): Promise<ApiResponse<PermissionRole[]>> {
  await delay(300);
  return { success: true, data: MOCK_ROLES, meta: { page: 1, limit: 20, total: MOCK_ROLES.length } };
}

// ─── Admin — Users ──────────────────────────────────────────────

const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: "user-1",
    email: "rm@bank.com",
    name: "Alex Relationship Manager",
    role: "RM",
    roleName: "Relationship Manager",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-12-01").toISOString(),
  },
  {
    id: "user-2",
    email: "admin@bank.com",
    name: "System Admin",
    role: "ADMIN",
    roleName: "Administrator",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-12-10").toISOString(),
  },
  {
    id: "user-3",
    email: "credit@bank.com",
    name: "John Credit Analyst",
    role: "CREDIT_ANALYST",
    roleName: "Credit Analyst",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    createdAt: new Date("2024-03-01").toISOString(),
    updatedAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: "user-4",
    email: "compliance@bank.com",
    name: "Sarah Compliance Officer",
    role: "COMPLIANCE",
    roleName: "Compliance Officer",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    createdAt: new Date("2024-02-15").toISOString(),
    updatedAt: new Date("2024-12-05").toISOString(),
  },
  {
    id: "user-5",
    email: "committee@bank.com",
    name: "Michael Committee Chair",
    role: "COMMITTEE",
    roleName: "Committee Member",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    createdAt: new Date("2024-01-20").toISOString(),
    updatedAt: new Date("2024-11-20").toISOString(),
  },
  {
    id: "user-6",
    email: "leadrm@bank.com",
    name: "Diana Lead RM",
    role: "LEAD_RM",
    roleName: "Lead RM",
    isActive: true,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-12-08").toISOString(),
  },
  {
    id: "user-7",
    email: "auditor@bank.com",
    name: "Robert Auditor",
    role: "AUDITOR",
    roleName: "Auditor",
    isActive: false,
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    createdAt: new Date("2024-04-01").toISOString(),
    updatedAt: new Date("2024-10-15").toISOString(),
  },
];

export async function getMockAdminUsers(params?: UserFilterParams): Promise<ApiResponse<AdminUser[]>> {
  await delay(400);
  let filtered = [...MOCK_ADMIN_USERS];
  if (params?.role && params.role !== "ALL") {
    filtered = filtered.filter(u => u.role === params.role);
  }
  if (params?.isActive !== undefined) {
    filtered = filtered.filter(u => u.isActive === params.isActive);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  if (params?.page && params?.limit) {
    const page = params.page;
    const limit = params.limit;
    return { success: true, data: filtered.slice((page - 1) * limit, page * limit), meta: { page, limit, total: filtered.length } };
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 20, total: filtered.length } };
}

export async function getMockAdminUserById(id: string): Promise<ApiResponse<AdminUser>> {
  await delay(300);
  const user = MOCK_ADMIN_USERS.find(u => u.id === id);
  if (!user) return { success: false, message: "User not found", data: null as any };
  return { success: true, data: user };
}

// ─── Approval Matrix ────────────────────────────────────────────

const MOCK_APPROVAL_MATRIX: ApprovalMatrixEntry[] = [
  {
    id: "matrix-1",
    trigger: "CREDIT_ANALYSIS_SUBMIT",
    triggerLabel: "Credit Analysis Submission",
    tiers: [
      { tier: "TIER_1", tierLabel: "RM Submit", approverRoles: ["RM", "LEAD_RM"], thresholdAmount: 5000000000, thresholdLabel: "< 5B", requireAllApprovers: false },
      { tier: "TIER_2", tierLabel: "Credit Analyst Review", approverRoles: ["CREDIT_ANALYST"], thresholdAmount: 15000000000, thresholdLabel: "5B - 15B", requireAllApprovers: false },
      { tier: "TIER_3", tierLabel: "Committee Review", approverRoles: ["COMMITTEE"], thresholdAmount: undefined, thresholdLabel: "> 15B", requireAllApprovers: true },
    ],
    isActive: true,
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-12-01").toISOString(),
  },
  {
    id: "matrix-2",
    trigger: "LIMIT_INCREASE",
    triggerLabel: "Limit Increase Request",
    tiers: [
      { tier: "TIER_1", tierLabel: "RM Request", approverRoles: ["RM", "LEAD_RM"], thresholdAmount: 2000000000, thresholdLabel: "< 2B", requireAllApprovers: false },
      { tier: "TIER_2", tierLabel: "Credit Review", approverRoles: ["CREDIT_ANALYST"], thresholdAmount: 10000000000, thresholdLabel: "2B - 10B", requireAllApprovers: false },
      { tier: "FINAL", tierLabel: "Final Approval", approverRoles: ["ADMIN", "LEAD_RM"], thresholdAmount: undefined, thresholdLabel: "> 10B", requireAllApprovers: true },
    ],
    isActive: true,
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: "matrix-3",
    trigger: "FACILITY_RENEWAL",
    triggerLabel: "Facility Renewal",
    tiers: [
      { tier: "TIER_1", tierLabel: "RM Renewal", approverRoles: ["RM"], thresholdAmount: 3000000000, thresholdLabel: "< 3B", requireAllApprovers: false },
      { tier: "TIER_2", tierLabel: "Credit Review", approverRoles: ["CREDIT_ANALYST", "LEAD_RM"], thresholdAmount: undefined, thresholdLabel: "> 3B", requireAllApprovers: true },
    ],
    isActive: true,
    createdAt: new Date("2024-03-01").toISOString(),
    updatedAt: new Date("2024-10-20").toISOString(),
  },
  {
    id: "matrix-4",
    trigger: "COLLATERAL_APPRAISAL",
    triggerLabel: "Collateral Appraisal",
    tiers: [
      { tier: "TIER_1", tierLabel: "RM Upload", approverRoles: ["RM", "LEAD_RM"], thresholdAmount: 5000000000, thresholdLabel: "< 5B", requireAllApprovers: false },
      { tier: "TIER_2", tierLabel: "Compliance Verify", approverRoles: ["COMPLIANCE"], thresholdAmount: undefined, thresholdLabel: "> 5B", requireAllApprovers: true },
    ],
    isActive: false,
    createdAt: new Date("2024-05-01").toISOString(),
    updatedAt: new Date("2024-09-10").toISOString(),
  },
];

export async function getMockApprovalMatrix(params?: ApprovalMatrixFilterParams): Promise<ApiResponse<ApprovalMatrixEntry[]>> {
  await delay(400);
  let filtered = [...MOCK_APPROVAL_MATRIX];
  if (params?.trigger && params.trigger !== "ALL") {
    filtered = filtered.filter(m => m.trigger === params.trigger);
  }
  if (params?.isActive !== undefined) {
    filtered = filtered.filter(m => m.isActive === params.isActive);
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 20, total: filtered.length } };
}

// ─── Workflow Settings ─────────────────────────────────────────

const MOCK_WORKFLOW_SETTINGS: WorkflowSetting[] = [
  {
    id: "wf-1",
    entityType: "VISIT",
    entityTypeLabel: "Visit / OTS",
    isActive: true,
    visitTypes: [
      {
        visitType: "VERIFICATION",
        checklistTemplate: ["GPS Check-in", "Photo of premises", "Photo with contact person", "Check facility condition", "Collect documents"],
        mandatoryFields: [
          { fieldName: "latitude", fieldLabel: "GPS Latitude", required: true },
          { fieldName: "longitude", fieldLabel: "GPS Longitude", required: true },
          { fieldName: "photos", fieldLabel: "Photos", required: true },
          { fieldName: "summary", fieldLabel: "Visit Summary", required: true },
        ],
      },
      {
        visitType: "COMPLIANCE",
        checklistTemplate: ["GPS Check-in", "Photo of premises", "Verify license copies", "Check compliance documents", "Photo with authorized person"],
        mandatoryFields: [
          { fieldName: "latitude", fieldLabel: "GPS Latitude", required: true },
          { fieldName: "photos", fieldLabel: "Photos", required: true },
          { fieldName: "checklist", fieldLabel: "Checklist Completion", required: true },
        ],
      },
      {
        visitType: "COLLECTION",
        checklistTemplate: ["GPS Check-in", "Photo of premises", "Verify collateral condition", "Photo of collateral", "Collect payment"],
        mandatoryFields: [
          { fieldName: "latitude", fieldLabel: "GPS Latitude", required: true },
          { fieldName: "photos", fieldLabel: "Collateral Photos", required: true },
        ],
      },
    ],
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-12-01").toISOString(),
  },
  {
    id: "wf-2",
    entityType: "COLLATERAL",
    entityTypeLabel: "Collateral",
    isActive: true,
    mandatoryFields: [
      { fieldName: "description", fieldLabel: "Description", required: true },
      { fieldName: "appraisedValue", fieldLabel: "Appraised Value", required: true },
      { fieldName: "appraisalDate", fieldLabel: "Appraisal Date", required: true },
      { fieldName: "insuranceExpiry", fieldLabel: "Insurance Expiry", required: true },
    ],
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-11-15").toISOString(),
  },
  {
    id: "wf-3",
    entityType: "CREDIT_ANALYSIS",
    entityTypeLabel: "Credit Analysis",
    isActive: true,
    mandatoryFields: [
      { fieldName: "financialStatements", fieldLabel: "Financial Statements", required: true },
      { fieldName: "ratios", fieldLabel: "Financial Ratios", required: true },
      { fieldName: "aiAnalysis", fieldLabel: "AI Analysis", required: false },
    ],
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-10-20").toISOString(),
  },
  {
    id: "wf-4",
    entityType: "DOCUMENT",
    entityTypeLabel: "Document",
    isActive: true,
    mandatoryFields: [
      { fieldName: "fileName", fieldLabel: "File Name", required: true },
      { fieldName: "documentType", fieldLabel: "Document Type", required: true },
      { fieldName: "expiryDate", fieldLabel: "Expiry Date", required: false },
    ],
    createdAt: new Date("2024-03-01").toISOString(),
    updatedAt: new Date("2024-09-15").toISOString(),
  },
];

export async function getMockWorkflowSettings(params?: WorkflowSettingsFilterParams): Promise<ApiResponse<WorkflowSetting[]>> {
  await delay(350);
  let filtered = [...MOCK_WORKFLOW_SETTINGS];
  if (params?.entityType && params.entityType !== "ALL") {
    filtered = filtered.filter(w => w.entityType === params.entityType);
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 20, total: filtered.length } };
}

// ─── System Health ──────────────────────────────────────────────

const MOCK_SYSTEM_HEALTH: SystemHealthMetric[] = [
  { id: "health-1", name: "Database", status: "HEALTHY", value: "Connected", description: "Aiven PostgreSQL - 12ms avg latency", lastCheckedAt: new Date().toISOString() },
  { id: "health-2", name: "API Gateway", status: "HEALTHY", value: "Operational", description: "All endpoints responding", lastCheckedAt: new Date().toISOString() },
  { id: "health-3", name: "AI Service", status: "WARNING", value: "Degraded", description: "High latency on /analyze endpoint (2.3s avg)", lastCheckedAt: new Date().toISOString() },
  { id: "health-4", name: "Storage", status: "HEALTHY", value: "78% used", description: "1.56 TB of 2 TB utilized", lastCheckedAt: new Date().toISOString() },
  { id: "health-5", name: "Backup System", status: "HEALTHY", value: "Last backup 2h ago", description: "Incremental backup completed", lastCheckedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: "health-6", name: "Auth Service", status: "HEALTHY", value: "Operational", description: "JWT validation working", lastCheckedAt: new Date().toISOString() },
  { id: "health-7", name: "Document OCR", status: "WARNING", value: "Queue backlog", description: "15 documents pending OCR", lastCheckedAt: new Date().toISOString() },
  { id: "health-8", name: "Notification Service", status: "HEALTHY", value: "Operational", description: "All channels connected", lastCheckedAt: new Date().toISOString() },
];

export async function getMockSystemHealth(): Promise<ApiResponse<SystemHealthMetric[]>> {
  await delay(300);
  return { success: true, data: MOCK_SYSTEM_HEALTH, meta: { page: 1, limit: 20, total: MOCK_SYSTEM_HEALTH.length } };
}

// ─── AI Settings ───────────────────────────────────────────────

const MOCK_AI_SETTINGS: AISettings = {
  model: "gpt-4-turbo",
  promptTemplates: {
    SUMMARIZE_COMPANY: "Summarize the following company data in 3 bullet points, highlighting risk factors and opportunities:",
    ANALYZE_FINANCIALS: "Analyze these financial statements. Identify trends, ratios outside normal ranges, and provide a credit recommendation.",
    EXPLAIN_RISK: "Explain the following risk alert in plain language. What actions should the RM take?",
  },
  usageLimits: {
    dailyLimit: 500,
    monthlyLimit: 10000,
    currentUsageDaily: 127,
    currentUsageMonthly: 2847,
  },
  isEnabled: true,
};

export async function getMockAISettings(): Promise<ApiResponse<AISettings>> {
  await delay(250);
  return { success: true, data: MOCK_AI_SETTINGS };
}

// ─── Integration Settings ──────────────────────────────────────

const MOCK_INTEGRATIONS: IntegrationSetting[] = [
  { id: "int-1", name: "OJK Reporting API", type: "REGULATORY", isEnabled: true, config: { endpoint: "https://ojk-api.bank.go.id/v1", apiKey: "****" }, lastSyncAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), status: "CONNECTED" },
  { id: "int-2", name: "e-Collections", type: "PAYMENT", isEnabled: true, config: { endpoint: "https://ecollections.bank.co.id/api", merchantId: "BANK001" }, lastSyncAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), status: "CONNECTED" },
  { id: "int-3", name: "Simas CRM Integration", type: "CRM", isEnabled: true, config: { webhookUrl: "https://crm.bank.co.id/webhook" }, lastSyncAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: "CONNECTED" },
  { id: "int-4", name: "Vehicle Appraisal API", type: "APPRAISAL", isEnabled: false, config: { apiKey: "****", endpoint: "https://api.appraisal.co.id" }, status: "DISCONNECTED" },
];

export async function getMockIntegrations(): Promise<ApiResponse<IntegrationSetting[]>> {
  await delay(350);
  return { success: true, data: MOCK_INTEGRATIONS, meta: { page: 1, limit: 20, total: MOCK_INTEGRATIONS.length } };
}

// ─── Compliance Checklist ───────────────────────────────────────

const MOCK_COMPLIANCE_CHECKLIST: ComplianceCheckItem[] = [
  { id: "comp-1", category: "OJK Regulation", requirement: "Monthly Credit Portfolio Report", description: "Submit monthly credit portfolio data to OJK", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), reviewedBy: "Sarah Compliance Officer" },
  { id: "comp-2", category: "OJK Regulation", requirement: "Quarterly Financial Statement", description: "Collect and verify quarterly financial statements for all exposures > 5B", status: "IN_PROGRESS", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), reviewedBy: "John Credit Analyst", notes: "Waiting for 3 companies to submit Q4 statements" },
  { id: "comp-3", category: "AML/KYC", requirement: "Customer Due Diligence", description: "Complete CDD for all high-risk customers annually", status: "NON_COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), reviewedBy: "Sarah Compliance Officer", notes: "12 high-risk customers overdue for CDD renewal" },
  { id: "comp-4", category: "Risk Management", requirement: "Collateral Appraisal Review", description: "All collaterals must be re-appraised every 2 years", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), reviewedBy: "John Credit Analyst" },
  { id: "comp-5", category: "Risk Management", requirement: "Risk Rating Update", description: "Update risk ratings for all companies with facilities > 1B quarterly", status: "IN_PROGRESS", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), reviewedBy: "Diana Lead RM" },
  { id: "comp-6", category: "Legal", requirement: "Documentation Completeness", description: "All credit agreements must have complete legal documentation", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), reviewedBy: "System Admin" },
  { id: "comp-7", category: "Capital Adequacy", requirement: "CAR Reporting", description: "Maintain minimum 8% Capital Adequacy Ratio", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), reviewedBy: "System Admin" },
  { id: "comp-8", category: "IT Security", requirement: "Data Backup Verification", description: "Verify daily backup of all critical systems", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), reviewedBy: "System Admin" },
  { id: "comp-9", category: "IT Security", requirement: "Access Control Review", description: "Quarterly review of user access rights", status: "NOT_APPLICABLE", notes: "Review scheduled for next quarter" },
  { id: "comp-10", category: "OJK Regulation", requirement: "Large Exposure Reporting", description: "Report any exposure > 25% of capital to OJK", status: "COMPLIANT", lastReviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), reviewedBy: "Sarah Compliance Officer" },
];

export async function getMockComplianceChecklist(params?: ComplianceChecklistFilterParams): Promise<ApiResponse<ComplianceCheckItem[]>> {
  await delay(400);
  let filtered = [...MOCK_COMPLIANCE_CHECKLIST];
  if (params?.category) {
    filtered = filtered.filter(c => c.category === params.category);
  }
  if (params?.status && params.status !== "ALL") {
    filtered = filtered.filter(c => c.status === params.status);
  }
  return { success: true, data: filtered, meta: { page: 1, limit: 20, total: filtered.length } };
}

// ─── Meetings ──────────────────────────────────────────────

import { Meeting, RecentUpload } from "@/types";

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: "mtg-001",
    companyId: "comp-1",
    companyName: "PT Astra International",
    title: "Credit Facility Discussion",
    mode: "REAL_TIME",
    status: "COMPLETED",
    duration: 45,
    date: "12 May 2025",
    rm: "Alex",
    attendees: [
      { name: "Alex RM", role: "RM", organization: "Bank", isRM: true },
      { name: "Budi Santoso", role: "CFO", organization: "PT Astra", isRM: false },
      { name: "Dr. Rinawaty", role: "Credit Dept Head", organization: "PT Astra", isRM: false },
    ],
    transcript: [
      { id: "t1", speaker: "RM", text: "We'd like to discuss the term sheet for the new credit facility.", timestamp: "00:05:23" },
      { id: "t2", speaker: "Client", text: "We're looking at a 3-year revolving facility with flexible collateral options.", timestamp: "00:05:31" },
      { id: "t3", speaker: "RM", text: "What collateral are you proposing?", timestamp: "00:05:45" },
      { id: "t4", speaker: "Client", text: "We're proposing land and building as primary collateral, plus vehicle fleet.", timestamp: "00:05:58" },
      { id: "t5", speaker: "RM", text: "That aligns with our requirements. What about the facility amount?", timestamp: "00:06:15" },
      { id: "t6", speaker: "Client", text: "We're requesting IDR 7B but open to discussing IDR 5B based on our credit profile.", timestamp: "00:06:28" },
    ],
    summary: "Discussion of new IDR 5Billion revolving credit facility for 3 years. Client requests flexibility on collateral requirements and prefers land + building over machinery. Decision expected within 2 weeks.",
    decisions: [
      "Facility amount agreed at IDR 5B (down from 7B request)",
      "Tenor confirmed at 36 months",
      "Client to provide additional collateral documentation",
    ],
    actionItems: [
      { id: "a1", text: "Prepare draft term sheet", status: "IN_PROGRESS", priority: "HIGH", assignee: "Alex RM" },
      { id: "a2", text: "Request 3-year audited financials", status: "PENDING", priority: "HIGH", assignee: "Alex RM" },
      { id: "a3", text: "Schedule collateral appraisal", status: "PENDING", priority: "MEDIUM", assignee: "Alex RM" },
      { id: "a4", text: "Follow-up meeting next week", status: "PENDING", priority: "MEDIUM", assignee: "Alex RM" },
    ],
    termSheet: {
      facilityType: "Revolving Credit",
      amount: "IDR 5,000,000,000",
      tenor: "36 months",
      interest: "JIBOR + 2.5% p.a.",
      collateral: "Land & Building (SHM) + Vehicle (BPKB)",
      purpose: "Working capital",
    },
    documentsRequested: [
      "Last 3 year audited financial statements",
      "Current facility agreement with Bank XYZ",
      "Asset certificates for proposed collateral",
      "Company NPWP & SIUP",
    ],
    riskFlags: [
      { id: "r1", type: "WARNING", message: "Current D/E ratio 3.2x - above bank threshold of 2.5x", metric: "D/E", value: "3.2x", threshold: "2.5x" },
      { id: "r2", type: "WARNING", message: "Existing facility utilization at 85%", metric: "Utilization", value: "85%", threshold: "80%" },
    ],
    detectedTopics: ["Credit facility", "Expansion plan", "New collateral", "Term sheet discussion"],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "mtg-002",
    companyId: "comp-2",
    companyName: "PT Sentosa Jaya",
    title: "Quarterly Review",
    mode: "UPLOAD",
    status: "COMPLETED",
    duration: 30,
    date: "10 May 2025",
    rm: "Alex",
    attendees: [
      { name: "Alex RM", role: "RM", organization: "Bank", isRM: true },
      { name: "John Doe", role: "Finance Director", organization: "PT Sentosa Jaya", isRM: false },
    ],
    transcript: [
      { id: "t1", speaker: "RM", text: "Let's review the Q1 performance metrics.", timestamp: "00:01:00" },
      { id: "t2", speaker: "Client", text: "Revenue is up 12% compared to same period last year.", timestamp: "00:02:15" },
    ],
    summary: "Quarterly performance review completed. Company showing positive growth trajectory.",
    decisions: [
      "Continue current facility structure",
      "Schedule next review in 3 months",
    ],
    actionItems: [
      { id: "a1", text: "Update financial projections", status: "PENDING", priority: "MEDIUM", assignee: "Alex RM" },
    ],
    termSheet: undefined,
    documentsRequested: [
      "Q1 2025 financial statements",
      "Updated cash flow projection",
    ],
    riskFlags: [],
    detectedTopics: ["Quarterly review", "Performance metrics"],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const MOCK_RECENT_UPLOADS: RecentUpload[] = [
  { id: "up-001", name: "PT Astra Meeting", date: "12 May 2025", status: "Complete" },
  { id: "up-002", name: "Semen Indonesia Q1 Review", date: "10 May 2025", status: "Complete" },
  { id: "up-003", name: "TechCorp Inc. Discussion", date: "8 May 2025", status: "Processing..." },
];

export async function getMockMeetings(): Promise<ApiResponse<Meeting[]>> {
  await delay(400);
  return { success: true, data: MOCK_MEETINGS, meta: { page: 1, limit: 20, total: MOCK_MEETINGS.length } };
}

export async function getMockMeetingById(id: string): Promise<ApiResponse<Meeting>> {
  await delay(300);
  const meeting = MOCK_MEETINGS.find((m) => m.id === id);
  if (!meeting) {
    return { success: false, message: "Meeting not found", data: null as any };
  }
  return { success: true, data: meeting };
}

export async function getMockRecentUploads(): Promise<ApiResponse<RecentUpload[]>> {
  await delay(250);
  return { success: true, data: MOCK_RECENT_UPLOADS, meta: { page: 1, limit: 10, total: MOCK_RECENT_UPLOADS.length } };
}
