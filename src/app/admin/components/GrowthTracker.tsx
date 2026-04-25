'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getGrowth, getCompetitors, getContent } from '../lib/api';

export default function GrowthTracker() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState('');
  const [data, setData] = useState({ growth: [], competitors: [], content: [] });

  useEffect(() => { if (clients.length > 0 && !selectedClient) setSelectedClient(clients[0]._id); }, [clients]);
  useEffect(() => { loadData(); }, [selectedClient]);

  const loadData = async () => {
    if (!selectedClient) return;
    try {
      const [g, c] = await Promise.all([getGrowth(selectedClient), getCompetitors(selectedClient)]);
      setData({ growth: g, competitors: c.competitors || [], content: [] });
    } catch (e) {}
  };

  const totalTraffic = data.growth.reduce((s, g: any) => s + (g.traffic || 0), 0);
  const totalLeads = data.growth.reduce((s, g: any) => s + (g.leads || 0), 0);
  const totalRevenue = data.growth.reduce((s, g: any) => s + (g.revenue || 0), 0);

  return (
    <div className="growth-tracker">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Growth Tracker</h2>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <button className="btn btn-primary">📊 Export Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{totalTraffic.toLocaleString()}</h3>
            <p>Total Traffic</p>
          </div>
        </div>
        <div className="card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{totalLeads}</h3>
            <p>Leads Generated</p>
          </div>
        </div>
        <div className="card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{totalRevenue.toLocaleString()}</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <h2>Experiments</h2>
          <button className="btn btn-outline">+ New Experiment</button>
        </div>
        <div className="space-y-3">
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold">Instagram Reels vs Static Posts</div>
              <div className="text-sm text-gray-500">Hypothesis: Reels get 3x more engagement than static posts</div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">Running</span>
          </div>
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold">Festive Offer WhatsApp Broadcast</div>
              <div className="text-sm text-gray-500">Hypothesis: WhatsApp gets higher CTR than email for festive offers</div>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">Pending</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Competitor Activity</h2>
        </div>
        <div className="space-y-3">
          {data.competitors.map((c: any) => (
            <div key={c._id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{c.name}</div>
                <span className={`px-2 py-1 text-xs rounded-full text-white ${c.threat === 'high' ? 'bg-red-500' : c.threat === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  {c.threat} threat
                </span>
              </div>
              {c.website && <a href={c.website} target="_blank" className="text-sm text-orange-500">{c.website}</a>}
            </div>
          ))}
          {data.competitors.length === 0 && <div className="text-center text-gray-500 py-4">No competitors tracked. Add them from Market Intel.</div>}
        </div>
      </div>
    </div>
  );
}