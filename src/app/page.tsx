'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Copy,
  X,
  ChevronDown,
  Search,
  Lock,
  Key,
  Code,
  Hash,
  Zap,
  Clock,
  Palette,
  GitCompare,
  FileText,
  Wand2,
  Menu,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

// Tool definitions
const tools = [
  { id: 'jwt', name: 'JWT Decoder', icon: Key },
  { id: 'base64', name: 'Base64 Encode/Decode', icon: Code },
  { id: 'url', name: 'URL Encode/Decode', icon: Zap },
  { id: 'cron', name: 'Cron Parser', icon: Clock },
  { id: 'regex', name: 'Regex Tester', icon: Search },
  { id: 'hash', name: 'Hash Generator', icon: Hash },
  { id: 'uuid', name: 'UUID Generator', icon: Zap },
  { id: 'timestamp', name: 'Timestamp Converter', icon: Clock },
  { id: 'color', name: 'Color Converter', icon: Palette },
  { id: 'diff', name: 'Diff Checker', icon: GitCompare },
  { id: 'markdown', name: 'Markdown Preview', icon: FileText },
  { id: 'lorem', name: 'Lorem Ipsum', icon: Wand2 },
];

// Tool categories
const toolCategories = [
  {
    name: 'Encoding & Decoding',
    color: '#6366f1',
    tools: ['jwt', 'base64', 'url']
  },
  {
    name: 'Text & Code',
    color: '#ec4899',
    tools: ['regex', 'diff', 'markdown']
  },
  {
    name: 'Generators',
    color: '#f59e0b',
    tools: ['hash', 'uuid', 'lorem']
  },
  {
    name: 'Converters',
    color: '#10b981',
    tools: ['cron', 'timestamp', 'color']
  }
];

// JWT Decoder Tool
function JWTDecoder() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');

  const decode = useCallback((token: string) => {
    setError('');
    if (!token.trim()) {
      setDecoded(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Must have 3 parts separated by dots.');
      }

      const decodeBase64Url = (str: string) => {
        const padded = str.padEnd(str.length + (4 - (str.length % 4)) % 4, '=');
        const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
      };

      const header = decodeBase64Url(parts[0]);
      const payload = decodeBase64Url(parts[1]);

      const isExpired = payload.exp && payload.exp < Date.now() / 1000;

      setDecoded({
        header,
        payload,
        signature: parts[2].substring(0, 20) + '...',
        isExpired,
        exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
        iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to decode JWT'
      );
      setDecoded(null);
    }
  }, []);

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          decode(e.target.value);
        }}
        placeholder="Paste your JWT token here..."
        style={{
          width: '100%',
          height: '128px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      {error && (
        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', fontSize: '13px', color: '#991b1b', display: 'flex', gap: '8px' }}>
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{error}</span>
        </div>
      )}

      {decoded && (
        <div className="space-y-3">
          {decoded.isExpired && (
            <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '13px', fontWeight: 600 }}>
              🔴 EXPIRED
            </div>
          )}

          <div style={{ padding: '16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Header</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#1e40af', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div style={{ padding: '16px', background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#6b21a8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Payload
            </div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#6b21a8', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {decoded.iat && (
              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Issued At</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: '#0f172a' }}>
                  {decoded.iat}
                </div>
              </div>
            )}
            {decoded.exp && (
              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Expires At</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: '#0f172a' }}>
                  {decoded.exp}
                </div>
              </div>
            )}
          </div>

          <CopyButton text={JSON.stringify(decoded, null, 2)} />
        </div>
      )}
    </div>
  );
}

// Base64 Encoder/Decoder
function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [isBase64, setIsBase64] = useState(false);

  const detectBase64 = (str: string) => {
    try {
      return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length % 4 === 0;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setIsBase64(detectBase64(input));
  }, [input]);

  const handleEncode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput('Error encoding');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setOutput('Error decoding');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '13px',
            background: mode === 'encode' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#f1f5f9',
            color: mode === 'encode' ? '#fff' : '#475569',
            border: mode === 'encode' ? 'none' : '1px solid #cbd5e1',
            cursor: 'pointer'
          }}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '13px',
            background: mode === 'decode' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#f1f5f9',
            color: mode === 'decode' ? '#fff' : '#475569',
            border: mode === 'decode' ? 'none' : '1px solid #cbd5e1',
            cursor: 'pointer'
          }}
        >
          Decode
        </button>
      </div>

      {isBase64 && mode === 'encode' && (
        <div style={{ padding: '12px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', fontSize: '13px', color: '#1e40af' }}>
          ✓ Input looks like Base64
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or Base64 to decode..."
        style={{
          width: '100%',
          height: '128px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      <button
        onClick={mode === 'encode' ? handleEncode : handleDecode}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#ffffff',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
        }}
      >
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>

      {output && (
        <div className="space-y-2">
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Output</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {output}
            </pre>
          </div>
          <CopyButton text={output} />
        </div>
      )}

      <ClearButton onClick={() => { setInput(''); setOutput(''); }} />
    </div>
  );
}

