import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Cable,
  CircleAlert,
  Cpu,
  Database,
  FileImage,
  GitBranch,
  Layers3,
  ScanSearch,
  SlidersHorizontal,
  Sparkles,
  Workflow,
  ZoomIn,
} from 'lucide-react';

type NodeTone = 'active' | 'control' | 'conditional' | 'bypassed' | 'diagnostic';

type FlowNode = {
  id: string;
  label: string;
  detail?: string;
  tone?: NodeTone;
};

const fullGraphSlugs = new Set([
  'overview',
  'graph-reading',
  'inputs',
  'control-panel',
  'models-dependencies',
  'global-prompts',
  'sdxl',
  'controlnet',
  'ipadapter-lora',
  'segmentation-masks',
  'detail-conservation',
  'positioning',
  'ppl-mode-2-inpaint',
  'main-flux',
  'upscale-overlay',
  'node-index',
]);

export function hasFullGraphVisual(slug: string) {
  return fullGraphSlugs.has(slug);
}

function StatusPill({ tone, children }: { tone: NodeTone; children: React.ReactNode }) {
  return <span className={`graph-status ${tone}`}>{children}</span>;
}

function VisualShell({
  eyebrow,
  title,
  icon,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="visual-card graph-visual-card">
      <div className="visual-card-head">
        <div>
          <span className="micro-label">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <span className="graph-visual-icon">{icon}</span>
      </div>
      {children}
      {footer && <div className="graph-visual-footer">{footer}</div>}
    </div>
  );
}

function GraphFlow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <figure className="graph-flow" aria-label={nodes.map((node) => `${node.id} ${node.label}`).join(', затем ')}>
      {nodes.map((node, index) => (
        <div className="graph-flow-step" key={`${node.id}-${node.label}`}>
          <div className={`graph-node ${node.tone ?? 'active'}`}>
            <span>{node.id}</span>
            <strong>{node.label}</strong>
            {node.detail && <small>{node.detail}</small>}
          </div>
          {index < nodes.length - 1 && <ArrowRight className="graph-flow-arrow" aria-hidden="true" />}
        </div>
      ))}
    </figure>
  );
}

function MasterArchitectureVisual() {
  const stages: FlowNode[] = [
    { id: '79 / 783', label: 'Input + Resize', detail: 'BASE IMAGE · 1536', tone: 'active' },
    { id: '2 → 14', label: 'Main SDXL', detail: 'ControlNet + sampler', tone: 'active' },
    { id: '565 / 779', label: 'Detail bridge', detail: 'fan-out into analysis', tone: 'active' },
    { id: '408 → 459', label: 'PEOPLE / PPL', detail: 'generate · mask · composite', tone: 'conditional' },
    { id: '573 → 53', label: 'Main FLUX', detail: 'img2img refinement', tone: 'active' },
    { id: '730', label: 'Current LQ', detail: 'active save', tone: 'active' },
  ];
  return (
    <VisualShell
      eyebrow="FULL WORKFLOW · CURRENT PROFILE"
      title="Активный маршрут и сохранённое продолжение"
      icon={<Workflow />}
      footer={
        <>
          <StatusPill tone="active">227 MODE 0</StatusPill>
          <StatusPill tone="bypassed">25 MODE 4</StatusPill>
          <span>Mode 0 не гарантирует участие: selector может выбрать другой вход.</span>
        </>
      }
    >
      <GraphFlow nodes={stages} />
      <div className="graph-optional-lane">
        <span className="graph-lane-label">SAVED · BYPASSED</span>
        <GraphFlow
          nodes={[
            { id: '53', label: 'FLUX decode', tone: 'active' },
            { id: '834 / 833', label: 'Detail + Upscale', tone: 'bypassed' },
            { id: '848 / 849', label: 'Logo overlays', tone: 'bypassed' },
            { id: '531 / 293 / 15', label: 'HQ · LQ2 · Preview', tone: 'diagnostic' },
          ]}
        />
      </div>
    </VisualShell>
  );
}

