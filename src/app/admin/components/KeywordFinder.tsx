'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { PageHeader, EmptyState } from './Dashboard';

export default function KeywordFinder() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const [keywords, setKeywords] = useState<{ keyword: string; volume: string; difficulty: string; intent: string }[]>([]);
  const [newKw, setNewKw] = useState('');
  const [searching, setSearching] = useState(false);

  // Pre-loaded TheVeeKay keywords
  const defaultKeywords = [
    { keyword: 'modular kitchen chennai', volume: '2.4K', difficulty: 'Medium', intent: 'Transactional' },
    { keyword: 'false ceiling design chennai', volume: '1.8K', difficulty: 'Low', intent: 'Informational' },
    { keyword: 'interior design cost chennai', volume: '3.1K', difficulty: 'High', intent: 'Transactional' },
    { keyword: 'aluminium windows chennai', volume: '1.2K', difficulty: 'Low', intent: 'Transactional' },
    { keyword: 'home interior tamil nadu', volume: '890', difficulty: 'Low', intent: 'Informational' },
    { keyword: 'kitchen renovation cost', volume: '1.5K', difficulty: 'Medium', intent: 'Transactional' },
    { keyword: 'best interior designer chennai', volume: '2.1K', difficulty: 'High', intent: 'Navigational' },
    { keyword: 'upvc windows vs aluminium', volume: '720', difficulty: 'Low', intent: 'Informational' },
  ];

  useState(() => { setKeywords(defaultKeywords); });

  const addKeyword = () => {
    if (!newKw) return;
    setKeywords(prev => [{ keyword: newKw.toLowerCase(), volume: '—', difficulty: '—', intent: 'Research' }, ...prev]);
    setNewKw('');
  };

  return (
    <div>
      <PageHeader title="Keyword Finder" subtitle="SEO keyword research and tracking" action={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="filter-select">
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      } />

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Add Keyword</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={newKw} onChange={e => setNewKw(e.target.value)} placeholder="e.g. modular kitchen cost chennai" onKeyDown={e => e.key === 'Enter' && addKeyword()} style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={addKeyword}>+ Add</button>
        </div>
      </div>

      <div className="card">
        {keywords.length === 0 && <EmptyState message="No keywords tracked" />}
        <table>
          <thead><tr><th>Keyword</th><th>Volume</th><th>Difficulty</th><th>Intent</th></tr></thead>
          <tbody>
            {keywords.map((kw, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{kw.keyword}</td>
                <td>{kw.volume}</td>
                <td><span className={`badge badge-${kw.difficulty === 'High' ? 'active' : kw.difficulty === 'Medium' ? 'pending' : 'completed'}`}>{kw.difficulty}</span></td>
                <td style={{ fontSize: 12 }}>{kw.intent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}