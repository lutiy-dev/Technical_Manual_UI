'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bot, Check, Clipboard, ExternalLink } from 'lucide-react';
import type { Chapter } from '@/lib/manual-data';

type TutorBridgeProps = {
  chapter: Chapter;
};

function sectionText(chapter: Chapter, sectionId: string | null) {
  const section =
    chapter.sections.find((item) => item.id === sectionId) ?? chapter.sections[0];

  if (!section) {
    return {
      id: '',
      title: chapter.title,
      summary: chapter.lede,
    };
  }

  const fragments = [
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []),
    ...(section.facts ?? []).map((fact) => `${fact.title}: ${fact.text}`),
  ];

  return {
    id: section.id,
    title: section.title,
    summary: fragments.join(' ').slice(0, 1800),
  };
}

export function TutorBridge({ chapter }: TutorBridgeProps) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    chapter.sections[0]?.id ?? null,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveSectionId(chapter.sections[0]?.id ?? null);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.manual-section[id]'),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSectionId(visible.target.id);
          window.localStorage.setItem(
            'epspoziciya-current-study-location',
            JSON.stringify({
              chapter: chapter.slug,
              section: visible.target.id,
              updatedAt: new Date().toISOString(),
            }),
          );
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapter.slug, chapter.sections]);

  const current = useMemo(
    () => sectionText(chapter, activeSectionId),
    [chapter, activeSectionId],
  );

  const tutorContext = useMemo(() => {
    const pageNumber = chapter.index;
    return [
      'EPS COMFYUI TUTOR · STUDY CONTEXT',
      `Course page: ${pageNumber}`,
      `Category: ${chapter.category}`,
      `Chapter: ${chapter.navTitle} — ${chapter.title}`,
      `Chapter slug: ${chapter.slug}`,
      `Current section: ${current.title}`,
      current.id ? `Section id: ${current.id}` : '',
      '',
      'Current section material:',
      current.summary || chapter.lede,
      '',
      'Teaching mode:',
      'Я начинающий в ComfyUI. Объясняй как преподаватель EPS Manual: от простого к сложному, сначала смысл и архитектура, потом ноды и практика. Не перескакивай через непонятные термины. Привязывай объяснение к Hansen workflow и используй нотацию «нода → нода», когда она помогает.',
      '',
      'Начни с вопроса: что именно в текущем разделе мне непонятно?',
    ]
      .filter(Boolean)
      .join('\n');
  }, [chapter, current]);

  async function copyContext() {
    await navigator.clipboard.writeText(tutorContext);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function openTutor() {
    try {
      await copyContext();
    } catch {
      // ChatGPT still opens; the context can be copied with the secondary button.
    }

    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="tutor-bridge">
      <div className="tutor-bridge-head">
        <span className="tutor-bridge-icon"><Bot size={17} /></span>
        <span>
          <small>EPS · AI TUTOR</small>
          <strong>ChatGPT · Репетитор</strong>
        </span>
      </div>

      <p className="tutor-bridge-location">
        <span>Сейчас:</span>
        <strong>{chapter.navTitle}</strong>
        <small>{current.title}</small>
      </p>

      <button className="tutor-primary-action" type="button" onClick={() => void openTutor()}>
        <ExternalLink size={15} />
        <span>Открыть репетитора</span>
      </button>

      <button className="tutor-secondary-action" type="button" onClick={() => void copyContext()}>
        {copied ? <Check size={14} /> : <Clipboard size={14} />}
        <span>{copied ? 'Контекст скопирован' : 'Скопировать контекст'}</span>
      </button>

      <small className="tutor-bridge-note">
        API не используется. Контекст текущей главы и секции копируется в буфер, а разговор идёт в твоём ChatGPT.
      </small>
    </div>
  );
}
