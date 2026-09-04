export type EvidenceStatus = 'confirmed' | 'inferred' | 'not-confirmed';

export type ManualCategory =
  | 'foundation'
  | 'base-generation'
  | 'people-ppl'
  | 'final-pipeline'
  | 'evidence-reference';

export type Fact = {
  status: EvidenceStatus;
  title: string;
  text: string;
};

export type CodeExample = {
  title: string;
  label: string;
  code: string;
  note?: string;
};

export type DataTable = {
  columns: string[];
  rows: string[][];
};

export type ChapterSection = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  facts?: Fact[];
  codeExamples?: CodeExample[];
  table?: DataTable;
};

export type ChapterVisual =
  | 'overview'
  | 'prompt'
  | 'generation'
  | 'mask'
  | 'preparation'
  | 'selectors'
  | 'composite'
  | 'diagnostics'
  | 'checklist'
  | 'output'
  | 'examples'
  | 'resources'
  | 'master'
  | 'graph-reading'
  | 'inputs'
  | 'controls'
  | 'models'
  | 'prompts-global'
  | 'sdxl'
  | 'controlnet'
  | 'ipadapter'
  | 'masks-global'
  | 'detail'
  | 'positioning'
  | 'inpaint'
  | 'flux-main'
  | 'upscale'
  | 'node-index';

export type Chapter = {
  index: number;
  slug: string;
  navTitle: string;
  eyebrow: string;
  title: string;
  lede: string;
  status: EvidenceStatus;
  statusNote: string;
  visual: ChapterVisual;
  category: ManualCategory;
  stage?: string;
  relatedNodes?: number[];
  relatedChapters?: string[];
  sections: ChapterSection[];
};
