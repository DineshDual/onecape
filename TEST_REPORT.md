# OneCape Rebuild — Test Report

**Date:** 2026-04-21
**Frontend:** https://onecape-marketing.netlify.app/admin
**Backend:** http://13.126.110.0/onecape-api
**DB:** MongoDB Atlas (onecape_db)

---

## ✅ WORKING

### Backend
| Endpoint | Status |
|---|---|
| GET /api/health | ✅ `{"status":"ok","db":1}` |
| GET /api/clients | ✅ Returns TheVeeKay |
| POST /api/clients | ✅ Working |
| GET /api/tasks | ✅ Empty (no tasks yet) |
| PUT /api/tasks/:id | ✅ Working |
| DELETE /api/tasks/:id | ✅ Working |

### Frontend (Components Render)
| Component | Status |
|---|---|
| Login screen | ✅ Password: `onecape2026` |
| Dashboard | ✅ Stats, progress bars |
| Clients | ✅ Search, add, analyze |
| Task Board | ✅ Kanban (4 columns) |
| Content Studio | ✅ Templates, AI generate button |
| Social | ✅ Postiz connect |
| Growth Tracker | ✅ Experiments |
| Leads | ✅ Scoring |
| Market Intel | ✅ Competitor tracking |

---

## ❌ BROKEN

### Critical
| Issue | Root Cause |
|---|---|
| **Website Analysis hangs (503)** | `fetch()` to external URLs crashes Node.js/tsx |
| **Content Generation hangs** | Same fetch issue + no Ollama on server |
| **Apache proxy timeout** | 30s default timeout, analyze takes longer |

### UI
| Issue | Impact |
|---|---|
| **No SEO tab** | KeywordFinder component not wired in page.tsx |
| **Tasks don't auto-refresh** | Need to reload page after adding |
| **No error handling on API fail** | White screen if backend down |
| **Mobile sidebar toggle broken** | CSS classes mismatch |

### Missing
| Feature | Status |
|---|---|
| **Postiz API key not set** | User needs to add own key |
| **No image upload** | Not built |
| **No real-time updates** | No WebSocket |
| **No analytics integration** | No GA/GSC API |
| **No export** | No CSV/PDF |

---

## TEST RESULTS

```bash
# Backend tests
✅ curl /api/health        → {"status":"ok","db":1}
✅ curl /api/clients       → [TheVeeKay data]
❌ curl /api/analyze       → 503 (timeout/crash)
❌ curl /api/generate      → 503 (timeout)
✅ Frontend loads          → Login screen renders
```

---

## RECOMMENDED FIXES (Priority)

1. **Fix analyze endpoint** — Add 10s timeout, catch fetch errors, return fallback
2. **Fix generate endpoint** — Check Ollama availability, return fallback if down
3. **Increase Apache timeout** — `ProxyTimeout 60`
4. **Add SEO tab** — Wire KeywordFinder component
5. **Add auto-refresh** — After mutations, call refresh()
6. **Add error boundaries** — Catch React errors, show friendly message

---

## VERDICT

**Backend:** 7/10 — Core CRUD works, AI features crash
**Frontend:** 6/10 — All components render, some UX rough edges
**Overall:** **Usable but not production-ready**

Need 2-3 hours to fix critical bugs + polish.
