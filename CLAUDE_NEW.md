# CLAUDE.md — RM Digital Workbench
## AI-Powered Relationship Manager Operating System

> **For LLM:** This document is the Single Source of Truth for vibe coding this project.
> Read the entire document before generating any code. Do not skip any section.

---

## ⚠️ CURRENT DATA STRATEGY — MOCK DATA

**There is no real backend or database connection yet.**

All data is currently served from a single mock data file.

### Rules — MUST FOLLOW

1. **Single source of mock data:** `src/lib/mock-data.ts` — this is the one and only file that holds all mock data for the entire application.
2. **Every page, component, and feature must import data from `src/lib/mock-data.ts`** — never define inline data inside a component or page.
3. **Never hardcode data inside components** — even a single placeholder value must come from `src/lib/mock-data.ts`.
4. **All mock data must be typed** — every exported mock must have a corresponding TypeScript type defined in `src/types/`.
5. **Structure mock data to mirror the real API response format** — use the same shape as the API success response so the swap to real API later is minimal:

```ts
// Pattern — mock data must match the real API response shape
{
  success: true,
  data: [...],       // the actual records
  meta: {            // for list data
    page: 1,
    limit: 20,
    total: 100,
  }
}
```

6. **Simulate async behavior** — wrap mock data reads in a small delay to simulate network latency:

```ts
// src/lib/mock-data.ts
export async function getMockCompanies(): Promise<CompanyListResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400)); // simulate network
  return { success: true, data: MOCK_COMPANIES, meta: { page: 1, limit: 20, total: MOCK_COMPANIES.length } };
}
```

7. **When real API is ready:** swap the function body only — the call signature stays the same. Components and hooks do not need to change.

### Mock Data File Structure

```ts
// src/lib/mock-data.ts  ← THE ONLY FILE WITH MOCK DATA

// ─── Users ──────────────────────────────────────────────
export const MOCK_USERS: User[] = [ ... ]
export async function getMockUsers() { ... }

// ─── Companies ──────────────────────────────────────────
export const MOCK_COMPANIES: Company[] = [ ... ]
export async function getMockCompanies() { ... }
export async function getMockCompanyById(id: string) { ... }

// ─── Pipeline ───────────────────────────────────────────
export const MOCK_OPPORTUNITIES: PipelineOpportunity[] = [ ... ]
export async function getMockOpportunities() { ... }

// ─── Visits ─────────────────────────────────────────────
export const MOCK_VISITS: Visit[] = [ ... ]
export async function getMockVisits() { ... }

// ─── Risk Alerts ────────────────────────────────────────
export const MOCK_RISK_ALERTS: RiskAlert[] = [ ... ]
export async function getMockRiskAlerts() { ... }

// ─── Notifications ──────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [ ... ]
export async function getMockNotifications() { ... }

// ─── Dashboard KPIs ─────────────────────────────────────
export const MOCK_DASHBOARD_KPIS: DashboardKPIs = { ... }
export async function getMockDashboardKPIs() { ... }

// ─── Credit Analyses ────────────────────────────────────
export const MOCK_CREDIT_ANALYSES: CreditAnalysis[] = [ ... ]
export async function getMockCreditAnalyses() { ... }

// ─── Collateral ─────────────────────────────────────────
export const MOCK_COLLATERALS: Collateral[] = [ ... ]
export async function getMockCollaterals() { ... }

// ─── Committee Sessions ─────────────────────────────────
export const MOCK_COMMITTEE_SESSIONS: CommitteeSession[] = [ ... ]
export async function getMockCommitteeSessions() { ... }

// ─── AI Insights ────────────────────────────────────────
export const MOCK_AI_INSIGHTS: AIInsight[] = [ ... ]
export async function getMockAIInsights() { ... }
```

### How Components Consume Mock Data

```ts
// In a custom hook — correct pattern
import { getMockCompanies } from '@/lib/mock-data';

export function useCompanyList() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getMockCompanies,  // ← swap this to real API service later
  });
}
```

```ts
// In a component — correct pattern
import { useCompanyList } from '@/features/companies/hooks/useCompanyList';

export function CompanyTable() {
  const { data, isLoading, isError } = useCompanyList();
  // always handle loading, error, and empty states
}
```

### Migration Path to Real API

When the backend is ready, the only change needed is in `src/services/`:

```ts
// Before (mock)
export async function getMockCompanies() {
  await delay(400);
  return { success: true, data: MOCK_COMPANIES, meta: { ... } };
}

// After (real API) — hook and component stay unchanged
export async function getCompanies(params?: CompanyFilterParams) {
  const res = await apiClient.get('/api/v1/companies', { params });
  return res.data;
}
```

---

## 📌 PROJECT IDENTITY

**App Name:** RM Digital Workbench
**Category:** AI-Powered Enterprise SaaS — Commercial / Wholesale Banking
**Primary Target User:** Relationship Manager (RM) at a commercial / wholesale bank

### Problem Statement

```
Relationship Managers experience productivity bottlenecks because they are forced
to simultaneously act as sales rep + credit analyst + field verifier + admin,
with data scattered across multiple disconnected systems.
```

### Product Vision

```
AI-Powered RM Operating System
— not just a CRM —

An end-to-end operational platform that unifies:
Sales · Relationship Management · Credit Analysis ·
Field Verification · Risk Monitoring · Compliance · AI Automation
```

### Business Objective

```
Goal: Increase RM client-handling capacity
Example: 10 clients → 15 clients within the same working hours
How: Automate admin work + AI copilot + single source of truth
```

---

## 👥 USER ROLES & ACCESS

