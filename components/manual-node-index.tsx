'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Search, X } from 'lucide-react';
import { withBasePath } from '@/lib/site-path';

type WorkflowNode = {
  id: number;
  type: string;
  title?: string;
  group?: string;
  mode?: number;
  widgets_values?: unknown[] | null;
  properties?: {
    cnr_id?: string;
    ver?: string;
    ['Node name for S&R']?: string;
  };
};

type WorkflowLink = {
  id: number;
  source_node: number;
  source_slot: number;
  target_node: number;
  target_slot: number;
  type: string;
};

type WorkflowSpec = {
  counts?: { nodes?: number; links?: number; groups?: number; controls?: number };
  nodes: WorkflowNode[];
  links: WorkflowLink[];
};

type IndexedNode = WorkflowNode & {
  provider: string;
  upstream: number[];
  downstream: number[];
  linkTypes: string[];
};

const PAGE_SIZE = 36;

function stringifyWidgets(value: unknown[] | null | undefined) {
  if (!value || value.length === 0) return '—';
  try {
    const text = JSON.stringify(value);
    return text.length > 180 ? `${text.slice(0, 177)}…` : text;
  } catch {
    return String(value);
  }
}

function buildIndex(spec: WorkflowSpec): IndexedNode[] {
  const incoming = new Map<number, Set<number>>();
  const outgoing = new Map<number, Set<number>>();
  const types = new Map<number, Set<string>>();

  for (const link of spec.links ?? []) {
    if (!incoming.has(link.target_node)) incoming.set(link.target_node, new Set());
    if (!outgoing.has(link.source_node)) outgoing.set(link.source_node, new Set());
    if (!types.has(link.source_node)) types.set(link.source_node, new Set());
    if (!types.has(link.target_node)) types.set(link.target_node, new Set());
    incoming.get(link.target_node)?.add(link.source_node);
    outgoing.get(link.source_node)?.add(link.target_node);
    types.get(link.source_node)?.add(link.type);
    types.get(link.target_node)?.add(link.type);
  }

  return [...(spec.nodes ?? [])]
    .map((node) => ({
      ...node,
      provider: node.properties?.cnr_id || 'unknown',
      upstream: [...(incoming.get(node.id) ?? [])].sort((a, b) => a - b),
      downstream: [...(outgoing.get(node.id) ?? [])].sort((a, b) => a - b),
      linkTypes: [...(types.get(node.id) ?? [])].sort(),
    }))
    .sort((a, b) => a.id - b.id);
}

