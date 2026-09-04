'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  CircleAlert,
  Copy,
  Eye,
  FileImage,
  FolderOpen,
  GitBranch,
  ImageIcon,
  Layers3,
  MapPin,
  Move,
  Save,
  SearchCheck,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import {
  branchPurposes,
  diagnosticOrder,
  failurePoints,
  keyPeopleNodes,
  overviewPipeline,
  preparationCriteria,
  stageQualityRows,
} from '@/lib/infographic-data';
import {
  legacyInfographics,
  outputComparers,
  outputExampleAssets,
  outputPreviewGroups,
  outputSaveProfiles,
} from '@/lib/output-data';
import type { EvidenceStatus } from '@/lib/manual-data';
import { withBasePath } from '@/lib/site-path';

const evidenceLabels: Record<EvidenceStatus, string> = {
  confirmed: 'CONFIRMED',
  inferred: 'INFERRED',
  'not-confirmed': 'NOT CONFIRMED',
};

function StatusPill({ status }: { status: EvidenceStatus }) {
  return <span className={`native-status ${status}`}>{evidenceLabels[status]}</span>;
}

function BlockHeading({
  index,
  title,
  icon,
}: {
  index: string;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <header className="native-block-heading">
      <span className="native-block-index">{icon ?? index}</span>
      <div>
        <small>{index}</small>
        <h3>{title}</h3>
      </div>
    </header>
  );
}

function NativePipeline({
  steps,
  compact = false,
}: {
  steps: readonly (readonly [string, string])[];
  compact?: boolean;
}) {
  return (
    <div className={`native-pipeline ${compact ? 'compact' : ''}`}>
      {steps.map(([node, label], index) => (
        <div className="native-pipeline-piece" key={`${node}-${label}`}>
          <div className="native-pipeline-node" style={{ '--native-step': index } as React.CSSProperties}>
            <span>{node}</span>
            <strong>{label}</strong>
          </div>
          {index < steps.length - 1 && <ArrowRight className="native-pipeline-arrow" size={18} />}
        </div>
      ))}
    </div>
  );
}

function OutputExampleGallery({ compact = false }: { compact?: boolean }) {
  if (!outputExampleAssets.length) {
    return (
      <div className="native-empty-gallery">
        <ImageIcon size={22} />
        <div>
          <strong>Отдельные render-файлы не найдены в source package</strong>
          <p>
            Полноформатные session infographics сохранены в Resources. Они не используются как
            интерфейс: весь текст и все схемы этой страницы уже пересобраны в React.
          </p>
        </div>
        <StatusPill status="not-confirmed" />
      </div>
    );
  }

  const assets = compact ? outputExampleAssets.slice(0, 4) : outputExampleAssets;
  return (
    <div className={`output-example-grid ${compact ? 'compact' : ''}`}>
      {assets.map((asset, index) => (
        <article className="output-example-card" key={asset.id}>
          <div className="output-example-image">
            <Image
              src={withBasePath(asset.src)}
              alt={asset.alt}
              width={960}
              height={720}
              loading="lazy"
              unoptimized
            />
            <span className="output-example-order">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className="output-example-copy">
            <div className="output-example-topline">
              <span>{asset.stage}</span>
              <StatusPill status={asset.status} />
            </div>
            <strong>{asset.caption}</strong>
            {asset.node && <small>Node / stage: {asset.node}</small>}
            <details>
              <summary>Пути к файлу</summary>
              <dl>
                <div><dt>TEMP source</dt><dd>{asset.sourcePath}</dd></div>
                <div><dt>Static project</dt><dd>{asset.projectPath}</dd></div>
              </dl>
            </details>
          </div>
        </article>
      ))}
    </div>
  );
}

function AtlasSheet({
  page,
  eyebrow,
  title,
  children,
}: {
  page: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="atlas-sheet">
      <header className="atlas-sheet-head">
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <strong>{page}</strong>
      </header>
      {children}
    </section>
  );
}