| Role | Description | Access Level |
|---|---|---|
| RM | Manage clients, pipeline, visits | Standard |
| Lead RM | Monitor team pipeline, approvals | Manager |
| Credit Analyst | Financial analysis, proposals | Analyst |
| Risk Team | Portfolio risk monitoring | Risk |
| Compliance Team | Governance & audit | Compliance |
| Committee | Credit approvals | Committee |
| Auditor | Audit trail, read-only | Auditor |
| Admin | Full system access | Admin |

---

## 🛠️ TECH STACK

### Frontend

| Area | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Zustand |
| Server State / Cache | TanStack Query (React Query) |
| Forms | React Hook Form |
| Validation | Zod |
| Tables | TanStack Table |
| Charts | Recharts / Tremor |
| Animation | Framer Motion |
| Drag and Drop | dnd-kit (for Kanban) |

### Backend

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Framework | NestJS |
| ORM | Prisma |
| Validation | Zod / class-validator |
| Authentication | JWT + Refresh Token |
| API Style | REST |

### Database & Cache

| Area | Technology | Notes |
|---|---|---|
| Main Database | PostgreSQL | Hosted on **Aiven** (managed cloud) |
| Connection Pooling | PgBouncer | Built-in via Aiven — use the pooled connection string for app runtime |
| Cache | Redis | Hosted on **Aiven** (managed cloud) |

> **Aiven Connection Rules:**
> - Use the **pooled connection string** (PgBouncer port) for the app at runtime.
> - Use the **direct connection string** only for `prisma migrate deploy`.
> - Store both strings in `.env`. Never hardcode.
> - Always append `?sslmode=require` — Aiven enforces SSL.
> - For Redis on Aiven, use `rediss://` (TLS), not `redis://`.

```env
# .env
DATABASE_URL="postgresql://user:password@host:PORT/db?sslmode=require"
DATABASE_URL_POOLED="postgresql://user:password@host:PGBOUNCER_PORT/db?sslmode=require"
REDIS_URL="rediss://user:password@host:PORT"
```

```prisma
// schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL_POOLED")   // runtime (pooled)
  directUrl = env("DATABASE_URL")          // migrations (direct)
}
```

### Infrastructure

| Area | Technology |
|---|---|
| CI/CD | GitHub Actions |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway / Render / Fly.io |
| Monitoring | Grafana or Aiven built-in metrics |
| Logging | Logtail / Axiom |

---

## 🏗️ ARCHITECTURE

### Pattern

```
Modular Monolith
(ready to be split into microservices in the future)
```

### Backend Layering

```
Controller → Service → Repository → Database (via Prisma)
```

### Frontend Layering

```
UI Components → Feature Modules → Services / API Layer → State (Zustand + TanStack Query)
```

### Frontend Folder Structure

```
src/
 ├── app/                        # Next.js App Router pages & layouts
 │   ├── (auth)/                 # Auth routes (login, etc.)
 │   └── (dashboard)/            # Protected app routes
 ├── components/                 # Shared reusable UI components
 │   ├── cards/
 │   ├── tables/
 │   ├── charts/
 │   ├── forms/
 │   ├── modals/
 │   ├── drawers/
 │   └── layout/
 ├── features/                   # Feature-based modules (self-contained)
 │   ├── dashboard/
 │   ├── companies/
 │   ├── pipeline/
 │   ├── visits/
 │   ├── ai-copilot/
 │   ├── credit-analysis/
 │   ├── risk-monitoring/
 │   ├── collateral/
 │   ├── documents/
 │   ├── committee/
 │   └── notifications/
 ├── hooks/                      # Shared custom hooks
 ├── lib/                        # Utilities, helpers, constants
 ├── services/                   # API service layer (fetch wrappers)
 ├── store/                      # Zustand global state slices
 ├── types/                      # Global TypeScript type definitions
 ├── utils/                      # Pure utility functions
 └── styles/                     # Global CSS / Tailwind config
```

### Backend Folder Structure

```
src/
 ├── modules/                    # NestJS feature modules
 │   ├── auth/
 │   ├── users/
 │   ├── companies/
 │   ├── pipeline/
 │   ├── visits/
 │   ├── credit-analysis/
 │   ├── risk-monitoring/
 │   ├── collateral/
 │   ├── documents/
 │   ├── committee/
 │   └── notifications/
 ├── common/                     # Shared decorators, pipes, guards, filters
 ├── config/                     # App & DB configuration
 ├── database/                   # Prisma client, schema, migrations
 ├── middleware/
 ├── guards/
 ├── interceptors/
 ├── utils/
 └── main.ts
```

---

## 📐 CODING STANDARDS

### Required Rules

1. **TypeScript strict mode** — avoid `any`; use `unknown` + type guards instead
2. **Clean architecture** — business logic lives in services only, never in controllers or UI
3. **DRY** — no duplicate code; extract shared logic into utilities or hooks
4. **Modular** — every feature is an isolated module with its own types, services, and components
5. **No hardcoded values** — all config via `.env` environment variables
6. **All API endpoints must be validated** — use Zod or class-validator
7. **All DB operations via Prisma** — no raw SQL unless absolutely necessary
8. **UUID for all primary keys**
9. **Every table must have:** `id`, `created_at`, `updated_at`, `created_by`, `updated_by`
10. **Soft delete** via `deleted_at` (nullable timestamp) for all business-critical data
11. **Indexing** on columns used in WHERE, ORDER BY, and JOIN clauses
12. **Avoid N+1 queries** — use Prisma `include` and `select` carefully

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| React Component | PascalCase | `CompanyTable.tsx` |
| Custom Hook | useCamelCase | `useCompanyList.ts` |
| Utility Function | camelCase | `formatCurrency.ts` |
| Constant | UPPER_CASE | `API_BASE_URL` |
| Type / Interface | PascalCase | `CompanyResponse` |
| API Endpoint | kebab-case | `/api/v1/credit-analysis` |
| Database Table | snake_case | `company_financials` |
| Prisma Model | PascalCase | `CompanyFinancial` |

