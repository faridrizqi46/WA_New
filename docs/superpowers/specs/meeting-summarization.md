# Meeting Summarization Feature - POC Lite

## Overview
A lightweight POC AI meeting assistant that transcribes, summarizes, and generates actionable outputs. Since this is a POC, we use mock data and a simplified tech stack instead of full backend integration.

---

## 1. Entry Points

**Where RMs access the feature:**
- **Sidebar:** New "Meeting" item in main navigation
- **Company Detail:** "Start Meeting" button in Relationship tab (pre-links to company)
- **Visit module:** Option to "Start AI Meeting" for a scheduled visit

---

## 2. Two Modes

### A. Real-Time Mode (Browser-First) - POC
- Opens a meeting view with simulated live transcript
- AI shows live transcript, detected topics, action items, term sheet preview
- User can toggle between "Live Preview" and "Summary Only" modes
- Uses mock data with simulated transcript updates via setInterval

### B. Post-Meeting Mode (Upload) - POC
- Drag & drop or browse for audio/video files (MP3, WAV, M4A, MP4, MOV)
- Upload progress bar (simulated)
- Processing status shown (mock processing)
- Results appear from mock data

---

## 3. Real-Time Meeting Assistant Page Layout (POC)

```
┌─────────────────────────────────────────────────────────────┐
│  [RM Workbench Logo]   Meeting Assistant   [Company ▼] [End] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────┐  ┌──────────────────────┐  │
│  │                             │  │ DETECTED TOPICS      │  │
│  │     LIVE TRANSCRIPT         │  │ • Credit facility    │  │
│  │                             │  │ • Expansion plan     │  │
│  │  [00:05:23] RM:             │  │ • New collateral     │  │
│  │  We'd like to discuss the   │  └──────────────────────┘  │
│  │  term sheet for the...      │                            │
│  │                             │  ┌──────────────────────┐  │
│  │  [00:05:31] Client:          │  │ ACTION ITEMS         │  │
│  │  We're looking at a 3-year  │  │ ☐ Prepare term sheet │  │
│  │  facility with...            │  │ ☐ Request 3yr audit  │  │
│  │                             │  │ ☐ Schedule follow-up │  │
│  │  [00:05:45] [NEW: Collateral│  └──────────────────────┘  │
│  │   request detected]          │                            │
│  │                             │  ┌──────────────────────┐  │
│  └─────────────────────────────┘  │ TERM SHEET DRAFT      │  │
│                                   │ Facility: IDR 5B     │  │
│                                   │ Tenor: 36 months     │  │
│                                   │ Rate: Jibor + 2.5%   │  │
│                                   │ Collat: Land + Bldg  │  │
│                                   └──────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 Documents Requested:                               │  │
│  │ • Last 3 year audited financial statements          │  │
│  │ • Current facility agreement with [Bank]             │  │
│  │ • Asset certificates for collateral                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [Pause] [Mute] [Add Note]           Live Mode: ON ●        │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Post-Meeting Upload Page (POC)

```
┌─────────────────────────────────────────────────────────────┐
│  Upload Meeting Recording                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┌───────────────────────────────────────────────┐       │
│     │                                               │       │
│     │     📁 Drag audio/video file here             │       │
│     │        or click to browse                     │       │
│     │                                               │       │
│     │     Supported: MP3, WAV, M4A, MP4, MOV        │       │
│     │                                               │       │
│     └───────────────────────────────────────────────┘       │
│                                                             │
│     Recent Uploads:                                         │
│     ├── PT Astra Meeting (12 May 2025) - Processing...    │
│     └── Semen Indonesia Q1 Review - Complete → View       │
│                                                             │
│  [Process Recording]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Post-Meeting Summary Output (POC)