function BranchOverviewSheet() {
  return (
    <AtlasSheet page="01 / 03" eyebrow="REACT REBUILD" title="Полный разбор ветки">
      <div className="atlas-grid two">
        <article className="atlas-block">
          <BlockHeading index="01" title="Что делает ветка" icon={<Workflow size={19} />} />
          <ul className="native-check-list">
            {branchPurposes.map((item) => <li key={item}><Check size={15} />{item}</li>)}
          </ul>
        </article>
        <article className="atlas-block">
          <BlockHeading index="02" title="Ключевые nodes" icon={<GitBranch size={19} />} />
          <div className="key-node-stack">
            {keyPeopleNodes.map((item) => (
              <div className="key-node-card" key={item.node}>
                <span>{item.node}</span>
                <div><strong>{item.title}</strong><small>{item.text}</small></div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="atlas-block wide">
        <BlockHeading index="03" title="Общая логика прохождения сигнала" icon={<Zap size={19} />} />
        <NativePipeline steps={overviewPipeline} />
      </article>

      <div className="atlas-grid location-row">
        <article className="atlas-callout">
          <MapPin size={20} />
          <div>
            <span>04 · ГДЕ НАХОДИТСЯ ВЕТКА</span>
            <strong>Вспомогательный pipeline внутри общего workflow</strong>
            <p>Он работает поверх изображения сцены и возвращает composite до активного output 730.</p>
          </div>
        </article>
        <article className="atlas-callout warning">
          <CircleAlert size={20} />
          <div>
            <span>DIAGNOSTIC RULE</span>
            <strong>Есть люди в preview, но нет в output?</strong>
            <p>После generation проверяй mask, position, 543 / 459, return 573 и decode 53.</p>
          </div>
        </article>
      </div>

      <article className="atlas-block wide">
        <BlockHeading index="05" title="Мини-пример: четыре логические стадии" icon={<ImageIcon size={19} />} />
        <div className="stage-example-strip">
          <div><span>01</span><Layers3 size={24} /><strong>Сцена без людей</strong><small>reference / base image</small></div>
          <ArrowRight size={18} />
          <div><span>02</span><Users size={24} /><strong>Люди созданы</strong><small>VAEDecode 829</small></div>
          <ArrowRight size={18} />
          <div className="mask"><span>03</span><SearchCheck size={24} /><strong>Маска готова</strong><small>node 146</small></div>
          <ArrowRight size={18} />
          <div><span>04</span><Workflow size={24} /><strong>Composite</strong><small>459 → 573 → 53</small></div>
        </div>
        <div className="stage-output-evidence">
          <span>PROJECT OUTPUT REFERENCES · НЕ ПАРА ДО / ПОСЛЕ</span>
          <OutputExampleGallery compact />
        </div>
      </article>
    </AtlasSheet>
  );
}

function BlocksAndRolesSheet() {
  const brief = [
    ['Тип', 'кто находится в сцене'],
    ['Одежда', 'эпоха, цвет, материал'],
    ['Поза', 'walking / standing / candid'],
    ['Взгляд', 'направление и взаимодействие'],
    ['Дистанция', 'small / medium scale'],
    ['Сцена', 'архитектура, свет, настроение'],
  ];
  return (
    <AtlasSheet page="02 / 03" eyebrow="REACT REBUILD" title="Блоки и их роль">
      <div className="atlas-grid two">
        <article className="atlas-block">
          <BlockHeading index="01" title="PROMPT PPL FLUX · node 408" />
          <div className="prompt-brief-grid">
            {brief.map(([label, text]) => (
              <div key={label}><span>{label}</span><strong>{text}</strong></div>
            ))}
          </div>
          <blockquote className="native-prompt-example">
            <StatusPill status="inferred" />
            <code>man, woman, museum visitors, neutral clothes, walking, medium distance</code>
          </blockquote>
        </article>
        <article className="atlas-block generation-outcome">
          <BlockHeading index="02" title="Генерация людей" icon={<Users size={19} />} />
          <p>Ожидаемый результат — отдельная фигура или группа без архитектурного фона.</p>
          <div className="outcome-metrics">
            <span><Check size={15} />читаемый силуэт</span>
            <span><Check size={15} />подходящий ракурс</span>
            <span><Check size={15} />полный рост</span>
            <span><Check size={15} />без явных артефактов</span>
          </div>
        </article>
      </div>

      <div className="atlas-grid two">
        <article className="atlas-block">
          <BlockHeading index="03" title="Сегментация / маска" icon={<SearchCheck size={19} />} />
          <div className="mask-transform-demo">
            <div><Users size={34} /><span>person image</span></div>
            <ArrowRight size={22} />
            <div className="mask-demo-result"><Users size={34} /><span>clean mask</span></div>
          </div>
          <ul className="inline-qa-list">
            <li>чистый контур</li><li>нет дыр</li><li>нет случайного фона</li>
          </ul>
        </article>
        <article className="atlas-block">
          <BlockHeading index="04" title="Подготовка к сцене" icon={<Move size={19} />} />
          <div className="criteria-stack">
            {preparationCriteria.map(([label, text]) => (
              <div key={label}><span>{label}</span><strong>{text}</strong></div>
            ))}
          </div>
        </article>
      </div>

      <div className="atlas-grid selector-and-matrix">
        <article className="atlas-block selector-summary">
          <BlockHeading index="05" title="Selector-логика" icon={<GitBranch size={19} />} />
          <div className="selector-summary-flow">
            <div><span>543</span><strong>PPL Selector</strong><small>выбирает mode</small></div>
            <ArrowRight size={18} />
            <div><span>459</span><strong>Composite</strong><small>выбирает result</small></div>
            <ArrowRight size={18} />
            <div><span>715 → 552</span><strong>Nested source</strong><small>downstream nuance</small></div>
          </div>
          <p className="native-warning-line"><CircleAlert size={16} />715 сохраняет пользовательскую метку Return / Downstream Selector, но topology ведёт его в image2 node 552.</p>
        </article>
        <article className="atlas-block stage-matrix-block">
          <BlockHeading index="06" title="Что должно быть видно на каждом этапе" />
          <table className="atlas-quality-table" aria-label="Проверка качества этапов PEOPLE / PPL">
            <thead>
              <tr className="atlas-quality-head">
                <th>Stage</th>
                <th>Ожидаемо</th>
                <th>Если сломано</th>
                <th>Что проверить</th>
              </tr>
            </thead>
            <tbody>
              {stageQualityRows.map((row) => (
                <tr className="atlas-quality-row" key={row.stage}>
                  <th scope="row">{row.stage}</th>
                  <td>{row.expected}</td>
                  <td>{row.broken}</td>
                  <td>{row.inspect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </AtlasSheet>
  );
}

function DiagnosticsSheet() {
  const quickTest = [
    ['408', 'Prompt'],
    ['409', 'Generate'],
    ['146', 'Mask'],
    ['480', 'Composite'],
    ['730', 'Return / output'],
  ] as const;
  const outcomes = [
    ['A', 'Люди не созданы', 'fail'],
    ['B', 'Люди созданы', 'pass'],
    ['C', 'Маска готова', 'pass'],
    ['D', 'Люди в output', 'pass'],
  ] as const;
  const checklist = [
    'PEOPLE / PPL branch активна.',
    'Node 408 содержит актуальный prompt.',
    'Node 543 направляет сигнал в нужную ветку.',
    'Mask чистая и закрывает фигуру.',
    'Position и scale соответствуют сцене.',
    'Composite 459 реально содержит людей.',
    'Save 730 записывает версию с людьми.',
  ];

  return (
    <AtlasSheet page="03 / 03" eyebrow="REACT REBUILD" title="Диагностика и чек-лист">
      <article className="atlas-block wide">
        <BlockHeading index="01" title="Типичные точки отказа" icon={<CircleAlert size={19} />} />
        <div className="failure-card-grid">
          {failurePoints.map(([number, title, text]) => (
            <div className="failure-card" key={number}>
              <span>{number}</span><strong>{title}</strong><p>{text}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="atlas-grid two diagnostic-pair">
        <article className="atlas-block">
          <BlockHeading index="02" title="Быстрый тест за 5 шагов" icon={<Check size={19} />} />
          <NativePipeline steps={quickTest} compact />
        </article>
        <article className="atlas-block">
          <BlockHeading index="03" title="Как читать результат" icon={<Eye size={19} />} />
          <div className="outcome-stepper">
            {outcomes.map(([letter, title, state]) => (
              <div className={state} key={letter}>
                <span>{letter}</span><strong>{title}</strong>{state === 'pass' ? <Check size={16} /> : <X size={16} />}
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="atlas-grid two">
        <article className="atlas-block">
          <BlockHeading index="04" title="Перед финальным render" />
          <ul className="native-preflight-list">
            {checklist.map((item) => <li key={item}><span />{item}</li>)}
          </ul>
        </article>
        <article className="atlas-conclusion">
          <span>05 · ГЛАВНЫЙ ВЫВОД</span>
          <blockquote>
            Если люди видны в промежуточных результатах, но отсутствуют в output, проблема обычно
            находится в routing, selector, positioning, composite или return stage.
          </blockquote>
          <StatusPill status="inferred" />
        </article>
      </div>

      <article className="atlas-block wide">
        <BlockHeading index="06" title="Рекомендуемый порядок отладки" icon={<Workflow size={19} />} />
        <NativePipeline steps={diagnosticOrder} />
      </article>
    </AtlasSheet>
  );
}

export function ReactInfographicAtlas() {
  return (
    <div className="native-atlas">
      <div className="native-atlas-intro">
        <div>
          <span>3 RASTER SHEETS → REACT</span>
          <h2>Инфографики пересобраны как живой интерфейс</h2>
          <p>DOM-текст, адаптивные сетки, доступные статусы и анимированные routes вместо длинных статичных PNG.</p>
        </div>
        <StatusPill status="confirmed" />
      </div>
      <BranchOverviewSheet />
      <BlocksAndRolesSheet />
      <DiagnosticsSheet />
    </div>
  );
}

function PathResolver() {
  const [root, setRoot] = useState('');
  const [copied, setCopied] = useState(false);
  const resolved = useMemo(() => {
    const cleaned = root.trim().replace(/[\\/]+$/, '');
    if (!cleaned) {
      return String.raw`<ACTIVE_COMFYUI_ROOT>\output\ph\<YYYY-MM-DD>\ph01_archviz_sdxl2flux_LQ1_....jpg`;
    }
    return `${cleaned}\\output\\ph\\<YYYY-MM-DD>\\ph01_archviz_sdxl2flux_LQ1_....jpg`;
  }, [root]);

  async function copyPath() {
    try {
      await navigator.clipboard.writeText(resolved);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="path-resolver">
      <div className="path-resolver-head">
        <div><span>OPTIONAL PATH BUILDER</span><strong>Подставить активный ComfyUI root</strong></div>
        <StatusPill status={root.trim() ? 'inferred' : 'not-confirmed'} />
      </div>
      <label>
        <span>ACTIVE_COMFYUI_ROOT</span>
        <input
          value={root}
          onChange={(event) => setRoot(event.target.value)}
          placeholder={String.raw`например: Q:\...\ComfyUI`}
          spellCheck={false}
        />
      </label>
      <div className="resolved-path">
        <code>{resolved}</code>
        <button type="button" onClick={copyPath} aria-label="Скопировать путь">
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? 'Скопировано' : 'Копировать'}
        </button>
      </div>
      <p>Значение остаётся только в браузере и не меняет workflow.</p>
    </div>
  );
}

export function OutputVisual() {
  return (
    <div className="output-visual-stack">
      <section className="visual-card output-route-card">
        <div className="visual-card-head">
          <div><span className="micro-label">CURRENT VS OPTIONAL</span><h2>Два уровня output</h2></div>
          <Save className="accent-icon" />
        </div>
        <div className="output-lanes">
          <div className="output-lane active">
            <div className="output-lane-head"><StatusPill status="confirmed" /><span>ACTIVE</span></div>
            <NativePipeline steps={[["459", "PPL result"], ["573", "Detail"], ["53", "Decode"], ["730", "LQ1 save"]] as const} compact />
            <p>Прямой JPG после main FLUX decode. Это первая точка проверки сохранённой конфигурации.</p>
          </div>
          <div className="output-lane bypassed">
            <div className="output-lane-head"><span className="bypass-pill">UPSTREAM BYPASS</span><span>OPTIONAL</span></div>
            <NativePipeline steps={[["53", "Decode"], ["833", "Upscale"], ["849", "Overlay"], ["531 / 293", "HQ / LQ2"]] as const} compact />
            <p>Save nodes существуют, но их upscale / overlay upstream сохранён в mode 4.</p>
          </div>
        </div>
      </section>

      <section className="visual-card save-profile-card">
        <div className="visual-card-head">
          <div><span className="micro-label">SAVE PROFILES</span><h2>Prefix, формат и состояние маршрута</h2></div>
          <FileImage className="accent-icon" />
        </div>
        <div className="save-profile-grid">
          {outputSaveProfiles.map((profile) => (
            <article className={profile.branchState === 'active' ? 'active' : 'bypassed'} key={profile.node}>
              <header><span>NODE {profile.node}</span><strong>{profile.label}</strong></header>
              <dl>
                <div><dt>upstream</dt><dd>{profile.upstream}</dd></div>
                <div><dt>folder</dt><dd>{profile.folderPattern}</dd></div>
                <div><dt>prefix</dt><dd>{profile.prefix}</dd></div>
                <div><dt>file</dt><dd>{profile.format.toUpperCase()} · {profile.dpi} dpi · Q{profile.quality}</dd></div>
              </dl>
              {profile.branchState === 'active' ? <span className="route-state active">active write path</span> : <span className="route-state bypassed">upstream bypassed</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="visual-card path-card">
        <div className="visual-card-head">
          <div><span className="micro-label">FILESYSTEM PATH</span><h2>Подтверждённая часть и полный шаблон</h2></div>
          <FolderOpen className="accent-icon" />
        </div>
        <div className="path-facts">
          <div><StatusPill status="confirmed" /><span>serialized subfolder</span><code>ph\[time(%Y-%m-%d)]</code></div>
          <div><StatusPill status="confirmed" /><span>active prefix</span><code>ph01_archviz_sdxl2flux_LQ1</code></div>
          <div><StatusPill status="not-confirmed" /><span>absolute root</span><code>не сохранён в workflow JSON</code></div>
        </div>
        <PathResolver />
      </section>

      <section className="visual-card comparer-card">
        <div className="visual-card-head">
          <div><span className="micro-label">COMPARERS</span><h2>Шесть точек визуального контроля</h2></div>
          <Eye className="accent-icon" />
        </div>
        <div className="comparer-grid">
          {outputComparers.map((item) => (
            <article className={item.availability} key={item.node}>
              <span>NODE {item.node}</span><strong>{item.label}</strong>
              <div><code>A · {item.a}</code><ArrowRight size={14} /><code>B · {item.b}</code></div>
              <small>{item.availability === 'current' ? 'current diagnostic' : 'after HQ enable'}</small>
            </article>
          ))}
        </div>
        <details className="preview-index">
          <summary><SearchCheck size={17} />Показать полный индекс PreviewImage</summary>
          <div>
            {outputPreviewGroups.map((group) => (
              <section key={group.label}><span>{group.label}</span><p>{group.nodes.join(' · ')}</p></section>
            ))}
          </div>
        </details>
      </section>

      <section className="visual-card output-assets-card">
        <div className="visual-card-head">
          <div><span className="micro-label">PROJECT EXAMPLES</span><h2>Ранее созданные изображения</h2></div>
          <ImageIcon className="accent-icon" />
        </div>
        <OutputExampleGallery />
        <div className="temp-path-note">
          <CircleAlert size={17} />
          <p>TEMP/cache source показывается для provenance. Сайт использует только устойчивую копию из <code>public/assets/output</code>.</p>
        </div>
      </section>

      <section className="visual-card image-filter-card">
        <div><span className="micro-label">NODE 779 · IMAGE FILTER</span><h2>Fan-out reference image</h2></div>
        <div className="image-filter-flow">
          <div><span>565</span><strong>upstream</strong></div><ArrowRight size={18} />
          <div className="filter-core"><span>779</span><strong>timeout 60 · send none</strong></div><ArrowRight size={18} />
          <div><span>7 consumers</span><strong>232 · 477 · 157 · 429 · 71 · 72 · 509</strong></div>
        </div>
        <p><StatusPill status="not-confirmed" /> Семантика внешнего receiver UUID не доказана сериализованным графом.</p>
      </section>
    </div>
  );
}

export function LegacyInfographicDownloads() {
  return (
    <section className="legacy-infographics">
      <div className="resource-heading">
        <div><span className="micro-label">PROVENANCE · ORIGINAL PNG</span><h2>Исходные инфографики сессии</h2></div>
        <Layers3 className="accent-icon" />
      </div>
      <p className="legacy-intro">Основной учебник пересобран в React. Эти raster-страницы оставлены только как исходный визуальный reference и доступны для скачивания.</p>
      <div className="legacy-download-grid">
        {legacyInfographics.map((asset) => (
          <a href={withBasePath(asset.src)} download key={asset.src}>
            <Image src={withBasePath(asset.src)} alt={asset.title} width={1055} height={1491} loading="lazy" unoptimized />
            <span><small>PAGE {asset.page}</small><strong>{asset.title}</strong><code>{asset.sourcePath}</code></span>
          </a>
        ))}
      </div>
    </section>
  );
}