### Forbidden Practices

- Hardcoded credentials, secrets, or URLs
- Direct database queries from the controller layer
- Business logic inside UI components
- Excessive inline styles (use Tailwind classes)
- Duplicate code (extract and reuse)
- Files or components exceeding 300 lines (split them)
- Components without loading state, error state, and empty state
- Merging to `main` without lint and tests passing
- Using `console.log` in production code (use a structured logger)

---

## 🎨 UI/UX DESIGN SYSTEM

### Visual Style

```
Modern Enterprise SaaS
Inspiration: Linear · Notion · Stripe Dashboard · HubSpot · Bloomberg Terminal Modernized
```

### UX Principles — MUST FOLLOW

1. **Workflow First** — UI follows the RM's daily workflow, not the database structure
2. **Actionable Workspace** — every page enables action, not just data display
3. **AI-First Experience** — AI is always visible, contextual, proactive, and accessible from every module
4. **Dense but Clear** — information-dense with clear hierarchy, consistent spacing, low visual noise
5. **Reduce Clicks** — use side panels, modal workspaces, expandable sections, contextual drawers
6. **Context Preservation** — when opening a detail view, the previous context is never lost (split layout, sticky filters)
7. **Mobile Operational Ready** — field visit / OTS flows must be mobile-first

### Color System

| Status | Color | Usage |
|---|---|---|
| Good / Active | Green | Positive status |
| Warning | Yellow / Amber | Caution |
| Critical / Error | Red | High risk, errors |
| Informational | Blue | Neutral information |
| Inactive / Disabled | Gray | Non-active state |

- **Dominant:** neutral palette (white / slate)
- **Accent:** minimal — use only for important status indicators
- **Rule:** never use more than 3–4 colors on a single page

### Typography Scale

| Element | Size |
|---|---|
| Page Title | 28–32px |
| Section Title | 20–24px |
| Card Title | 16–18px |
| Table Content | 13–14px |
| Metadata / Label | 12px |

### Global Layout — Desktop

```
┌──────────────────────────────────────────────────────┐
│   Top Navigation (Search · Notif · AI · Profile)     │
├──────────────┬───────────────────────────────────────┤
│              │                                       │
│   Sidebar    │   Main Workspace Area                 │
│ (collapsible)│   (Responsive · Modular · Split-ready)│
│              │                                       │
└──────────────┴───────────────────────────────────────┘
```

### Top Navigation — Required Items

- Global search (debounced, cross-module)
- Notification bell (with unread badge)
- AI quick access button (opens AI Copilot panel)
- User profile & settings
- Environment indicator badge (staging / production)

### Left Sidebar — Menu Order (by frequency of use)

1. Dashboard
2. Companies
3. Pipeline
4. Visits
5. AI Copilot
6. Credit Analysis
7. Risk Monitoring
8. Collateral
9. Documents
10. Committee
11. Notifications
12. Reports
13. Admin

Sidebar rules:
- Collapsible — icon-only mode when collapsed
- No nested menus more than 1 level deep
- Active item clearly highlighted

### Every Page Must Have

- Skeleton loading state
- Empty state (with illustration and CTA)
- Error state (with informative message and retry button)
- Responsive layout (desktop + tablet + mobile)
- Dark mode support
- Accessibility (ARIA labels, keyboard navigation)
- Breadcrumb navigation
- Contextual quick action buttons

### Forbidden UI Patterns

- Overcrowded dashboards
- Too many colors in one view
- Non-scalable tables (must support pagination and sorting)
- Oversized modals (use side drawers instead)
- Excessively long forms (use multi-step patterns)
- Confusing navigation or deeply nested menus

---

## 🗺️ APPLICATION ROUTES

```
/                         → redirect to /dashboard
/login
/dashboard
/companies
/companies/[id]
/pipeline
/pipeline/[id]
/visits
/visits/[id]
/ai-copilot
/credit-analysis
/credit-analysis/[id]
/risk-monitoring
/collateral
/collateral/[id]
/documents
/committee
/committee/[id]
/notifications
/reports
/admin/users
/admin/roles
/admin/settings
```

---

## 🔐 API STANDARDS

### REST Convention

```
GET    /api/v1/companies
GET    /api/v1/companies/:id
POST   /api/v1/companies
PUT    /api/v1/companies/:id
DELETE /api/v1/companies/:id
```

### Success Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

### API Rules

- All endpoints require JWT Bearer token authentication unless explicitly public
- All list endpoints support: `page`, `limit`, `search`, `sort`, `order` query params
- HTTP status codes must be semantically correct (200, 201, 400, 401, 403, 404, 422, 500)

---

## 🔒 SECURITY STANDARDS

- Input validation on all endpoints (Zod / class-validator)
- SQL injection protection via Prisma parameterized queries
- XSS protection (sanitize all user inputs)
- CSRF protection
- Rate limiting on all public and auth endpoints
- Secure HTTP headers (Helmet.js)
- HTTPS only — enforced at infrastructure level
- All secrets stored in environment variables
- Role-Based Access Control (RBAC) enforced at guard level
- JWT Access Token (short-lived, 15m) + Refresh Token (long-lived, stored in httpOnly cookie)
- Password hashing with bcrypt (min 12 rounds)
- Immutable audit logs (append-only, never update or delete)
- Maker-checker workflow enforced for all approval actions