// URL Encoder/Decoder
function URLTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput('Error decoding');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or URL component..."
        style={{
          width: '100%',
          height: '128px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      <div className="flex gap-2">
        <button
          onClick={handleEncode}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: '#ffffff',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
          }}
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: '#ffffff',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
          }}
        >
          Decode
        </button>
      </div>

      {output && (
        <div className="space-y-2">
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Output</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {output}
            </pre>
          </div>
          <CopyButton text={output} />
        </div>
      )}

      <ClearButton onClick={() => { setInput(''); setOutput(''); }} />
    </div>
  );
}

// Cron Parser
function CronParser() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [error, setError] = useState('');

  const FIELDS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];
  const RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
  const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const describePart = useCallback((part: string, idx: number): string => {
    if (part === '*') return idx === 0 ? 'every minute' : idx === 1 ? 'every hour' : idx === 2 ? 'every day' : idx === 3 ? 'every month' : 'every day of the week';
    if (part.startsWith('*/')) {
      const step = part.slice(2);
      return idx === 0 ? `every ${step} minutes` : idx === 1 ? `every ${step} hours` : idx === 2 ? `every ${step} days` : idx === 3 ? `every ${step} months` : `every ${step} days of week`;
    }
    if (part.includes(',')) {
      const vals = part.split(',');
      if (idx === 3) return `in ${vals.map(v => MONTH_NAMES[parseInt(v)] || v).join(', ')}`;
      if (idx === 4) return `on ${vals.map(v => DAY_NAMES[parseInt(v)] || v).join(', ')}`;
      return `at ${FIELDS[idx].toLowerCase()} ${vals.join(', ')}`;
    }
    if (part.includes('-')) {
      const [a, b] = part.split('-');
      if (idx === 4) return `${DAY_NAMES[parseInt(a)] || a} through ${DAY_NAMES[parseInt(b)] || b}`;
      return `${FIELDS[idx].toLowerCase()} ${a} through ${b}`;
    }
    if (idx === 3) return `in ${MONTH_NAMES[parseInt(part)] || part}`;
    if (idx === 4) return `on ${DAY_NAMES[parseInt(part)] || part}`;
    return `at ${FIELDS[idx].toLowerCase()} ${part}`;
  }, []);

  const getNextRuns = useCallback((parts: string[], count: number = 5): string[] => {
    const runs: string[] = [];
    const now = new Date();
    const d = new Date(now);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setMinutes(d.getMinutes() + 1);

    const matchesPart = (value: number, part: string, min: number, max: number): boolean => {
      if (part === '*') return true;
      if (part.startsWith('*/')) { const step = parseInt(part.slice(2)); return (value - min) % step === 0; }
      if (part.includes(',')) return part.split(',').map(Number).includes(value);
      if (part.includes('-')) { const [a, b] = part.split('-').map(Number); return value >= a && value <= b; }
      return value === parseInt(part);
    };

    let safety = 0;
    while (runs.length < count && safety < 525600) {
      safety++;
      const min = d.getMinutes(), hr = d.getHours(), dom = d.getDate(), mon = d.getMonth() + 1, dow = d.getDay();
      if (matchesPart(min, parts[0], 0, 59) && matchesPart(hr, parts[1], 0, 23) && matchesPart(dom, parts[2], 1, 31) && matchesPart(mon, parts[3], 1, 12) && matchesPart(dow, parts[4], 0, 6)) {
        runs.push(d.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }));
      }
      d.setMinutes(d.getMinutes() + 1);
    }
    return runs;
  }, []);

  const parse = useCallback((expr: string) => {
    setError('');
    setDescription('');
    setNextRuns([]);
    if (!expr.trim()) return;

    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) { setError(`Expected 5 fields (minute hour day month weekday), got ${parts.length}`); return; }

    for (let i = 0; i < 5; i++) {
      const p = parts[i];
      if (p === '*' || p.match(/^\*\/\d+$/) || p.match(/^[\d,\-]+$/)) continue;
      setError(`Invalid value "${p}" for ${FIELDS[i]} field`);
      return;
    }

    const descs = parts.map((p, i) => describePart(p, i));
    let human = '';
    if (parts[0] === '0' && parts[1] !== '*') human = `At ${parts[1]}:00`;
    else if (parts[0] !== '*' && parts[1] !== '*') human = `At ${parts[1].padStart(2, '0')}:${parts[0].padStart(2, '0')}`;
    else human = descs[0].charAt(0).toUpperCase() + descs[0].slice(1) + ', ' + descs[1];

    if (parts[2] !== '*') human += ', ' + descs[2];
    if (parts[3] !== '*') human += ', ' + descs[3];
    if (parts[4] !== '*') human += ', ' + descs[4];

    setDescription(human);
    try { setNextRuns(getNextRuns(parts, 5)); } catch { /* skip */ }
  }, [describePart, getNextRuns]);

  const presets = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday 9am', value: '0 9 * * 1' },
    { label: 'Every 15 minutes', value: '*/15 * * * *' },
    { label: '1st of month', value: '0 0 1 * *' },
    { label: 'Weekdays 6pm', value: '0 18 * * 1-5' },
  ];

  return (
    <div className="space-y-4">
      <input
        value={input}
        onChange={(e) => { setInput(e.target.value); parse(e.target.value); }}
        placeholder="Enter cron expression (e.g., */15 * * * *)"
        style={{
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none'
        }}
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button key={p.value} onClick={() => { setInput(p.value); parse(p.value); }}
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 600,
              background: '#f8fafc',
              color: '#475569',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              cursor: 'pointer'
            }}>
            {p.label}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '13px' }}>{error}</div>
      )}

      {description && (
        <div style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Human Readable</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e40af' }}>{description}</div>
        </div>
      )}

      {input.trim().split(/\s+/).length === 5 && !error && (
        <div className="overflow-x-auto">
          <table style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                {FIELDS.map((f, i) => (
                  <th key={f} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{f}<br/><span style={{ color: '#cbd5e1' }}>({RANGES[i][0]}-{RANGES[i][1]})</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {input.trim().split(/\s+/).slice(0, 5).map((p, i) => (
                  <td key={i} style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', color: '#4f46e5', fontWeight: 600 }}>{p}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {nextRuns.length > 0 && (
        <div className="space-y-2">
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Next 5 Runs</div>
          <div className="space-y-1">
            {nextRuns.map((run, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', fontSize: '13px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', color: '#166534' }}>{run}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ClearButton onClick={() => { setInput(''); setDescription(''); setNextRuns([]); setError(''); }} />
    </div>
  );
}

// Regex Tester
function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const testRegex = useCallback(() => {
    setError('');
    setOutput('');
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testString.matchAll(regex)];

      if (matches.length === 0) {
        setOutput('No matches found');
        return;
      }

      const results = matches.map((m, i) => `Match ${i + 1}: "${m[0]}"\n${m.length > 1 ? 'Groups: ' + m.slice(1).join(', ') : ''}`).join('\n---\n');
      setOutput(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex');
    }
  }, [pattern, testString, flags]);

  return (
    <div className="space-y-4">
      <input
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        placeholder="Enter regex pattern..."
        style={{
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none'
        }}
      />

      <div className="flex flex-wrap gap-2">
        {['g', 'i', 'm', 's'].map((f) => (
          <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={flags.includes(f)} onChange={(e) => {
              if (e.target.checked) setFlags(flags + f);
              else setFlags(flags.replace(f, ''));
            }} />
            <span style={{ fontSize: '13px', fontFamily: 'ui-monospace, monospace', color: '#475569' }}>{f}</span>
          </label>
        ))}
      </div>

      <textarea
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        placeholder="Enter text to test..."
        style={{
          width: '100%',
          height: '128px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      <button
        onClick={testRegex}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#ffffff',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
        }}
      >
        Test Regex
      </button>

      {error && (
        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '13px', display: 'flex', gap: '8px' }}>
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{error}</span>
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Results</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {output}
            </pre>
          </div>
          <CopyButton text={output} />
        </div>
      )}

      <ClearButton onClick={() => { setPattern(''); setTestString(''); setOutput(''); setError(''); }} />
    </div>
  );
}

// Hash Generator
function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generateHashes = useCallback(async (text: string) => {
    if (!text) { setHashes({}); return; }
    const results: Record<string, string> = {};

    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        results[algo] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        results[algo] = 'Error generating hash';
      }
    }
    setHashes(results);
  }, []);

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          generateHashes(e.target.value);
        }}
        placeholder="Enter text to hash..."
        style={{
          width: '100%',
          height: '128px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      {Object.entries(hashes).map(([algo, hash]) => (
        <div key={algo} style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginBottom: '6px' }}>{algo}</div>
          <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            {hash}
          </pre>
        </div>
      ))}

      {input && Object.keys(hashes).length > 0 && (
        <CopyButton text={JSON.stringify(hashes, null, 2)} />
      )}

      <ClearButton onClick={() => { setInput(''); setHashes({}); }} />
    </div>
  );
}

