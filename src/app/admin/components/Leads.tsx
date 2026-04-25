'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getLeads, createLead, getLeadsByClient, updateLead } from '../lib/api';

const SOURCES = ['website', 'instagram', 'whatsapp', 'referral', 'walk-in', 'ads', 'phone', 'other'] as const;
const STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] as const;

export default function Leads() {
  const { clients } = useApp();
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [showNew, setShowNew] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', service: '', budget: 0, urgency: 'medium' as string, source: 'website' as string, status: 'new' as string, notes: '' });

  useEffect(() => { loadData(); }, []);
  const loadData = async () => {
    if (selectedClient) {
      const l = await getLeadsByClient(selectedClient);
      setLeads(l);
    } else {
      const l = await getLeads();
      setLeads(l);
    }
  };

  const handleCreateLead = async () => {
    await createLead(selectedClient || clients[0]?._id, newLead);
    setNewLead({ name: '', email: '', phone: '', service: '', budget: 0, urgency: 'medium', source: 'website', status: 'new', notes: '' });
    setShowNew(false);
    loadData();
  };

  const getLeadScore = (lead: any) => {
    let score = 0;
    if (lead.urgency === 'high') score += 30;
    if (lead.urgency === 'medium') score += 15;
    if (lead.budget > 100000) score += 40;
    if (lead.budget > 50000) score += 20;
    if (lead.status === 'new') score += 10;
    if (lead.status === 'qualified') score += 20;
    return Math.min(100, score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const sourceColors: Record<string, string> = {
    website: 'bg-blue-500', instagram: 'bg-pink-500', whatsapp: 'bg-green-500',
    referral: 'bg-purple-500', 'walk-in': 'bg-orange-500', ads: 'bg-red-500',
    phone: 'bg-indigo-500', other: 'bg-gray-500'
  };

  const statusColors: Record<string, string> = {
    new: 'bg-gray-500', contacted: 'bg-blue-500', qualified: 'bg-purple-500',
    proposal: 'bg-orange-500', negotiation: 'bg-yellow-500', won: 'bg-green-500', lost: 'bg-red-500'
  };

  return (
    <div className="leads">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Lead Pipeline</h2>
        <div className="flex gap-3">
          <select 
            value={selectedClient} 
            onChange={e => { setSelectedClient(e.target.value); loadData(); }} 
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Clients</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <button onClick={() => setShowNew(true)} className="btn btn-primary">+ New Lead</button>
        </div>
      </div>

      {showNew && (
        <div className="card mb-6 p-6">
          <h3 className="font-bold mb-4">New Lead</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <input type="email" placeholder="Email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <input type="text" placeholder="Phone" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <select value={newLead.service} onChange={e => setNewLead({...newLead, service: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="">Service</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Exterior Design">Exterior Design</option>
              <option value="Farming">Farming</option>
              <option value="Marketing">Marketing</option>
              <option value="Branding">Branding</option>
            </select>
            <input type="number" placeholder="Budget" value={newLead.budget || ''} onChange={e => setNewLead({...newLead, budget: Number(e.target.value)})} className="p-2 border rounded-lg text-sm" />
            <select value={newLead.urgency} onChange={e => setNewLead({...newLead, urgency: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="low">Low Urgency</option>
              <option value="medium">Medium Urgency</option>
              <option value="high">High Urgency</option>
            </select>
            <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})} className="p-2 border rounded-lg text-sm">
              {SOURCES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value})} className="p-2 border rounded-lg text-sm">
              {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <textarea placeholder="Notes" value={newLead.notes} onChange={e => setNewLead({...newLead, notes: e.target.value})} className="w-full mt-4 p-2 border rounded-lg text-sm" rows={2} />
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreateLead} className="btn btn-primary">Create Lead</button>
            <button onClick={() => setShowNew(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Funnel visualization */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-8">
        {STATUSES.map(status => {
          const statusLeads = leads.filter(l => l.status === status);
          return (
            <div key={status} className={`rounded-lg p-4 text-center ${statusColors[status]} text-white`}>
              <div className="text-2xl font-bold">{statusLeads.length}</div>
              <div className="text-xs capitalize">{status}</div>
            </div>
          );
        })}
      </div>

      {/* Leads list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map(lead => (
          <div key={lead._id} className="card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-semibold">{lead.name}</div>
                <div className="text-xs text-gray-500">{lead.service || 'Service not specified'}</div>
              </div>
              <div className="relative">
                <div className={`w-8 h-8 rounded-full ${getScoreColor(getLeadScore(lead))} flex items-center justify-center text-white text-xs font-bold`}>
                  {getLeadScore(lead)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              {lead.email && <div>📧 {lead.email}</div>}
              {lead.phone && <div>📞 {lead.phone}</div>}
              <div>💰 ₹{lead.budget || 0}</div>
              <div>🔥 <span className={`px-1.5 py-0.5 rounded text-xs ${lead.urgency === 'high' ? 'bg-red-100 text-red-600' : lead.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                {lead.urgency} urgency
              </span></div>
              <div className="flex gap-1">
                <span className={`px-1.5 py-0.5 rounded text-xs ${sourceColors[lead.source] || 'bg-gray-500'}`}>
                  {lead.source}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${statusColors[lead.status] || 'bg-gray-500'}`}>
                  {lead.status}
                </span>
              </div>
            </div>

            {lead.notes && <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">{lead.notes}</div>}

            <div className="mt-4 flex gap-2">
              <button className="text-xs text-orange-500 hover:underline">Edit</button>
              <button className="text-xs text-blue-500 hover:underline">Contact</button>
            </div>
          </div>
        ))}
      </div>

      {leads.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No leads found. Create your first lead to get started.
        </div>
      )}
    </div>
  );
}