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
        className="w-full h-32 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-red-800 text-sm">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {decoded && (
        <div className="space-y-3">
          {decoded.isExpired && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              🔴 EXPIRED
            </div>
          )}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm font-semibold text-blue-900 mb-2">Header</div>
            <pre className="text-xs font-mono text-blue-800 overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="text-sm font-semibold text-purple-900 mb-2">
              Payload
            </div>
            <pre className="text-xs font-mono text-purple-800 overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {decoded.iat && (
              <div className="p-3 bg-slate-100 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Issued At</div>
                <div className="font-mono text-xs text-slate-900">
                  {decoded.iat}
                </div>
              </div>
            )}
            {decoded.exp && (
              <div className="p-3 bg-slate-100 rounded-lg">
                <div className="text-xs text-slate-600 mb-1">Expires At</div>
                <div className="font-mono text-xs text-slate-900">
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
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Decode
        </button>
      </div>

      {isBase64 && mode === 'encode' && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          ✓ Input looks like Base64
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or Base64 to decode..."
        className="w-full h-32 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        onClick={mode === 'encode' ? handleEncode : handleDecode}
        className="w-full py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>

      {output && (
        <div className="space-y-2">
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-xs text-slate-600 mb-2">Output</div>
            <pre className="text-sm font-mono text-slate-900 break-all whitespace-pre-wrap">
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
        className="w-full h-32 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex gap-2">
        <button
          onClick={handleEncode}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Decode
        </button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-xs text-slate-600 mb-2">Output</div>
            <pre className="text-sm font-mono text-slate-900 break-all whitespace-pre-wrap">
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

// JSON Formatter
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
        className="w-full p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button key={p.value} onClick={() => { setInput(p.value); parse(p.value); }}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition border border-slate-200">
            {p.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">{error}</div>
      )}

      {description && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Human Readable</div>
          <div className="text-lg font-semibold text-blue-900">{description}</div>
        </div>
      )}

      {input.trim().split(/\s+/).length === 5 && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {FIELDS.map((f, i) => (
                  <th key={f} className="py-2 px-3 text-left text-slate-600 font-medium text-xs">{f}<br/><span className="text-slate-400">({RANGES[i][0]}-{RANGES[i][1]})</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {input.trim().split(/\s+/).slice(0, 5).map((p, i) => (
                  <td key={i} className="py-2 px-3 font-mono text-blue-700 font-semibold">{p}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {nextRuns.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Next 5 Runs</div>
          <div className="space-y-1">
            {nextRuns.map((run, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="font-mono text-green-900">{run}</span>
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

      let result = `Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}:\n\n`;
      matches.forEach((match, index) => {
        result += `Match ${index + 1}: "${match[0]}"\n`;
        if (match.length > 1) {
          match.forEach((group, i) => {
            if (i > 0) {
              result += `  Group ${i}: "${group}"\n`;
            }
          });
        }
        result += '\n';
      });

      setOutput(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Invalid regex pattern'
      );
    }
  }, [pattern, testString, flags]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        placeholder="Enter regex pattern..."
        className="w-full p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex gap-2">
        {['g', 'i', 'm', 's'].map((flag) => (
          <label key={flag} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={flags.includes(flag)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFlags((f) => f + flag);
                } else {
                  setFlags((f) => f.replace(flag, ''));
                }
              }}
              className="w-4 h-4"
            />
            <span className="text-sm font-mono">{flag}</span>
          </label>
        ))}
      </div>

      <textarea
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        placeholder="Enter test string..."
        className="w-full h-24 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={testRegex}
        className="w-full py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Test
      </button>

      {output && (
        <div className="space-y-2">
          <div className="p-3 bg-slate-100 rounded-lg max-h-64 overflow-y-auto">
            <pre className="text-sm font-mono text-slate-900 whitespace-pre-wrap">
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
  const [loading, setLoading] = useState(false);

  const generateHashes = useCallback(async () => {
    if (!input) return;
    setLoading(true);

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results: Record<string, string> = {};

      for (const algo of algorithms) {
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        results[algo] = hashHex;
      }

      setHashes(results);
    } catch (err) {
      console.error('Hash error:', err);
    } finally {
      setLoading(false);
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to hash..."
        className="w-full h-24 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        onClick={generateHashes}
        disabled={loading || !input}
        className="w-full py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Generate Hashes'}
      </button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-2">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="p-3 bg-slate-100 rounded-lg">
              <div className="text-xs text-slate-600 font-semibold mb-1">
                {algo}
              </div>
              <div className="flex gap-2 items-start">
                <code className="text-xs font-mono text-slate-900 break-all flex-1">
                  {hash}
                </code>
                <CopyButton text={hash} />
              </div>
            </div>
          ))}
        </div>
      )}

      <ClearButton onClick={() => { setInput(''); setHashes({}); }} />
    </div>
  );
}

// UUID Generator
function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUIDs = useCallback(() => {
    const newUUIDs = Array.from({ length: Math.min(count, 100) }, () =>
      crypto.randomUUID()
    );
    setUuids(newUUIDs);
  }, [count]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          placeholder="Count (1-100)"
          className="flex-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={generateUUIDs}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Generate
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="p-3 bg-slate-100 rounded-lg max-h-64 overflow-y-auto">
            <pre className="text-sm font-mono text-slate-900">
              {uuids.join('\n')}
            </pre>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(uuids.join('\n'));
            }}
            className="w-full py-2 px-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            Copy All
          </button>
        </div>
      )}

      <ClearButton onClick={() => { setUuids([]); setCount(1); }} />
    </div>
  );
}

// Timestamp Converter
function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateString, setDateString] = useState(new Date().toISOString());
  const [timezone, setTimezone] = useState('UTC');

  const handleTimestampChange = (ts: string) => {
    setTimestamp(ts);
    if (ts && !isNaN(Number(ts))) {
      const date = new Date(parseInt(ts) * 1000);
      setDateString(date.toISOString());
    }
  };

  const handleDateChange = (ds: string) => {
    setDateString(ds);
    if (ds) {
      const ts = Math.floor(new Date(ds).getTime() / 1000);
      setTimestamp(ts.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="number"
          value={timestamp}
          onChange={(e) => handleTimestampChange(e.target.value)}
          placeholder="Unix timestamp..."
          className="flex-1 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={() => handleTimestampChange(Math.floor(Date.now() / 1000).toString())}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap"
        >
          Now
        </button>
      </div>

      <input
        type="datetime-local"
        value={dateString.slice(0, 16)}
        onChange={(e) => handleDateChange(new Date(e.target.value).toISOString())}
        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="grid grid-cols-2 gap-3">
        {timestamp && !isNaN(Number(timestamp)) && (
          <>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">UTC Time</div>
              <div className="text-xs font-mono text-slate-900 break-all">
                {new Date(parseInt(timestamp) * 1000).toISOString()}
              </div>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Local Time</div>
              <div className="text-xs font-mono text-slate-900 break-all">
                {new Date(parseInt(timestamp) * 1000).toString()}
              </div>
            </div>
          </>
        )}
      </div>

      <ClearButton onClick={() => { setTimestamp(''); setDateString(''); }} />
    </div>
  );
}

// Color Converter
function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('217, 100%, 60%');

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '';
  };

  const hexToHsl = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16) / 255;
    const g = parseInt(h.slice(3, 5), 16) / 255;
    const b = parseInt(h.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let l = (max + min) / 2;
    let s = 0;
    let hue = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          hue = ((b - r) / d + 2) / 6;
          break;
        case b:
          hue = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(hue * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  const handleHexChange = (h: string) => {
    if (/^#[0-9A-F]{6}$/i.test(h)) {
      setHex(h);
      setRgb(hexToRgb(h));
      setHsl(hexToHsl(h));
    } else {
      setHex(h);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-20 h-20 rounded-lg border-2 border-slate-200" style={{ backgroundColor: hex }} />
        <input
          type="color"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-20 h-20 rounded-lg cursor-pointer"
        />
      </div>

      <input
        type="text"
        value={hex}
        onChange={(e) => handleHexChange(e.target.value)}
        placeholder="#000000"
        className="w-full p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="space-y-2">
        <div className="p-3 bg-slate-100 rounded-lg flex justify-between items-center">
          <div className="text-xs text-slate-600">RGB</div>
          <code className="font-mono text-sm text-slate-900">rgb({rgb})</code>
        </div>
        <div className="p-3 bg-slate-100 rounded-lg flex justify-between items-center">
          <div className="text-xs text-slate-600">HSL</div>
          <code className="font-mono text-sm text-slate-900">hsl({hsl})</code>
        </div>
      </div>

      <ClearButton onClick={() => { setHex('#3b82f6'); setRgb('59, 130, 246'); setHsl('217, 100%, 60%'); }} />
    </div>
  );
}

// Diff Checker
function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const getDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result = [];

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 === line2) {
        result.push({ type: 'same', content: line1 || '', line: i + 1 });
      } else {
        if (line1 !== undefined) {
          result.push({ type: 'removed', content: line1, line: i + 1 });
        }
        if (line2 !== undefined) {
          result.push({ type: 'added', content: line2, line: i + 1 });
        }
      }
    }

    return result;
  };

  const diff = getDiff();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <textarea
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Original text..."
          className="h-40 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="New text..."
          className="h-40 p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {diff.length > 0 && (
        <div className="p-3 bg-slate-100 rounded-lg max-h-64 overflow-y-auto">
          {diff.map((item, idx) => (
            <div
              key={idx}
              className={`font-mono text-xs py-1 px-2 border-l-4 ${
                item.type === 'added'
                  ? 'bg-green-50 text-green-900 border-green-400'
                  : item.type === 'removed'
                  ? 'bg-red-50 text-red-900 border-red-400'
                  : 'text-slate-700 border-slate-300'
              }`}
            >
              <span className="text-xs text-slate-500 mr-2">{item.line}</span>
              {item.type === 'added' && '+ '}
              {item.type === 'removed' && '- '}
              {item.content}
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
  const [markdown, setMarkdown] = useState('# Hello\n\nWelcome to **DevToolkit**');

  const simpleMarkdownToHtml = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');

    // Bold and Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>');

    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-slate-100 p-3 rounded my-2 overflow-x-auto"><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

    // Lists
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul class="list-disc list-inside ml-4 my-2">$1</ul>');

    // Paragraphs
    html = html.split('\n\n').map((p) => {
      if (!p.match(/^<[h|u|p|pre]/)) {
        return `<p class="mb-3">${p}</p>`;
      }
      return p;
    }).join('\n');

    return html;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 h-96">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter Markdown..."
          className="p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div
          className="p-3 border border-slate-200 rounded-lg overflow-y-auto text-slate-900"
          dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(markdown) }}
        />
      </div>

      <CopyButton text={markdown} />
      <ClearButton onClick={() => setMarkdown('')} />
    </div>
  );
}

