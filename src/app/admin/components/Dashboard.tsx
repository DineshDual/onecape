'use client';

import { useApp } from './AppProvider';

export default function Dashboard() {
  const { clients, tasks, loading, error } = useApp();

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  const active = clients.filter(c => c.status === 'active').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const monthlyRev = clients.reduce((s, c) => s + c.monthlyValue, 0);
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="OneCape client overview" />

      <div className="stats-grid">
        <StatCard label="Active Clients" value={active} />
        <StatCard label="Monthly Revenue" value={`₹${(monthlyRev / 1000).toFixed(0)}K`} />
        <StatCard label="Tasks Done" value={`${done}/${tasks.length}`} sub={`${pct}% complete`} subType="positive" />
        <StatCard label="In Progress" value={inProgress} />
      </div>

      {/* Client Progress Cards */}
      <SectionHeader title="Client Progress" />
      <div className="card-grid">
        {clients.length === 0 && <EmptyState message="No clients yet. Add your first client!" />}
        {clients.map(client => {
          const ct = tasks.filter(t => t.client === client.id);
          const cd = ct.filter(t => t.status === 'done').length;
          const cp = ct.length > 0 ? Math.round((cd / ct.length) * 100) : 0;
          return (
            <div className="card" key={client.id}>
              <div className="card-header">
                <h2>{client.name}</h2>
                <span className={`badge badge-${client.status}`}>{client.status}</span>
              </div>
              <p className="card-subtitle">{client.industry} • {client.website}</p>
              <div className="progress-bar"><div className="fill" style={{ width: `${cp}%`, background: 'var(--oc-orange)' }} /></div>
              <div className="progress-label">
                <span>{cd}/{ct.length} tasks</span>
                <span style={{ fontWeight: 700, color: 'var(--oc-orange)' }}>{cp}%</span>
              </div>
              <div className="tag-row">
                {client.services.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <SectionHeader title="Recent Tasks" />
      <div className="card">
        {tasks.length === 0 && <EmptyState message="No tasks yet" />}
        <table>
          <thead><tr><th>Task</th><th>Client</th><th>Category</th><th>Status</th><th>Priority</th></tr></thead>
          <tbody>
            {tasks.slice(0, 10).map(task => {
              const c = clients.find(c => c.id === task.client);
              return (
                <tr key={task.id}>
                  <td style={{ fontWeight: 600 }}>{task.title}</td>
                  <td>{c?.name || '—'}</td>
                  <td>{task.category}</td>
                  <td><StatusBadge status={task.status} /></td>
                  <td style={{ textTransform: 'capitalize' }}>{task.priority}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reusable UI Primitives ───

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return <h3 className="section-title">{title}</h3>;
}

export function StatCard({ label, value, sub, subType }: { label: string; value: string | number; sub?: string; subType?: 'positive' | 'negative' }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {sub && <div className={`change ${subType || ''}`}>{sub}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'badge-active', pending: 'badge-pending', paused: 'badge-paused', completed: 'badge-completed',
    backlog: 'badge-paused', 'in-progress': 'badge-active', review: 'badge-pending', done: 'badge-completed',
    running: 'badge-active', won: 'badge-completed', lost: 'badge-paused',
  };
  return <span className={`badge ${map[status] || 'badge-pending'}`}>{status}</span>;
}

export function EmptyState({ message }: { message: string }) {
  return <div className="empty-state"><p>{message}</p></div>;
}

export function Loading() {
  return <div className="loading-spinner"><div className="spinner" /><p>Loading...</p></div>;
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="error-box">
      <p>⚠️ {message}</p>
      {onRetry && <button className="btn btn-primary" onClick={onRetry}>Retry</button>}
    </div>
  );
}

import { ReactNode } from 'react';