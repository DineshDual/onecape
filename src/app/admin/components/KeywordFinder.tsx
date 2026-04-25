'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getKeywords, createKeyword, deleteKeyword } from '../lib/api';

export default function KeywordFinder() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState('');
  const [keywords, setKeywords] = useState<any[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newKw, setNewKw] = useState({ keyword: '', volume: 0, difficulty: 'medium' as string, intent: 'informational' as string, currentRank: 0, targetRank: 0 });

  useEffect(() => { if (clients.length > 0 && !selectedClient) setSelectedClient(clients[0]._id); }, [clients]);
  useEffect(() => { loadData(); }, [selectedClient]);

  const loadData = async () => {
    if (!selectedClient) return;
    try { const kw = await getKeywords(selectedClient); setKeywords(kw); } catch (e) {}
  };

  const handleCreate = async () => {
    if (!newKw.keyword) return;
    await createKeyword(selectedClient, newKw);
    setShowNew(false);
    setNewKw({ keyword: '', volume: 0, difficulty: 'medium', intent: 'informational', currentRank: 0, targetRank: 0 });
    loadData();
  };

  const getDifficultyColor = (d: string) => d === 'low' ? 'bg-green-500' : d === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
  const getIntentLabel = (i: string) => {
    const labels: Record<string, string> = { informational: 'ℹ️ Info', transactional: '🛒 Buy', navigational: '🧭 Nav' };
    return labels[i] || i;
  };

  return (
    <div className="keyword-finder">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">SEO Dashboard</h2>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">+ Add Keyword</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>{keywords.length}</h3>
            <p>Tracked Keywords</p>
          </div>
        </div>
        <div className="card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{keywords.filter((k: any) => k.currentRank && k.currentRank <= 10).length}</h3>
            <p>Top 10 Rankings</p>
          </div>
        </div>
        <div className="card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{keywords.filter((k: any) => k.currentRank && k.targetRank && k.currentRank <= k.targetRank).length}</h3>
            <p>On Target</p>
          </div>
        </div>
        <div className="card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{keywords.reduce((s, k: any) => s + (k.volume || 0), 0).toLocaleString()}</h3>
            <p>Total Search Volume</p>
          </div>
        </div>
      </div>

      {showNew && (
        <div className="card mb-6 p-6">
          <h3 className="font-bold mb-4">Add Keyword</h3>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Keyword" value={newKw.keyword} onChange={e => setNewKw({...newKw, keyword: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <input type="number" placeholder="Volume" value={newKw.volume || ''} onChange={e => setNewKw({...newKw, volume: Number(e.target.value)})} className="p-2 border rounded-lg text-sm" />
            <select value={newKw.difficulty} onChange={e => setNewKw({...newKw, difficulty: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="low">Low Difficulty</option>
              <option value="medium">Medium Difficulty</option>
              <option value="high">High Difficulty</option>
            </select>
            <select value={newKw.intent} onChange={e => setNewKw({...newKw, intent: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="informational">Informational</option>
              <option value="transactional">Transactional</option>
              <option value="navigational">Navigational</option>
            </select>
            <input type="number" placeholder="Current Rank" value={newKw.currentRank || ''} onChange={e => setNewKw({...newKw, currentRank: Number(e.target.value)})} className="p-2 border rounded-lg text-sm" />
            <input type="number" placeholder="Target Rank" value={newKw.targetRank || ''} onChange={e => setNewKw({...newKw, targetRank: Number(e.target.value)})} className="p-2 border rounded-lg text-sm" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreate} className="btn btn-primary">Add</button>
            <button onClick={() => setShowNew(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>Keyword Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Keyword</th>
                <th className="text-left p-3">Volume</th>
                <th className="text-left p-3">Difficulty</th>
                <th className="text-left p-3">Intent</th>
                <th className="text-left p-3">Current Rank</th>
                <th className="text-left p-3">Target Rank</th>
                <th className="text-left p-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k: any) => (
                <tr key={k._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{k.keyword}</td>
                  <td className="p-3">{(k.volume || 0).toLocaleString()}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-white text-xs ${getDifficultyColor(k.difficulty)}`}>{k.difficulty}</span></td>
                  <td className="p-3">{getIntentLabel(k.intent)}</td>
                  <td className="p-3">{k.currentRank || '—'}</td>
                  <td className="p-3">{k.targetRank || '—'}</td>
                  <td className="p-3">
                    {k.currentRank && k.targetRank ? (
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-orange-500 rounded-full" 
                          style={{ width: `${Math.min(100, Math.max(0, ((100 - k.currentRank) / (100 - k.targetRank)) * 100))}%` }}
                        />
                      </div>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {keywords.length === 0 && <div className="text-center text-gray-500 py-8">No keywords tracked. Add your first keyword to start tracking SEO.</div>}
      </div>
    </div>
  );
}