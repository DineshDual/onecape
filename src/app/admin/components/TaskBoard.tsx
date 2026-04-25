'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import * as api from '../lib/api';
import { PageHeader, StatusBadge, EmptyState } from './Dashboard';

const COLUMNS: { id: api.Task['status']; label: string; color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: 'var(--oc-gray-500)' },
  { id: 'in-progress', label: 'In Progress', color: 'var(--oc-blue)' },
  { id: 'review', label: 'Review', color: 'var(--oc-yellow)' },
  { id: 'done', label: 'Done', color: 'var(--oc-green)' },
];

export default function TaskBoard() {
  const { clients, tasks, setTasks } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' as const, client: '', category: 'SEO' });

  const filtered = filter ? tasks.filter(t => t.client === filter) : tasks;

  const addTask = async () => {
    if (!form.title) return;
    setSaving(true);
    try {
      const saved = await api.createTask({
        ...form, status: 'backlog',
        createdAt: new Date().toISOString().split('T')[0], dueDate: '',
      });
      setTasks(prev => [...prev, saved]);
      setForm({ title: '', description: '', priority: 'medium', client: clients[0]?.id || '', category: 'SEO' });
      setShowForm(false);
    } catch (e: any) { alert(e.message); }
    setSaving(false);
  };

  const moveTask = async (taskId: string, newStatus: api.Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, completedAt: newStatus === 'done' ? new Date().toISOString().split('T')[0] : undefined } : t));
    try {
      await api.updateTask(taskId, { status: newStatus, completedAt: newStatus === 'done' ? new Date().toISOString().split('T')[0] : undefined } as any);
    } catch {
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: task.status } : t));
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm('Delete this task?')) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    try { await api.removeTask(taskId); } catch { /* already removed from UI */ }
  };

  const categories = ['SEO', 'Content', 'Social', 'Conversion', 'Local SEO', 'Research', 'Reporting', 'Design', 'Dev', 'Strategy'];
  const priorityColors: Record<string, string> = { high: 'var(--oc-red)', medium: 'var(--oc-yellow)', low: 'var(--oc-gray-500)' };

  return (
    <div>
      <PageHeader title="Task Board" subtitle={`${tasks.length} total tasks`} action={
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
            <option value="">All Clients</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ New Task'}
          </button>
        </div>
      } />

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Task Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What needs to be done?" />
            </div>
            <div className="form-group">
              <label>Client</label>
              <select value={form.client} onChange={e => setForm({ ...form, client: e.target.value })}>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as any })}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🔵 Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Details..." />
          </div>
          <button className="btn btn-primary" onClick={addTask} disabled={!form.title || saving}>
            {saving ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      )}

      {/* Kanban Board */}
      <div className="kanban-board">
        {COLUMNS.map(col => {
          const colTasks = filtered.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="kanban-column">
              <div className="kanban-header" style={{ borderBottomColor: col.color }}>
                <span style={{ color: col.color, fontWeight: 700 }}>{col.label}</span>
                <span className="kanban-count">{colTasks.length}</span>
              </div>
              <div className="kanban-body">
                {colTasks.length === 0 && <p className="kanban-empty">No tasks</p>}
                {colTasks.map(task => {
                  const client = clients.find(c => c.id === task.client);
                  return (
                    <div key={task.id} className="kanban-card">
                      <div className="kanban-card-header">
                        <span className="priority-dot" style={{ background: priorityColors[task.priority] }} />
                        <span style={{ fontSize: 11, color: 'var(--oc-gray-500)' }}>{task.category}</span>
                      </div>
                      <h4>{task.title}</h4>
                      {task.description && <p>{task.description}</p>}
                      <div className="kanban-card-footer">
                        <span style={{ fontSize: 11, color: 'var(--oc-gray-500)' }}>{client?.name || '—'}</span>
                        <div className="kanban-actions">
                          {col.id !== 'backlog' && <button onClick={() => moveTask(task.id, prev(col.id))} title="Move left">◀</button>}
                          {col.id !== 'done' && <button onClick={() => moveTask(task.id, next(col.id))} title="Move right">▶</button>}
                          <button onClick={() => deleteTask(task.id)} title="Delete" style={{ color: 'var(--oc-red)' }}>✕</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function prev(status: string): api.Task['status'] {
  const order: api.Task['status'][] = ['backlog', 'in-progress', 'review', 'done'];
  const idx = order.indexOf(status as any);
  return order[Math.max(0, idx - 1)];
}

function next(status: string): api.Task['status'] {
  const order: api.Task['status'][] = ['backlog', 'in-progress', 'review', 'done'];
  const idx = order.indexOf(status as any);
  return order[Math.min(order.length - 1, idx + 1)];
}