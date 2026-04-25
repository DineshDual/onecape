// OneCape API Client — centralized, with error handling + loading
const API_URL = 'https://13.126.110.0/api';
const API_KEY = 'onecape2026';

export interface Client {
  _id?: string;
  id: string;
  name: string;
  website: string;
  industry: string;
  status: 'active' | 'pending' | 'paused' | 'completed';
  onboardedAt: string;
  monthlyValue: number;
  services: string[];
  notes: string;
  tasks: number;
  completedTasks: number;
}

export interface Task {
  _id?: string;
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  client: string;
  category: string;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
}

export interface Lead {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: number;
  urgency: string;
  source: string;
  score: number;
  status: string;
  notes: string;
  createdAt: string;
}

export interface Competitor {
  _id?: string;
  id: string;
  name: string;
  website: string;
  strengths: string;
  weaknesses: string;
  threat: string;
}

export interface Experiment {
  id: string;
  hypothesis: string;
  metric: string;
  status: 'running' | 'won' | 'lost';
  createdAt: string;
}

export interface AnalysisResult {
  industry: string;
  needs: string[];
  plan: { title: string; tasks: string[] }[];
}

// Map MongoDB _id to id
function mapId<T extends { _id?: string; id?: string }>(item: T): any {
  return { ...item, id: item._id || item.id };
}

function mapIds<T extends { _id?: string; id?: string }>(items: T[]): any[] {
  return items.map(mapId);
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err}`);
  }
  return res.json();
}

// ─── Clients ───
export async function getClients(): Promise<Client[]> {
  const clients = await apiCall<any[]>('/api/clients');
  return mapIds(clients);
}

export async function createClient(data: Partial<Client>): Promise<Client> {
  const { id, _id, ...body } = data as any;
  const client = await apiCall<any>('/api/clients', { method: 'POST', body: JSON.stringify(body) });
  return mapId(client);
}

export async function updateClient(id: string, data: Partial<Client>): Promise<Client> {
  const client = await apiCall<any>(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  return mapId(client);
}

export async function deleteClient(id: string): Promise<void> {
  await apiCall(`/api/clients/${id}`, { method: 'DELETE' });
}

// ─── Tasks ───
export async function getTasks(clientId?: string): Promise<Task[]> {
  const url = clientId ? `/api/tasks?client=${clientId}` : '/api/tasks';
  const tasks = await apiCall<any[]>(url);
  return mapIds(tasks).map((t: any) => ({ ...t, client: t.client?._id || t.client }));
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const { id, _id, ...body } = data as any;
  const task = await apiCall<any>('/api/tasks', { method: 'POST', body: JSON.stringify(body) });
  return mapId(task);
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const task = await apiCall<any>(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  return mapId(task);
}

export async function removeTask(id: string): Promise<void> {
  await apiCall(`/api/tasks/${id}`, { method: 'DELETE' });
}

// ─── Leads ───
export async function getLeads(clientId: string): Promise<Lead[]> {
  const leads = await apiCall<any[]>(`/api/leads/${clientId}`);
  return mapIds(leads);
}

export async function createLead(clientId: string, data: Partial<Lead>): Promise<Lead> {
  const lead = await apiCall<any>(`/api/leads/${clientId}`, { method: 'POST', body: JSON.stringify(data) });
  return mapId(lead);
}

// ─── Competitors ───
export async function getCompetitors(clientId: string): Promise<Competitor[]> {
  const data = await apiCall<{ competitors: any[] }>(`/api/competitors/${clientId}`);
  return mapIds(data.competitors || []);
}

export async function addCompetitor(clientId: string, data: Partial<Competitor>): Promise<Competitor> {
  const comp = await apiCall<any>(`/api/competitors/${clientId}`, { method: 'POST', body: JSON.stringify(data) });
  return mapId(comp);
}

// ─── Analysis ───
export async function analyzeWebsite(url: string, industry?: string): Promise<AnalysisResult> {
  return apiCall<AnalysisResult>('/api/analyze', { method: 'POST', body: JSON.stringify({ url, industry }) });
}

// ─── Content Generation ───
export async function generatePoster(data: { title: string; subtitle?: string; images: string[]; clientName: string }): Promise<{ url: string }> {
  return apiCall('/api/content/poster', { method: 'POST', body: JSON.stringify(data) });
}

export async function generateVideo(data: { beforeImage: string; afterImage: string; duration?: number }): Promise<{ url: string }> {
  return apiCall('/api/content/video', { method: 'POST', body: JSON.stringify(data) });
}