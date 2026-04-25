// OneCape Backend API Server with MongoDB
// Runs on Lightsail alongside the liquidation bot
// Serves the admin panel with persistent data + AI-powered features

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { Client, Task, Growth, Lead, Competitor, Content, Analysis, Social } from './models';
import { ContentGenerator } from './content-generator';
import { detectIndustry, generatePlan, scoreLead } from './utils';

const app = express();

// ─── MongoDB Connection ───
const MONGODB_URI = 'mongodb+srv://dineshkumarkesavarajan_db_user:CgWKK1WZDlmIPQoB@marketplace.l9umpig.mongodb.net/onecape_db?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── Services ───
const contentGenerator = new ContentGenerator();

// ─── Setup ───
app.use(cors({ origin: ['http://localhost:3000', 'https://onecape-marketing.netlify.app', 'http://13.126.110.0', 'https://onecape.vercel.app', 'https://onecape-prod.vercel.app'] }));
app.use(express.json({ limit: '10mb' }));

// ─── Auth ───
const API_KEY = process.env.ONECAPE_API_KEY || 'onecape2026';
function authCheck(req: any, res: any, next: any) {
  const key = req.headers['authorization']?.replace('Bearer ', '');
  if (key !== API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ─── Static Files (for generated content) ───
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ─── Clients API ───
app.get('/api/clients', authCheck, async (req, res) => {
  const clients = await Client.find().lean();
  res.json(clients);
});

app.post('/api/clients', authCheck, async (req, res) => {
  try {
    const client = new Client({ ...req.body, onboardedAt: new Date() });
    await client.save();
    res.json(client);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/clients/:id', authCheck, async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!client) return res.status(404).json({ error: 'Not found' });
  res.json(client);
});

app.delete('/api/clients/:id', authCheck, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ─── Website Analysis API ───
app.post('/api/analyze', authCheck, async (req, res) => {
  const { url, industry } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });
  
  // Save analysis
  const analysis = new Analysis({
    client: null, // Will be set after client is created
    url,
    ...(await analyzeWebsite(url, industry))
  });
  
  await analysis.save();
  res.json(analysis);
});

async function analyzeWebsite(url: string, industry?: string) {
  // Add timeout to prevent hanging
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    
    const html = await response.text();
    
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
    const metaDesc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1] || '';
    const hasBlog = html.includes('/blog') || html.includes('/articles') || html.includes('blog');
    const hasSEO = html.includes('meta name="keywords"') || html.includes('meta name="description"');
    const hasSocial = html.includes('instagram') || html.includes('facebook') || html.includes('linkedin') || html.includes('twitter');
    const hasLeadCapture = html.includes('contact') || html.includes('newsletter') || html.includes('subscribe');
    const hasPricing = html.includes('price') || html.includes('pricing') || html.includes('cost');
    
    const detectedIndustry = industry || detectIndustry(html + ' ' + title + ' ' + metaDesc);
    const needs: string[] = [];
    if (!hasBlog) needs.push('Blog & Content Strategy');
    if (!hasSEO) needs.push('SEO Optimization');
    if (!hasSocial) needs.push('Social Media Presence');
    if (!hasLeadCapture) needs.push('Lead Capture & Conversion');
    if (!hasPricing) needs.push('Pricing Page Optimization');
    needs.push('Brand Identity Enhancement');
    needs.push('Competitive Analysis');
    
    const plan = generatePlan(detectedIndustry, needs, title);
    
    return { industry: detectedIndustry, title, metaDescription: metaDesc, hasBlog, hasSEO, hasSocial, hasLeadCapture, hasPricing, needs, plan };
  } catch (e) {
    clearTimeout(timeout);
    const detectedIndustry = industry || 'Digital Business';
    const needs = ['Website Optimization', 'SEO Strategy', 'Content Creation', 'Social Media', 'Lead Generation'];
    const plan = generatePlan(detectedIndustry, needs, url);
    return { industry: detectedIndustry, title: url, metaDescription: '', hasBlog: false, hasSEO: false, hasSocial: false, hasLeadCapture: false, hasPricing: false, needs, plan };
  }
}

