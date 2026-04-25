// Helper functions
export function detectIndustry(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('interior') || t.includes('exterior') || t.includes('kitchen') || t.includes('ceiling') || t.includes('furniture')) return 'Interior & Exterior Design';
  if (t.includes('restaurant') || t.includes('food') || t.includes('catering')) return 'Food & Restaurant';
  if (t.includes('fitness') || t.includes('gym') || t.includes('yoga')) return 'Fitness & Wellness';
  if (t.includes('real estate') || t.includes('property') || t.includes('housing')) return 'Real Estate';
  if (t.includes('software') || t.includes('saas') || t.includes('tech')) return 'Technology & SaaS';
  if (t.includes('clinic') || t.includes('hospital') || t.includes('doctor')) return 'Healthcare';
  if (t.includes('education') || t.includes('school') || t.includes('course')) return 'Education';
  if (t.includes('fashion') || t.includes('clothing') || t.includes('apparel')) return 'Fashion & Apparel';
  return 'Digital Business';
}

export function generatePlan(industry: string, needs: string[], siteName: string) {
  const templates: Record<string, any> = {
    'Interior & Exterior Design': {
      phases: [
        { title: 'Phase 1: SEO Foundation (Week 1-2)', tasks: [
          'Complete SEO keyword audit for target market',
          'Optimize all existing pages for target keywords',
          'Set up Google Business Profile with photos',
          'Create service-specific landing pages (top 5 services)',
          'Submit sitemap to Google Search Console',
        ]},
        { title: 'Phase 2: Content Engine (Week 2-4)', tasks: [
          'Write 4 blog posts targeting money keywords',
          'Create project gallery organized by service type',
          'Build pricing guide page (room-by-room)',
          'Set up content calendar (2 posts/week)',
        ]},
        { title: 'Phase 3: Social & Lead Gen (Week 4-6)', tasks: [
          'Connect Instagram, Facebook, LinkedIn to scheduler',
          'Add lead capture form with priority scoring',
          'Create before/after showcase posts',
          'Set up WhatsApp Business integration',
        ]},
        { title: 'Phase 4: Growth & Optimization (Ongoing)', tasks: [
          'Monitor keyword rankings weekly',
          'A/B test lead form positions',
          'Run retargeting ads to website visitors',
          'Monthly competitor gap analysis',
          'Build referral program for past clients',
        ]},
      ]
    },
    'default': {
      phases: [
        { title: 'Phase 1: Foundation (Week 1-2)', tasks: [
          'Complete website audit and fix issues',
          'SEO keyword research and on-page optimization',
          'Set up analytics tracking (GA4 + GSC)',
          'Create Google Business Profile',
          'Competitor analysis report',
        ]},
        { title: 'Phase 2: Content & SEO (Week 2-4)', tasks: [
          'Write 4 SEO-optimized blog posts',
          'Create service/product landing pages',
          'Build content calendar',
          'Optimize meta tags and schema markup',
        ]},
        { title: 'Phase 3: Social & Leads (Week 4-6)', tasks: [
          'Connect social accounts to scheduler',
          'Launch social media content plan',
          'Add lead capture with smart scoring',
          'Set up email nurture sequence',
        ]},
        { title: 'Phase 4: Growth (Ongoing)', tasks: [
          'Weekly keyword rank monitoring',
          'Monthly performance report',
          'A/B test conversion elements',
          'Build client review/testimonial system',
        ]},
      ]
    }
  };
  
  const template = templates[industry] || templates['default'];
  return template.phases;
}

export function scoreLead(lead: any): number {
  let score = 50; // base
  if (lead.budget && lead.budget > 50000) score += 20;
  if (lead.budget && lead.budget > 100000) score += 10;
  if (lead.urgency === 'high') score += 15;
  if (lead.source === 'referral') score += 10;
  if (lead.service === 'full') score += 10;
  if (lead.location) score += 5;
  return Math.min(score, 100);
}