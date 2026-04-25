'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getStats, getClients, getProjects, getLeads } from '../lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clients } = useApp();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [s, projects, leads] = await Promise.all([getStats(), getProjects(), getLeads()]);
        setStats({ ...s, projects, leads });
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      pending: 'bg-yellow-500',
      new: 'bg-blue-500',
      won: 'bg-green-500',
      lost: 'bg-red-500',
      'in-progress': 'bg-orange-500',
      execution: 'bg-purple-500',
      completed: 'bg-green-500'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full text-white ${colors[status] || 'bg-gray-500'}`}>
        {status}
      </span>
    );
  };

  const getPhaseBadge = (phase: string) => {
    const colors = {
      enquiry: 'bg-blue-500',
      design: 'bg-purple-500',
      quote: 'bg-orange-500',
      execution: 'bg-red-500',
      handover: 'bg-yellow-500',
      completed: 'bg-green-500'
    };
    return (
      <span className={`px-2 py-1 text-xs rounded-full text-white ${colors[phase] || 'bg-gray-500'}`}>
        {phase}
      </span>
    );
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats?.clientCount || 0}</h3>
            <p>Clients</p>
            <div className="stat-change positive">+2 this week</div>
          </div>
        </div>
        
        <div className="card">
          <div className="stat-icon">🚧</div>
          <div className="stat-content">
            <h3>{stats?.projectCount || 0}</h3>
            <p>Active Projects</p>
            <div className="stat-change">0 this week</div>
          </div>
        </div>
        
        <div className="card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats?.activeLeads || 0}</h3>
            <p>Active Leads</p>
            <div className="stat-change positive">+5 this week</div>
          </div>
        </div>
        
        <div className="card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{stats?.totalRevenue || 0}</h3>
            <p>Monthly Revenue</p>
            <div className="stat-change positive">+15% this month</div>
          </div>
        </div>
      </div>

      {/* Project Phases */}
      <div className="card mb-8">
        <div className="card-header">
          <h2>Project Pipeline</h2>
          <Link href="/admin/tasks" className="btn btn-outline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {Object.entries(stats?.phaseCounts || {}).map(([phase, count]) => (
            <div key={phase} className="phase-card">
              <div className="phase-icon">
                {phase === 'enquiry' && '📋'}
                {phase === 'design' && '🎨'}
                {phase === 'quote' && '💰'}
                {phase === 'execution' && '🔨'}
                {phase === 'handover' && '✅'}
                {phase === 'completed' && '🏠'}
              </div>
              <div className="phase-info">
                <h4>{count}</h4>
                <div>{getPhaseBadge(phase)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="card">
          <div className="card-header">
            <h2>Recent Clients</h2>
            <Link href="/admin/clients" className="btn btn-outline">View All</Link>
          </div>
          <div className="space-y-4">
            {clients.slice(0, 5).map((client: any) => (
              <div key={client._id} className="client-item">
                <div className="client-info">
                  <div className="client-name">{client.name}</div>
                  <div className="client-status">{getStatusBadge(client.status)}</div>
                </div>
                <div className="client-details">
                  <span className="client-service">₹{client.monthlyValue || 0}/mo</span>
                  <span className="client-services">{client.services?.join(', ') || 'Interior'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="card">
          <div className="card-header">
            <h2>Hot Leads</h2>
            <Link href="/admin/leads" className="btn btn-outline">View All</Link>
          </div>
          <div className="space-y-4">
            {stats?.leads?.slice(0, 5).map((lead: any) => (
              <div key={lead._id} className="lead-item">
                <div className="lead-info">
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-source">{getStatusBadge(lead.source)}</div>
                </div>
                <div className="lead-details">
                  <span className="lead-budget">₹{lead.budget || 0}</span>
                  <span className="lead-status">{getStatusBadge(lead.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mt-8">
        <div className="card-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="action-card">
            <div className="action-icon">📊</div>
            <span>Generate Report</span>
          </button>
          <button className="action-card">
            <div className="action-icon">📧</div>
            <span>Send Newsletter</span>
          </button>
          <button className="action-card">
            <div className="action-icon">📱</div>
            <span>Social Posts</span>
          </button>
          <button className="action-card">
            <div className="action-icon">🎯</div>
            <span>Target Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
}