---

## 🗄️ DATABASE STANDARDS

### General Rules

- UUID for all primary keys (`@default(uuid())`)
- Every table must have: `id`, `created_at`, `updated_at`, `created_by`, `updated_by`
- Soft delete via `deleted_at` (nullable `DateTime`) for all business-critical tables
- All schema changes via Prisma Migrate — no manual SQL in production
- Index foreign keys and columns used in filters, searches, and sorts
- Avoid N+1 queries — use Prisma `include` / `select` efficiently

### Aiven-Specific Rules

- Use the **pooled connection string** (PgBouncer) for app runtime
- Use the **direct connection string** only for `prisma migrate deploy`
- Always include `?sslmode=require` in all connection strings
- Aiven Redis: use `rediss://` (TLS required)
- Set `connection_limit` in Prisma to respect PgBouncer pool size (recommended: 1 per serverless function)

---

## 🧪 TESTING STANDARDS

| Test Type | Tool | Minimum Coverage |
|---|---|---|
| Unit Test | Jest | 80% |
| Integration Test | Supertest | 80% on critical endpoints |
| E2E Test | Playwright | All critical user flows |

---

## 🚀 GIT & DEVOPS

### Branching Strategy

```
main        ← production only, protected
develop     ← staging / integration
feature/*   ← new features
hotfix/*    ← urgent production fixes
```

### Commit Convention

```
feat: add company detail page
fix: resolve pipeline kanban drag issue
refactor: extract reusable DataTable component
chore: update prisma schema
docs: update CLAUDE.md sprint plan
```

### CI/CD Pipeline

```
Lint → Type Check → Test → Build → Deploy
```

### Pre-Production Checklist

- [ ] All environment variables are set and secure
- [ ] Build passes without errors
- [ ] Lint passes
- [ ] Tests pass (min 80% coverage)
- [ ] Prisma migrations applied using direct URL
- [ ] HTTPS enabled
- [ ] Logging enabled
- [ ] Monitoring enabled
- [ ] Rate limiting enabled
- [ ] Database backup configured on Aiven

---

## 🤖 AI CODE GENERATION INSTRUCTIONS

When generating code, the LLM MUST:

1. Explain the file structure and design rationale before writing code
2. Produce full implementation — no pseudo-code, no placeholders
3. Include TypeScript type definitions and interfaces
4. Include Zod validation schemas
5. Include error handling (try/catch with meaningful messages)
6. Include loading state, empty state, and error state for all UI components
7. Include skeleton loading components
8. Generate modular and reusable code
9. Add comments only for non-obvious business logic
10. Ensure responsive layout and basic accessibility

When refactoring:
- Maintain backward compatibility and API contracts
- Reduce complexity, improve readability and reusability

When designing database schema:
- Make all relationships explicit
- Add appropriate indexes
- Consider audit trail and scalability from the start
- Be compatible with standard PostgreSQL on Aiven (no exotic extensions)

---

## 📋 SPRINT PLAN

---

### 🏁 SPRINT 0 — Foundation (Week 1–2)

**Goal:** Project setup, infrastructure, and working authentication system.

#### Tasks

- [ ] Initialize Next.js + TypeScript + Tailwind CSS + shadcn/ui
- [ ] Initialize NestJS + Prisma
- [ ] Configure Aiven PostgreSQL connection (direct + pooled strings)
- [ ] Configure Aiven Redis connection
- [ ] Verify connectivity to both Aiven services
- [ ] Run first Prisma migration
- [ ] Setup GitHub Actions (lint → type check → test)
- [ ] Build global layout: Sidebar + Top Navigation + Main Content Area
- [ ] Implement Authentication: Login, JWT Access Token, Refresh Token, RBAC guards
- [ ] Implement route protection middleware (frontend + backend)
- [ ] Setup global error handling (frontend: error boundary; backend: exception filter)
- [ ] Build API base service layer (fetch wrapper with auth headers and interceptors)

#### Database Schema

```prisma
model User {
  id          String    @id @default(uuid())
  email       String    @unique
  password    String
  name        String
  role        Role      @default(RM)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  createdBy   String    @default("system")
  updatedBy   String    @default("system")
  deletedAt   DateTime?
}

enum Role {
  ADMIN
  LEAD_RM
  RM
  CREDIT_ANALYST
  RISK_TEAM
  COMPLIANCE
  COMMITTEE
  AUDITOR
}
```

#### Definition of Done

```
✅ User can login and logout
✅ Routes are protected based on role
✅ Global layout renders (sidebar, top nav, content area)
✅ Aiven PostgreSQL and Redis connections verified
✅ CI pipeline is green
```

---

### 🏁 SPRINT 1 — Dashboard (Week 3–4)

**Goal:** Give RMs a mission control center to see their full portfolio status at a glance.

#### UI Layout

```
Header Summary    → Greeting · RM name · Portfolio value · Today's priorities
KPI Cards Row     → 7 key metric cards
AI Insights Feed  → AI-generated portfolio signals (mock for now)
Action Center     → Pending tasks · Approvals · Incomplete docs (with action buttons)
Risk Alert Stream → Severity-tagged alerts in timeline format
Pipeline Snapshot → Mini Kanban (3 columns: Lead · In Progress · Won/Lost)
```

#### Feature Checklist

- [ ] KPI Cards: Total Portfolio Value, Active Customers, Pending Approvals, High Risk Accounts, Unused Limits, Upcoming Renewals, Today's Tasks
- [ ] AI Insights Feed — mock data, connected to real AI in Sprint 6
- [ ] Action Center — pending tasks and approvals with direct action buttons
- [ ] Risk Alert Stream — severity tags (Critical / High / Medium / Low), timeline list, clickable
- [ ] Pipeline Snapshot — mini Kanban with deal counts per stage
- [ ] Date range filter (global, affects all sections)
- [ ] Skeleton loading for all sections
- [ ] Pull-to-refresh on mobile