```
┌─────────────────────────────────────────────────────────────┐
│  Meeting Summary - PT Astra International      [Edit] [Export] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  DATE: 12 May 2025  |  DURATION: 45 min  |  RM: Alex       │
│                                                             │
│  ATTENDEES:                                                 │
│  • Alex RM (Bank)                                           │
│  • Budi Santoso (CFO, PT Astra)                            │
│  • Dr. Rinawaty (Credit Dept Head)                         │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  EXECUTIVE SUMMARY                                          │
│  Discussion of new IDR 5Billion revolving credit facility  │
│  for 3 years. Client requests flexibility on collateral     │
│  requirements and prefers land + building over machinery.  │
│  Decision expected within 2 weeks.                          │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  KEY DECISIONS                                              │
│  ✓ Facility amount agreed at IDR 5B (down from 7B request) │
│  ✓ Tenor confirmed at 36 months                             │
│  ✓ Client to provide additional collateral documentation   │
│                                                             │
│  ACTION ITEMS                          STATUS               │
│  • Prepare draft term sheet              🔄 In Progress     │
│  • Request 3-year audited financials     ☐ Pending           │
│  • Schedule collateral appraisal         ☐ Pending           │
│  • Follow-up meeting next week           ☐ Pending          │
│                                                             │
│  TERM SHEET DRAFT                                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Facility Type: Revolving Credit                     │    │
│  │ Amount: IDR 5,000,000,000                          │    │
│  │ Tenor: 36 months                                    │    │
│  │ Interest: JIBOR + 2.5% p.a.                       │    │
│  │ Collateral: Land & Building (SHM) + Vehicle (BPKB) │    │
│  │ Purpose: Working capital                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  DOCUMENTS REQUESTED                                         │
│  1. Last 3 year audited financial statements                 │
│  2. Current facility agreement with Bank XYZ              │
│  3. Asset certificates for proposed collateral              │
│  4. Company NPWP & SIUP                                   │
│                                                             │
│  RISK FLAGS                                                 │
│  ⚠️ Current D/E ratio 3.2x - above bank threshold of 2.5x │
│  ⚠️ Existing facility utilization at 85%                 │
│                                                             │
│  [Link to Company: PT Astra International]                 │
│  [Create Follow-up Visit]                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Tech Stack (POC Lite)

| Component | Technology |
|-----------|------------|
| **Frontend** | React with TypeScript |
| **Styling** | Tailwind CSS |
| **State** | React useState/useContext |
| **Mock Data** | Static JSON/mock functions |
| **Audio Sim** | setInterval mock transcript updates |

---

## 7. Mock Data

```typescript
// Mock Meeting Data
const mockMeeting = {
  id: "mtg-001",
  companyId: "comp-001",
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
    { name: "Dr. Rinawaty", role: "Credit Dept Head", organization: "PT Astra", isRM: false }
  ],
  transcript: [
    { id: "t1", speaker: "RM", text: "We'd like to discuss the term sheet for the new credit facility.", timestamp: "00:05:23" },
    { id: "t2", speaker: "Client", text: "We're looking at a 3-year revolving facility with flexible collateral options.", timestamp: "00:05:31" },
    { id: "t3", speaker: "RM", text: "What collateral are you proposing?", timestamp: "00:05:45" },
    { id: "t4", speaker: "Client", text: "We're proposing land and building as primary collateral, plus vehicle fleet.", timestamp: "00:05:58" },
    { id: "t5", speaker: "RM", text: "That aligns with our requirements. What about the facility amount?", timestamp: "00:06:15" },
    { id: "t6", speaker: "Client", text: "We're requesting IDR 7B but open to discussing IDR 5B based on our credit profile.", timestamp: "00:06:28" }
  ],
  summary: "Discussion of new IDR 5Billion revolving credit facility for 3 years. Client requests flexibility on collateral requirements and prefers land + building over machinery. Decision expected within 2 weeks.",
  decisions: [
    "Facility amount agreed at IDR 5B (down from 7B request)",
    "Tenor confirmed at 36 months",
    "Client to provide additional collateral documentation"
  ],
  actionItems: [
    { id: "a1", text: "Prepare draft term sheet", status: "IN_PROGRESS", priority: "HIGH", assignee: "Alex RM" },
    { id: "a2", text: "Request 3-year audited financials", status: "PENDING", priority: "HIGH", assignee: "Alex RM" },
    { id: "a3", text: "Schedule collateral appraisal", status: "PENDING", priority: "MEDIUM", assignee: "Alex RM" },
    { id: "a4", text: "Follow-up meeting next week", status: "PENDING", priority: "MEDIUM", assignee: "Alex RM" }
  ],
  termSheet: {
    facilityType: "Revolving Credit",
    amount: "IDR 5,000,000,000",
    tenor: "36 months",
    interest: "JIBOR + 2.5% p.a.",
    collateral: "Land & Building (SHM) + Vehicle (BPKB)",
    purpose: "Working capital"
  },
  documentsRequested: [
    "Last 3 year audited financial statements",
    "Current facility agreement with Bank XYZ",
    "Asset certificates for proposed collateral",
    "Company NPWP & SIUP"
  ],
  riskFlags: [
    { id: "r1", type: "WARNING", message: "Current D/E ratio 3.2x - above bank threshold of 2.5x", metric: "D/E", value: "3.2x", threshold: "2.5x" },
    { id: "r2", type: "WARNING", message: "Existing facility utilization at 85%", metric: "Utilization", value: "85%", threshold: "80%" }
  ],
  detectedTopics: ["Credit facility", "Expansion plan", "New collateral", "Term sheet discussion"]
};

