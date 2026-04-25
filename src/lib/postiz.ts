// Postiz API Integration for OneCape
const POSTIZ_API = 'https://api.postiz.com/public/v1';

export interface PostizPost {
  content: string;
  integrations: string[]; // channel IDs
  scheduleAt?: string; // ISO date
  settings?: Record<string, any>;
  media?: string[]; // media IDs
}

export interface PostizIntegration {
  id: string;
  name: string;
  provider: string;
  picture?: string;
}

export interface PostizAnalytics {
  likes: number;
  shares: number;
  comments: number;
  views: number;
  clicks: number;
}

class PostizClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${POSTIZ_API}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Postiz API error: ${res.status} ${err}`);
    }
    return res.json();
  }

  // ─── Integrations (Connected Social Accounts) ───
  async listIntegrations(): Promise<PostizIntegration[]> {
    return this.request('/integrations');
  }

  // ─── Posts ───
  async createPost(post: PostizPost): Promise<any> {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async listPosts(): Promise<any[]> {
    return this.request('/posts');
  }

  async deletePost(postId: string): Promise<void> {
    return this.request(`/posts/${postId}`, { method: 'DELETE' });
  }

  // ─── Media Upload ───
  async uploadMedia(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${POSTIZ_API}/media`, {
      method: 'POST',
      headers: { 'Authorization': this.apiKey },
      body: formData,
    });
    const data = await res.json();
    return data.id;
  }

  // ─── Analytics ───
  async getAnalytics(postId: string): Promise<PostizAnalytics> {
    return this.request(`/posts/${postId}/analytics`);
  }
}

export { PostizClient };