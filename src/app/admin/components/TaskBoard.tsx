'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { getProjects, createProject, updateProject, deleteProject, getClients, createTask, getTasks, updateTask } from '../lib/api';

const PHASES = ['enquiry', 'design', 'quote', 'execution', 'handover', 'completed'] as const;
const PHASE_ICONS: Record<string, string> = { enquiry: '📋', design: '🎨', quote: '💰', execution: '🔨', handover: '✅', completed: '🏠' };
const PHASE_COLORS: Record<string, string> = { enquiry: 'border-blue-400 bg-blue-50', design: 'border-purple-400 bg-purple-50', quote: 'border-orange-400 bg-orange-50', execution: 'border-red-400 bg-red-50', handover: 'border-yellow-400 bg-yellow-50', completed: 'border-green-400 bg-green-50' };

export default function TaskBoard() {
  const { clients } = useApp();
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', type: 'interior' as string, client: '', budget: 0, location: '', deadline: '', priority: 'medium' as string });

  useEffect(() => { loadData(); }, []);
  const loadData = async () => {
    const [p, t] = await Promise.all([getProjects(), getTasks()]);
    setProjects(p); setTasks(t);
  };

  const handleCreateProject = async () => {
    if (!newProject.title) return;
    await createProject({ ...newProject, phase: 'enquiry' });
    setNewProject({ title: '', type: 'interior', client: '', budget: 0, location: '', deadline: '', priority: 'medium' });
    setShowNewProject(false);
    loadData();
  };

  const movePhase = async (id: string, currentPhase: string) => {
    const idx = PHASES.indexOf(currentPhase as any);
    if (idx < PHASES.length - 1) {
      await updateProject(id, { phase: PHASES[idx + 1] });
      loadData();
    }
  };

  const deleteProj = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteProject(id);
      loadData();
    }
  };

  return (
    <div className="taskboard">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Project Pipeline</h2>
        <button onClick={() => setShowNewProject(true)} className="btn btn-primary">+ New Project</button>
      </div>

      {showNewProject && (
        <div className="card mb-6 p-6">
          <h3 className="font-bold mb-4">New Project</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Project title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <select value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
              <option value="farming">Farming</option>
              <option value="marketing">Marketing</option>
              <option value="branding">Branding</option>
              <option value="other">Other</option>
            </select>
            <select value={newProject.client} onChange={e => setNewProject({...newProject, client: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="">Select client</option>
              {clients.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <input type="number" placeholder="Budget" value={newProject.budget || ''} onChange={e => setNewProject({...newProject, budget: Number(e.target.value)})} className="p-2 border rounded-lg text-sm" />
            <input type="text" placeholder="Location" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <input type="date" value={newProject.deadline} onChange={e => setNewProject({...newProject, deadline: e.target.value})} className="p-2 border rounded-lg text-sm" />
            <select value={newProject.priority} onChange={e => setNewProject({...newProject, priority: e.target.value})} className="p-2 border rounded-lg text-sm">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreateProject} className="btn btn-primary">Create</button>
            <button onClick={() => setShowNewProject(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Kanban columns */}
      <div className="grid grid-cols-6 gap-3 overflow-x-auto">
        {PHASES.map(phase => {
          const phaseProjects = projects.filter(p => p.phase === phase);
          return (
            <div key={phase} className={`rounded-lg border-2 ${PHASE_COLORS[phase]} p-3 min-h-[300px]`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm capitalize">{PHASE_ICONS[phase]} {phase}</h3>
                <span className="text-xs bg-white rounded-full px-2 py-0.5 font-bold">{phaseProjects.length}</span>
              </div>
              <div className="space-y-2">
                {phaseProjects.map(p => (
                  <div key={p._id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="font-semibold text-sm">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {typeof p.client === 'object' ? p.client?.name : 'No client'} · ₹{p.budget || 0}
                    </div>
                    <div className="flex gap-1 mt-2">
                      {p.priority === 'high' && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">High</span>}
                      {p.priority === 'medium' && <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded">Med</span>}
                      {p.priority === 'low' && <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">Low</span>}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {phase !== 'completed' && (
                        <button onClick={() => movePhase(p._id, phase)} className="text-xs text-orange-500 hover:underline">→ Next</button>
                      )}
                      <button onClick={() => deleteProj(p._id)} className="text-xs text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Internal Tasks */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Internal Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['backlog', 'in-progress', 'review', 'done'].map(status => {
            const statusTasks = tasks.filter(t => t.status === status);
            return (
              <div key={status} className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-bold text-sm capitalize mb-3">{status} ({statusTasks.length})</h3>
                {statusTasks.map(t => (
                  <div key={t._id} className="bg-white rounded p-2 mb-2 text-sm shadow-sm">
                    <div className="font-medium">{t.title}</div>
                    {t.dueDate && <div className="text-xs text-gray-500">Due: {new Date(t.dueDate).toLocaleDateString()}</div>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}