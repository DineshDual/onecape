'use client';

import { useState } from 'react';
import { PageHeader, EmptyState, StatCard } from './Dashboard';

export default function Social() {
  const [postizKey, setPostizKey] = useState('');
  const [channels, setChannels] = useState<{ id: string; name: string; provider: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'compose' | 'scheduled' | 'settings'>('compose');
  const [composer, setComposer] = useState({ content: '', selectedChannels: [] as string[], scheduleAt: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const POSTIZ_API = 'https://api.postiz.com/public/v1';

  const loadChannels = async () => {
    if (!postizKey) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${POSTIZ_API}/integrations`, { headers: { 'Authorization': postizKey } });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setChannels(Array.isArray(data) ? data : []);
      localStorage.setItem('onecape_postiz_key', postizKey);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('onecape_postiz_key');
    if (saved) { setPostizKey(saved); loadChannels(); }
  }, []);

  const sendPost = async () => {
    if (!postizKey || !composer.content || composer.selectedChannels.length === 0) return;
    setSending(true);
    try {
      const body: any = { content: composer.content, integrations: composer.selectedChannels };
      if (composer.scheduleAt) body.scheduleAt = new Date(composer.scheduleAt).toISOString();
      const res = await fetch(`${POSTIZ_API}/posts`, {
        method: 'POST', headers: { 'Authorization': postizKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Post failed: ${res.status}`);
      setComposer({ content: '', selectedChannels: [], scheduleAt: '' });
    } catch (e: any) { setError(e.message); }
    setSending(false);
  };

  const icons: Record<string, string> = { x: '𝕏', linkedin: '💼', facebook: '📘', instagram: '📸', 'linkedin-page': '🏢', threads: '🧵', youtube: '▶️', tiktok: '🎵', pinterest: '📌', bluesky: '🦋' };

  return (
    <div>
      <PageHeader title="Social Media" subtitle="Schedule and publish across platforms" />

      {!postizKey && (
        <div className="card" style={{ marginBottom: 24, border: '2px solid var(--oc-orange)' }}>
          <h3>🔗 Connect Postiz</h3>
          <p style={{ fontSize: 13, color: 'var(--oc-gray-500)', marginBottom: 12 }}>
            Get your API key from <a href="https://platform.postiz.com" target="_blank" style={{ color: 'var(--oc-orange)' }}>platform.postiz.com</a> → Settings → Developers
          </p>
          <div className="form-group"><input value={postizKey} onChange={e => setPostizKey(e.target.value)} placeholder="Paste Postiz API key" onKeyDown={e => e.key === 'Enter' && loadChannels()} /></div>
          <button className="btn btn-primary" onClick={loadChannels} disabled={!postizKey || loading}>{loading ? 'Connecting...' : '🔗 Connect'}</button>
          {error && <p style={{ color: 'var(--oc-red)', fontSize: 12, marginTop: 8 }}>{error}</p>}
        </div>
      )}

      <div className="tabs" style={{ marginBottom: 20 }}>
        <button className={`tab ${tab === 'compose' ? 'active' : ''}`} onClick={() => setTab('compose')}>✍️ Compose</button>
        <button className={`tab ${tab === 'scheduled' ? 'active' : ''}`} onClick={() => setTab('scheduled')}>📅 Scheduled</button>
        <button className={`tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>⚙️ Settings</button>
      </div>

      {tab === 'compose' && (
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>New Post</h3>
          {channels.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600 }}>Select Channels</label>
              <div className="channel-grid">
                {channels.map(ch => (
                  <button key={ch.id} className={`channel-btn ${composer.selectedChannels.includes(ch.id) ? 'channel-selected' : ''}`}
                    onClick={() => setComposer(prev => ({ ...prev, selectedChannels: prev.selectedChannels.includes(ch.id) ? prev.selectedChannels.filter(c => c !== ch.id) : [...prev.selectedChannels, ch.id] }))}>
                    {icons[ch.provider] || '📱'} {ch.name || ch.provider}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="form-group"><textarea rows={5} value={composer.content} onChange={e => setComposer({ ...composer, content: e.target.value })} placeholder="Write your post..." /><div style={{ textAlign: 'right', fontSize: 12, color: composer.content.length > 280 ? 'var(--oc-red)' : 'var(--oc-gray-500)' }}>{composer.content.length}</div></div>
          <div className="form-group"><label>Schedule (optional)</label><input type="datetime-local" value={composer.scheduleAt} onChange={e => setComposer({ ...composer, scheduleAt: e.target.value })} /></div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={sendPost} disabled={!composer.content || composer.selectedChannels.length === 0 || sending}>
              {sending ? 'Publishing...' : composer.scheduleAt ? '📅 Schedule' : '🚀 Post Now'}
            </button>
          </div>
          {error && <p style={{ color: 'var(--oc-red)', fontSize: 12, marginTop: 8 }}>{error}</p>}
        </div>
      )}

      {tab === 'settings' && (
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Postiz Settings</h3>
          <div className="form-group"><label>API Key</label><input value={postizKey} onChange={e => setPostizKey(e.target.value)} placeholder="Your Postiz API key" /></div>
          <button className="btn btn-primary" onClick={loadChannels} disabled={!postizKey || loading}>{loading ? 'Connecting...' : '🔄 Reconnect'}</button>
          {channels.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Connected ({channels.length})</h4>
              <div className="channel-grid">{channels.map(ch => <span key={ch.id} className="tag">{icons[ch.provider] || '📱'} {ch.name || ch.provider}</span>)}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'scheduled' && <div className="card"><EmptyState message="Posts will appear here after publishing" /></div>}
    </div>
  );
}

import { useEffect } from 'react';