// Lorem Ipsum Generator
function LoremIpsumGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  ];

  const generateWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];

  const generateSentence = () => {
    const len = Math.floor(Math.random() * 8) + 4;
    const words = Array.from({ length: len }, generateWord);
    return words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    return Array.from({ length: sentenceCount }, generateSentence).join(' ');
  };

  const generate = () => {
    let result = '';
    if (type === 'words') {
      result = Array.from({ length: count }, generateWord).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, generateSentence).join(' ');
    } else {
      result = Array.from({ length: count }, generateParagraph).join('\n\n');
    }
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
              type === t
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          placeholder="Count..."
          className="flex-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={generate}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="p-3 bg-slate-100 rounded-lg max-h-64 overflow-y-auto">
            <pre className="text-sm text-slate-900 whitespace-pre-wrap">
              {output}
            </pre>
          </div>
          <CopyButton text={output} />
        </div>
      )}

      <ClearButton onClick={() => { setOutput(''); setCount(3); }} />
    </div>
  );
}

// Helper components
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full py-2 px-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
    >
      {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition flex items-center justify-center gap-2"
    >
      <X size={18} />
      Clear
    </button>
  );
}

// Main App Component
export default function Home() {
  const [activeTab, setActiveTab] = useState('jwt');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(!showCommandPalette);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTool = () => {
    switch (activeTab) {
      case 'jwt':
        return <JWTDecoder />;
      case 'base64':
        return <Base64Tool />;
      case 'url':
        return <URLTool />;
      case 'cron':
        return <CronParser />;
      case 'regex':
        return <RegexTester />;
      case 'hash':
        return <HashGenerator />;
      case 'uuid':
        return <UUIDGenerator />;
      case 'timestamp':
        return <TimestampConverter />;
      case 'color':
        return <ColorConverter />;
      case 'diff':
        return <DiffChecker />;
      case 'markdown':
        return <MarkdownPreview />;
      case 'lorem':
        return <LoremIpsumGenerator />;
      default:
        return null;
    }
  };

  const activeTool = tools.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Zap className="text-blue-400" size={28} />
              <h1 className="text-2xl font-bold">DevToolkit</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg">
            <Lock size={16} className="text-green-400" />
            <span className="text-sm text-slate-200">
              100% Client-Side
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative w-64 bg-white border-r border-slate-200 transition-transform duration-300 z-40 flex flex-col h-full`}
        >
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={() => setShowCommandPalette(true)}
              className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 flex items-center gap-2 transition"
            >
              <Search size={16} />
              <span className="flex-1 text-left">Search tools...</span>
              <span className="text-xs text-slate-500">⌘K</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="p-2 space-y-1">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTab(tool.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      activeTab === tool.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-200 bg-blue-50">
            <div className="text-xs text-blue-900 text-center">
              <div className="font-semibold mb-1">12 Tools</div>
              <div className="text-blue-800">All data stays private</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            {activeTool && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {activeTool.icon && <activeTool.icon size={24} className="text-blue-600" />}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {activeTool.name}
                  </h2>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              {renderTool()}
            </div>
          </div>
        </main>
      </div>

      {/* Command Palette */}
      {showCommandPalette && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => setShowCommandPalette(false)}
        >
          <div
            ref={commandPaletteRef}
            className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTab(tool.id);
                      setShowCommandPalette(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition text-left"
                  >
                    <Icon size={18} className="text-slate-400" />
                    <span className="text-slate-900 font-medium">{tool.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
