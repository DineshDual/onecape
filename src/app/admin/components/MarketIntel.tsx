'use client';

import { useState } from 'react';
import { PageHeader, EmptyState } from './Dashboard';

export default function MarketIntel() {
  const [competitors, setCompetitors] = useState<{ id: string; name: string; website: string; strengths: string; weaknesses: string; threat: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', website: '', strengths: '', weaknesses: '', threat: 'medium' });

  const add = () => {
    if (!form.name) return;
    setCompetitors(prev => [...prev, { id: Date.now().toString(36), ...form }]);
    setForm({ name: '', website: '', strengths: '', weaknesses: '', threat: 'medium' });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Market Intel" subtitle="Competitor tracking and gap analysis" action={
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '✕ Cancel' : '+ Add Competitor'}</button>
      } />

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="stat-card"><div className="label">Tracked</div><div className="value">{competitors.length}</div></div>
        <div className="stat-card"><div className="label">High Threat</div><div className="value" style={{ color: 'var(--oc-red)' }}>{competitors.filter(c => c.threat === 'high').length}</div></div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-grid-2">
            <div className="form-group"><label>Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Competitor name" /></div>
            <div className="form-group"><label>Website</label><input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." /></div>
            <div className="form-group"><label>Strengths</label><input value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} placeholder="Local SEO, low prices..." /></div>
            <div className="form-group"><label>Weaknesses</label><input value={form.weaknesses} onChange={e => setForm({ ...form, weaknesses: e.target.value })} placeholder="No blog, weak social..." /></div>
          </div>
          <div className="form-group"><label>Threat Level</label><select value={form.threat} onChange={e => setForm({ ...form, threat: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          <button className="btn btn-primary" onClick={add}>Add</button>
        </div>
      )}

      <div className="card">
        {competitors.length === 0 && <EmptyState message="No competitors tracked yet" />}
        <table>
          <thead><tr><th>Competitor</th><th>Strengths</th><th>Weaknesses</th><th>Threat</th></tr></thead>
          <tbody>
            {competitors.map(c => (
              <tr key={c.id}>
                <td><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: 'var(--oc-gray-500)' }}>{c.website}</div></td>
                <td style={{ fontSize: 12 }}>{c.strengths || '—'}</td>
                <td style={{ fontSize: 12 }}>{c.weaknesses || '—'}</td>
                <td><span className={`badge badge-${c.threat === 'high' ? 'active' : c.threat === 'medium' ? 'pending' : 'completed'}`}>{c.threat}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}