'use client';

import { useState, useEffect } from 'react';
import { useApp } from './AppProvider';
import { generateContent, getContent, createKeyword, getKeywords } from '../lib/api';

const CONTENT_TYPES = [
  { id: 'caption', name: 'Instagram Caption', desc: 'Engaging Tamil + English captions with hashtags' },
  { id: 'blog', name: 'SEO Blog Post', desc: 'Search-optimized content for Chennai keywords' },
  { id: 'email', name: 'Email Template', desc: 'Professional follow-up and quote emails' },
  { id: 'whatsapp', name: 'WhatsApp Broadcast', desc: 'Short, punchy messages for groups' },
  { id: 'poster_text', name: 'Poster Text', desc: 'Bold headlines for before/after posts' },
] as const;

export default function ContentStudio() {
  const { clients } = useApp();
  const [selectedType, setSelectedType] = useState('caption');
  const [prompt, setPrompt] = useState('');
  const [clientId, setClientId] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [savedContent, setSavedContent] = useState<any[]>([]);

  useEffect(() => {
    if (clients.length > 0 && !clientId) setClientId(clients[0]._id);
    loadSaved();
  }, [clients]);

  const loadSaved = async () => {
    try {
      const all = await Promise.all(clients.map(c => getContent(c._id)));
      setSavedContent(all.flat().slice(0, 10));
    } catch (e) {}
  };

  const handleGenerate = async () => {
    if (!prompt || !clientId) return;
    setGenerating(true);
    try {
      const res = await generateContent(selectedType, prompt, clientId);
      setResult(res.content);
    } catch (e) {
      setResult('Error generating content. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case 'caption': return 'e.g. New kitchen renovation project in Anna Nagar, Chennai';
      case 'blog': return 'e.g. Top 10 interior design trends in Chennai 2026';
      case 'email': return 'e.g. Quote for living room interior design project';
      case 'whatsapp': return 'e.g. Special festive offer for Interior Design - 25% off';
      case 'poster_text': return 'e.g. Before & After: Modern Kitchen Transformation';
      default: return 'Describe what you want to create...';
    }
  };

  return (
    <div className="content-studio">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2>AI Content Generator</h2>
            </div>
            
            <div className="mb-4">
              <select 
                value={clientId} 
                onChange={e => setClientId(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm mb-4"
              >
                {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {CONTENT_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => { setSelectedType(type.id); setResult(''); }}
                    className={`p-3 rounded-lg text-center text-sm border transition-all ${
                      selectedType === type.id 
                        ? 'bg-orange-50 border-orange-500 text-orange-600 font-semibold' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-lg mb-1">
                      {type.id === 'caption' && '📸'}
                      {type.id === 'blog' && '📝'}
                      {type.id === 'email' && '📧'}
                      {type.id === 'whatsapp' && '💬'}
                      {type.id === 'poster_text' && '🎨'}
                    </div>
                    <div>{type.name}</div>
                  </button>
                ))}
              </div>

              <textarea
                placeholder={getPlaceholder()}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm mb-4"
                rows={3}
              />

              <button
                onClick={handleGenerate}
                disabled={generating || !prompt}
                className="w-full p-3 bg-orange-500 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {generating ? 'Generating...' : '✨ Generate Content'}
              </button>
            </div>
          </div>

          {result && (
            <div className="card mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Generated Content</h3>
                <div className="flex gap-2">
                  <button onClick={() => copyToClipboard(result)} className="text-xs text-orange-500 hover:underline">📋 Copy</button>
                  <button onClick={() => setResult('')} className="text-xs text-gray-400 hover:underline">Clear</button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-gray-50 rounded-lg border border-gray-100">{result}</pre>
            </div>
          )}
        </div>

        {/* Templates & Saved */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2>Quick Templates</h2>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => { setSelectedType('caption'); setPrompt('New interior project completed in Chennai - share before/after'); }}
                className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-orange-50 transition-colors"
              >
                📸 Instagram: Before/After post
              </button>
              <button 
                onClick={() => { setSelectedType('blog'); setPrompt('Interior design tips for small apartments in Chennai'); }}
                className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-orange-50 transition-colors"
              >
                📝 Blog: Small apartment tips
              </button>
              <button 
                onClick={() => { setSelectedType('email'); setPrompt('Follow up on site visit for Mr Sharma\'s villa project'); }}
                className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-orange-50 transition-colors"
              >
                📧 Email: Follow up after site visit
              </button>
              <button 
                onClick={() => { setSelectedType('whatsapp'); setPrompt('Diwali special - 20% off interior design consultation'); }}
                className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-orange-50 transition-colors"
              >
                💬 WhatsApp: Festive offer
              </button>
              <button 
                onClick={() => { setSelectedType('poster_text'); setPrompt('Modern Kitchen Makeover - Before vs After'); }}
                className="w-full text-left p-3 bg-gray-50 rounded-lg text-sm hover:bg-orange-50 transition-colors"
              >
                🎨 Poster: Kitchen makeover
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Recent Content</h2>
            </div>
            {savedContent.length > 0 ? (
              <div className="space-y-3">
                {savedContent.map((c: any) => (
                  <div key={c._id} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="font-medium text-xs text-orange-500 mb-1">{c.type} · {new Date(c.createdAt).toLocaleDateString()}</div>
                    <div className="line-clamp-3 text-gray-600">{c.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500 py-4">No saved content yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}