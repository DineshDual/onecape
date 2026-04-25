'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { updateClient, getClients } from '../lib/api';

export default function Clients() {
  const { clients, setClients, refresh } = useApp();
  const [selected, setSelected] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const saveClient = async () => {
    if (!selected?._id) return;
    setSaving(true);
    try {
      await updateClient(selected._id, selected);
      const updated = await getClients();
      setClients(updated);
      setEditMode(false);
    } finally { setSaving(false); }
  };

  const statusColors = { active: 'bg-green-500', pending: 'bg-yellow-500', paused: 'bg-red-500', completed: 'bg-blue-500' };

  return (
    <div className="clients">
      {/* Search */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-200 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="card lg:col-span-1">
          <div className="card-header">
            <h2>All Clients ({filtered.length})</h2>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filtered.map((c: any) => (
              <div
                key={c._id}
                onClick={() => { setSelected(c); setEditMode(false); }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${selected?._id === c._id ? 'bg-orange-50 border-orange-200' : 'bg-white hover:bg-gray-50 border-transparent'} border`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.industry || 'Interior'}</div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full text-white ${statusColors[c.status] || 'bg-gray-500'}`}>
                    {c.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  ₹{c.monthlyValue || 0}/mo · {c.services?.length || 0} services
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Detail */}
        <div className="card lg:col-span-2">
          {selected ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <p className="text-sm text-gray-500">{selected.industry || 'Interior Design'} · Onboarded {new Date(selected.onboardedAt || selected.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Name</label>
                      <input
                        type="text"
                        value={selected.name || ''}
                        onChange={e => setSelected({ ...selected, name: e.target.value })}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Industry</label>
                      <input
                        type="text"
                        value={selected.industry || ''}
                        onChange={e => setSelected({ ...selected, industry: e.target.value })}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Monthly Value</label>
                      <input
                        type="number"
                        value={selected.monthlyValue || ''}
                        onChange={e => setSelected({ ...selected, monthlyValue: Number(e.target.value) })}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Status</label>
                      <select
                        value={selected.status || 'active'}
                        onChange={e => setSelected({ ...selected, status: e.target.value })}
                        className="w-full p-2 border rounded-lg text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="paused">Paused</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tagline</label>
                    <input
                      type="text"
                      value={selected.tagline || ''}
                      onChange={e => setSelected({ ...selected, tagline: e.target.value })}
                      className="w-full p-2 border rounded-lg text-sm"
                      placeholder="e.g. Transforming Spaces in Chennai"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Phone</label>
                      <input
                        type="text"
                        value={selected.phone || ''}
                        onChange={e => setSelected({ ...selected, phone: e.target.value })}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        value={selected.email || ''}
                        onChange={e => setSelected({ ...selected, email: e.target.value })}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Address</label>
                    <textarea
                      value={selected.address || ''}
                      onChange={e => setSelected({ ...selected, address: e.target.value })}
                      className="w-full p-2 border rounded-lg text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Brand Color</label>
                      <input
                        type="color"
                        value={selected.brandColor || '#FF6600'}
                        onChange={e => setSelected({ ...selected, brandColor: e.target.value })}
                        className="w-full h-10 rounded-lg border"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Secondary Color</label>
                      <input
                        type="color"
                        value={selected.brandColor2 || '#FF9900'}
                        onChange={e => setSelected({ ...selected, brandColor2: e.target.value })}
                        className="w-full h-10 rounded-lg border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Notes</label>
                    <textarea
                      value={selected.notes || ''}
                      onChange={e => setSelected({ ...selected, notes: e.target.value })}
                      className="w-full p-2 border rounded-lg text-sm"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveClient}
                      disabled={saving}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-500">{selected.monthlyValue || 0}</div>
                      <div className="text-xs text-gray-500">Monthly Value</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-500">{selected.services?.length || 0}</div>
                      <div className="text-xs text-gray-500">Services</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-500">{selected.completedTasks || 0}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-500">{selected.tasks || 0}</div>
                      <div className="text-xs text-gray-500">Total Tasks</div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Contact Info</h4>
                      <div className="space-y-2 text-sm">
                        {selected.phone && <div>📞 {selected.phone}</div>}
                        {selected.email && <div>📧 {selected.email}</div>}
                        {selected.address && <div>📍 {selected.address}</div>}
                        {selected.website && <div>🌐 <a href={selected.website} target="_blank" className="text-orange-500">{selected.website}</a></div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Social</h4>
                      <div className="space-y-2 text-sm">
                        {selected.socialInstagram && <div>📸 {selected.socialInstagram}</div>}
                        {selected.socialFacebook && <div>📘 {selected.socialFacebook}</div>}
                        {selected.socialYoutube && <div>📺 {selected.socialYoutube}</div>}
                        {selected.socialLinkedin && <div>💼 {selected.socialLinkedin}</div>}
                      </div>
                    </div>
                  </div>

                  {selected.tagline && <div className="p-3 bg-orange-50 rounded-lg text-sm italic text-gray-600">"{selected.tagline}"</div>}

                  {selected.notes && <div className="text-sm text-gray-600">{selected.notes}</div>}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">Select a client to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}