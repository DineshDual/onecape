'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { AppProvider, useApp } from './components/AppProvider';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import TaskBoard from './components/TaskBoard';
import ContentStudio from './components/ContentStudio';
import Social from './components/Social';
import GrowthTracker from './components/GrowthTracker';
import Leads from './components/Leads';
import MarketIntel from './components/MarketIntel';

function AdminContent() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="admin-layout">
      <Sidebar page={page} setPage={setPage} />
      <main className="main-content">
        {page === 'dashboard' && <Dashboard />}
        {page === 'clients' && <Clients />}
        {page === 'tasks' && <TaskBoard />}
        {page === 'content' && <ContentStudio />}
        {page === 'social' && <Social />}
        {page === 'growth' && <GrowthTracker />}
        {page === 'leads' && <Leads />}
        {page === 'competitors' && <MarketIntel />}
        {page === 'seo' && <KeywordFinder />}
      </main>
    </div>
  );
}

function KeywordFinder() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Keyword Finder</h2>
          <p style={{ color: 'var(--oc-gray-500)', fontSize: 13 }}>SEO keyword research and tracking</p>
        </div>
      </div>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>TheVeeKay Keywords</h3>
        <table>
          <thead><tr><th>Keyword</th><th>Volume</th><th>Difficulty</th><th>Intent</th></tr></thead>
          <tbody>
            <tr><td style={{ fontWeight: 600 }}>modular kitchen chennai</td><td>2.4K</td><td><span className="badge badge-pending">Medium</span></td><td>Transactional</td></tr>
            <tr><td style={{ fontWeight: 600 }}>false ceiling design chennai</td><td>1.8K</td><td><span className="badge badge-completed">Low</span></td><td>Informational</td></tr>
            <tr><td style={{ fontWeight: 600 }}>interior design cost chennai</td><td>3.1K</td><td><span className="badge badge-active">High</span></td><td>Transactional</td></tr>
            <tr><td style={{ fontWeight: 600 }}>aluminium windows chennai</td><td>1.2K</td><td><span className="badge badge-completed">Low</span></td><td>Transactional</td></tr>
            <tr><td style={{ fontWeight: 600 }}>home interior tamil nadu</td><td>890</td><td><span className="badge badge-completed">Low</span></td><td>Informational</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('onecape_auth') === 'true') setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h1>OneCape</h1>
          <p>Admin Panel</p>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              onKeyDown={e => {
                if (e.key === 'Enter' && password === 'onecape2026') {
                  sessionStorage.setItem('onecape_auth', 'true');
                  setAuthed(true);
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => {
              if (password === 'onecape2026') {
                sessionStorage.setItem('onecape_auth', 'true');
                setAuthed(true);
              }
            }}
          >
            Enter
          </button>
          {password && password !== 'onecape2026' && (
            <p style={{ color: 'var(--oc-red)', fontSize: 12, marginTop: 8 }}>Wrong password</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <AdminContent />
    </AppProvider>
  );
}
