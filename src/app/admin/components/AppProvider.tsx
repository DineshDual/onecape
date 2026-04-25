'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import * as api from '../lib/api';

// ─── App Context ───
interface AppState {
  clients: api.Client[];
  tasks: api.Task[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setClients: (c: api.Client[]) => void;
  setTasks: (t: api.Task[]) => void;
  setError: (e: string | null) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<api.Client[]>([]);
  const [tasks, setTasks] = useState<api.Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, t] = await Promise.all([api.getClients(), api.getTasks()]);
      setClients(c);
      setTasks(t);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  return (
    <AppContext.Provider value={{ clients, tasks, loading, error, refresh, setClients, setTasks, setError }}>
      {children}
    </AppContext.Provider>
  );
}