#### Definition of Done

```
✅ Dashboard renders real data from the database
✅ All KPI cards show with skeleton loading
✅ Responsive on desktop and tablet
✅ Data refreshes correctly
```

---

### 🏁 SPRINT 2 — Companies Module (Week 5–7)

**Goal:** 360° Customer Intelligence Workspace — all client information in one place.

#### Part A: Company List Page (Week 5)

```
Search Bar (debounced, server-side)
Advanced Filter Panel (collapsible sidebar)
  → Industry · Risk Level · RM Owner · Region · Utilization · Facility Type · Revenue Range
Quick Segment Tabs: All · High Risk · Upsell Opportunity · Renewal Soon
Company Data Table (server-side: paginated, sortable, filterable)
```

Table columns: `Company Name · Group · Industry · RM Owner · Risk Rating · Total Exposure · Utilization % · Active Alerts · Last Activity`

Features:
- [ ] TanStack Table with server-side pagination, sorting, and filtering
- [ ] Debounced global search
- [ ] Collapsible advanced filter panel
- [ ] Quick segment tabs
- [ ] Export to CSV
- [ ] Skeleton loading, empty state, error state

#### Part B: Company Detail Page (Week 6–7)

```
Company Header     → Name · Group Badge · Risk Rating Badge · Exposure · Utilization · Health Score
Sticky Action Bar  → Add Visit · Upload Document · Generate Proposal · AI Analyze · Add Note
Tabbed Workspace:
```

| Tab | Content |
|---|---|
| Overview | Key summary, contacts, corporate structure, recent activity |
| Financial | Revenue, EBITDA, debt ratio, profit margin charts |
| Facilities | Loan table: type, limit, outstanding, utilization, maturity |
| Relationship | Meeting/activity timeline, notes |
| Documents | File list, upload, PDF/image preview |
| Collateral | Asset list, valuation, physical check status |
| Risk | Alert cards, risk trend |
| AI Insights | Placeholder — activated in Sprint 6 |
| Audit Trail | Immutable activity log |

Features:
- [ ] Company CRUD with soft delete
- [ ] All 9 tabs render with correct data
- [ ] Sticky action bar — all buttons functional
- [ ] File upload for Documents tab
- [ ] Activity feed for Relationship tab

#### Key Database Models

```prisma
model Company {
  id              String      @id @default(uuid())
  name            String
  groupName       String?
  industry        String?
  riskRating      RiskRating  @default(MEDIUM)
  totalExposure   Decimal?
  utilizationPct  Decimal?
  rmId            String
  rm              User        @relation(fields: [rmId], references: [id])
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  createdBy       String
  updatedBy       String
  deletedAt       DateTime?
}

enum RiskRating { LOW MEDIUM HIGH VERY_HIGH CRITICAL }
```

#### Definition of Done

```
✅ List with server-side search, filter, and pagination works
✅ Company detail with all tabs renders correctly
✅ CRUD operations work end-to-end
✅ Sticky action bar is functional
✅ Responsive layout
```

---

### 🏁 SPRINT 3 — Pipeline Module (Week 8–9)

**Goal:** Sales + Credit Workflow Engine — track opportunities from lead to approval.

#### UI Layout

```
Primary View:   Kanban Board (drag-and-drop)
Secondary View: Table View (toggleable)
Filter Bar:     Stage · RM · Industry · Deal Value · Date Range
```

#### Pipeline Stages (sequential, no skipping)

```
Lead → Initial Contact → Financial Collection → Analysis → Proposal → Committee → Approved / Rejected
```

#### Opportunity Detail — Side Drawer

```
Left Panel:  Timeline & Tasks (activity feed · task checklist · comments)
Right Panel: Documents & AI (file upload · preview · AI recommendation placeholder)
```

#### Feature Checklist

- [ ] Kanban board with drag-and-drop (dnd-kit)
- [ ] Toggle view: Kanban ↔ Table
- [ ] Opportunity CRUD
- [ ] Activity timeline per opportunity
- [ ] Task checklist per opportunity
- [ ] Document upload per opportunity
- [ ] Approval progress indicator
- [ ] Comments / internal notes
- [ ] AI recommendation placeholder (activated Sprint 6)
- [ ] Filter and search
- [ ] Stage transition requires mandatory field validation
- [ ] APPROVED and REJECTED are terminal states (require explicit reopen)

#### Key Database Models

```prisma
model PipelineOpportunity {
  id          String         @id @default(uuid())
  title       String
  companyId   String
  company     Company        @relation(fields: [companyId], references: [id])
  rmId        String
  stage       PipelineStage  @default(LEAD)
  dealValue   Decimal?
  probability Int?
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  createdBy   String
  updatedBy   String
}

enum PipelineStage {
  LEAD INITIAL_CONTACT FINANCIAL_COLLECTION
  ANALYSIS PROPOSAL COMMITTEE APPROVED REJECTED
}
```

#### Definition of Done

```
✅ Kanban drag-and-drop works across all stages
✅ Stage transition validates mandatory fields
✅ Opportunity detail drawer is fully functional
✅ Table view toggle works
```

---

### 🏁 SPRINT 4 — Visits / OTS Module (Week 10–11)

**Goal:** Mobile-first field verification — RMs document site visits from their phone.

#### UI Priority: MOBILE FIRST

#### Visit Workflow

