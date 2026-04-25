# OneCape Admin Panel — Full Audit Report

**Date:** 2026-04-21
**Auditor:** Alfred (Kimi K2.6)
**Project:** OneCape Brand Building Agency Admin Panel
**URL:** onecape-marketing.netlify.app/admin
**Backend:** 13.126.110.0/onecape-api
**DB:** MongoDB Atlas (onecape_db)

---

## 🔴 CRITICAL ISSUES (Broken / Not Working)

### 1. Website Analysis Calls Wrong URL
- **File:** `page.tsx`, line ~331
- **Bug:** `fetch(\`/api/analyze?url=...\`)` uses RELATIVE URL
- **Impact:** Since frontend is on Netlify, it hits `netlify.app/api/analyze` (404) instead of `13.126.110.0/onecape-api/api/analyze`
- **Fix:** Use `${API_URL}/api/analyze?url=...`

### 2. Task Creation With Empty ID
- **File:** `page.tsx`, line ~270
- **Bug:** New tasks created from auto-analysis have `id: ''`
- **Impact:** MongoDB will reject these — tasks never get created
- **Fix:** Remove `id` field entirely from POST body, let MongoDB generate `_id`

### 3. ContentStudio Module is Empty
- **File:** `page.tsx`, lines 674-729
- **Bug:** Shows "Coming soon" placeholder
- **Impact:** Content creation is a core feature, completely non-functional
- **Fix:** Build actual content generation interface

### 4. KeywordFinder Module is Static
- **File:** `page.tsx`, lines 731-756
- **Bug:** Shows only hardcoded TheVeeKay keywords
- **Impact:** Not dynamic per client, not searchable
- **Fix:** Fetch keywords per client, add research/generation tools

### 5. Social Media Module Lacks Backend Connection
- **File:** `page.tsx`, lines 758-1019
- **Bug:** Postiz integration is client-side only, no data persistence in MongoDB
- **Impact:** Posts scheduled in Postiz aren't tracked in OneCape
- **Fix:** Add Social model, sync posts to MongoDB

### 6. No Error Handling on API Calls
- **File:** `page.tsx`, lines 40-85
- **Bug:** `apiCall()` throws but never caught in components
- **Impact:** Network errors crash the UI, no user feedback
- **Fix:** Add try/catch + toast/alert to all API calls

### 7. No Loading States
- **File:** All over `page.tsx`
- **Bug:** No loading spinners during API calls
- **Impact:** Users think the app is frozen
- **Fix:** Add `isLoading` state + spinner to all async operations

### 8. Reports Module is Placeholder
- **File:** `page.tsx`
- **Bug:** Empty "Coming soon"
- **Impact:** Can't generate client reports
- **Fix:** Build report generator

---

## 🟡 UX ISSUES (Not User-Friendly)

### 9. No Mobile Responsiveness
- **File:** `page.tsx`, CSS
- **Bug:** Sidebar doesn't collapse on mobile, cards overflow
- **Impact:** Can't use on phone
- **Fix:** Add responsive breakpoints

### 10. No Onboarding Flow
- **Bug:** First-time user sees empty dashboard
- **Impact:** Confusing for new users
- **Fix:** Add welcome guide, default demo data

### 11. No Search/Filter
- **Bug:** Can't search clients or tasks
- **Impact:** Hard to find things with 10+ clients
- **Fix:** Add search bar to clients, tasks tables

### 12. Task Board Not Kanban
- **Bug:** It's a table, not a drag-and-drop Kanban
- **Impact:** Doesn't feel like a real task board
- **Fix:** Implement drag-and-drop with react-beautiful-dnd

### 13. No Dark Mode
- **Bug:** Only light theme
- **Impact:** Eye strain for night use
- **Fix:** Add dark mode toggle

### 14. No Notifications
- **Bug:** No alerts when tasks are due, leads come in
- **Impact:** Miss deadlines
- **Fix:** Add notification system

### 15. Form Validation Missing
- **Bug:** No validation on client add form
- **Impact:** Can add empty clients
- **Fix:** Add required field validation

### 16. No Export/Import
- **Bug:** Can't export client data, tasks, reports
- **Impact:** Data trapped in OneCape
- **Fix:** Add CSV/PDF export

---

## 🟠 MISSING FEATURES (Not What Was Expected)

### 17. No AI Content Generation
- **Expected:** "Content Studio" should generate blog posts, captions, etc.
- **Reality:** Empty placeholder
- **Fix:** Integrate Kimi/GLM API for content generation

### 18. No Image Upload for Projects
- **Expected:** Upload project photos for TheVeeKay
- **Reality:** No upload feature at all
- **Fix:** Add file upload to backend + Cloudinary/S3 storage

### 19. No Content Calendar
- **Expected:** Visual calendar showing scheduled posts
- **Reality:** List view only in Social tab
- **Fix:** Build calendar component

### 20. No Analytics Dashboard
- **Expected:** Traffic, leads, rankings charts
- **Reality:** Static numbers only
- **Fix:** Integrate Google Analytics API + chart library

### 21. No Real-Time Updates
- **Expected:** Live updates when team members add tasks
- **Reality:** Manual refresh needed
- **Fix:** Add WebSocket or polling

---

## 🔵 BACKEND ISSUES

### 22. Content Generator Not Exposed via API
- **File:** `server/content-generator.ts`
- **Bug:** Built but not wired to endpoints
- **Fix:** Add `/api/content/generate` endpoint

### 23. No Image Upload Endpoint
- **Bug:** Can't upload client logos, project photos
- **Fix:** Add `/api/upload` with multer

### 24. No Authentication
- **Bug:** API key is hardcoded (`onecape2026`)
- **Impact:** Anyone can access API
- **Fix:** Add JWT auth

### 25. No Rate Limiting
- **Bug:** API endpoints unprotected
- **Impact:** Could be abused
- **Fix:** Add express-rate-limit

### 26. CORS Too Permissive
- **Bug:** Allows all origins
- **Impact:** Security risk
- **Fix:** Restrict to specific domains

---

## ✅ PRIORITY FIX LIST

### P0 (Fix Today)
1. Fix API URL in analyzeWebsite
2. Remove empty id from task creation
3. Add error handling + loading states
4. Wire Content Generator to API

### P1 (This Week)
5. Build real ContentStudio
6. Add search/filter
7. Make Task Board Kanban-style
8. Add image upload

### P2 (Next Week)
9. Add content calendar
10. Build report generator
11. Add analytics integration
12. Mobile responsiveness

### P3 (Later)
13. Dark mode
14. Real-time updates
15. JWT auth + rate limiting

---

## SUMMARY

| Category | Count |
|---|---|
| Critical (Broken) | 8 |
| UX Issues | 8 |
| Missing Features | 5 |
| Backend Issues | 5 |
| **Total Issues** | **26** |

**Recommendation:** This needs a full rebuild, not patches. The architecture is sound but the execution is incomplete. Plan 3-5 days of focused dev work.
