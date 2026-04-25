# OneCape Admin Panel — Implementation Plan

## Philosophy
- AI is INVISIBLE to clients
- Admin panel shows "Smart Tools" — no "AI-powered" anywhere
- TheVeeKay is the first client and proof of concept

## Architecture
- Next.js app at onecape-marketing.netlify.app
- Admin panel at onecape-marketing.netlify.app/admin (password protected)
- AI marketing skills run server-side as API routes
- Results stored in Supabase/SQLite

## Phase 1: TheVeeKay Launch (Week 1-2)

### Day 1-2: SEO Foundation
- [ ] SEO keyword audit for "interior design chennai", "modular kitchen tamil nadu", etc.
- [ ] Optimize existing TheVeeKay pages for target keywords
- [ ] Create Google Business Profile optimization checklist

### Day 3-4: Content Engine
- [ ] Generate 4 blog posts targeting high-value keywords
- [ ] Create social media content calendar (2 posts/week)
- [ ] Set up content scoring (90+ quality gate)

### Day 5-7: Lead Generation
- [ ] Add lead capture form with scoring
- [ ] Create service-specific landing pages
- [ ] Set up conversion tracking

## Phase 2: Admin Panel (Week 2-3)

### Modules (No AI Branding!)
1. **Content Studio** → Content Ops + Expert Panel
2. **Keyword Finder** → SEO Ops
3. **Growth Tracker** → Growth Engine
4. **Lead Ranker** → Sales Pipeline
5. **Market Intel** → YT Competitive + Outbound
6. **Report Generator** → Revenue Intelligence

### Tech Stack
- Next.js 15 (already in project)
- Tailwind CSS (already configured)
- Server Actions for AI calls
- Local file storage for results (no external DB needed initially)

## Phase 3: Scale (Week 4+)
- Add more clients via admin panel
- Build case studies from TheVeeKay results
- Create client-facing dashboard (read-only)

## Key Rule
**NEVER say "AI-powered"** to clients. The tools are "Smart Content Engine", "Keyword Intelligence", "Growth Tracker" — professional names that convey value without revealing the tech.

## TheVeeKay — Current Gaps
1. No blog/SEO content
2. No lead scoring
3. No social media calendar
4. No competitor tracking
5. No conversion optimization
6. Contact form only — no lead magnet

## Quick Wins for TheVeeKay (This Week)
1. SEO audit → identify 50 target keywords
2. 4 blog posts targeting top keywords
3. Google Business Profile optimization
4. Social media content calendar
5. Lead scoring on contact form submissions