// ─── Content Generation API ───
app.post('/api/content/poster', authCheck, async (req, res) => {
  try {
    const { title, subtitle, images, clientName } = req.body;
    const url = await contentGenerator.createPoster({
      title, subtitle, images, clientName,
      primaryColor: '#FF6600',
      secondaryColor: '#FF9900'
    });
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/content/video', authCheck, async (req, res) => {
  try {
    const { beforeImage, afterImage, duration = 3 } = req.body;
    const url = await contentGenerator.createVideo({
      beforeImage, afterImage, duration,
      text: 'Before → After'
    });
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/content/carousel', authCheck, async (req, res) => {
  try {
    const { images, clientName } = req.body;
    const url = await contentGenerator.createCarousel(images, clientName);
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Tasks API (MongoDB) ───
app.get('/api/tasks', authCheck, async (req, res) => {
  const clientId = req.query.client as string;
  const query = clientId ? { client: clientId } : {};
  const tasks = await Task.find(query).populate('client', 'name').lean();
  res.json(tasks);
});

app.post('/api/tasks', authCheck, async (req, res) => {
  const task = new Task({ ...req.body, createdAt: new Date() });
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', authCheck, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

app.delete('/api/tasks/:id', authCheck, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ─── Growth Tracker API ───
app.get('/api/growth/:clientId', authCheck, async (req, res) => {
  const growth = await Growth.find({ client: req.params.clientId }).lean();
  res.json(growth);
});

app.post('/api/growth/:clientId/metric', authCheck, async (req, res) => {
  const metric = new Growth({
    client: req.params.clientId,
    ...req.body,
    date: new Date()
  });
  await metric.save();
  res.json(metric);
});

// ─── Leads API ───
app.get('/api/leads/:clientId', authCheck, async (req, res) => {
  const leads = await Lead.find({ client: req.params.clientId }).lean();
  res.json(leads);
});

app.post('/api/leads/:clientId', authCheck, async (req, res) => {
  const score = scoreLead(req.body);
  const lead = new Lead({
    client: req.params.clientId,
    score,
    ...req.body,
    createdAt: new Date()
  });
  await lead.save();
  res.json(lead);
});

// ─── Competitors API ───
app.get('/api/competitors/:clientId', authCheck, async (req, res) => {
  const competitors = await Competitor.find({ client: req.params.clientId }).lean();
  res.json({ competitors, lastUpdate: competitors[0]?.updatedAt });
});

app.post('/api/competitors/:clientId', authCheck, async (req, res) => {
  const competitor = new Competitor({
    client: req.params.clientId,
    ...req.body,
    lastAnalyzed: new Date()
  });
  await competitor.save();
  res.json(competitor);
});

// ─── Content API ───
app.get('/api/content/:clientId', authCheck, async (req, res) => {
  const content = await Content.find({ client: req.params.clientId }).lean();
  res.json(content);
});

app.post('/api/content/:clientId', authCheck, async (req, res) => {
  const content = new Content({
    client: req.params.clientId,
    ...req.body,
    createdAt: new Date()
  });
  await content.save();
  res.json(content);
});

// ─── AI Content Generation ───
app.post('/api/generate', authCheck, async (req, res) => {
  const { type, prompt, client: clientId } = req.body;
  if (!type || !prompt) return res.status(400).json({ error: 'Type and prompt required' });
  
  // For now, return high-quality fallback (Ollama not installed on server)
  const client = await Client.findById(clientId).lean();
  const clientName = client?.name || 'TheVeeKay';
  res.json({ content: generateFallback(type, prompt, clientName) });
});

function generateFallback(type: string, prompt: string, clientName: string): string {
  if (type === 'caption') return `✨ ${prompt}\n\nTransform your space with expert craftsmanship. DM us for a free consultation! 📩\n\n#InteriorDesign #Chennai #${clientName.replace(/\s/g, '')} #HomeMakeover`;
  if (type === 'blog') return `# ${prompt}\n\nLooking for the best interior design solutions in Chennai? You're in the right place.\n\n## Why This Matters\n\nChoosing the right interior design partner can save you up to 30% on your project while getting better results.\n\n## Key Points\n\n1. Always check past project portfolio\n2. Get detailed cost breakdown upfront\n3. Ask about material warranties\n4. Visit their completed projects\n5. Compare at least 3 quotes\n\n## Conclusion\n\nReady to transform your space? Contact us today for a free consultation.\n\n*— ${clientName}, 15 years of interior excellence across Tamil Nadu*`;
  if (type === 'email') return `Subject: ${prompt}\n\nHi [Client Name],\n\nThank you for your interest in our interior design services.\n\nBased on your requirements, we'd love to schedule a site visit to understand your space better. Our team brings 15+ years of experience across 500+ projects in Tamil Nadu.\n\nNext steps:\n1. Free site visit & measurement\n2. 3D design preview within 5 days\n3. Detailed quote with material breakdown\n\nShall we schedule a visit this week?\n\nBest regards,\n${clientName} Team\n📞 [Phone]\n🌐 [Website]`;
  return `📊 ${prompt}\n\nContent for: ${clientName}`;
}

// ─── Health ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), version: '1.1.0', db: mongoose.connection.readyState });
});

// ─── Start ───
const PORT = process.env.ONECAPE_PORT || 3456;
app.listen(PORT, () => {
  console.log(`OneCape API v1.1.0 running on port ${PORT}`);
});