// OneCape MongoDB Schema — Enhanced
import mongoose from 'mongoose';

// Client Schema — Enhanced with brand profile
const clientSchema = new mongoose.Schema({
  name: String,
  website: String,
  industry: String,
  status: { type: String, enum: ['active', 'pending', 'paused', 'completed'], default: 'pending' },
  onboardedAt: Date,
  monthlyValue: Number,
  services: [String],
  notes: String,
  tasks: { type: Number, default: 0 },
  completedTasks: { type: Number, default: 0 },
  // Brand Profile
  brandColor: { type: String, default: '#FF6600' },
  brandColor2: String,
  logo: String,
  tagline: String,
  phone: String,
  email: String,
  address: String,
  socialInstagram: String,
  socialFacebook: String,
  socialYoutube: String,
  socialLinkedin: String,
  // Services catalog
  serviceCatalog: [{
    name: String,
    description: String,
    startingPrice: Number,
  }],
  // Portfolio
  portfolio: [{
    title: String,
    category: String,
    beforeImage: String,
    afterImage: String,
    description: String,
    completedAt: Date,
  }],
}, { timestamps: true });

// Project Schema — replaces basic tasks for client work
const projectSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: String,
  description: String,
  type: { type: String, enum: ['interior', 'exterior', 'farming', 'marketing', 'branding', 'other'], default: 'interior' },
  phase: { type: String, enum: ['enquiry', 'design', 'quote', 'execution', 'handover', 'completed'], default: 'enquiry' },
  budget: { type: Number, default: 0 },
  budgetSpent: { type: Number, default: 0 },
  location: String,
  startDate: Date,
  deadline: Date,
  completedAt: Date,
  // Milestones
  milestones: [{
    title: String,
    dueDate: Date,
    completed: { type: Boolean, default: false },
    completedAt: Date,
  }],
  // Photos
  photos: [{
    url: String,
    caption: String,
    phase: String,
    uploadedAt: { type: Date, default: Date.now },
  }],
  // Notes/log
  notes: String,
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
}, { timestamps: true });

// Task Schema — internal tasks (not client projects)
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['backlog', 'in-progress', 'review', 'done'], default: 'backlog' },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  category: String,
  dueDate: Date,
  completedAt: Date,
  assignee: String,
}, { timestamps: true });

// Growth Metrics Schema
const growthSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  date: { type: Date, default: Date.now },
  traffic: Number,
  leads: Number,
  rank: String,
  revenue: Number,
  experiments: [{
    id: String,
    hypothesis: String,
    status: String,
    result: String
  }]
}, { timestamps: true });

// Lead Schema — Enhanced
const leadSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  email: String,
  phone: String,
  service: String,
  budget: Number,
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  source: { type: String, enum: ['website', 'instagram', 'whatsapp', 'referral', 'walk-in', 'ads', 'phone', 'other'], default: 'website' },
  score: Number,
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'], default: 'new' },
  notes: String,
  projectType: String,
  location: String,
  nextFollowUp: Date,
}, { timestamps: true });

// Competitor Schema
const competitorSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  website: String,
  strengths: String,
  weaknesses: String,
  threat: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  pricing: String,
  services: [String],
  lastAnalyzed: Date,
}, { timestamps: true });

// Content Schema
const contentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  type: String,
  prompt: String,
  content: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

// Analysis Schema
const analysisSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  url: String,
  title: String,
  metaDescription: String,
  hasBlog: Boolean,
  hasSEO: Boolean,
  hasSocial: Boolean,
  hasLeadCapture: Boolean,
  hasPricing: Boolean,
  needs: [String],
  plan: [{
    title: String,
    tasks: [String]
  }],
  analyzedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Social Schema — Enhanced with scheduling
const socialSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  platform: String,
  accountName: String,
  accountId: String,
  connectedAt: Date,
  lastPost: Date,
  posts: [{
    id: String,
    content: String,
    scheduledAt: Date,
    publishedAt: Date,
    status: { type: String, enum: ['draft', 'scheduled', 'published', 'failed'], default: 'draft' },
    engagement: {
      likes: Number,
      comments: Number,
      shares: Number,
      reach: Number,
    }
  }]
}, { timestamps: true });

// Keyword Schema — for SEO tracking
const keywordSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  keyword: String,
  volume: Number,
  difficulty: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  intent: { type: String, enum: ['informational', 'transactional', 'navigational'], default: 'informational' },
  currentRank: Number,
  targetRank: Number,
  url: String,
}, { timestamps: true });

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
const Growth = mongoose.models.Growth || mongoose.model('Growth', growthSchema);
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
const Competitor = mongoose.models.Competitor || mongoose.model('Competitor', competitorSchema);
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
const Social = mongoose.models.Social || mongoose.model('Social', socialSchema);
const Keyword = mongoose.models.Keyword || mongoose.model('Keyword', keywordSchema);

export { Client, Project, Task, Growth, Lead, Competitor, Content, Analysis, Social, Keyword };