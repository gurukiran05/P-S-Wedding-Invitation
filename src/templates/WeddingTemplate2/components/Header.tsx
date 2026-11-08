'use client';

import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [progress, setProgress] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio.play().then(() => setMusicError(false)).catch(() => setMusicError(true));
    };
    const handlePlay = () => setMusicPlaying(true);
    const handlePause = () => setMusicPlaying(false);

    window.addEventListener('playWeddingMusic', startMusic);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      window.removeEventListener('playWeddingMusic', startMusic);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setMusicError(false)).catch(() => setMusicError(true));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-music.mp3"
        loop
        preload="none"
        onError={() => setMusicError(true)}
      />
      <div className="reading-progress" id="readingProgress" style={{ width: `${progress}%` }}></div>
      <button className="share-btn" id="shareBtn" aria-label="Share invitation" onClick={() => document.getElementById('shareModal')?.classList.add('show')}>📤</button>
      <button
        className="audio-toggle"
        type="button"
        aria-label={musicError ? 'Wedding music could not be loaded' : musicPlaying ? 'Pause wedding music' : 'Play wedding music'}
        aria-pressed={musicPlaying}
        title={musicError ? 'Wedding music could not be loaded' : musicPlaying ? 'Pause wedding music' : 'Play wedding music'}
        onClick={toggleMusic}
      >
        {musicError ? '!' : musicPlaying ? 'Ⅱ' : '♫'}
      </button>
    </>
  );
}
