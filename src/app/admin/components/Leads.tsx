'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { PageHeader, EmptyState, StatCard } from './Dashboard';

export default function Leads() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const [leads, setLeads] = useState<{ id: string; name: string; email: string; service: string; budget: number; urgency: string; source: string; score: number }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: 0, urgency: 'medium', source: 'website' });

  const scoreLead = (l: typeof form) => {
    let s = 50;
    if (l.budget > 50000) s += 20;
    if (l.budget > 100000) s += 10;
    if (l.urgency === 'high') s += 15;
    if (l.source === 'referral') s += 10;
    if (l.service === 'full') s += 10;
    return Math.min(s, 100);
  };

  const addLead = () => {
    if (!form.name) return;
    const score = scoreLead(form);
    setLeads(prev => [...prev, { id: Date.now().toString(36), ...form, score }]);
    setForm({ name: '', email: '', phone: '', service: '', budget: 0, urgency: 'medium', source: 'website' });
    setShowForm(false);
  };

  const hot = leads.filter(l => l.score >= 75).length;
  const warm = leads.filter(l => l.score >= 50 && l.score < 75).length;
  const cold = leads.filter(l => l.score < 50).length;

  return (
    <div>
      <PageHeader title="Lead Ranker" subtitle={`${leads.length} leads tracked`} action={
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '✕ Cancel' : '+ Add Lead'}</button>
      } />

      <div className="stats-grid">
        <StatCard label="Total" value={leads.length} />
        <StatCard label="🔴 Hot (75+)" value={hot} />
        <StatCard label="🟡 Warm (50-74)" value={warm} />
        <StatCard label="🔵 Cold (<50)" value={cold} />
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-grid-2">
            <div className="form-group"><label>Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Lead name" /></div>
            <div className="form-group"><label>Email</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
            <div className="form-group"><label>Service</label><select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option value="">Select...</option><option value="seo">SEO</option><option value="social">Social Media</option><option value="content">Content</option><option value="full">Full Package</option><option value="brand">Brand Identity</option></select></div>
            <div className="form-group"><label>Budget (₹)</label><input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} /></div>
            <div className="form-group"><label>Source</label><select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}><option value="website">Website</option><option value="referral">Referral</option><option value="social">Social</option><option value="ads">Ads</option><option value="cold">Cold</option></select></div>
            <div className="form-group"><label>Urgency</label><select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          </div>
          <button className="btn btn-primary" onClick={addLead}>Add Lead</button>
        </div>
      )}

      <div className="card">
        {leads.length === 0 && <EmptyState message="No leads yet" />}
        <table>
          <thead><tr><th>Name</th><th>Service</th><th>Budget</th><th>Source</th><th>Score</th></tr></thead>
          <tbody>
            {[...leads].sort((a, b) => b.score - a.score).map(l => (
              <tr key={l.id}>
                <td><div style={{ fontWeight: 600 }}>{l.name}</div><div style={{ fontSize: 11, color: 'var(--oc-gray-500)' }}>{l.email}</div></td>
                <td style={{ textTransform: 'capitalize' }}>{l.service || '—'}</td>
                <td>{l.budget ? `₹${(l.budget / 1000).toFixed(0)}K` : '—'}</td>
                <td style={{ textTransform: 'capitalize' }}>{l.source}</td>
                <td><span style={{ fontWeight: 700, color: l.score >= 75 ? 'var(--oc-red)' : l.score >= 50 ? 'var(--oc-yellow)' : 'var(--oc-blue)' }}>{l.score}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}