```
Schedule → Check In → GPS Capture → Photo Capture → Checklist → Notes → Submit → Auto Summary
```

#### Feature Checklist

- [ ] Schedule visit (date, time, company, purpose type)
- [ ] Check-in with GPS capture (browser Geolocation API)
- [ ] Auto-timestamp on check-in
- [ ] Photo capture and upload (mobile camera-optimized)
- [ ] Visit checklist (configurable per visit type in Admin)
- [ ] Voice notes (Web Speech API)
- [ ] Digital signature capture (HTML Canvas)
- [ ] Offline mode (IndexedDB storage + sync queue when back online)
- [ ] Auto-generate visit summary (template-based; AI version in Sprint 6)
- [ ] Geo-tagged photo evidence
- [ ] Visit history visible in Company Detail → Relationship tab

#### Key Database Models

```prisma
model Visit {
  id          String      @id @default(uuid())
  companyId   String
  company     Company     @relation(fields: [companyId], references: [id])
  rmId        String
  visitType   String
  scheduledAt DateTime
  checkedInAt DateTime?
  latitude    Decimal?
  longitude   Decimal?
  summary     String?
  status      VisitStatus @default(SCHEDULED)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  createdBy   String
  updatedBy   String
}

enum VisitStatus { SCHEDULED IN_PROGRESS COMPLETED CANCELLED }
```

#### Definition of Done

```
✅ Runs smoothly on mobile browser (Chrome Android / Safari iOS)
✅ GPS capture works
✅ Photo upload works
✅ Offline mode saves locally and syncs on reconnect
✅ Visit appears in Company → Relationship tab
```

---

### 🏁 SPRINT 5 — Notifications & Risk Monitoring (Week 12–13)

**Goal:** Real-Time Risk Command Center — detect problems before they escalate.

#### Notification Center

- [ ] Notification list grouped by category
- [ ] Categories: Risk · Approval · Relationship · Compliance · Tasks · Commercial
- [ ] Priority ordering: Critical → High → Medium → Low
- [ ] Mark as read / acknowledge with timestamp
- [ ] Direct action button per notification (deep link to relevant page)
- [ ] Filter by category and date
- [ ] Real-time updates (polling every 30s minimum, or WebSocket)

#### Risk Monitoring Dashboard

```
Alert Feed         → Live severity stream (Critical / High / Medium / Low)
Portfolio Heatmap  → Color-coded by risk rating (by company / industry / region)
Anomaly Cards      → Unusual patterns with explanation
Risk Trend Charts  → Per-company risk score over time
Portfolio Summary  → Aggregate risk metrics
```

Alert Categories:

| Category | Example Trigger |
|---|---|
| Financial | Revenue decline >20% YoY |
| Operational | Supplier payment overdue |
| Legal | Litigation detected |
| Compliance | Missing mandatory document past deadline |
| Utilization | Unused credit limit >60 days |
| Fraud | Suspicious transaction pattern |

Features:
- [ ] Alert feed with severity tags
- [ ] Acknowledge alert (recorded with user + timestamp)
- [ ] Assign alert to an RM
- [ ] Portfolio heatmap
- [ ] Risk trend chart per company
- [ ] Filter and search alerts

#### Key Database Models

```prisma
model RiskAlert {
  id              String        @id @default(uuid())
  companyId       String
  company         Company       @relation(fields: [companyId], references: [id])
  category        AlertCategory
  severity        AlertSeverity
  title           String
  description     String
  acknowledgedAt  DateTime?
  acknowledgedBy  String?
  assignedTo      String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  createdBy       String
  updatedBy       String
}

enum AlertCategory { FINANCIAL OPERATIONAL LEGAL COMPLIANCE UTILIZATION FRAUD }
enum AlertSeverity { CRITICAL HIGH MEDIUM LOW }
```

#### Definition of Done

```
✅ Alerts display and can be acknowledged
✅ Notifications update in real-time (min 30s polling)
✅ Heatmap renders with real data
✅ Alert filter and search work
```

---

### 🏁 SPRINT 6 — AI Copilot & Intelligence Layer (Week 14–16)

**Goal:** Make AI a core part of the RM workflow — not a hidden add-on.

#### AI Copilot Module

```
┌─────────────────────┬────────────────────────────────┐
│    Left Panel       │        Right Panel             │
│    (Context)        │        (AI Chat)               │
│                     │                                │
│  Active Company     │  Streaming chat interface      │
│  Financial KPIs     │  Suggested context prompts     │
│  Recent Alerts      │  Typewriter response effect    │
│  Linked Documents   │                                │
└─────────────────────┴────────────────────────────────┘
```

Required AI Commands:
- [ ] Summarize company profile
- [ ] Analyze financial statements
- [ ] Generate proposal draft
- [ ] Generate call report from visit notes
- [ ] Explain detected risk signals
- [ ] Compare with industry / competitors
- [ ] Prepare committee Q&A
- [ ] Summarize uploaded document or meeting notes

AI UX Rules:
- AI floating button or sidebar item accessible from **every module**
- Copilot understands the **active context** (which company/deal is open)
- Suggested prompts change based on active context
- Responses stream in real-time (typewriter effect)

#### AI Activation Per Module (this sprint)

| Module | Feature Activated |
|---|---|
| Dashboard | AI Insights Feed goes live |
| Company Detail | AI Insights tab + "AI Analyze" button |
| Pipeline | AI deal recommendation in opportunity drawer |
| Visits | Auto-generate visit summary |
| Documents | OCR extraction + auto-classification |
| Committee | Q&A prep + executive summary generation |

#### Document Intelligence (OCR)

