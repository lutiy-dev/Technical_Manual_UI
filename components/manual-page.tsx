'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleHelp,
  CircleX,
  Download,
  ExternalLink,
  FileArchive,
  FileCode2,
  GitBranch,
  Layers3,
  Moon,
  RotateCcw,
  SearchCheck,
  Sun,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Progress,
  ProgressLabel,
} from '@/components/ui/progress';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LegacyInfographicDownloads,
  OutputVisual,
  ReactInfographicAtlas,
} from '@/components/manual-visuals';
import { FullGraphVisual, hasFullGraphVisual } from '@/components/full-graph-visuals';
import { ManualNodeIndex } from '@/components/manual-node-index';
import {
  type Chapter,
  type EvidenceStatus,
  type ManualCategory,
  diagnosticChecklist,
  downloadResources,
  manualChapters,
  sourceRoot,
  upstreamResources,
} from '@/lib/manual-data';
import { withBasePath } from '@/lib/site-path';

const statusCopy: Record<
  EvidenceStatus,
  { label: string; icon: typeof CheckCircle2; short: string }
> = {
  confirmed: {
    label: 'CONFIRMED',
    icon: CheckCircle2,
    short: 'Доказано graph data / topology',
  },
  inferred: {
    label: 'INFERRED',
    icon: CircleHelp,
    short: 'Практический вывод из структуры',
  },
  'not-confirmed': {
    label: 'NOT CONFIRMED',
    icon: CircleX,
    short: 'Нужен runtime / preview',
  },
};

function EvidenceBadge({
  status,
  compact = false,
}: {
  status: EvidenceStatus;
  compact?: boolean;
}) {
  const entry = statusCopy[status];
  const Icon = entry.icon;
  return (
    <span className={`evidence-badge ${status} ${compact ? 'compact' : ''}`}>
      <Icon size={compact ? 13 : 15} />
      {entry.label}
    </span>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored =
      window.localStorage.getItem('epspoziciya-manual-theme') ??
      window.localStorage.getItem('ppl-manual-theme');
    const preferred =
      stored === 'dark' || stored === 'light'
        ? stored
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    window.requestAnimationFrame(() => setTheme(preferred));
    document.documentElement.dataset.theme = preferred;
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('epspoziciya-manual-theme', next);
  }

  return (
    <Button
      className="theme-toggle"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}

function FlowStrip({
  steps,
  active = [],
}: {
  steps: { id: string; label: string; sub?: string }[];
  active?: string[];
}) {
  return (
    <figure className="flow-strip" aria-label={steps.map((step) => step.label).join(', затем ')}>
      {steps.map((step, index) => (
        <div className="flow-piece" key={`${step.id}-${index}`}>
          <div
            className={`flow-box ${active.includes(step.id) ? 'active' : ''}`}
            style={{ '--step-index': index } as React.CSSProperties}
          >
            <span>{step.id}</span>
            <strong>{step.label}</strong>
            {step.sub && <small>{step.sub}</small>}
          </div>
          {index < steps.length - 1 && <ArrowRight className="signal-arrow" size={18} />}
        </div>
      ))}
    </figure>
  );
}

function OverviewVisual() {
  return (
    <div className="visual-card visual-overview">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">ACTIVE ROUTE · MODE 1</span>
          <h2>Сигнал от prompt до текущего output</h2>
        </div>
        <span className="live-chip"><span /> graph topology</span>
      </div>
      <FlowStrip
        active={['408', '543', '459', '730']}
        steps={[
          { id: '408', label: 'PPL Prompt' },
          { id: '829', label: 'FLUX person', sub: 'raw decode' },
          { id: '550–146', label: 'Mask', sub: 'Florence2 + SAM2' },
          { id: '422–449', label: 'Prepare', sub: 'rembg + color' },
          { id: '429', label: 'Composite' },
          { id: '543 → 459', label: 'Select + return' },
          { id: '730', label: 'Current output', sub: 'LQ save' },
        ]}
      />
      <div className="visual-footnote">
        <CircleAlert size={16} />
        <p>
          HQ / upscale / overlay chain существует, но nodes 832–851 сохранены в <b>BYPASS</b>.
          Поэтому текущую проверку завершай на decode 53 / save 730.
        </p>
      </div>
    </div>
  );
}

function PromptVisual() {
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">STRING ASSEMBLY</span>
          <h2>Из четырёх источников в один PPL conditioning</h2>
        </div>
        <EvidenceBadge status="confirmed" compact />
      </div>
      <div className="prompt-builder">
        <div className="prompt-source">
          <span>825 · PREFIX</span>
          <p>fullbody portrait photo of</p>
        </div>
        <span className="operator">+</span>
        <div className="prompt-source hero">
          <span>408 · PEOPLE</span>
          <p>a few Middle Eastern townspeople…</p>
        </div>
        <span className="operator">+</span>
        <div className="prompt-source">
          <span>799 · ENVIRONMENT</span>
          <p className="empty-value">empty</p>
        </div>
        <span className="operator">+</span>
        <div className="prompt-source">
          <span>800 / 822</span>
          <p>light, style, full-body framing</p>
        </div>
        <ArrowRight className="builder-arrow" />
        <div className="prompt-output">
          <span>831 → 830</span>
          <strong>CLIP Encode</strong>
          <small>Guidance 2.1</small>
        </div>
      </div>
    </div>
  );
}