// UUID Generator
function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUIDs = useCallback(() => {
    const newUUIDs = Array.from({ length: 5 }, () => {
      const uuid4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      return uuid4;
    });
    setUuids(newUUIDs);
  }, []);

  useEffect(() => {
    generateUUIDs();
  }, [generateUUIDs]);

  return (
    <div className="space-y-4">
      <button
        onClick={generateUUIDs}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#ffffff',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
        }}
      >
        Generate 5 UUIDs
      </button>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div key={i} style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: '#0f172a', wordBreak: 'break-all' }}>
            {uuid}
          </div>
        ))}
      </div>

      {uuids.length > 0 && (
        <CopyButton text={uuids.join('\n')} />
      )}

      <ClearButton onClick={() => setUuids([])} />
    </div>
  );
}

// Timestamp Converter
function TimestampConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const convert = useCallback((val: string) => {
    setError('');
    setResult(null);
    if (!val.trim()) return;

    try {
      let timestamp: number | null = null;
      const num = parseInt(val.trim());

      if (!isNaN(num)) {
        if (num.toString().length === 10) timestamp = num * 1000;
        else if (num.toString().length === 13) timestamp = num;
        else setError('Invalid timestamp format. Use 10-digit (seconds) or 13-digit (milliseconds).');
      } else {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          timestamp = date.getTime();
        } else {
          setError('Invalid date format');
        }
      }

      if (timestamp) {
        const date = new Date(timestamp);
        setResult({
          iso: date.toISOString(),
          unix: Math.floor(timestamp / 1000),
          unixMs: timestamp,
          human: date.toLocaleString(),
        });
      }
    } catch (err) {
      setError('Conversion error');
    }
  }, []);

  return (
    <div className="space-y-4">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          convert(e.target.value);
        }}
        placeholder="Enter Unix timestamp or date string..."
        style={{
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none'
        }}
      />

      {error && (
        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '13px' }}>{error}</div>
      )}

      {result && (
        <div className="space-y-2">
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>ISO 8601</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
              {result.iso}
            </pre>
          </div>
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Human Readable</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
              {result.human}
            </pre>
          </div>
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Unix Seconds</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
              {result.unix}
            </pre>
          </div>
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Unix Milliseconds</div>
            <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
              {result.unixMs}
            </pre>
          </div>
          <CopyButton text={JSON.stringify(result, null, 2)} />
        </div>
      )}

      <ClearButton onClick={() => { setInput(''); setResult(null); setError(''); }} />
    </div>
  );
}

