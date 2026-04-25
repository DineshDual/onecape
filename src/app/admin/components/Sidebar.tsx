'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';

export default function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { clients } = useApp();

  const navItems = [
    { section: 'Overview', items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    ]},
    { section: 'Clients', items: [
      { id: 'clients', label: `All Clients (${clients.length})`, icon: '👥' },
    ]},
    { section: 'Work', items: [
      { id: 'tasks', label: 'Task Board', icon: '📋' },
      { id: 'content', label: 'Content Studio', icon: '✍️' },
      { id: 'seo', label: 'Keyword Finder', icon: '🔍' },
      { id: 'social', label: 'Social Media', icon: '📱' },
    ]},
    { section: 'Intelligence', items: [
      { id: 'growth', label: 'Growth Tracker', icon: '📈' },
      { id: 'leads', label: 'Lead Ranker', icon: '🎯' },
      { id: 'competitors', label: 'Market Intel', icon: '🕵️' },
    ]},
  ];

  return (
    <>
      {/* Mobile header */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setCollapsed(!collapsed)}>☰</button>
        <span className="menu-logo">OneCape</span>
        <span className="menu-badge">{page}</span>
      </div>

      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-logo">
          <h1>OneCape</h1>
          <span>Admin Panel</span>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(group => (
            <div key={group.section}>
              <div className="nav-section">{group.section}</div>
              {group.items.map(item => (
                <a key={item.id} href="#" className={page === item.id ? 'active' : ''}
                   onClick={e => { e.preventDefault(); setPage(item.id); setCollapsed(false); }}>
                  {item.icon} {!collapsed && item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}