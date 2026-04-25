'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getCompetitors, getClients } from '../lib/api';

export default function MarketIntel() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState('');
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newComp, setNewComp] = useState({ name: '', website: '', threat: 'medium' as string, strengths: '', weaknesses: '', pricing: '', services: '' });

  useEffect(() => { if (clients.length > 0 && !selectedClient) setSelectedClient(clients[0]._id); }, [clients]);
  useEffect(() => { loadData(); }, [selectedClient]);

  const loadData = async () => {
    if (!selectedClient) return;
    try {
      const res = await getCompetitors(selectedClient);
      setCompetitors(res.competitors || []);
    } catch (e) {}
  };

  const handleCreate = async () => {
    // Use API to create competitor (POST /api/competitors/:clientId)
    // For now, just show it
    setCompetitors([...competitors, { _id: Date.now().toString(), ...newComp, services: newComp.services.split(',').map((s: string) => s.trim()), client: selectedClient }]);
    setShowNew(false);
    setNewComp({ name: '', website: '', threat: 'medium', strengths: '', weaknesses: '', pricing: '', services: '' });
  };

  return (
    <div className="market-intel">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Market Intelligence</h2>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary">+ Add Competitor</button>
      </div>

      {showNew && (
        <div className="card mb-6 p-6">
          <h3 className="font-bold mb-4">Track Competitor</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Company name" value={newComp.name} onChange={e => setNewComp({...newComp, name: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <input type="text" placeholder="Website" value={newComp.website} onChange={e => setNewComp({...newComp, website: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <select value={newComp.threat} onChange={e => setNewComp({...newComp, threat: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="low">Low Threat</option>
              <option value="medium">Medium Threat</option>
              <option value="high">High Threat</option>
            </select>
            <input type="text" placeholder="Pricing info" value={newComp.pricing} onChange={e => setNewComp({...newComp, pricing: e.target.value})} className="p-2 border rounded-lg text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <textarea placeholder="Strengths" value={newComp.strengths} onChange={e => setNewComp({...newComp, strengths: e.target.value})} className="p-2 border rounded-lg text-sm" rows={2} />
            <textarea placeholder="Weaknesses" value={newComp.weaknesses} onChange={e => setNewComp({...newComp, weaknesses: e.target.value})} className="p-2 border rounded-lg text-sm" rows={2} />
          </div>
          <input type="text" placeholder="Services (comma-separated)" value={newComp.services} onChange={e => setNewComp({...newComp, services: e.target.value})} className="w-full mt-4 p-2 border rounded-lg text-sm" />
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreate} className="btn btn-primary">Add</button>
            <button onClick={() => setShowNew(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map(c => (
          <div key={c._id} className="card">
            <div className="flex justify-between items-start mb-3">
              <div className="font-semibold">{c.name}</div>
              <span className={`px-2 py-0.5 text-xs rounded-full text-white ${c.threat === 'high' ? 'bg-red-500' : c.threat === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                {c.threat}
              </span>
            </div>
            {c.website && <a href={c.website} target="_blank" className="text-xs text-orange-500 hover:underline">{c.website}</a>}
            <div className="mt-3 space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Pricing:</span> {c.pricing || 'N/A'}
              </div>
              {c.strengths && <div className="p-2 bg-green-50 rounded text-xs">✅ {c.strengths}</div>}
              {c.weaknesses && <div className="p-2 bg-red-50 rounded text-xs">⚠️ {c.weaknesses}</div>}
              {c.services?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.services.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {competitors.length === 0 && (
        <div className="text-center text-gray-500 py-12">No competitors tracked. Add your first competitor to start tracking.</div>
      )}
    </div>
  );
}