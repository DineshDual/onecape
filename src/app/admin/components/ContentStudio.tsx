'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { PageHeader, EmptyState } from './Dashboard';

export default function ContentStudio() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState('');
  const [generating, setGenerating] = useState(false);
  const [contentType, setContentType] = useState<'blog' | 'caption' | 'poster' | 'email'>('blog');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<{ type: string; title: string; content: string; date: string }[]>([]);

  const templates: Record<string, { label: string; placeholder: string }[]> = {
    blog: [
      { label: '📋 How-To Guide', placeholder: 'e.g. How to choose modular kitchen design in Chennai' },
      { label: '💰 Cost Guide', placeholder: 'e.g. False ceiling cost in Tamil Nadu 2026' },
      { label: '⚔️ Comparison', placeholder: 'e.g. Aluminium vs uPVC windows — which is better?' },
    ],
    caption: [
      { label: '📸 Project Showcase', placeholder: 'e.g. Modern kitchen transformation in Anna Nagar' },
      { label: '💡 Design Tip', placeholder: 'e.g. 5 things to check before hiring an interior designer' },
      { label: '⭐ Testimonial', placeholder: 'e.g. Client review from T Nagar project' },
    ],
    poster: [
      { label: '🖼️ Before/After', placeholder: 'Describe the transformation' },
      { label: '📊 Pricing Infographic', placeholder: 'e.g. Room-by-room interior costs' },
      { label: '🏷️ Service Promo', placeholder: 'e.g. 20% off modular kitchen this month' },
    ],
    email: [
      { label: '📧 Client Proposal', placeholder: 'e.g. Interior design proposal for 3BHK' },
      { label: '📧 Follow-Up', placeholder: 'e.g. After site visit follow-up' },
      { label: '📧 Newsletter', placeholder: 'e.g. Monthly design trends digest' },
    ],
  };

  const generate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setOutput('');
    try {
      // Call backend AI endpoint (will be built)
      const res = await fetch(`/api/generate`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer onecape2026', 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: contentType, prompt, client: selectedClient }),
      });
      if (res.ok) {
        const data = await res.json();
        setOutput(data.content);
        setHistory(prev => [{ type: contentType, title: prompt.slice(0, 50), content: data.content, date: new Date().toISOString() }, ...prev]);
      } else {
        // Fallback: generate locally
        setOutput(generateFallback(contentType, prompt));
        setHistory(prev => [{ type: contentType, title: prompt.slice(0, 50), content: output, date: new Date().toISOString() }, ...prev]);
      }
    } catch {
      setOutput(generateFallback(contentType, prompt));
    }
    setGenerating(false);
  };

  const generateFallback = (type: string, p: string): string => {
    if (type === 'caption') return `✨ ${p}\n\nTransform your space with expert craftsmanship. DM us for a free consultation! 📩\n\n#InteriorDesign #Chennai #TheVeeKay #HomeMakeover`;
    if (type === 'blog') return `# ${p}\n\nLooking for the best interior design solutions in Chennai? You're in the right place.\n\n## Why This Matters\n\nChoosing the right interior design partner can save you up to 30% on your project while getting better results. Here's what you need to know...\n\n## Key Points\n\n1. Always check past project portfolio\n2. Get detailed cost breakdown upfront\n3. Ask about material warranties\n4. Visit their completed projects\n5. Compare at least 3 quotes\n\n## Conclusion\n\nReady to transform your space? Contact us today for a free consultation.\n\n*— TheVeeKay, 15 years of interior excellence across Tamil Nadu*`;
    if (type === 'email') return `Subject: ${p}\n\nHi [Client Name],\n\nThank you for your interest in our interior design services.\n\nBased on your requirements, we'd love to schedule a site visit to understand your space better. Our team brings 15+ years of experience across 500+ projects in Tamil Nadu.\n\nNext steps:\n1. Free site visit & measurement\n2. 3D design preview within 5 days\n3. Detailed quote with material breakdown\n\nShall we schedule a visit this week?\n\nBest regards,\nTheVeeKay Team\n📞 [Phone]\n🌐 theveekay.com`;
    return `📊 ${p}\n\nContent generated for: ${p}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied!');
  };

  return (
    <div>
      <PageHeader title="Content Studio" subtitle="Generate posts, captions, blog content" />

      <div className="content-studio-layout">
        {/* Left: Generator */}
        <div className="card" style={{ flex: 2 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Create Content</h3>

          {/* Client selector */}
          <div className="form-group">
            <label>Client</label>
            <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
              <option value="">Select client...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Content type tabs */}
          <div className="content-tabs">
            {Object.entries({ blog: '📝 Blog', caption: '📱 Caption', poster: '🖼️ Poster', email: '📧 Email' }).map(([k, v]) => (
              <button key={k} className={`tab ${contentType === k ? 'active' : ''}`} onClick={() => setContentType(k as any)}>{v}</button>
            ))}
          </div>

          {/* Templates */}
          <div className="template-grid">
            {templates[contentType]?.map((t, i) => (
              <button key={i} className="template-btn" onClick={() => setPrompt(t.placeholder)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Prompt */}
          <div className="form-group">
            <label>What do you want to create?</label>
            <textarea rows={3} value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={templates[contentType]?.[0]?.placeholder || 'Describe your content...'} />
          </div>

          <button className="btn btn-primary" onClick={generate} disabled={!prompt || generating} style={{ width: '100%' }}>
            {generating ? '⏳ Generating...' : '🚀 Generate Content'}
          </button>

          {/* Output */}
          {output && (
            <div className="content-output">
              <div className="content-output-header">
                <h4>Generated Content</h4>
                <button className="btn btn-sm btn-secondary" onClick={copyToClipboard}>📋 Copy</button>
              </div>
              <pre className="content-text">{output}</pre>
            </div>
          )}
        </div>

        {/* Right: History */}
        <div className="card" style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent</h3>
          {history.length === 0 && <EmptyState message="No content generated yet" />}
          {history.map((h, i) => (
            <div key={i} className="history-item" onClick={() => setOutput(h.content)}>
              <span className="history-type">{h.type}</span>
              <p>{h.title}</p>
              <span className="history-date">{new Date(h.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}