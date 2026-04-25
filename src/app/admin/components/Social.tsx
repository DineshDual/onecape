'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';

export default function Social() {
  const { clients } = useApp();
  const [activeTab, setActiveTab] = useState('scheduler');

  return (
    <div className="social">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Social Media</h2>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('scheduler')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'scheduler' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Scheduler</button>
          <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'analytics' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Analytics</button>
          <button onClick={() => setActiveTab('accounts')} className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'accounts' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Accounts</button>
        </div>
      </div>

      {activeTab === 'scheduler' && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2>Upcoming Posts</h2>
              <button className="btn btn-primary">+ Schedule Post</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-2xl">📸</div>
                <div className="flex-1">
                  <div className="font-semibold">Before & After: Kitchen Renovation</div>
                  <div className="text-sm text-gray-500">Instagram · Tomorrow at 10:00 AM</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">Scheduled</span>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-2xl">📘</div>
                <div className="flex-1">
                  <div className="font-semibold">Client Testimonial Series - Part 1</div>
                  <div className="text-sm text-gray-500">Facebook · April 27, 2026 at 3:00 PM</div>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">Draft</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Content Calendar</h2>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500">{day}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="aspect-square border rounded-lg flex items-center justify-center text-sm relative cursor-pointer hover:bg-gray-50">
                  <span>{i + 1}</span>
                  {[5, 12, 19, 26].includes(i + 1) && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="stat-icon">👍</div>
            <div className="stat-content">
              <h3>1,234</h3>
              <p>Likes this week</p>
            </div>
          </div>
          <div className="card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <h3>89</h3>
              <p>Comments</p>
            </div>
          </div>
          <div className="card">
            <div className="stat-icon">📤</div>
            <div className="stat-content">
              <h3>45</h3>
              <p>Shares</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'accounts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📸</div>
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-gray-500">@theveekay_official</div>
                <div className="text-xs text-green-500 mt-1">✓ Connected</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📘</div>
              <div>
                <div className="font-semibold">Facebook</div>
                <div className="text-sm text-gray-500">TheVeeKay Interiors</div>
                <div className="text-xs text-green-500 mt-1">✓ Connected</div>
              </div>
            </div>
          </div>
          <div className="card opacity-50">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎬</div>
              <div>
                <div className="font-semibold">YouTube</div>
                <div className="text-sm text-gray-500">TheVeeKay Channel</div>
                <div className="text-xs text-gray-500 mt-1">⊘ Not connected</div>
              </div>
            </div>
          </div>
          <div className="card opacity-50">
            <div className="flex items-center gap-4">
              <div className="text-3xl">💼</div>
              <div>
                <div className="font-semibold">LinkedIn</div>
                <div className="text-sm text-gray-500">TheVeeKay Business</div>
                <div className="text-xs text-gray-500 mt-1">⊘ Not connected</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}