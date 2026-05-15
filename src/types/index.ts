export type Role =
  | "ADMIN"
  | "LEAD_RM"
  | "RM"
  | "CREDIT_ANALYST"
  | "RISK_TEAM"
  | "COMPLIANCE"
  | "COMMITTEE"
  | "AUDITOR";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

// ─── Dashboard Types ──────────────────────────────────────────────

export interface DashboardKPIs {
  totalPortfolioValue: number;
  activeCustomers: number;
  pendingApprovals: number;
  highRiskAccounts: number;
  unusedLimits: number;
  upcomingRenewals: number;
  todaysTasks: number;
}

export interface AIInsight {
  id: string;
  type: "OPPORTUNITY" | "RISK" | "INFO";
  title: string;
  description: string;
  companyId?: string;
  companyName?: string;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  type: "TASK" | "APPROVAL" | "DOCUMENT";
  title: string;
  description: string;
  dueDate: string;
  status: "PENDING" | "COMPLETED";
  companyName?: string;
}

export interface RiskAlert {
  id: string;
  companyId: string;
  companyName: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  description: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface PipelineStageCount {
  stage: string;
  count: number;
  value: number;
}

// ─── Companies ──────────────────────────────────────────────

export type RiskRating = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | "CRITICAL";

export interface Company {
  id: string;
  name: string;
  groupName?: string;
  industry?: string;
  region?: string;
  riskRating: RiskRating;
  totalExposure: number;
  utilizationPct: number;
  rmId: string;
  rmName: string;
  activeAlerts: number;
  lastActivity: string;
  facilityType?: string;
  revenueRange?: string;
}

export interface CompanyFilterParams {
  search?: string;
  industry?: string;
  riskRating?: string;
  rmOwner?: string;
  region?: string;
  segment?: string; // "All" | "High Risk" | "Upsell" | "Renewal Soon"
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ─── Company Detail ──────────────────────────────────────────────

export interface Facility {
  id: string;
  type: string;
  limit: number;
  outstanding: number;
  utilizationPct: number;
  interestRate: number;
  maturityDate: string;
  status: "ACTIVE" | "EXPIRED" | "PENDING_RENEWAL";
  collateralCoverage: number;
}

export interface FinancialStatement {
  year: number;
  revenue: number;
  netProfit: number;
  totalAssets: number;
  totalLiabilities: number;
  dscr: number;
  leverage: number;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
}

export interface CompanyDocument {
  id: string;
  name: string;
  type: "FINANCIAL_STATEMENT" | "LEGAL" | "COLLATERAL" | "COMPLIANCE" | "OTHER";
  uploadedAt: string;
  expiresAt?: string;
  status: "VALID" | "EXPIRED" | "PENDING";
}

export interface Collateral {
  id: string;
  type: string;
  description: string;
  appraisedValue: number;
  appraisalDate: string;
  coverageRatio: number;
  status: "VALID" | "EXPIRED" | "PENDING_APPRAISAL";
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
}

export interface CompanyDetail extends Company {
  address?: string;
  taxId?: string;
  legalStatus?: string;
  incorporatedDate?: string;
  website?: string;
  description?: string;
  facilities: Facility[];
  financials: FinancialStatement[];
  contacts: Contact[];
  documents: CompanyDocument[];
  collaterals: Collateral[];
  riskAlerts: RiskAlert[];
  aiInsights: AIInsight[];
  auditLogs: AuditLog[];
}

// ─── Pipeline ──────────────────────────────────────────────

export type PipelineStage =
  | "LEAD"
  | "INITIAL_CONTACT"
  | "FINANCIAL_COLLECTION"
  | "ANALYSIS"
  | "PROPOSAL"
  | "COMMITTEE"
  | "APPROVED"
  | "REJECTED";

export interface PipelineOpportunity {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  industry?: string;
  rmId: string;
  rmName: string;
  stage: PipelineStage;
  dealValue: number;
  probability: number; // 0-100
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineActivity {
  id: string;
  opportunityId: string;
  type: "NOTE" | "CALL" | "EMAIL" | "MEETING" | "STAGE_CHANGE" | "DOCUMENT";
  description: string;
  performedBy: string;
  performedAt: string;
}

export interface PipelineTask {
  id: string;
  opportunityId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface PipelineDocument {
  id: string;
  name: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface OpportunityDetail extends PipelineOpportunity {
  activities: PipelineActivity[];
  tasks: PipelineTask[];
  documents: PipelineDocument[];
}

export interface PipelineFilterParams {
  search?: string;
  stage?: PipelineStage | "ALL";
  rmOwner?: string;
  industry?: string;
  page?: number;
  limit?: number;
}

export interface PipelineStageSummary {
  stage: PipelineStage;
  label: string;
  count: number;
  totalValue: number;
  isTerminal: boolean;
}

// ─── Visits ──────────────────────────────────────────────

export type VisitStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type VisitType = "VERIFICATION" | "RELATIONSHIP" | "COMPLIANCE" | "COLLECTION" | "RENEWAL";

export interface Visit {
  id: string;
  companyId: string;
  companyName: string;
  rmId: string;
  rmName: string;
  visitType: VisitType;
  scheduledAt: string;
  checkedInAt?: string;
  completedAt?: string;
  status: VisitStatus;
  latitude?: number;
  longitude?: number;
  summary?: string;
  notes?: string;
  purpose?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisitCheckIn {
  visitId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  photos: VisitPhoto[];
}

export interface VisitPhoto {
  id: string;
  visitId: string;
  url: string;
  caption?: string;
  takenAt: string;
}

export interface VisitChecklistItem {
  id: string;
  visitId: string;
  label: string;
  checked: boolean;
  order: number;
}

export interface VisitFilterParams {
  search?: string;
  status?: VisitStatus | "ALL";
  visitType?: VisitType | "ALL";
  rmOwner?: string;
  companyId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// ─── Notifications & Risk ─────────────────────────────────

export type NotificationCategory = "RISK" | "APPROVAL" | "RELATIONSHIP" | "COMPLIANCE" | "TASKS" | "COMMERCIAL";
export type NotificationPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Notification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  isRead: boolean;
  actionUrl?: string;
  companyId?: string;
  companyName?: string;
  createdAt: string;
  readAt?: string;
}

export interface NotificationFilterParams {
  search?: string;
  category?: NotificationCategory | "ALL";
  priority?: NotificationPriority | "ALL";
  isRead?: boolean;
  page?: number;
  limit?: number;
}

export type AlertCategory = "FINANCIAL" | "OPERATIONAL" | "LEGAL" | "COMPLIANCE" | "UTILIZATION" | "FRAUD";
export type AlertSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface RiskAlertDetail extends RiskAlert {
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  assignedTo?: string;
  assignedToName?: string;
  dueDate?: string;
  resolution?: string;
}

export interface RiskAlertFilterParams {
  search?: string;
  severity?: AlertSeverity | "ALL";
  category?: AlertCategory | "ALL";
  companyId?: string;
  assignedTo?: string;
  isAcknowledged?: boolean;
  page?: number;
  limit?: number;
}

// ─── AI Copilot ──────────────────────────────────────────────

export type AICommand =
  | "SUMMARIZE_COMPANY"
  | "ANALYZE_FINANCIALS"
  | "GENERATE_PROPOSAL"
  | "GENERATE_CALL_REPORT"
  | "EXPLAIN_RISK"
  | "COMPARE_INDUSTRY"
  | "PREPARE_COMMITTEE_QA"
  | "SUMMARIZE_DOCUMENT"
  | "FREE_FORM";

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  command?: AICommand;
  companyId?: string;
  companyName?: string;
  isStreaming?: boolean;
}

export interface AIConversationContext {
  companyId?: string;
  companyName?: string;
  pipelineOpportunityId?: string;
  visitId?: string;
  documentId?: string;
}

export interface AICommandSuggestion {
  command: AICommand;
  label: string;
  description: string;
  prompt: string;
  icon: string;
}

// ─── Credit Analysis ────────────────────────────────────────

export interface FinancialDataPoint {
  year: number;
  value: number;
}

export interface FinancialRatios {
  liquidity: {
    currentRatio: number;
    quickRatio: number;
  };
  solvency: {
    debtToEquity: number;
    debtToAssets: number;
  };
  profitability: {
    roe: number;
    roa: number;
    netProfitMargin: number;
  };
  activity: {
    tato: number;
    receivableTurnover: number;
  };
}

export interface CreditAnalysis {
  id: string;
  companyId: string;
  companyName: string;
  analysisDate: string;
  analystName: string;
  status: "DRAFT" | "IN_REVIEW" | "APPROVED";
  financialData: {
    revenue: FinancialDataPoint[];
    ebitda: FinancialDataPoint[];
    netProfit: FinancialDataPoint[];
    totalAssets: FinancialDataPoint[];
    totalLiabilities: FinancialDataPoint[];
    operatingCashFlow: FinancialDataPoint[];
    dscr: FinancialDataPoint[];
    netProfitMargin: FinancialDataPoint[];
  };
  ratios: FinancialRatios;
  aiAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    anomalies: { description: string; severity: "HIGH" | "MEDIUM" | "LOW" }[];
    riskSummary: string;
    recommendation: string;
  };
  industryBenchmarks?: {
    roe: number;
    roa: number;
    netProfitMargin: number;
    currentRatio: number;
    debtToEquity: number;
  };
}

export interface CreditAnalysisFilterParams {
  search?: string;
  companyId?: string;
  status?: "DRAFT" | "IN_REVIEW" | "APPROVED" | "ALL";
  analystName?: string;
  page?: number;
  limit?: number;
}

// ─── Committee ──────────────────────────────────────────────

export type CommitteeStatus = "DRAFT" | "UNDER_REVIEW" | "VOTED" | "FINAL" | "REJECTED";

export type VoteDecision = "APPROVE" | "REJECT" | "ABSTAIN";

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  isPresent: boolean;
}

export interface CommitteeVote {
  memberId: string;
  memberName: string;
  decision: VoteDecision;
  votedAt: string;
  comments?: string;
}

export interface CommitteeDiscussion {
  id: string;
  memberId: string;
  memberName: string;
  message: string;
  createdAt: string;
}

export interface CommitteeSession {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  analysisId: string;
  status: CommitteeStatus;
  quorum: number;
  presentMembers: string[];
  votes: CommitteeVote[];
  discussions: CommitteeDiscussion[];
  scheduledAt: string;
  concludedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeFilterParams {
  search?: string;
  status?: CommitteeStatus | "ALL";
  companyId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// ─── Collateral ──────────────────────────────────────────────

export type CollateralStatus = "VALID" | "EXPIRED" | "PENDING_APPRAISAL" | "REJECTED";
export type CollateralType = "REAL_ESTATE" | "VEHICLE" | "MACHINERY" | "INVENTORY" | "RECEIVABLES" | "FIXED_DEPOSIT" | "OTHER";

export interface CollateralAsset {
  id: string;
  companyId: string;
  companyName: string;
  type: CollateralType;
  description: string;
  appraisedValue: number;
  appraisalDate: string;
  nextAppraisalDate?: string;
  coverageRatio: number;
  status: CollateralStatus;
  location?: string;
  latitude?: number;
  longitude?: number;
  insuranceExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValuationHistory {
  id: string;
  collateralId: string;
  appraisedValue: number;
  appraisalDate: string;
  appraiserName: string;
  reportNumber?: string;
}

export interface CollateralFilterParams {
  search?: string;
  type?: CollateralType | "ALL";
  status?: CollateralStatus | "ALL";
  companyId?: string;
  expirySoon?: boolean;
  page?: number;
  limit?: number;
}

// ─── Audit & Compliance ────────────────────────────────────────

export type AuditEntityType = "COMPANY" | "VISIT" | "PIPELINE" | "DOCUMENT" | "COLLATERAL" | "CREDIT_ANALYSIS" | "COMMITTEE" | "USER" | "SYSTEM";

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  entityType: AuditEntityType;
  entityId: string;
  entityName?: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AuditLogFilterParams {
  search?: string;
  userId?: string;
  action?: string;
  entityType?: AuditEntityType | "ALL";
  entityId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// ─── Document Versioning ────────────────────────────────────────

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedByName: string;
  changeDescription?: string;
  createdAt: string;
}

export interface CompanyDocumentDetail extends CompanyDocument {
  versions: DocumentVersion[];
  currentVersion: DocumentVersion;
}

// ─── Admin — Users ──────────────────────────────────────────────

export type AdminRole =
  | "ADMIN"
  | "LEAD_RM"
  | "RM"
  | "CREDIT_ANALYST"
  | "RISK_TEAM"
  | "COMPLIANCE"
  | "COMMITTEE"
  | "AUDITOR";

export type Permission =
  | "VIEW_COMPANIES"
  | "EDIT_COMPANIES"
  | "DELETE_COMPANIES"
  | "VIEW_PIPELINE"
  | "EDIT_PIPELINE"
  | "VIEW_VISITS"
  | "EDIT_VISITS"
  | "VIEW_CREDIT_ANALYSIS"
  | "EDIT_CREDIT_ANALYSIS"
  | "APPROVE_CREDIT_ANALYSIS"
  | "VIEW_COMMITTEE"
  | "EDIT_COMMITTEE"
  | "VIEW_COLLATERAL"
  | "EDIT_COLLATERAL"
  | "VIEW_AUDIT_LOG"
  | "EXPORT_AUDIT_LOG"
  | "MANAGE_USERS"
  | "MANAGE_ROLES"
  | "MANAGE_APPROVAL_MATRIX"
  | "MANAGE_WORKFLOWS"
  | "VIEW_RISK_ALERTS"
  | "ACKNOWLEDGE_RISK_ALERTS"
  | "VIEW_NOTIFICATIONS"
  | "MANAGE_AI_SETTINGS"
  | "SYSTEM_ADMIN";

export interface PermissionRole {
  id: string;
  name: AdminRole;
  displayName: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  roleName: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilterParams {
  search?: string;
  role?: AdminRole | "ALL";
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// ─── Admin — Approval Matrix ────────────────────────────────────

export type ApprovalTrigger = "CREDIT_ANALYSIS_SUBMIT" | "COMMITTEE_APPROVAL" | "COLLATERAL_APPRAISAL" | "FACILITY_RENEWAL" | "LIMIT_INCREASE";
export type ApprovalTier = "TIER_1" | "TIER_2" | "TIER_3" | "FINAL";

export interface ApprovalMatrixEntry {
  id: string;
  trigger: ApprovalTrigger;
  triggerLabel: string;
  tiers: ApprovalTierConfig[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalTierConfig {
  tier: ApprovalTier;
  tierLabel: string;
  approverRoles: AdminRole[];
  thresholdAmount?: number;
  thresholdLabel?: string;
  requireAllApprovers: boolean;
}

export interface ApprovalMatrixFilterParams {
  trigger?: ApprovalTrigger | "ALL";
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// ─── Admin — Workflow Settings ──────────────────────────────────

export type WorkflowEntityType = "VISIT" | "COLLATERAL" | "CREDIT_ANALYSIS" | "DOCUMENT";

export interface MandatoryField {
  fieldName: string;
  fieldLabel: string;
  required: boolean;
  condition?: string;
}

export interface VisitTypeConfig {
  visitType: VisitType;
  checklistTemplate: string[];
  mandatoryFields: MandatoryField[];
}

export interface WorkflowSetting {
  id: string;
  entityType: WorkflowEntityType;
  entityTypeLabel: string;
  isActive: boolean;
  visitTypes?: VisitTypeConfig[];
  mandatoryFields?: MandatoryField[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowSettingsFilterParams {
  entityType?: WorkflowEntityType | "ALL";
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// ─── Admin — System Health ──────────────────────────────────────

export interface SystemHealthMetric {
  id: string;
  name: string;
  status: "HEALTHY" | "WARNING" | "CRITICAL";
  value: string;
  description?: string;
  lastCheckedAt: string;
}

export interface AISettings {
  model: string;
  promptTemplates: Record<string, string>;
  usageLimits: {
    dailyLimit: number;
    monthlyLimit: number;
    currentUsageDaily: number;
    currentUsageMonthly: number;
  };
  isEnabled: boolean;
}

export interface IntegrationSetting {
  id: string;
  name: string;
  type: string;
  isEnabled: boolean;
  config: Record<string, unknown>;
  lastSyncAt?: string;
  status: "CONNECTED" | "DISCONNECTED" | "ERROR";
}

// ─── Meeting ─────────────────────────────────────────────────

export type MeetingMode = "REAL_TIME" | "UPLOAD";
export type MeetingStatus = "IN_PROGRESS" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
}

export interface MeetingActionItem {
  id: string;
  text: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignee?: string;
}

export interface TermSheetDraft {
  facilityType: string;
  amount: string;
  tenor: string;
  interest: string;
  collateral: string;
  purpose: string;
}

export interface RiskFlag {
  id: string;
  type: "WARNING" | "ALERT" | "INFO";
  message: string;
  metric?: string;
  value?: string;
  threshold?: string;
}

export interface MeetingAttendee {
  name: string;
  role?: string;
  organization?: string;
  isRM: boolean;
}

export interface Meeting {
  id: string;
  companyId?: string;
  companyName?: string;
  title: string;
  mode: MeetingMode;
  status: MeetingStatus;
  duration?: number;
  date?: string;
  rm?: string;
  attendees: MeetingAttendee[];
  transcript: TranscriptSegment[];
  summary?: string;
  decisions: string[];
  actionItems: MeetingActionItem[];
  termSheet?: TermSheetDraft;
  documentsRequested: string[];
  riskFlags: RiskFlag[];
  detectedTopics: string[];
  createdAt: string;
}

export interface RecentUpload {
  id: string;
  name: string;
  date: string;
  status: "Processing..." | "Complete";
}

// ─── Document Intelligence ────────────────────────────────────────

export type DocumentType = "FINANCIAL_STATEMENT" | "LEGAL" | "COMPLIANCE" | "COLLATERAL" | "ID_CARD" | "CONTRACT" | "OTHER";

export interface DocumentClassification {
  type: DocumentType;
  confidence: number;
  isAnnual?: boolean;
  isAudited?: boolean;
}

export interface ExtractedTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ExtractedField {
  label: string;
  value: string;
  confidence?: number;
}

export interface ExtractedDocument {
  id: string;
  originalFileName: string;
  fileSize?: number;
  mimeType?: string;
  documentType: DocumentType;
  classification: DocumentClassification;
  companyName?: string;
  year?: number;
  extractedFields: ExtractedField[];
  extractedTables: ExtractedTable[];
  rawText?: string;
  confidence: number;
  processedAt: string;
  uploadedBy?: string;
  linkedCompanyId?: string;
  linkedCompanyName?: string;
}

export interface DocumentProcessingResult {
  id: string;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  extractedDocument?: ExtractedDocument;
  errorMessage?: string;
}

export interface DocumentHistoryItem {
  id: string;
  fileName: string;
  documentType: DocumentType;
  processedAt: string;
  status: "COMPLETED" | "FAILED";
  confidence?: number;
  linkedCompanyName?: string;
}

// ─── Compliance ─────────────────────────────────────────────────

export interface ComplianceCheckItem {
  id: string;
  category: string;
  requirement: string;
  description: string;
  status: "COMPLIANT" | "NON_COMPLIANT" | "IN_PROGRESS" | "NOT_APPLICABLE";
  lastReviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface ComplianceChecklistFilterParams {
  category?: string;
  status?: "COMPLIANT" | "NON_COMPLIANT" | "IN_PROGRESS" | "NOT_APPLICABLE" | "ALL";
  page?: number;
  limit?: number;
}