function GraphReadingVisual() {
  const signals = [
    ['IMAGE', '126 links', 'active'],
    ['INT', '55 links', 'control'],
    ['STRING', '26 links', 'control'],
    ['MASK', '23 links', 'conditional'],
    ['CONDITIONING', '15 links', 'active'],
    ['MODEL', '13 links', 'active'],
    ['FLOAT', '11 links', 'control'],
    ['LATENT', '10 links', 'active'],
  ] as const;
  return (
    <VisualShell
      eyebrow="341 LINKS · DATA + CONTROL PLANE"
      title="Тип сигнала объясняет, что именно движется по графу"
      icon={<Cable />}
      footer={<span>Linked input имеет приоритет над сохранённым widget value.</span>}
    >
      <div className="signal-type-grid">
        {signals.map(([name, count, tone]) => (
          <div className={`signal-type-card ${tone}`} key={name}>
            <span>{name}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
      <div className="override-demo">
        <div><small>VISIBLE WIDGET</small><strong>715 = 2</strong></div>
        <ArrowRight />
        <div className="control"><small>LINKED CONTROL</small><strong>543 = 1</strong></div>
        <ArrowRight />
        <div className="result"><small>EFFECTIVE VALUE</small><strong>input 1</strong></div>
      </div>
    </VisualShell>
  );
}

function InputsVisual() {
  const inputs = [
    ['79', 'V_1_di.jpg', 'BASE IMAGE', 'required'],
    ['25', 'V_1_d.jpg', 'External depth', 'conditional'],
    ['41 / 42', 'reference .jfif', 'IPAdapter refs', 'selected away'],
    ['338', 'V_1_g.jpg', 'RGB mask atlas', 'conditional'],
    ['301', 'logo.png', 'Logo overlay', 'bypassed'],
    ['309', 'overlay image', 'Second overlay', 'bypassed'],
  ];
  return (
    <VisualShell
      eyebrow="INPUT CONTRACTS"
      title="Один обязательный вход и пять режимных источников"
      icon={<FileImage />}
      footer={<span>Факт наличия файлов на активной машине workflow JSON не подтверждает.</span>}
    >
      <div className="input-contract-grid">
        {inputs.map(([id, file, role, state]) => (
          <article key={id}>
            <span>NODE {id}</span>
            <strong>{file}</strong>
            <p>{role}</p>
            <small>{state}</small>
          </article>
        ))}
      </div>
      <GraphFlow
        nodes={[
          { id: '702', label: 'Resize target', detail: '1536', tone: 'control' },
          { id: '783', label: 'Shared canvas', detail: 'image + W/H', tone: 'active' },
          { id: '3 / 64 / 775', label: 'Consumers', detail: 'SDXL · FLUX · detail', tone: 'conditional' },
        ]}
      />
    </VisualShell>
  );
}

function ControlPanelVisual() {
  const controls = [
    ['541', 'Generation', 'TXT+CNET2IMG', '1'],
    ['456', 'ControlNet source', 'EXTRA', '1'],
    ['168', 'SDXL model', 'plain SDXL', '1'],
    ['453', 'FLUX prompt', 'GLOBAL', '1'],
    ['543', 'PEOPLE source', 'FLUX', '1'],
    ['693', 'Canvas', 'RESIZED', '1'],
    ['702', 'Resolution', '1536', '—'],
    ['771', 'Shared steps', '24', '—'],
  ];
  return (
    <VisualShell
      eyebrow="28 CONTROLS · LINKED VALUES"
      title="Текущий профиль управляет несколькими стадиями сразу"
      icon={<SlidersHorizontal />}
      footer={<span>Presets — документация. Они не отправляют команды в ComfyUI.</span>}
    >
      <div className="control-matrix">
        {controls.map(([id, label, value, mode]) => (
          <div key={id}>
            <span>{id}</span>
            <strong>{label}</strong>
            <small>{value}</small>
            <b>{mode === '—' ? 'VALUE' : `MODE ${mode}`}</b>
          </div>
        ))}
      </div>
      <div className="control-bus">
        <div><span>771</span><strong>24 steps</strong></div>
        <ArrowRight />
        <div className="control-bus-targets">59 MAIN FLUX · 498 INPAINT · 819 PPL · 833 UPSCALE</div>
      </div>
    </VisualShell>
  );
}

function ModelsVisual() {
  const stacks = [
    ['SDXL', '2', 'RealVisXL_V4.0.safetensors'],
    ['CONTROLNET', '21 / 23', 'depth + canny SDXL'],
    ['FLUX', '467 / 466 / 54', 'flux1-dev Q8 · T5/CLIP · ae'],
    ['SEGMENT', '112 / 107 / 234', 'Florence2 · SAM2 single/auto'],
    ['IPADAPTER', '12 / 13', 'CLIP Vision · IPAdapter SDXL'],
    ['UPSCALE', '153', '4x-UltraSharp.pth'],
  ];
  return (
    <VisualShell
      eyebrow="MODEL LOADERS · SERIALIZED INVENTORY"
      title="Модели распределены по шести функциональным слоям"
      icon={<Database />}
      footer={<span>Filename подтверждён; наличие, лицензия и runtime compatibility требуют отдельной проверки.</span>}
    >
      <div className="model-manifest-grid">
        {stacks.map(([stage, nodes, model]) => (
          <article key={stage}>
            <span>{stage}</span>
            <strong>{model}</strong>
            <small>nodes {nodes}</small>
          </article>
        ))}
      </div>
    </VisualShell>
  );
}

function GlobalPromptsVisual() {
  return (
    <VisualShell
      eyebrow="GLOBAL TEXT ROUTING"
      title="Один prompt assembly обслуживает SDXL и main FLUX"
      icon={<GitBranch />}
      footer={<span>Environment 799 и Light/Style 800 также переиспользуются в PEOPLE prompt.</span>}
    >
      <div className="prompt-route-grid">
        <div className="prompt-route-sources">
          <article><span>797</span><strong>OBJECT</strong></article>
          <article><span>799</span><strong>ENVIRONMENT</strong></article>
          <article><span>800</span><strong>LIGHT / STYLE</strong></article>
          <article><span>801</span><strong>ADDITIONAL</strong></article>
        </div>
        <ArrowDown />
        <div className="prompt-assembly"><span>895 + 896 → 897</span><strong>GLOBAL POSITIVE STRING</strong></div>
        <ArrowDown />
        <div className="prompt-route-targets">
          <article><span>5</span><strong>SDXL positive</strong></article>
          <article><span>811</span><strong>FLUX GLOBAL</strong></article>
          <article><span>453</span><strong>GLOBAL / Florence2</strong></article>
        </div>
      </div>
      <div className="negative-route">591 DETAIL MASK + 802 IMAGE NEGATIVE + 803 GLOBAL NEGATIVE → 813 / 814 → node 6</div>
    </VisualShell>
  );
}

function SDXLVisual() {
  return (
    <VisualShell
      eyebrow="MAIN SDXL · CURRENT MODE 1"
      title="Базовая сцена создаётся до PEOPLE/PPL"
      icon={<Sparkles />}
      footer={<span>541=1 выбирает empty latent; denoise logic возвращает 1.0.</span>}
    >
      <GraphFlow
        nodes={[
          { id: '2 → 86/87', label: 'Model + CLIP', detail: 'RealVisXL · LoRA None', tone: 'active' },
          { id: '5 / 6', label: 'Conditioning', detail: 'positive + negative', tone: 'active' },
          { id: '417→419→418', label: 'ControlNet', detail: 'Depth then Canny', tone: 'active' },
          { id: '535', label: 'Latent source', detail: '3 empty / 536 img2img', tone: 'control' },
          { id: '1', label: 'KSampler', detail: '230 + 231 + 600', tone: 'active' },
          { id: '14', label: 'VAE Decode', detail: '→ 565 detail bridge', tone: 'active' },
        ]}
      />
      <div className="mode-compare-grid">
        <article className="active"><span>MODE 1 · CURRENT</span><strong>TXT + CNET2IMG</strong><small>empty latent · batch 4 · denoise 1.0</small></article>
        <article><span>MODE 2</span><strong>IMG + CNET2IMG</strong><small>VAEEncode 536 · denoise 0.3</small></article>
      </div>
    </VisualShell>
  );
}

function ControlNetVisual() {
  return (
    <VisualShell
      eyebrow="DEPTH + CANNY · SWITCH 456"
      title="Две карты сходятся в последовательный ControlNet stack"
      icon={<ScanSearch />}
      footer={
        <>
          <CircleAlert />
          <span>Errata: Canny input 1 идёт от 79 через 785, а не от node 25.</span>
        </>
      }
    >
      <div className="split-route-grid">
        <article>
          <header><span>DEPTH</span><strong>strength 0.36</strong></header>
          <div>25 → 784 → <b>542 input 1</b></div>
          <div>79 → 38 → <b>542 input 2</b></div>
          <small>model 21 · preview 39</small>
        </article>
        <article>
          <header><span>CANNY</span><strong>strength 0.31</strong></header>
          <div>79 → 785 → <b>732 input 1</b></div>
          <div>79 → 165 → <b>732 input 2</b></div>
          <small>model 23 · preview 167</small>
        </article>
      </div>
      <GraphFlow
        nodes={[
          { id: '542', label: 'Depth source', tone: 'control' },
          { id: '417', label: 'Depth stack', tone: 'active' },
          { id: '419', label: 'Canny stack', tone: 'active' },
          { id: '418', label: 'Apply to 5 / 6', tone: 'active' },
        ]}
      />
    </VisualShell>
  );
}

function IPAdapterVisual() {
  return (
    <VisualShell
      eyebrow="OPTIONAL STYLE REFERENCE · SELECTED AWAY"
      title="IPAdapter существует, но не влияет на текущий SDXL"
      icon={<Layers3 />}
      footer={<><StatusPill tone="conditional">168 = 1</StatusPill><StatusPill tone="bypassed">721 = 0</StatusPill><span>Все четыре LoRA slots в 87 равны None.</span></>}
    >
      <GraphFlow
        nodes={[
          { id: '41 / 42', label: 'Reference images', tone: 'conditional' },
          { id: '793 / 630', label: 'One or batch', tone: 'control' },
          { id: '9', label: 'CLIP prep', detail: 'LANCZOS · center', tone: 'conditional' },
          { id: '12 / 13', label: 'Vision + adapter', tone: 'conditional' },
          { id: '7', label: 'Style transfer', detail: 'V only', tone: 'conditional' },
          { id: '168', label: 'Model switch', detail: 'current: plain SDXL', tone: 'control' },
        ]}
      />
    </VisualShell>
  );
}

function SegmentationMasksVisual() {
  const systems = [
    ['PEOPLE', '550 → 114 → 115 → 144 → 146', 'person silhouette'],
    ['DETAIL', '591 → 580 → 584 → 585', 'building / facade'],
    ['AUTO SAM2', '234 → 232 → 233', 'diagnostic automask'],
    ['RGB ATLAS', '338 → 337 → 339…354', 'eight color channels'],
  ];
  return (
    <VisualShell
      eyebrow="FOUR MASK SYSTEMS"
      title="У каждой маски свой источник, polarity и consumer"
      icon={<Boxes />}
      footer={<span>Явного InvertMask нет; скрытая инверсия third-party nodes остаётся NOT CONFIRMED.</span>}
    >
      <div className="mask-system-grid">
        {systems.map(([name, route, purpose]) => (
          <article key={name}>
            <span>{name}</span>
            <strong>{route}</strong>
            <small>{purpose}</small>
          </article>
        ))}
      </div>
    </VisualShell>
  );
}

function DetailConservationVisual() {
  return (
    <VisualShell
      eyebrow="DETAIL CONSERVATION · STAGE 1 + 2"
      title="Одна architectural mask управляет двумя активными transfers"
      icon={<ZoomIn />}
      footer={<><StatusPill tone="control">720 = 0.09</StatusPill><span>Фактический визуальный эффект требует runtime comparison.</span></>}
    >
      <div className="detail-transfer-grid">
        <article>
          <span>STAGE 1 · NODE 565</span>
          <strong>SDXL decode 14 + selected base 592</strong>
          <small>mask 754 → Image Filter 779</small>
        </article>
        <article>
          <span>STAGE 2 · NODE 573</span>
          <strong>selected PEOPLE 459 + detail composite 775</strong>
          <small>mask 754 → VAEEncode 67</small>
        </article>
        <article className="bypassed">
          <span>STAGE 3 · NODE 834</span>
          <strong>post-FLUX detail transfer</strong>
          <small>mode 4 → upscale 833</small>
        </article>
      </div>
      <div className="fanout-map">
        <div><span>565</span><strong>DETAIL OUTPUT</strong></div>
        <ArrowRight />
        <div className="core"><span>779</span><strong>IMAGE FILTER</strong><small>timeout 60 · send none</small></div>
        <ArrowRight />
        <div><strong>232 · 477 · 157 · 429 · 71 · 72 · 509</strong><small>segmentation · color · caption · composite · QA</small></div>
      </div>
    </VisualShell>
  );
}

function PositioningVisual() {
  return (
    <VisualShell
      eyebrow="COORDINATE SPACE · PEOPLE INSERT"
      title="Размер, crop и canvas должны совпасть до Paste By Mask"
      icon={<ZoomIn />}
      footer={<span>Если generation и mask корректны, проверяй 780 → 420 → 781 → 449/429.</span>}
    >
      <GraphFlow
        nodes={[
          { id: '827 / 829', label: 'PPL canvas', detail: '1312 × 1920', tone: 'active' },
          { id: '552', label: 'People source', detail: 'linked from 543', tone: 'control' },
          { id: '780', label: 'Resize', detail: '1920 × 1920', tone: 'active' },
          { id: '420 / 781', label: 'Crop region', detail: 'mask bounds', tone: 'conditional' },
          { id: '449 / 429', label: 'Cut + Paste', detail: 'keep_ratio_fit', tone: 'active' },
        ]}
      />
      <div className="coordinate-check-grid">
        {['same image/mask size', 'correct mask bounds', 'person inside canvas', 'original/resized return'].map((item, index) => (
          <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
        ))}
      </div>
    </VisualShell>
  );
}

function PPLModeTwoVisual() {
  return (
    <VisualShell
      eyebrow="PEOPLE MODE 2 · ALTERNATIVE ROUTE"
      title="Component inpaint возвращает обработанные области в scene canvas"
      icon={<GitBranch />}
      footer={<><StatusPill tone="conditional">543 = 2</StatusPill><span>Источник, обозначенный как 3D rendered, остаётся NOT CONFIRMED.</span></>}
    >
      <GraphFlow
        nodes={[
          { id: '146 → 499', label: 'Mask components', tone: 'conditional' },
          { id: '502 → 504', label: 'Regions + crops', tone: 'conditional' },
          { id: '494 → 495', label: 'FLUX inpaint', detail: 'guidance + scheduler', tone: 'conditional' },
          { id: '496 → 510', label: 'Decode + mask', tone: 'conditional' },
          { id: '509', label: 'Paste return', tone: 'conditional' },
          { id: '684 → 685', label: 'Canvas restore', tone: 'control' },
          { id: '459', label: 'PPL switch', tone: 'control' },
        ]}
      />
      <div className="probe-pills"><span>507 SOURCE CROP</span><span>508 MASK SOURCE</span><span>518 BEFORE / AFTER</span></div>
    </VisualShell>
  );
}

function MainFluxVisual() {
  return (
    <VisualShell
      eyebrow="MAIN FLUX · IMG2IMG REFINEMENT"
      title="PEOPLE возвращается в latent до финального FLUX decode"
      icon={<Cpu />}
      footer={<span>Negative encoder 138 существует, но BasicGuider 60 его не использует.</span>}
    >
      <GraphFlow
        nodes={[
          { id: '459 / 573', label: 'Scene + people', detail: 'detail blend 0.09', tone: 'active' },
          { id: '67', label: 'VAE Encode', tone: 'active' },
          { id: '453 → 62', label: 'Prompt + Guidance', detail: 'GLOBAL · 2.4', tone: 'control' },
          { id: '61 / 58 / 59', label: 'Noise + Euler + beta', detail: '24 steps · denoise 0.18', tone: 'active' },
          { id: '57', label: 'Sampler', tone: 'active' },
          { id: '53', label: 'VAE Decode', tone: 'active' },
          { id: '730', label: 'Current LQ', tone: 'active' },
        ]}
      />
      <div className="main-flux-loaders"><span>467 · flux1-dev-Q8_0.gguf</span><span>466 · T5 Q8 + CLIP-L</span><span>54 · ae.safetensors</span></div>
    </VisualShell>
  );
}

function UpscaleOverlayVisual() {
  return (
    <VisualShell
      eyebrow="SAVED CONFIGURATION · MODE 4"
      title="Upscale и два overlays полностью сохранены, но отключены"
      icon={<Layers3 />}
      footer={<span>531 и 293 не bypassed сами по себе; их upstream processing находится в mode 4.</span>}
    >
      <GraphFlow
        nodes={[
          { id: '53 / 834', label: 'FLUX + detail', tone: 'bypassed' },
          { id: '883–894', label: 'Tile dimensions', detail: 'orientation logic', tone: 'bypassed' },
          { id: '153 / 154 / 833', label: 'Ultimate Upscale', detail: '4x-UltraSharp · factor control', tone: 'bypassed' },
          { id: '301 / 309', label: 'Overlay assets', tone: 'conditional' },
          { id: '840–849', label: 'Resize + overlay', tone: 'bypassed' },
          { id: '531 / 293 / 15', label: 'HQ · LQ2 · Preview', tone: 'diagnostic' },
        ]}
      />
      <div className="bypass-banner"><span>BYPASS</span><strong>14 Upscale nodes + 11 Add Logo nodes</strong><small>current output stops at 53 → 730</small></div>
    </VisualShell>
  );
}

function NodeIndexIntroVisual() {
  return (
    <VisualShell
      eyebrow="COMPLETE REFERENCE"
      title="252 nodes можно искать по ID, группе, типу и package"
      icon={<ScanSearch />}
      footer={<span>Индекс строится из derived specification; raw workflow в текущем bundle отсутствует.</span>}
    >
      <div className="index-metrics">
        <div><span>252</span><strong>NODES</strong></div>
        <div><span>341</span><strong>LINKS</strong></div>
        <div><span>16</span><strong>GROUPS</strong></div>
        <div><span>28</span><strong>CONTROLS</strong></div>
      </div>
    </VisualShell>
  );
}

export function FullGraphVisual({ slug }: { slug: string }) {
  switch (slug) {
    case 'overview':
      return <MasterArchitectureVisual />;
    case 'graph-reading':
      return <GraphReadingVisual />;
    case 'inputs':
      return <InputsVisual />;
    case 'control-panel':
      return <ControlPanelVisual />;
    case 'models-dependencies':
      return <ModelsVisual />;
    case 'global-prompts':
      return <GlobalPromptsVisual />;
    case 'sdxl':
      return <SDXLVisual />;
    case 'controlnet':
      return <ControlNetVisual />;
    case 'ipadapter-lora':
      return <IPAdapterVisual />;
    case 'segmentation-masks':
      return <SegmentationMasksVisual />;
    case 'detail-conservation':
      return <DetailConservationVisual />;
    case 'positioning':
      return <PositioningVisual />;
    case 'ppl-mode-2-inpaint':
      return <PPLModeTwoVisual />;
    case 'main-flux':
      return <MainFluxVisual />;
    case 'upscale-overlay':
      return <UpscaleOverlayVisual />;
    case 'node-index':
      return <NodeIndexIntroVisual />;
    default:
      return null;
  }
}
