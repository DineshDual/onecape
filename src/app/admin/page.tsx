'use client';

import { useState, useEffect } from 'react';
import { useApp } from './components/AppProvider';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import TaskBoard from './components/TaskBoard';
import ContentStudio from './components/ContentStudio';
import GrowthTracker from './components/GrowthTracker';
import Leads from './components/Leads';
import MarketIntel from './components/MarketIntel';
import Social from './components/Social';
import KeywordFinder from './components/KeywordFinder';

export default function AdminPanel() {
  const [page, setPage] = useState('dashboard');
  const { loading, error } = useApp();

  const renderPage = () => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'clients': return <Clients />;
      case 'tasks': return <TaskBoard />;
      case 'content': return <ContentStudio />;
      case 'seo': return <KeywordFinder />;
      case 'social': return <Social />;
      case 'growth': return <GrowthTracker />;
      case 'leads': return <Leads />;
      case 'competitors': return <MarketIntel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        <div className="page-header">
          <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
          {page === 'dashboard' && (
            <div className="header-actions">
              <button className="btn btn-primary">Sync Data</button>
            </div>
          )}
        </div>
        {renderPage()}
      </main>
    </div>
  );
}