```
Left Panel:  Document Viewer (PDF / Image)
Right Panel: AI-Extracted Data (editable form fields, approve before saving)
```

Features:
- [ ] PDF and image upload
- [ ] OCR text extraction
- [ ] Table extraction (financial statements)
- [ ] Auto-classification (financial report / ID card / deed / NPWP / etc.)
- [ ] Auto-tagging
- [ ] Side-by-side: original document vs. extracted data
- [ ] User edits and approves extraction before it is saved

#### Definition of Done

```
✅ AI Copilot chat works with context awareness
✅ All 8 AI commands produce meaningful responses
✅ OCR extraction works for PDF and image
✅ AI accessible from at least 3 different modules
✅ Suggested prompts are context-aware
✅ Response streaming works
```

---

### 🏁 SPRINT 7 — Credit Analysis Module (Week 17–18)

**Goal:** Accelerate financial analysis for RMs and credit analysts.

#### UI Layout

```
Top Summary         → Company info · current rating · facility limit
Financial Charts    → 6 required charts
Ratio Analysis Grid → 4 categories of financial ratios
AI Analysis Block   → Strengths · Weaknesses · Anomalies · Recommendation
Document Viewer     → Linked financial statement files
```

#### Required Charts (all from real data)

- [ ] Revenue Trend
- [ ] EBITDA Trend
- [ ] Debt Ratio over time
- [ ] Operating Cash Flow
- [ ] DSCR (Debt Service Coverage Ratio)
- [ ] Net Profit Margin

#### Ratio Analysis Grid

| Category | Ratios |
|---|---|
| Liquidity | Current Ratio, Quick Ratio |
| Solvency | DER, DAR |
| Profitability | ROE, ROA, Net Profit Margin |
| Activity | TATO, AR Turnover |

#### AI Analysis Block — Required Sections

- [ ] Strengths (3–5 bullet points)
- [ ] Weaknesses (3–5 bullet points)
- [ ] Anomaly Detection (flags unusual numbers with explanation)
- [ ] Risk Summary
- [ ] Recommendation

#### Feature Checklist

- [ ] Upload financial statements (3 years of data)
- [ ] Auto-populate from OCR extraction (Sprint 6 integration)
- [ ] Charts render automatically from financial data
- [ ] Ratios calculate automatically
- [ ] AI analysis generation
- [ ] Export analysis to PDF
- [ ] Industry benchmark comparison

#### Definition of Done

```
✅ All 6 charts render from real data
✅ Ratio analysis auto-calculates
✅ AI analysis generates complete output
✅ PDF export works
✅ Data integrates from OCR (Sprint 6)
```

---

### 🏁 SPRINT 8 — Committee & Approval Module (Week 19–20)

**Goal:** Executive workspace for credit approval decisions.

#### UI Layout

```
Executive Summary Header
Financial Summary (key numbers at a glance)
Risk Summary
Collateral Summary
AI Recommendation Block
Committee Discussion Thread
Approval Workflow Progress Tracker (step indicator)
```

#### Feature Checklist

- [ ] Auto-generate committee memo from credit analysis data
- [ ] Multi-step approval workflow: Maker → Checker → Committee
- [ ] Voting per committee member (Approve / Reject / Abstain)
- [ ] Comments and discussion thread per session
- [ ] Revision tracking with version history
- [ ] AI Q&A prep (generates anticipated committee questions with suggested answers)
- [ ] Status: Draft → Under Review → Voted → Final
- [ ] Automated notifications to stakeholders on status change

#### Key Database Models

```prisma
model CommitteeSession {
  id          String          @id @default(uuid())
  companyId   String
  analysisId  String
  title       String
  status      CommitteeStatus @default(DRAFT)
  quorum      Int
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  createdBy   String
  updatedBy   String
}

enum CommitteeStatus { DRAFT UNDER_REVIEW VOTED FINAL REJECTED }
```

#### Definition of Done

```
✅ Multi-step approval workflow works
✅ All committee members can vote
✅ Notifications sent on status change
✅ Revision tracking works
✅ AI Q&A preparation generates output
```

---

### 🏁 SPRINT 9 — Collateral Module (Week 21–22)

**Goal:** End-to-end collateral and fiducia management.

#### Views

- **Table View:** Asset type · Valuation · Insurance expiry · Collateral expiry · Location · Physical check status
- **Map View:** Asset location markers (Leaflet.js or Google Maps)

#### Feature Checklist

- [ ] Collateral CRUD
- [ ] Valuation history tracking
- [ ] Insurance expiry monitoring with alerts
- [ ] Physical checking schedule and reminders
- [ ] Geo-tagged field evidence (linked to Visit module from Sprint 4)
- [ ] Document storage per collateral item
- [ ] Depreciation monitoring and projections
- [ ] Fiducia documentation tracking
- [ ] Map view with asset location markers
- [ ] Alerts when valuation or insurance is expiring

#### Definition of Done

```
✅ Collateral CRUD works end-to-end
✅ Map view renders with asset markers
✅ Expiry alerts trigger correctly
✅ Integrates with company detail
```

---

### 🏁 SPRINT 10 — Compliance, Audit & Admin (Week 23–24)

**Goal:** Full governance, security controls, and system administration.

#### Audit & Compliance

- [ ] Immutable activity log — every user action is recorded, never updated or deleted
- [ ] Activity timeline viewable per entity (company / visit / pipeline / document)
- [ ] Document versioning (full change history)
- [ ] Maker-checker tracking on all approval actions
- [ ] Audit log export (CSV and PDF)
- [ ] OJK-readiness compliance checklist view

#### Admin Module