function GenerationVisual() {
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">FLUX PEOPLE STACK</span>
          <h2>От loader до preview 409</h2>
        </div>
        <Zap className="accent-icon" />
      </div>
      <div className="model-stack">
        <div className="model-column">
          <span>MODEL</span>
          <strong>flux1-dev-Q8_0.gguf</strong>
          <small>node 467</small>
        </div>
        <div className="model-column">
          <span>TEXT ENCODERS</span>
          <strong>T5 Q8 + CLIP-L</strong>
          <small>node 466</small>
        </div>
        <div className="model-column">
          <span>LATENT</span>
          <strong>1312 × 1920</strong>
          <small>node 827 · batch 1</small>
        </div>
        <div className="model-column highlighted">
          <span>SAMPLING</span>
          <strong>24 steps · Euler</strong>
          <small>beta · denoise 1 · guidance 2.1</small>
        </div>
        <div className="model-column">
          <span>DECODE</span>
          <strong>829 → 409</strong>
          <small>VAE ae.safetensors</small>
        </div>
      </div>
      <p className="visual-caption">
        Названия loader-файлов подтверждены JSON; их фактическое наличие на машине этим архивом
        не проверяется.
      </p>
    </div>
  );
}

function MaskVisual() {
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">MASK PIPELINE</span>
          <h2>Детекция, уточнение и мягкий край</h2>
        </div>
        <SearchCheck className="accent-icon" />
      </div>
      <FlowStrip
        active={['550', '115']}
        steps={[
          { id: '780', label: 'Resize', sub: '1920 × 1920' },
          { id: '550', label: 'Florence2', sub: 'detect classes' },
          { id: '114', label: 'Coordinates', sub: 'bbox → points' },
          { id: '115', label: 'SAM2', sub: 'multi-BBOX · objects ON' },
          { id: '144', label: 'Grow', sub: '+5 px' },
          { id: '146', label: 'Blur', sub: '10 · auto' },
          { id: '420', label: 'Crop', sub: 'person region' },
        ]}
      />
      <div className="mask-legend">
        <span><i className="mask-white" /> фигура остаётся</span>
        <span><i className="mask-black" /> фон исключается</span>
        <span><i className="mask-edge" /> feathered edge</span>
      </div>
    </div>
  );
}

