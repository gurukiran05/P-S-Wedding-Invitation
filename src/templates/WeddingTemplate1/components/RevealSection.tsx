'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  title: string;
  onReveal: () => void;
}

function ScratchCard({ title, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const sz = 110;
    canvas.width = sz;
    canvas.height = sz;

    // Draw gold circle
    const dg = () => {
      const g = ctx.createRadialGradient(sz / 2, sz / 2, sz * 0.1, sz / 2, sz / 2, sz * 0.55);
      g.addColorStop(0, '#e8d5a3');
      g.addColorStop(0.6, '#c9a96e');
      g.addColorStop(1, '#a0844a');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sz / 2, sz / 2, sz / 2 - 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(sz / 2, sz / 2, sz * 0.2 + i * 10, 0, Math.PI * 1.5);
        ctx.stroke();
      }
    };
    dg();

    let isDrawing = false;
    let hasRevealed = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = sz / rect.width;
      const sy = sz / rect.height;
      let cx = 0;
      let cy = 0;
      if ('touches' in e && e.touches.length > 0) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ('clientX' in e) {
        cx = e.clientX;
        cy = e.clientY;
      }
      return {
        x: Math.min(Math.max((cx - rect.left) * sx, 0), sz),
        y: Math.min(Math.max((cy - rect.top) * sy, 0), sz)
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const checkReveal = () => {
      if (revealed || hasRevealed) return;
      const id = ctx.getImageData(0, 0, sz, sz);
      const px = id.data;
      let trans = 0;
      for (let i = 3; i < px.length; i += 4) {
        if (px[i] === 0) trans++;
      }
      if ((trans / (px.length / 4)) * 100 > 50) {
        hasRevealed = true;
        setRevealed(true);
        canvas.style.display = 'none';
        onReveal();
      }
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      if (revealed) return;
      if (e.cancelable) e.preventDefault();
      isDrawing = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || revealed) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
      // Removed checkReveal() from here to optimize performance
    };

    const handleUp = () => {
      isDrawing = false;
      checkReveal();
    };

    canvas.addEventListener('mousedown', handleDown, { passive: false });
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleUp);
    canvas.addEventListener('mouseleave', handleUp);

    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    canvas.addEventListener('touchcancel', handleUp);

    return () => {
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('mouseleave', handleUp);

      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
      canvas.removeEventListener('touchcancel', handleUp);
    };
  }, [revealed, onReveal]);

  return (
    <div className="scratch-circle-wrapper">
      <canvas ref={canvasRef} style={{ display: revealed ? 'none' : 'block' }}></canvas>
      <div className="hidden-detail" style={{ opacity: 1 }} dangerouslySetInnerHTML={{ __html: title }}></div>
    </div>
  );
}

export default function RevealSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const totalCards = 3;

  const handleReveal = useCallback(() => {
    setRevealedCount(prev => {
      const next = prev + 1;
      if (next === totalCards) {
        const d = { spread: 70, startVelocity: 40, colors: ['#8b3a3e', '#c9a96e', '#faf7f2'] };
        confetti({ ...d, particleCount: 80, origin: { x: 0.3, y: 0.5 } });
        setTimeout(() => confetti({ ...d, particleCount: 80, origin: { x: 0.7, y: 0.5 } }), 200);
        setTimeout(() => confetti({ ...d, particleCount: 100, origin: { x: 0.5, y: 0.4 }, spread: 90 }), 400);
        if (navigator.vibrate) navigator.vibrate(15);
      }
      return next;
    });
  }, [totalCards]);

  const isComplete = revealedCount >= totalCards;

  return (
    <section className="section" id="revealSection">
      <div className="floral-divider" aria-hidden="true"><span>❁</span><span>❁</span><span>❁</span></div>
      <h2 className="section-title">The Big Reveal</h2>
      <p className="scratch-instruction">Scratch the golden circles to reveal our wedding details</p>

      <div className="scratch-circles-row">
        <ScratchCard title="Wedding<br/>Date" onReveal={handleReveal} />
        <ScratchCard title="Ceremony<br/>Time" onReveal={handleReveal} />
        <ScratchCard title="Wedding<br/>Venue" onReveal={handleReveal} />
      </div>

      <div className={`post-reveal-message ${isComplete ? 'visible' : ''}`} id="postRevealMsg">
        <span>We're getting married!</span>
      </div>
      <p className={`reveal-subtext ${isComplete ? 'visible' : ''}`} id="revealSubtext">
        September 10, 2027 · Villa Medicea di Artimino · 4:30 PM
      </p>
      <div className={`hero-actions ${isComplete ? 'visible' : ''}`} style={{ marginTop: '1rem', opacity: isComplete ? 1 : 0, transition: 'opacity 1s ease 1s', display: isComplete ? 'flex' : 'none' }}>
        <button className="calendar-btn" id="addToCalendarBtn" onClick={() => document.getElementById('calendarModal')?.classList.add('show')}>📅 Save the Date</button>
        <button className="rsvp-scroll-btn" id="rsvpScrollBtn" onClick={() => document.getElementById('rsvpSection')?.scrollIntoView({ behavior: 'smooth' })}>✉️ RSVP Now</button>
      </div>
    </section>
  );
}