// Mock Recent Uploads
const mockRecentUploads = [
  { id: "up-001", name: "PT Astra Meeting", date: "12 May 2025", status: "Processing..." },
  { id: "up-002", name: "Semen Indonesia Q1 Review", date: "10 May 2025", status: "Complete" }
];

// Mock Transcript for Real-Time Simulation
const mockLiveTranscript = [
  { speaker: "RM", text: "Good morning, thank you for joining us today." },
  { speaker: "Client", text: "Good morning, we're excited to discuss this opportunity." },
  { speaker: "RM", text: "Let's start with your proposal for the credit facility." },
  { speaker: "Client", text: "We need approximately IDR 5 billion for working capital." },
  { speaker: "RM", text: "What tenor are you looking for?" },
  { speaker: "Client", text: "We're thinking 36 months with possible extension." }
];
```

---

## 8. Implementation Tasks (POC)

### Phase 1: Design Documentation
- [x] Create `docs/superpowers/specs/meeting-summarization.md` with POC spec

### Phase 2: Entry Points
- [ ] Add "Meeting" item to sidebar navigation
- [ ] Add "Start Meeting" button in Company Detail → Relationship tab
- [ ] Add "Start AI Meeting" option in Visit module

### Phase 3: Real-Time Mode UI (POC)
- [ ] Create meeting assistant page component
- [ ] Implement live transcript panel with mock data
- [ ] Build detected topics panel
- [ ] Build action items panel (checkbox-style)
- [ ] Build term sheet draft preview panel
- [ ] Build documents requested section
- [ ] Implement controls: Pause, Mute, Add Note
- [ ] Add mode toggle: Live Preview / Summary Only
- [ ] Add simulated transcript updates via setInterval

### Phase 4: Post-Meeting Upload Mode (POC)
- [ ] Create upload page with drag & drop zone
- [ ] Support file types: MP3, WAV, M4A, MP4, MOV
- [ ] Add upload progress bar (simulated)
- [ ] Show processing status (mock)
- [ ] Display recent uploads list
- [ ] Show results when complete

### Phase 5: Summary Output View (POC)
- [ ] Create meeting summary page component
- [ ] Display: date, duration, RM, attendees
- [ ] Executive summary section
- [ ] Key decisions list
- [ ] Action items with status indicators
- [ ] Term sheet draft display
- [ ] Documents requested list
- [ ] Risk flags section
- [ ] Actions: Edit, Export, Link to Company, Create Follow-up Visit

---

## 9. What to Build Later (Full Version)

- Real transcription API (OpenAI Whisper / AssemblyAI)
- Real-time WebSocket audio streaming
- S3 storage integration for audio files
- Zustand state management
- Full backend AI processing with GPT-4
- Company module: link meetings to company timeline
- Visit module: create Visit record from meeting with action items
- AI Copilot: expose meeting data as context
- Notifications: alert on processing complete