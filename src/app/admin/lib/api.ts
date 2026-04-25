// OneCape Admin API Client — Full

const API_URL = 'https://13.126.110.0/api';
const AUTH = 'Bearer onecape2026';

async function apiFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json', ...opts.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text().catch(() => 'Unknown')}`);
  return res.json();
}

// ─── Types ───
export interface Client {
  _id: string; name: string; website?: string; industry?: string;
  status: 'active' | 'pending' | 'paused' | 'completed';
  onboardedAt?: string; monthlyValue?: number; services?: string[];
  notes?: string; tasks?: number; completedTasks?: number;
  brandColor?: string; brandColor2?: string; logo?: string; tagline?: string;
  phone?: string; email?: string; address?: string;
  socialInstagram?: string; socialFacebook?: string; socialYoutube?: string; socialLinkedin?: string;
  serviceCatalog?: { name: string; description: string; startingPrice: number }[];
  portfolio?: { title: string; category: string; beforeImage?: string; afterImage?: string; description?: string; completedAt?: string }[];
  createdAt?: string; updatedAt?: string;
}

export interface Project {
  _id: string; client: string | { _id: string; name: string };
  title: string; description?: string;
  type: 'interior' | 'exterior' | 'farming' | 'marketing' | 'branding' | 'other';
  phase: 'enquiry' | 'design' | 'quote' | 'execution' | 'handover' | 'completed';
  budget: number; budgetSpent?: number; location?: string;
  startDate?: string; deadline?: string; completedAt?: string;
  milestones?: { title: string; dueDate?: string; completed: boolean; completedAt?: string }[];
  photos?: { url: string; caption?: string; phase?: string; uploadedAt?: string }[];
  notes?: string; priority: 'high' | 'medium' | 'low';
  createdAt?: string; updatedAt?: string;
}

export interface Task {
  _id: string; title: string; description?: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  client?: string; project?: string; category?: string;
  dueDate?: string; completedAt?: string; assignee?: string;
  createdAt?: string;
}

export interface Lead {
  _id: string; client?: string | { _id: string; name: string };
  name: string; email?: string; phone?: string;
  service?: string; budget?: number;
  urgency: 'low' | 'medium' | 'high';
  source: 'website' | 'instagram' | 'whatsapp' | 'referral' | 'walk-in' | 'ads' | 'phone' | 'other';
  score?: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  notes?: string; projectType?: string; location?: string; nextFollowUp?: string;
  createdAt?: string;
}

export interface Keyword {
  _id: string; client: string; keyword: string;
  volume?: number; difficulty: 'low' | 'medium' | 'high';
  intent: 'informational' | 'transactional' | 'navigational';
  currentRank?: number; targetRank?: number; url?: string;
}

export interface Stats {
  clientCount: number; projectCount: number; leadCount: number;
  activeLeads: number; totalRevenue: number; phaseCounts: Record<string, number>;
}

// ─── API Functions ───
export const getClients = () => apiFetch('/clients') as Promise<Client[]>;
export const getClient = (id: string) => apiFetch(`/clients/${id}`) as Promise<Client>;
export const createClient = (data: Partial<Client>) => apiFetch('/clients', { method: 'POST', body: JSON.stringify(data) }) as Promise<Client>;
export const updateClient = (id: string, data: Partial<Client>) => apiFetch(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }) as Promise<Client>;
export const deleteClient = (id: string) => apiFetch(`/clients/${id}`, { method: 'DELETE' });

export const getProjects = (clientId?: string) => apiFetch(`/projects${clientId ? `?client=${clientId}` : ''}`) as Promise<Project[]>;
export const createProject = (data: Partial<Project>) => apiFetch('/projects', { method: 'POST', body: JSON.stringify(data) }) as Promise<Project>;
export const updateProject = (id: string, data: Partial<Project>) => apiFetch(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }) as Promise<Project>;
export const deleteProject = (id: string) => apiFetch(`/projects/${id}`, { method: 'DELETE' });

export const getTasks = (clientId?: string) => apiFetch(`/tasks${clientId ? `?client=${clientId}` : ''}`) as Promise<Task[]>;
export const createTask = (data: Partial<Task>) => apiFetch('/tasks', { method: 'POST', body: JSON.stringify(data) }) as Promise<Task>;
export const updateTask = (id: string, data: Partial<Task>) => apiFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }) as Promise<Task>;
export const deleteTask = (id: string) => apiFetch(`/tasks/${id}`, { method: 'DELETE' });

export const getLeads = () => apiFetch('/leads') as Promise<Lead[]>;
export const getLeadsByClient = (clientId: string) => apiFetch(`/leads/${clientId}`) as Promise<Lead[]>;
export const createLead = (clientId: string, data: Partial<Lead>) => apiFetch(`/leads/${clientId}`, { method: 'POST', body: JSON.stringify(data) }) as Promise<Lead>;

export const getKeywords = (clientId: string) => apiFetch(`/keywords/${clientId}`) as Promise<Keyword[]>;
export const createKeyword = (clientId: string, data: Partial<Keyword>) => apiFetch(`/keywords/${clientId}`, { method: 'POST', body: JSON.stringify(data) }) as Promise<Keyword>;
export const deleteKeyword = (id: string) => apiFetch(`/keywords/${id}`, { method: 'DELETE' });

export const getStats = () => apiFetch('/stats') as Promise<Stats>;
export const getGrowth = (clientId: string) => apiFetch(`/growth/${clientId}`) as Promise<any[]>;
export const getCompetitors = (clientId: string) => apiFetch(`/competitors/${clientId}`) as Promise<any>;
export const getContent = (clientId: string) => apiFetch(`/content/${clientId}`) as Promise<any[]>;

export const generateContent = (type: string, prompt: string, clientId?: string) =>
  apiFetch('/generate', { method: 'POST', body: JSON.stringify({ type, prompt, client: clientId }) }) as Promise<{ content: string }>;

export const analyzeWebsite = (url: string, industry?: string) =>
  apiFetch('/analyze', { method: 'POST', body: JSON.stringify({ url, industry }) });