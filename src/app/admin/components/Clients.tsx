'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import * as api from '../lib/api';
import { PageHeader, Loading, ErrorBox, StatusBadge, EmptyState } from './Dashboard';

export default function Clients() {
  const { clients, tasks, setClients, setTasks, refresh } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', website: '', industry: '', monthlyValue: 25000, services: '', notes: '' });
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<api.AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()) ||
    c.website.toLowerCase().includes(search.toLowerCase())
  );

  const analyzeWebsite = async () => {
    if (!form.website) return;
    setAnalyzing(true);
    setError(null);
    try {
      const result = await api.analyzeWebsite(form.website, form.industry || undefined);
      setAnalysisResult(result);
      if (!form.industry && result.industry) setForm(f => ({ ...f, industry: result.industry }));
    } catch (e: any) {
      // Fallback analysis
      setAnalysisResult({
        industry: form.industry || 'Digital Marketing',
        needs: ['SEO Optimization', 'Content Strategy', 'Social Media', 'Lead Generation'],
        plan: [
          { title: 'Phase 1: Foundation (Week 1-2)', tasks: ['Website Audit', 'SEO Keyword Research', 'Competitor Analysis', 'Google Business Profile'] },
          { title: 'Phase 2: Content (Week 2-4)', tasks: ['Blog Post Strategy', 'Content Calendar', 'SEO Content Creation'] },
          { title: 'Phase 3: Growth (Week 4-6)', tasks: ['Social Media Strategy', 'Lead Capture Setup', 'Performance Tracking'] },
        ]
      });
    }
    setAnalyzing(false);
  };

  const addClient = async () => {
    if (!form.name || !form.website) return;
    setSaving(true);
    setError(null);
    try {
      const services = form.services ? form.services.split(',').map(s => s.trim()).filter(Boolean) :
        analysisResult ? analysisResult.needs.slice(0, 4) : [];
      
      const saved = await api.createClient({
        name: form.name, website: form.website, industry: form.industry || analysisResult?.industry || 'Digital Marketing',
        status: 'active', monthlyValue: form.monthlyValue, services,
        notes: analysisResult ? `Auto-analyzed: ${analysisResult.needs.join(', ')}` : form.notes,
        tasks: 0, completedTasks: 0,
      });

      // Create tasks from analysis
      if (analysisResult) {
        const taskPromises = analysisResult.plan.flatMap((phase, idx) =>
          phase.tasks.map(taskTitle =>
            api.createTask({
              title: taskTitle, description: `For ${form.name}: ${taskTitle}`,
              status: 'backlog', priority: idx === 0 ? 'high' : 'medium',
              client: saved.id, category: phase.title.includes('SEO') ? 'SEO' : phase.title.includes('Content') ? 'Content' : phase.title.includes('Social') ? 'Social' : 'Strategy',
              createdAt: new Date().toISOString().split('T')[0], dueDate: '',
            })
          )
        );
        const savedTasks = await Promise.all(taskPromises);
        setClients(prev => [...prev, saved]);
        setTasks(prev => [...prev, ...savedTasks]);
      } else {
        setClients(prev => [...prev, saved]);
      }

      setForm({ name: '', website: '', industry: '', monthlyValue: 25000, services: '', notes: '' });
      setAnalysisResult(null);
      setShowForm(false);
    } catch (e: any) {
      setError(e.message);
    }
    setSaving(false);
  };

  const removeClient = async (id: string) => {
    if (!confirm('Delete this client and all their tasks?')) return;
    try {
      await api.deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
      setTasks(prev => prev.filter(t => t.client !== id));
    } catch (e: any) { setError(e.message); }
  };

  return (
    <div>
      <PageHeader title="Clients" subtitle={`${clients.length} total`} action={
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Client'}
        </button>
      } />

      {error && <ErrorBox message={error} onRetry={refresh} />}

      {/* Search */}
      <div className="search-bar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search clients by name, industry, website..." />
      </div>

      {/* Add Client Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New Client</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Client name" />
            </div>
            <div className="form-group">
              <label>Website *</label>
              <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" onBlur={() => form.website && !analysisResult && analyzeWebsite()} />
            </div>
            <div className="form-group">
              <label>Industry {analysisResult ? '(auto-detected)' : ''}</label>
              <input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="e.g. Interior Design" />
            </div>
            <div className="form-group">
              <label>Monthly Value (₹)</label>
              <input type="number" value={form.monthlyValue} onChange={e => setForm({ ...form, monthlyValue: Number(e.target.value) })} />
            </div>
          </div>
          <div className="form-group">
            <label>Services</label>
            <input value={form.services} onChange={e => setForm({ ...form, services: e.target.value })} placeholder="SEO, Content, Social Media" />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Background, goals..." />
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={analyzeWebsite} disabled={!form.website || analyzing}>
              {analyzing ? '🔍 Analyzing...' : '🔍 Analyze Website'}
            </button>
            <button className="btn btn-primary" onClick={addClient} disabled={!form.name || !form.website || saving}>
              {saving ? 'Saving...' : analysisResult ? '✅ Add with Auto-Plan' : '+ Add Client'}
            </button>
          </div>

          {analysisResult && (
            <div className="analysis-result">
              <h4>🎯 Auto-Generated Plan</h4>
              <p><strong>Industry:</strong> {analysisResult.industry}</p>
              <p><strong>Needs:</strong> {analysisResult.needs.join(', ')}</p>
              {analysisResult.plan.map((phase, i) => (
                <div key={i} className="phase">
                  <p className="phase-title">{phase.title}</p>
                  <ul>{phase.tasks.map((t, j) => <li key={j}>{t}</li>)}</ul>
                </div>
              ))}
              <p className="task-count">✅ {analysisResult.plan.reduce((s, p) => s + p.tasks.length, 0)} tasks will be created</p>
            </div>
          )}
        </div>
      )}

      {/* Client List */}
      <div className="card">
        {filtered.length === 0 && <EmptyState message={search ? 'No matching clients' : 'No clients yet'} />}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Client</th><th>Industry</th><th>Services</th><th>Tasks</th><th>Value</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(c => {
                const ct = tasks.filter(t => t.client === c.id);
                const cd = ct.filter(t => t.status === 'done').length;
                return (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--oc-gray-500)' }}>{c.website}</div>
                    </td>
                    <td>{c.industry}</td>
                    <td><div className="tag-row">{c.services.slice(0, 2).map(s => <span key={s} className="tag">{s}</span>)}{c.services.length > 2 && <span className="tag">+{c.services.length - 2}</span>}</div></td>
                    <td>{cd}/{ct.length}</td>
                    <td>₹{(c.monthlyValue / 1000).toFixed(0)}K</td>
                    <td><StatusBadge status={c.status} /></td>
                    <td><button className="btn btn-sm btn-secondary" onClick={() => removeClient(c.id)}>🗑</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}