function PreparationVisual() {
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">PREPARATION CHAIN</span>
          <h2>Cutout получает цвет окружения до paste</h2>
        </div>
        <Layers3 className="accent-icon" />
      </div>
      <div className="prep-layout">
        <div className="prep-stage">
          <span>01</span><strong>Crop</strong><small>420 → 781</small>
          <div className="tone-swatch raw" aria-hidden="true" />
        </div>
        <ArrowRight className="signal-arrow" />
        <div className="prep-stage">
          <span>02</span><strong>RemBg</strong><small>422 · Inspyrenet</small>
          <div className="tone-swatch clean" aria-hidden="true" />
        </div>
        <ArrowRight className="signal-arrow" />
        <div className="prep-stage featured">
          <span>03</span><strong>ColorMatch</strong><small>477 · effective 0.44</small>
          <div className="tone-swatch matched" aria-hidden="true" />
        </div>
        <ArrowRight className="signal-arrow" />
        <div className="prep-stage">
          <span>04</span><strong>Cut</strong><small>449 + mask 430</small>
          <div className="tone-swatch final" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function SelectorVisual() {
  return (
    <div className="visual-card selector-visual">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">LINKED CONTROL TREE</span>
          <h2>543 = 1 управляет четырьмя switches</h2>
        </div>
        <GitBranch className="accent-icon" />
      </div>
      <div className="selector-map">
        <div className="selector-master">
          <span>NODE 543</span>
          <strong>1 = FLUX</strong>
          <small>shared INT control</small>
        </div>
        <div className="selector-bus" aria-hidden="true" />
        <div className="selector-children">
          <div className="selector-child active">
            <span>459</span><strong>FLUX composite #672</strong><small>→ return 573</small>
          </div>
          <div className="selector-child active">
            <span>522</span><strong>raw SAM mask #524</strong><small>→ preview 508</small>
          </div>
          <div className="selector-child active">
            <span>552</span><strong>PPL FLUX #829</strong><small>→ resize 780 / crop 503</small>
          </div>
          <div className="selector-child nested">
            <span>715 · RETURN / DOWNSTREAM</span><strong>outputs BASE #79</strong><small>→ image2 of 552 · ignored now</small>
          </div>
        </div>
      </div>
      <div className="nested-note">
        <span className="logic-pill">NESTED SWITCH</span>
        <p>
          При mode 1 node 552 выбирает свой image1 #829, поэтому output 715 не участвует. При
          mode 2 оба switches выбирают второй вход, и 715 передаёт SDXL decode #14 в 552.
        </p>
      </div>
    </div>
  );
}

function CompositeVisual() {
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">COMPOSITING</span>
          <h2>Два маршрута сходятся в selector 459</h2>
        </div>
        <Layers3 className="accent-icon" />
      </div>
      <div className="composite-map">
        <div className="composite-lane active">
          <div className="lane-title"><span>MODE 1</span><strong>FLUX person</strong></div>
          <div className="lane-flow">477 <b>Color</b> → 449 <b>Cut</b> → 429 <b>Paste</b> → <mark>672</mark></div>
        </div>
        <div className="composite-merge">
          <span>459</span>
          <strong>PPL Switch</strong>
          <small>current: image1</small>
        </div>
        <div className="composite-lane">
          <div className="lane-title"><span>MODE 2</span><strong>Input / 3D inpaint</strong></div>
          <div className="lane-flow">503/504 <b>Cut</b> → 494–496 <b>Inpaint</b> → 509 → <mark>685</mark></div>
        </div>
      </div>
      <FlowStrip
        active={['459', '53', '730']}
        steps={[
          { id: '459', label: 'Selected PPL' },
          { id: '573', label: 'Detail transfer', sub: 'blend 0.09' },
          { id: '67', label: 'VAE Encode' },
          { id: '57', label: 'Main FLUX' },
          { id: '53', label: 'Decode' },
          { id: '730', label: 'LQ Save', sub: 'active output' },
        ]}
      />
    </div>
  );
}

function DiagnosticsVisual() {
  const probes = [
    ['409', 'Generate', 'raw PPL decode'],
    ['113', 'Detect', 'Florence2 preview'],
    ['507 / 508', 'Crop', 'source + mask'],
    ['480', 'Composite', 'MASK / PPL'],
    ['730', 'Current final', 'decode 53'],
  ];
  return (
    <div className="visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">FIVE-PROBE TEST</span>
          <h2>Последний правильный preview задаёт следующую проверку</h2>
        </div>
        <SearchCheck className="accent-icon" />
      </div>
      <div className="probe-line">
        {probes.map(([node, label, sub], index) => (
          <div className="probe-step" key={node}>
            <div className="probe-dot">{index + 1}</div>
            <span>{node}</span>
            <strong>{label}</strong>
            <small>{sub}</small>
          </div>
        ))}
      </div>
      <p className="diagnostic-rule">
        Если этап N корректен, не возвращайся к prompt: проверяй соединение и параметры этапа N+1.
      </p>
    </div>
  );
}