export function ManualNodeIndex() {
  const [spec, setSpec] = useState<WorkflowSpec | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [provider, setProvider] = useState('all');
  const [mode, setMode] = useState('all');
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      withBasePath(
        '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE/HANSEN_WORKFLOW_SPEC.json',
      ),
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<WorkflowSpec>;
      })
      .then(setSpec)
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : 'Unknown load error');
      });
    return () => controller.abort();
  }, []);

  const nodes = useMemo(() => (spec ? buildIndex(spec) : []), [spec]);
  const groups = useMemo(
    () => [...new Set(nodes.map((node) => node.group || 'Ungrouped'))].sort(),
    [nodes],
  );
  const providers = useMemo(
    () => [...new Set(nodes.map((node) => node.provider))].sort(),
    [nodes],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru');
    return nodes.filter((node) => {
      const state = node.mode === 4 ? 'bypassed' : 'active';
      if (group !== 'all' && (node.group || 'Ungrouped') !== group) return false;
      if (provider !== 'all' && node.provider !== provider) return false;
      if (mode !== 'all' && state !== mode) return false;
      if (!needle) return true;
      const searchable = [
        node.id,
        node.title,
        node.type,
        node.group,
        node.provider,
        node.properties?.ver,
        stringifyWidgets(node.widgets_values),
        node.upstream.join(' '),
        node.downstream.join(' '),
      ]
        .join(' ')
        .toLocaleLowerCase('ru');
      return searchable.includes(needle);
    });
  }, [group, mode, nodes, provider, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  async function copyNode(id: number) {
    try {
      await navigator.clipboard.writeText(String(id));
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1400);
    } catch {
      setCopied(null);
    }
  }

  function reset() {
    setQuery('');
    setGroup('all');
    setProvider('all');
    setMode('all');
  }

  if (error) {
    return (
      <section className="node-index-error">
        <strong>NOT CONFIRMED · спецификация не загрузилась</strong>
        <p>{error}. Проверьте base path и наличие bundled JSON.</p>
      </section>
    );
  }

  if (!spec) {
    return <section className="node-index-loading">Загрузка индекса 252 nodes…</section>;
  }

  return (
    <section className="node-index-app" aria-label="Complete workflow node index">
      <div className="node-index-toolbar">
        <label className="node-search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Поиск nodes</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="ID, title, type, package, widget…"
          />
        </label>
        <label>
          <span>GROUP</span>
          <select value={group} onChange={(event) => {
            setGroup(event.target.value);
            setPage(1);
          }}>
            <option value="all">All groups</option>
            {groups.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>PACKAGE</span>
          <select value={provider} onChange={(event) => {
            setProvider(event.target.value);
            setPage(1);
          }}>
            <option value="all">All packages</option>
            {providers.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>STATE</span>
          <select value={mode} onChange={(event) => {
            setMode(event.target.value);
            setPage(1);
          }}>
            <option value="all">All states</option>
            <option value="active">Mode 0</option>
            <option value="bypassed">Mode 4</option>
          </select>
        </label>
        <button type="button" className="node-filter-reset" onClick={reset}>
          <X /> Reset
        </button>
      </div>

      <div className="node-index-summary">
        <span><strong>{filtered.length}</strong> of {nodes.length} nodes</span>
        <span>{spec.links?.length ?? 0} links</span>
        <span>{groups.length} represented groups</span>
        <span>Page {safePage} / {pageCount}</span>
      </div>

      <div className="node-index-table-wrap">
        <table className="node-index-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Node / type</th>
              <th>Group / package</th>
              <th>State</th>
              <th>Upstream</th>
              <th>Downstream</th>
              <th>Widgets</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((node) => (
              <tr key={node.id} id={`node-${node.id}`}>
                <td data-label="ID">
                  <button type="button" className="node-copy" onClick={() => copyNode(node.id)} title="Копировать node ID">
                    <strong>{node.id}</strong>
                    <Copy aria-hidden="true" />
                    <small>{copied === node.id ? 'copied' : 'copy'}</small>
                  </button>
                </td>
                <td data-label="Node / type">
                  <strong>{node.title || node.type}</strong>
                  <small>{node.type}</small>
                  {node.linkTypes.length > 0 && <code>{node.linkTypes.join(' · ')}</code>}
                </td>
                <td data-label="Group / package">
                  <strong>{node.group || 'Ungrouped'}</strong>
                  <small>{node.provider}</small>
                  {node.properties?.ver && <code>{node.properties.ver}</code>}
                </td>
                <td data-label="State">
                  <span className={`node-mode ${node.mode === 4 ? 'bypassed' : 'active'}`}>
                    mode {node.mode ?? 0}
                  </span>
                </td>
                <td data-label="Upstream"><code>{node.upstream.join(', ') || '—'}</code></td>
                <td data-label="Downstream"><code>{node.downstream.join(', ') || '—'}</code></td>
                <td data-label="Widgets"><code className="node-widgets">{stringifyWidgets(node.widgets_values)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && <div className="node-index-empty">Нет nodes для выбранных фильтров.</div>}

      <div className="node-index-pagination">
        <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={safePage === 1}>
          <ChevronLeft /> Previous
        </button>
        <span>{(safePage - 1) * PAGE_SIZE + (visible.length ? 1 : 0)}–{(safePage - 1) * PAGE_SIZE + visible.length} / {filtered.length}</span>
        <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={safePage === pageCount}>
          Next <ChevronRight />
        </button>
      </div>
    </section>
  );
}
