// OneCape MongoDB Schema
import mongoose from 'mongoose';

// Client Schema
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
}, { timestamps: true });

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['backlog', 'in-progress', 'review', 'done'], default: 'backlog' },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
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

// Lead Schema
const leadSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  email: String,
  phone: String,
  service: String,
  budget: Number,
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  source: { type: String, enum: ['website', 'referral', 'social', 'ads', 'cold'], default: 'website' },
  score: Number,
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  notes: String,
}, { timestamps: true });

// Competitor Schema
const competitorSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  website: String,
  strengths: [String],
  weaknesses: [String],
  threat: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  lastAnalyzed: { type: Date, default: Date.now }
}, { timestamps: true });

// Content Schema
const contentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  type: { type: String, enum: ['post', 'reel', 'carousel', 'poster'], required: true },
  title: String,
  description: String,
  hashtags: [String],
  scheduledAt: Date,
  publishedAt: Date,
  platform: String,
  status: { type: String, enum: ['draft', 'scheduled', 'published', 'archived'], default: 'draft' },
  assets: [String], // URLs to images/videos
  engagement: {
    likes: Number,
    comments: Number,
    shares: Number,
    views: Number
  }
}, { timestamps: true });

// Website Analysis Schema
const analysisSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  url: String,
  title: String,
  metaDescription: String,
  industry: String,
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

// Social Schema
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
    publishedAt: Date,
    engagement: {
      likes: Number,
      comments: Number,
      shares: Number
    }
  }]
}, { timestamps: true });

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
const Growth = mongoose.models.Growth || mongoose.model('Growth', growthSchema);
const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
const Competitor = mongoose.models.Competitor || mongoose.model('Competitor', competitorSchema);
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
const Social = mongoose.models.Social || mongoose.model('Social', socialSchema);

export { Client, Task, Growth, Lead, Competitor, Content, Analysis, Social };