// Color Converter
function ColorConverter() {
  const [hex, setHex] = useState('#FF6B6B');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    if (!result) return null;
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  useEffect(() => {
    const rgb_vals = hexToRgb(hex);
    if (rgb_vals) {
      setRgb(`rgb(${rgb_vals[0]}, ${rgb_vals[1]}, ${rgb_vals[2]})`);
      const [h, s, l] = rgbToHsl(rgb_vals[0], rgb_vals[1], rgb_vals[2]);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  }, [hex]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="#RRGGBB"
        style={{
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none'
        }}
      />

      <div style={{ width: '100%', height: '120px', borderRadius: '12px', border: '2px solid #e2e8f0', backgroundColor: hex }}></div>

      <div className="space-y-2">
        <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>HEX</div>
          <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
            {hex.toUpperCase()}
          </pre>
        </div>
        <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>RGB</div>
          <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
            {rgb}
          </pre>
        </div>
        <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>HSL</div>
          <pre style={{ fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a' }}>
            {hsl}
          </pre>
        </div>
      </div>

      <CopyButton text={`${hex}\n${rgb}\n${hsl}`} />
      <ClearButton onClick={() => setHex('#FF6B6B')} />
    </div>
  );
}

// Diff Checker
function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<Array<{ type: 'add' | 'remove' | 'same', line: string }>>([]);

  useEffect(() => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: Array<{ type: 'add' | 'remove' | 'same', line: string }> = [];

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      if (i >= lines1.length) {
        result.push({ type: 'add', line: lines2[i] });
      } else if (i >= lines2.length) {
        result.push({ type: 'remove', line: lines1[i] });
      } else if (lines1[i] === lines2[i]) {
        result.push({ type: 'same', line: lines1[i] });
      } else {
        result.push({ type: 'remove', line: lines1[i] });
        result.push({ type: 'add', line: lines2[i] });
      }
    }

    setDiff(result);
  }, [text1, text2]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <textarea
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Original text..."
          style={{
            width: '100%',
            height: '200px',
            padding: '12px 14px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '13px',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            background: '#f8fafc',
            color: '#0f172a',
            outline: 'none',
            resize: 'vertical'
          }}
        />
        <textarea
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="Modified text..."
          style={{
            width: '100%',
            height: '200px',
            padding: '12px 14px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '13px',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            background: '#f8fafc',
            color: '#0f172a',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      {diff.length > 0 && (
        <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontFamily: 'ui-monospace, monospace', fontSize: '12px' }}>
          {diff.map((d, i) => (
            <div
              key={i}
              style={d.type === 'add'
                ? { padding: '4px 8px', borderLeft: '4px solid #22c55e', background: '#f0fdf4', color: '#14532d' }
                : d.type === 'remove'
                  ? { padding: '4px 8px', borderLeft: '4px solid #ef4444', background: '#fef2f2', color: '#7f1d1d' }
                  : { padding: '4px 8px', borderLeft: '4px solid #cbd5e1', color: '#475569' }
              }
            >
              {d.line}
            </div>
          ))}
        </div>
      )}

      <ClearButton onClick={() => { setText1(''); setText2(''); }} />
    </div>
  );
}