function ChecklistPanel() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const saved =
      window.localStorage.getItem('epspoziciya-manual-checklist') ??
      window.localStorage.getItem('ppl-manual-checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) queueMicrotask(() => setChecked(parsed));
      } catch {
        // Ignore malformed device-local state.
      }
    }
  }, []);

  useEffect(() => {
    type WebMCPContext = {
      registerTool: (
        tool: {
          name: string;
          title: string;
          description: string;
          inputSchema: object;
          annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
          execute: (input: unknown) => unknown;
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
    const context = (document as Document & { modelContext?: WebMCPContext }).modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const validIds = new Set(diagnosticChecklist.map((item) => item.id));
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'set_epspoziciya_workflow_checklist',
            title: 'Обновить EPSPOZICIYA workflow checklist',
            description:
              'Заменяет отмеченные пункты диагностического чек-листа на видимой странице. Передайте массив ID; пустой массив сбрасывает прогресс.',
            inputSchema: {
              type: 'object',
              properties: {
                completedIds: {
                  type: 'array',
                  items: { type: 'string', enum: [...validIds] },
                  uniqueItems: true,
                },
              },
              required: ['completedIds'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input) {
              const value = input as { completedIds?: unknown };
              if (!Array.isArray(value.completedIds)) {
                throw new Error('completedIds must be an array');
              }
              if (
                value.completedIds.some(
                  (id) => typeof id !== 'string' || !validIds.has(id),
                )
              ) {
                throw new Error('completedIds contains an unknown checklist id');
              }
              const next = [...new Set(value.completedIds as string[])];
              setChecked(next);
              window.localStorage.setItem('epspoziciya-manual-checklist', JSON.stringify(next));
              return {
                completedIds: next,
                completedCount: next.length,
                totalCount: diagnosticChecklist.length,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => undefined);
    } catch {
      // WebMCP is optional and unsupported browsers keep the visible checklist.
    }
    return () => lifecycle.abort();
  }, []);

  const percent = Math.round((checked.length / diagnosticChecklist.length) * 100);

  function update(id: string, value: boolean) {
    const next = value ? [...new Set([...checked, id])] : checked.filter((item) => item !== id);
    setChecked(next);
    window.localStorage.setItem('epspoziciya-manual-checklist', JSON.stringify(next));
  }

  function reset() {
    setChecked([]);
    window.localStorage.removeItem('epspoziciya-manual-checklist');
    window.localStorage.removeItem('ppl-manual-checklist');
  }

  return (
    <div className="visual-card checklist-card">
      <div className="checklist-progress">
        <div>
          <span className="micro-label">LOCAL CHECKLIST</span>
          <h2>{checked.length} из {diagnosticChecklist.length} проверок</h2>
        </div>
        <Button variant="outline" onClick={reset}>
          <RotateCcw /> Сбросить
        </Button>
      </div>
      <Progress value={percent} className="manual-progress">
        <ProgressLabel>Готовность workflow</ProgressLabel>
        <span className="progress-value">{percent}%</span>
      </Progress>
      <div className="checklist-list">
        {diagnosticChecklist.map((item, index) => {
          const done = checked.includes(item.id);
          return (
            <label className={`check-row ${done ? 'done' : ''}`} key={item.id}>
              <Checkbox
                checked={done}
                onCheckedChange={(value) => update(item.id, value === true)}
              />
              <span className="check-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="check-copy">
                <strong>{item.label}</strong>
                <small>{item.evidence}</small>
              </span>
              {done && <Check size={18} className="check-done-icon" />}
            </label>
          );
        })}
      </div>
      <p className="storage-note">
        Состояние сохраняется в localStorage этого браузера. Workflow и файлы ComfyUI не изменяются.
      </p>
    </div>
  );
}

function ResourcesVisual() {
  const graphMaps = [
    {
      title: 'HANSEN_MASTER_MAP.svg',
      href: `${sourceRoot}/HANSEN_MASTER_MAP.svg`,
      alt: 'Graphviz-карта полной архитектуры Epspoziciya Archviz workflow',
      meta: 'FULL WORKFLOW · 252 NODES',
    },
    {
      title: 'PEOPLE_PPL_ROUTE.svg',
      href: `${sourceRoot}/PEOPLE_PPL_ROUTE.svg`,
      alt: 'Graphviz-карта PEOPLE / PPL route',
      meta: 'MODULE DETAIL · PEOPLE / PPL',
    },
  ];

  return (
    <div className="resources-stack">
      <section className="resource-block">
        <div className="resource-heading">
          <div><span className="micro-label">OFFICIAL / UPSTREAM</span><h2>Проекты</h2></div>
          <ExternalLink className="accent-icon" />
        </div>
        <div className="resource-grid">
          {upstreamResources.map((resource) => (
            <a
              className={`resource-card ${resource.warning ? 'warning' : ''}`}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              key={resource.href}
            >
              <span className="resource-icon"><ExternalLink size={17} /></span>
              <span className="resource-copy">
                <small>{resource.meta}</small>
                <strong>{resource.title}</strong>
                <p>{resource.description}</p>
              </span>
              <ArrowRight size={17} />
            </a>
          ))}
        </div>
      </section>
      <section className="resource-block">
        <div className="resource-heading">
          <div><span className="micro-label">LOCAL DOWNLOADS</span><h2>Файлы из техархива</h2></div>
          <FileArchive className="accent-icon" />
        </div>
        <div className="download-grid">
          {downloadResources.map((resource) => (
            <a className="download-card" href={withBasePath(resource.href)} download key={resource.href}>
              <FileCode2 size={20} />
              <span>
                <small>{resource.meta}</small>
                <strong>{resource.title}</strong>
                <p>{resource.description}</p>
              </span>
              <Download size={17} />
            </a>
          ))}
        </div>
      </section>
      <div className="graph-map-stack">
        {graphMaps.map((map) => (
          <section className="map-preview" key={map.href}>
            <div className="resource-heading">
              <div><span className="micro-label">{map.meta}</span><h2>{map.title}</h2></div>
              <a href={withBasePath(map.href)} target="_blank" rel="noreferrer">
                Открыть SVG <ExternalLink size={15} />
              </a>
            </div>
            <div className="svg-frame">
              <Image
                src={withBasePath(map.href)}
                alt={map.alt}
                width={1600}
                height={900}
                unoptimized
              />
            </div>
          </section>
        ))}
      </div>
      <LegacyInfographicDownloads />
    </div>
  );
}

function ChapterVisual({ chapter }: { chapter: Chapter }) {
  if (hasFullGraphVisual(chapter.slug)) {
    return <FullGraphVisual slug={chapter.slug} />;
  }

  if (chapter.slug === 'people-ppl-overview') {
    return <OverviewVisual />;
  }

  switch (chapter.visual) {
    case 'prompt':
      return <PromptVisual />;
    case 'generation':
      return <GenerationVisual />;
    case 'mask':
      return <MaskVisual />;
    case 'preparation':
      return <PreparationVisual />;
    case 'selectors':
      return <SelectorVisual />;
    case 'composite':
      return <CompositeVisual />;
    case 'diagnostics':
      return <DiagnosticsVisual />;
    case 'checklist':
      return <ChecklistPanel />;
    case 'output':
      return <OutputVisual />;
    case 'examples':
      return <ReactInfographicAtlas />;
    case 'resources':
      return <ResourcesVisual />;
  }
}

function ArticleSections({ chapter }: { chapter: Chapter }) {
  return (
    <div className="article-sections">
      {chapter.sections.map((section) => (
        <section className="manual-section" id={section.id} key={section.id}>
          <header className="manual-section-head">
            {section.eyebrow && <span className="micro-label">{section.eyebrow}</span>}
            <h2>{section.title}</h2>
          </header>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul className="manual-list">
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
          {section.facts && (
            <div className="fact-grid">
              {section.facts.map((fact) => (
                <article className={`fact-card ${fact.status}`} key={`${fact.title}-${fact.text}`}>
                  <EvidenceBadge status={fact.status} compact />
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </article>
              ))}
            </div>
          )}
          {section.table && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>{section.table.columns.map((column) => <th key={column}>{column}</th>)}</tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIndex) => (
                    <tr key={`${section.id}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`} data-label={section.table?.columns[cellIndex]}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {section.codeExamples && (
            <Accordion className="code-accordion">
              {section.codeExamples.map((example, index) => (
                <AccordionItem value={`${section.id}-${index}`} key={example.title}>
                  <AccordionTrigger className="code-trigger">
                    <span><small>{example.label}</small><strong>{example.title}</strong></span>
                  </AccordionTrigger>
                  <AccordionContent className="code-content">
                    <pre><code>{example.code}</code></pre>
                    {example.note && <p className="code-note">{example.note}</p>}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>
      ))}
    </div>
  );
}

// Full-document links are intentional: GitHub Pages serves the exported HTML files,
// while Vinext's client-side RSC navigation requires a runtime endpoint.
const categoryLabels: Record<ManualCategory, string> = {
  'workflow-engineering': 'WORKFLOW ENGINEERING',
  foundation: 'FOUNDATION',
  'base-generation': 'BASE GENERATION',
  'people-ppl': 'PEOPLE / PPL · MODULE',
  'final-pipeline': 'FINAL PIPELINE',
  'evidence-reference': 'EVIDENCE & REFERENCE',
};

const categoryOrder = Object.keys(categoryLabels) as ManualCategory[];

function SideNavigation({ activeSlug }: { activeSlug: string }) {
  return (
    <Sidebar className="manual-sidebar" collapsible="offcanvas">
      <SidebarHeader className="manual-sidebar-header">
        <a className="brand" href={withBasePath('/overview')}>
          <span className="brand-mark">EPS</span>
          <span className="brand-copy">
            <strong>EPSPOZICIYA ARCHVIZ</strong>
            <small>Technical workflow manual</small>
          </span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        {categoryOrder.map((category) => (
          <SidebarGroup className="manual-sidebar-category" key={category}>
            <SidebarGroupLabel className="manual-sidebar-label">
              {categoryLabels[category]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {manualChapters.filter((item) => item.category === category).map((item) => (
                  <SidebarMenuItem key={item.slug}>
                    <SidebarMenuButton
                      className="manual-menu-button"
                      isActive={item.slug === activeSlug}
                      render={<a href={withBasePath(`/${item.slug}`)} aria-label={item.navTitle} />}
                    >
                      <span className="menu-index">{String(item.index).padStart(2, '0')}</span>
                      <span>{item.navTitle}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="manual-sidebar-footer">
        <div className="source-card">
          <span className="micro-label">SOURCE OF TRUTH</span>
          <strong>252 nodes · 341 links</strong>
          <p>Epspoziciya_archviz_ph_sdxlflux_v001.json</p>
          <a href={withBasePath('/resources')}>
            Исходные файлы <ArrowRight size={14} />
          </a>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function PageRail({ chapter }: { chapter: Chapter }) {
  return (
    <aside className="page-rail">
      <div className="page-rail-card">
        <span className="micro-label">ON THIS PAGE</span>
        <nav>
          {chapter.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>{section.title}</a>
          ))}
        </nav>
      </div>
      <div className="page-rail-card legend">
        <span className="micro-label">EVIDENCE</span>
        {(Object.keys(statusCopy) as EvidenceStatus[]).map((status) => (
          <div key={status}>
            <EvidenceBadge status={status} compact />
            <small>{statusCopy[status].short}</small>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function ManualPage({ chapter }: { chapter: Chapter }) {
  const pageIndex = manualChapters.findIndex((item) => item.slug === chapter.slug);
  const previous = pageIndex > 0 ? manualChapters[pageIndex - 1] : undefined;
  const next = pageIndex < manualChapters.length - 1 ? manualChapters[pageIndex + 1] : undefined;
  const pageProgress = useMemo(
    () => Math.round(((pageIndex + 1) / manualChapters.length) * 100),
    [pageIndex],
  );

  return (
    <SidebarProvider className="manual-app" style={{ '--sidebar-width': '17.25rem' } as React.CSSProperties}>
      <SideNavigation activeSlug={chapter.slug} />
      <SidebarInset className="manual-inset">
        <header className="manual-topbar">
          <div className="topbar-left">
            <SidebarTrigger className="sidebar-trigger" />
            <a className="mobile-brand" href={withBasePath('/overview')}><span>EPS</span> Technical Manual</a>
          </div>
          <div className="topbar-progress" aria-label={`Раздел ${pageIndex + 1} из ${manualChapters.length}`}>
            <span>{String(pageIndex + 1).padStart(2, '0')} / {manualChapters.length}</span>
            <i><b style={{ width: `${pageProgress}%` }} /></i>
          </div>
          <div className="topbar-actions">
            <a className="topbar-resource-link" href={withBasePath('/resources')}><FileArchive size={16} /> Файлы</a>
            <ThemeToggle />
          </div>
        </header>

        <div className="manual-page-grid">
          <article className="manual-article">
            <Breadcrumb className="manual-breadcrumb">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink render={<a href={withBasePath('/overview')} aria-label="Epspoziciya Archviz" />}>Epspoziciya Archviz</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink render={<a href={withBasePath(`/${chapter.slug}`)} aria-label={categoryLabels[chapter.category]} />}>{categoryLabels[chapter.category]}</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{chapter.navTitle}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <header className="chapter-hero">
              <div className="chapter-number">{String(chapter.index).padStart(2, '0')}</div>
              <div className="chapter-title-block">
                <div className="chapter-eyebrow">{chapter.eyebrow}</div>
                <h1>{chapter.title}</h1>
                <p>{chapter.lede}</p>
                <div className="chapter-evidence">
                  <EvidenceBadge status={chapter.status} />
                  <span>{chapter.statusNote}</span>
                </div>
              </div>
            </header>

            <ChapterVisual chapter={chapter} />

            <ArticleSections chapter={chapter} />

            {chapter.slug === 'node-index' && <ManualNodeIndex />}

            {chapter.slug === 'resources' && (
              <section className="evidence-gallery">
                <header className="manual-section-head">
                  <span className="micro-label">BUILD EVIDENCE</span>
                  <h2>Подтверждение source package</h2>
                </header>
                <div className="evidence-images">
                  <a href={withBasePath('/assets/evidence/build-summary-252-nodes.png')} target="_blank" rel="noreferrer">
                    <Image
                      src={withBasePath('/assets/evidence/build-summary-252-nodes.png')}
                      alt="Сводка исходного пакета: 252 nodes, 341 links, 28 controls, 22 файла до errata и manifest"
                      width={986}
                      height={743}
                      loading="lazy"
                      unoptimized
                    />
                    <span>Original audit: 22 files · current bundle: 24</span>
                  </a>
                  <a href={withBasePath('/assets/evidence/source-of-truth-confirmation.png')} target="_blank" rel="noreferrer">
                    <Image
                      src={withBasePath('/assets/evidence/source-of-truth-confirmation.png')}
                      alt="Подтверждение source of truth workflow"
                      width={993}
                      height={743}
                      loading="lazy"
                      unoptimized
                    />
                    <span>Source-of-truth confirmation</span>
                  </a>
                </div>
              </section>
            )}

            <nav className="chapter-navigation" aria-label="Переход между разделами">
              {previous ? (
                <a className="chapter-nav-link previous" href={withBasePath(`/${previous.slug}`)}>
                  <ArrowLeft />
                  <span><small>PREVIOUS</small><strong>{previous.navTitle}</strong></span>
                </a>
              ) : <span />}
              {next ? (
                <a className="chapter-nav-link next" href={withBasePath(`/${next.slug}`)}>
                  <span><small>NEXT</small><strong>{next.navTitle}</strong></span>
                  <ArrowRight />
                </a>
              ) : (
                <a className="chapter-nav-link next" href={withBasePath('/overview')}>
                  <span><small>BACK TO</small><strong>Overview</strong></span>
                  <Workflow />
                </a>
              )}
            </nav>
          </article>
          <PageRail chapter={chapter} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
