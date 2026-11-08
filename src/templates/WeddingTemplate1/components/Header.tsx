'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(dh > 0 ? Math.min((st / dh) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const startMusic = () => {
      const iframe = document.getElementById('bgMusicIframe') as HTMLIFrameElement | null;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    };
    window.addEventListener('playWeddingMusic', startMusic);
    return () => window.removeEventListener('playWeddingMusic', startMusic);
  }, []);

  const toggleAudio = () => {
    const iframe = document.getElementById('bgMusicIframe') as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) return;

    if (isPlaying) {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } else {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <iframe
        id="bgMusicIframe"
        src="https://www.youtube.com/embed/CnEqrgMlWLQ?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=CnEqrgMlWLQ"
        allow="autoplay; encrypted-media"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        title="Wedding Background Music"
      />

      <div className="reading-progress" id="readingProgress" style={{ width: `${progress}%` }}></div>
      <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button className="share-btn" id="shareBtn" aria-label="Share invitation" onClick={() => document.getElementById('shareModal')?.classList.add('show')}>📤</button>
      <div className={`vinyl-player ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio} title="Play ambient music">
        <div className="vinyl-record">
          <div className="vinyl-label"></div>
        </div>
        <div className="tonearm"></div>
        {isPlaying && <div className="music-notes">🎵</div>}
      </div>
    </>
  );
}