// Markdown Preview
function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('# Hello\n\nThis is **bold** and *italic* text.');
  const [html, setHtml] = useState('');

  const basicMarkdownToHtml = (md: string) => {
    let html = md;
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    html = html.replace(/\n/g, '<br />');
    return html;
  };

  useEffect(() => {
    setHtml(basicMarkdownToHtml(markdown));
  }, [markdown]);

  return (
    <div className="space-y-4">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Enter markdown..."
        style={{
          width: '100%',
          height: '240px',
          padding: '12px 14px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '13px',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          background: '#f8fafc',
          color: '#0f172a',
          outline: 'none',
          resize: 'vertical'
        }}
      />

      <div style={{ padding: '14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '120px' }} dangerouslySetInnerHTML={{ __html: html }} />

      <CopyButton text={html} />
      <ClearButton onClick={() => setMarkdown('')} />
    </div>
  );
}

// Lorem Ipsum Generator
function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');

  const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  const generateLorem = useCallback(() => {
    let result = '';
    for (let i = 0; i < paragraphs; i++) {
      result += loremText + '\n\n';
    }
    setOutput(result.trim());
  }, [paragraphs]);

  useEffect(() => {
    generateLorem();
  }, [generateLorem]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Paragraphs:</label>
        <input
          type="number"
          min="1"
          max="20"
          value={paragraphs}
          onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
          style={{
            width: '60px',
            padding: '8px 10px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '13px',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            background: '#f8fafc',
            color: '#0f172a',
            outline: 'none'
          }}
        />
        <button
          onClick={generateLorem}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: '#ffffff',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
          }}
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="space-y-2">
          <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '120px', fontSize: '13px', color: '#0f172a', lineHeight: '1.6' }}>
            {output}
          </div>
          <CopyButton text={output} />
        </div>
      )}

      <ClearButton onClick={() => { setParagraphs(1); setOutput(''); }} />
    </div>
  );
}

// Copy Button Component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      style={{
        width: '100%',
        padding: '10px 16px',
        background: 'linear-gradient(135deg, #059669, #10b981)',
        color: '#ffffff',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '13px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <Copy size={16} />
      {copied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
}

