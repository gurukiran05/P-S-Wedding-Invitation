'use client';

import { useEffect, useState, type MouseEvent } from 'react';

const CHAPTERS = [
  { id: 'heroSection', label: 'Welcome' },
  { id: 'revealSection', label: 'The Reveal' },
  { id: 'eventsSection', label: 'Journey' },
  { id: 'countdownSection', label: 'Countdown' },
  { id: 'gallerySection', label: 'Gallery' },
  { id: 'weddingPartySection', label: 'Hosts' },
  { id: 'transportSection', label: 'Directions' },
  { id: 'closingSection', label: 'With love' },
];

export default function ChapterRail() {
  const [activeChapter, setActiveChapter] = useState('heroSection');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const sections = CHAPTERS
      .map((ch) => document.getElementById(ch.id))
      .filter((s): s is HTMLElement => Boolean(s));

    // A thin horizontal band near the upper third of the viewport, rather than a
    // percentage of each section's own height, so very tall sections (e.g. the
    // timeline spine, which can be several viewport-heights tall) still register.
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      setActiveChapter(visible[0].target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (!isDesktop) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="chapter-rail" aria-label="Chapters">
      {CHAPTERS.map((ch) => {
        const active = activeChapter === ch.id;
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className={`chapter-rail-link ${active ? 'active' : ''}`}
            onClick={(e) => handleClick(e, ch.id)}
          >
            <span className="chapter-rail-dot" />
            <span className="chapter-rail-label">{ch.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
