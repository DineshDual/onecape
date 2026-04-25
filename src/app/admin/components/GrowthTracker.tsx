'use client';

import { useState } from 'react';
import { PageHeader, EmptyState, StatCard } from './Dashboard';

export default function GrowthTracker() {
  const [experiments, setExperiments] = useState<{ id: string; hypothesis: string; status: 'running' | 'won' | 'lost'; createdAt: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ hypothesis: '', metric: '' });

  const addExperiment = () => {
    if (!form.hypothesis) return;
    setExperiments(prev => [...prev, { id: Date.now().toString(36), hypothesis: form.hypothesis, status: 'running', createdAt: new Date().toISOString() }]);
    setForm({ hypothesis: '', metric: '' });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Growth Tracker" subtitle="Run experiments, track what works" action={
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '✕ Cancel' : '+ New Experiment'}</button>
      } />

      <div className="stats-grid">
        <StatCard label="Experiments" value={experiments.length} />
        <StatCard label="Running" value={experiments.filter(e => e.status === 'running').length} />
        <StatCard label="Won" value={experiments.filter(e => e.status === 'won').length} />
        <StatCard label="Lost" value={experiments.filter(e => e.status === 'lost').length} />
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-group"><label>Hypothesis</label><input value={form.hypothesis} onChange={e => setForm({ ...form, hypothesis: e.target.value })} placeholder="e.g. Blog posts get 2x more leads than social" /></div>
          <div className="form-group"><label>Success Metric</label><input value={form.metric} onChange={e => setForm({ ...form, metric: e.target.value })} placeholder="e.g. Leads per week" /></div>
          <button className="btn btn-primary" onClick={addExperiment}>Start Experiment</button>
        </div>
      )}

      <div className="card">
        {experiments.length === 0 && <EmptyState message="No experiments yet. Start one to track growth!" />}
        <table>
          <thead><tr><th>Hypothesis</th><th>Status</th><th>Started</th><th>Actions</th></tr></thead>
          <tbody>
            {experiments.map(exp => (
              <tr key={exp.id}>
                <td style={{ fontWeight: 600 }}>{exp.hypothesis}</td>
                <td><span className={`badge badge-${exp.status === 'won' ? 'completed' : exp.status === 'lost' ? 'paused' : 'active'}`}>{exp.status}</span></td>
                <td>{new Date(exp.createdAt).toLocaleDateString()}</td>
                <td>
                  {exp.status === 'running' && <>
                    <button className="btn btn-sm btn-secondary" onClick={() => setExperiments(prev => prev.map(e => e.id === exp.id ? { ...e, status: 'won' } : e))}>✅ Won</button>
                    <button className="btn btn-sm btn-secondary" style={{ marginLeft: 4 }} onClick={() => setExperiments(prev => prev.map(e => e.id === exp.id ? { ...e, status: 'lost' } : e))}>❌ Lost</button>
                  </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}