// Clear Button Component
function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '10px 16px',
        background: '#f1f5f9',
        color: '#475569',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '13px',
        border: '1px solid #cbd5e1',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <X size={16} />
      Clear
    </button>
  );
}

// Main Home Component
export default function Home() {
  const [selectedTool, setSelectedTool] = useState('jwt');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const commandPaletteRef = useRef<HTMLDivElement>(null);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderTool = () => {
    switch (selectedTool) {
      case 'jwt': return <JWTDecoder />;
      case 'base64': return <Base64Tool />;
      case 'url': return <URLTool />;
      case 'cron': return <CronParser />;
      case 'regex': return <RegexTester />;
      case 'hash': return <HashGenerator />;
      case 'uuid': return <UUIDGenerator />;
      case 'timestamp': return <TimestampConverter />;
      case 'color': return <ColorConverter />;
      case 'diff': return <DiffChecker />;
      case 'markdown': return <MarkdownPreview />;
      case 'lorem': return <LoremIpsumGenerator />;
      default: return <JWTDecoder />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(!showCommandPalette);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);

  const currentTool = tools.find(t => t.id === selectedTool);
  const ToolIcon = currentTool?.icon;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <div style={{
        display: sidebarOpen ? 'flex' : 'none',
        flexDirection: 'column',
        background: '#1e293b',
        borderRight: '1px solid #334155',
        width: '280px',
        overflowY: 'auto',
        zIndex: 40
      }}>
        {/* Search Bar */}
        <div style={{ padding: '16px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#94a3b8',
              padding: '10px 14px',
              fontSize: '13px'
            }}
          />
        </div>

        {/* Tool Categories */}
        <nav style={{ flex: 1, overflowY: 'auto' }}>
          {toolCategories.map(category => (
            <div key={category.name} style={{ paddingBottom: '8px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: category.color,
                padding: '12px 16px 6px'
              }}>
                {category.name}
              </div>
              <div style={{ paddingBottom: '8px' }}>
                {category.tools.map(toolId => {
                  const tool = tools.find(t => t.id === toolId);
                  if (!tool) return null;
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => { setSelectedTool(tool.id); setSearch(''); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: selectedTool === tool.id ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: selectedTool === tool.id ? '#ffffff' : '#94a3b8',
                        fontSize: '13px',
                        fontWeight: selectedTool === tool.id ? 600 : 500,
                        transition: 'all 0.15s',
                        boxShadow: selectedTool === tool.id ? '0 4px 12px rgba(99,102,241,0.4)' : 'none'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: selectedTool === tool.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={16} />
                      </div>
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #334155',
          background: 'rgba(99,102,241,0.1)',
          fontSize: '12px',
          color: '#cbd5e1',
          textAlign: 'center'
        }}>
          12 Tools · All data stays private
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)',
          padding: '0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 4px 20px rgba(79,70,229,0.3)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu size={20} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={20} style={{ color: '#fbbf24' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}>DevToolkit</h1>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0,
                    fontWeight: 500
                  }}>12 Essential Developer Tools</p>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Lock size={14} style={{ color: '#4ade80' }} />
              <span style={{
                fontSize: '12px',
                color: '#ffffff',
                fontWeight: 600
              }}>100% Client-Side</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div style={{
          background: '#f1f5f9',
          flex: 1,
          overflow: 'auto'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '32px'
          }}>
            {/* Tool Header */}
            {currentTool && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
                }}>
                  {ToolIcon && <ToolIcon size={24} style={{ color: '#ffffff' }} />}
                </div>
                <div>
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}>
                    {currentTool.name}
                  </h2>
                </div>
              </div>
            )}

            {/* Tool Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              padding: '28px'
            }}>
              {renderTool()}
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette */}
      {showCommandPalette && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '80px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search tools..."
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '14px',
                border: 'none',
                borderBottom: '1px solid #e2e8f0',
                outline: 'none'
              }}
            />
            <div>
              {filteredTools.length > 0 ? (
                filteredTools.map(tool => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTool(tool.id);
                        setShowCommandPalette(false);
                        setSearch('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f1f5f9',
                        background: '#ffffff',
                        border: 'none',
                        width: '100%',
                        fontSize: '14px',
                        color: '#0f172a'
                      }}
                    >
                      <Icon size={18} />
                      {tool.name}
                    </button>
                  );
                })
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>
                  No tools found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