- [ ] User management (CRUD + role assignment)
- [ ] Role and permission management
- [ ] Approval matrix configurator
- [ ] Workflow settings (mandatory fields per stage, visit types, checklist templates)
- [ ] Integration settings
- [ ] AI settings (model, prompt templates, usage limits)
- [ ] System health dashboard

#### Key Database Models

```prisma
model AuditLog {
  id          String   @id @default(uuid())
  userId      String
  action      String
  entityType  String
  entityId    String
  oldValue    Json?
  newValue    Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  // No updatedAt — this table is append-only and immutable
}
```

#### Definition of Done

```
✅ Every user action is recorded in the audit log
✅ Admin can manage users and roles
✅ Audit log export works (CSV + PDF)
✅ Approval matrix is configurable via UI
✅ Document versioning works
```

---

## 📊 RELEASE ROADMAP

| Sprint | Feature | Priority | Release |
|---|---|---|---|
| Sprint 0 | Foundation + Auth | 🔴 Critical | MVP |
| Sprint 1 | Dashboard | 🔴 Critical | MVP |
| Sprint 2 | Companies | 🔴 Critical | MVP |
| Sprint 3 | Pipeline | 🔴 Critical | MVP |
| Sprint 4 | Visits / OTS | 🟠 High | MVP |
| Sprint 5 | Notifications + Risk Monitoring | 🟠 High | Intelligence |
| Sprint 6 | AI Copilot + OCR | 🟠 High | Intelligence |
| Sprint 7 | Credit Analysis | 🟡 Medium | Intelligence |
| Sprint 8 | Committee + Approval | 🟡 Medium | Enterprise |
| Sprint 9 | Collateral | 🟡 Medium | Enterprise |
| Sprint 10 | Compliance + Admin | 🟡 Medium | Enterprise |

```
MVP Release          → Sprint 0–4 complete
Intelligence Release → Sprint 5–7 complete
Enterprise Release   → Sprint 8–10 complete
```

---

## 💬 VIBE CODING PROMPT TEMPLATES

### Feature Generation

```
Build the [FEATURE_NAME] feature based on CLAUDE.md.

Context:
- Module: [MODULE_NAME]
- Sprint: [SPRINT_NUMBER]
- User roles that use this: [USER_ROLES]

Stack: Next.js + TypeScript + shadcn/ui (frontend) · NestJS + Prisma + Aiven PostgreSQL (backend)

Requirements:
- Follow the folder structure in CLAUDE.md
- Clean architecture: controller → service → repository
- Include: TypeScript types, Zod validation, error handling
- Include: loading state, empty state, error state, skeleton loading
- UI must be responsive and follow the design system in CLAUDE.md
- Use server-side pagination, sorting, and filtering for list views
- Aiven PostgreSQL: use pooled connection string for runtime, direct for migrations

Expected output:
1. Folder structure for this feature
2. Prisma schema additions (with indexes)
3. Backend: module, controller, service, DTOs
4. Frontend: page, components, custom hooks, API service
5. TypeScript type definitions
6. Brief explanation of each file
```

### Bug Fix

```
There is a bug in [MODULE / FEATURE].

Description: [DESCRIPTION]
Steps to reproduce: [STEPS]
Expected: [EXPECTED]
Actual: [ACTUAL]

Analyze the root cause step-by-step, then provide a production-ready fix that
maintains backward compatibility. Add a prevention strategy.
```

### Refactor

```
Refactor the following code according to the standards in CLAUDE.md.

Goals: improve readability · reduce complexity · remove duplication · improve TypeScript typing
Constraint: maintain backward compatibility and existing API contracts.

[CODE]
```

### Database Schema Design

```
Design the Prisma schema for the [FEATURE_NAME] module.

Requirements:
- UUID primary keys
- Every model must have: id, created_at, updated_at, created_by, updated_by
- Soft delete via deleted_at where appropriate
- Explicit relationships with proper @relation annotations
- Indexes on foreign keys and commonly filtered columns
- Compatible with standard PostgreSQL on Aiven (no exotic extensions)
- Consider audit trail and scalability
```

---

## 📝 BUSINESS RULES

### Risk Rules

- Every company must have a risk rating: `LOW · MEDIUM · HIGH · VERY_HIGH · CRITICAL`
- All risk alerts must be actionable — each must be assignable and acknowledgeable
- HIGH and CRITICAL accounts automatically appear on the responsible RM's dashboard

### Pipeline Rules

- Stage transitions require all mandatory fields to be filled
- Stages cannot be skipped — must move in sequential order
- `APPROVED` and `REJECTED` are terminal states — require explicit reopen action to change

### Visit Rules

- Check-in must record GPS coordinates (required field)
- At least 1 photo is required per completed visit
- Visit summary must be submitted within 24 hours of the visit date

### Document Rules

- All documents are version-tracked (no permanent deletion — soft delete only)
- OCR-extracted data must be validated and approved by a user before use in analysis

### Approval Rules

- A maker cannot be the checker for the same transaction
- Committee approval requires a configurable quorum (set in Admin)
- All approval decisions must be recorded in the audit log with timestamp and user

### Aiven Connection Rules

- Runtime → always use the **pooled** (PgBouncer) connection string
- Migrations → always use the **direct** connection string
- All connection strings must include `?sslmode=require`
- Redis connection must use `rediss://` (TLS)

### Future Integration Targets

**Internal systems:** Core Banking · LMS · SID / BI Checking · CIF · Treasury · Trade Finance

**External data sources:** News provider · Supply chain data · Public financial reports · Legal/litigation databases

---

*CLAUDE.md — Last Updated: Sprint 0 initialization*
*Update this document whenever there are changes to architecture, stack, business rules, or sprint scope.*
