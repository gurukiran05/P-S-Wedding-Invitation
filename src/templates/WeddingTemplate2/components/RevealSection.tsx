'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import weddingDetails from '../weddingDetails';

interface ScratchCardProps {
  onReveal: () => void;
}

function ScratchCard({ onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const w = 620, h = 300;
    canvas.width = w;
    canvas.height = h;

    const drawFoil = () => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#f6e3ab');
      g.addColorStop(0.3, '#d4af37');
      g.addColorStop(0.55, '#fdf6e3');
      g.addColorStop(0.8, '#c9a96e');
      g.addColorStop(1, '#a0844a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 3;
      for (let i = -2; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 90 - 40, h + 20);
        ctx.lineTo(i * 90 + 130, -20);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(95, 79, 58, 0.6)';
      ctx.font = '600 16px Lato, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('◈   S C R A T C H   T O   R E V E A L   ◈', w / 2, h / 2);
    };
    drawFoil();

    let isDrawing = false;
    let hasRevealed = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = w / rect.width;
      const sy = h / rect.height;
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
        x: Math.min(Math.max((cx - rect.left) * sx, 0), w),
        y: Math.min(Math.max((cy - rect.top) * sy, 0), h)
      };
    };

    const STROKE_WIDTH = 52;
    let lastPos: { x: number; y: number } | null = null;

    const scratchDot = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(x, y, STROKE_WIDTH / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const scratchLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = STROKE_WIDTH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    };

    const checkReveal = () => {
      if (revealed || hasRevealed) return;
      const id = ctx.getImageData(0, 0, w, h);
      const px = id.data;
      let trans = 0;
      for (let i = 3; i < px.length; i += 4) {
        if (px[i] === 0) trans++;
      }
      if ((trans / (px.length / 4)) * 100 > 45) {
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
      lastPos = pos;
      scratchDot(pos.x, pos.y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || revealed) return;
      if (e.cancelable) e.preventDefault();
      const pos = getPos(e);
      scratchLine(lastPos || pos, pos);
      lastPos = pos;
      checkReveal();
    };

    const handleUp = () => {
      isDrawing = false;
      lastPos = null;
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
    <div className="reveal-scratch-card">
      <canvas ref={canvasRef} className="reveal-scratch-canvas" style={{ display: revealed ? 'none' : 'block' }}></canvas>
      <div className="reveal-card-content" id="revealCardContent">
        <span className="reveal-eyebrow">THE WEDDING DAY</span>
        <div className="reveal-date-text" style={{ marginBottom: 0 }}>{weddingDetails.dateDisplay}</div>
      </div>
    </div>
  );
}

export default function RevealSection() {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = useCallback(() => {
    setRevealed(true);

    const content = document.getElementById('revealCardContent');
    if (content) {
      gsap.fromTo(content,
        { scale: 0.94 },
        { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.65)' }
      );
    }

    const d = { spread: 75, startVelocity: 45, colors: ['#d4af37', '#8b3a3e', '#2f5d4f', '#fdfbf7', '#c9a96e'] };
    confetti({ ...d, particleCount: 90, origin: { x: 0.3, y: 0.4 } });
    setTimeout(() => confetti({ ...d, particleCount: 90, origin: { x: 0.7, y: 0.4 } }), 200);
    setTimeout(() => confetti({ ...d, particleCount: 120, origin: { x: 0.5, y: 0.3 }, spread: 100 }), 400);
    if (navigator.vibrate) navigator.vibrate(20);
  }, []);

  return (
    <section className="section" id="revealSection">
      <div className="floral-divider" aria-hidden="true" style={{ marginBottom: '1.4rem' }}><span>❁</span><span>❁</span><span>❁</span></div>
      <p className="section-subtitle" style={{ fontFamily: "'Noto Sans Kannada', sans-serif", fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--gold)', textTransform: 'none', marginBottom: '1.2rem' }}>
        ॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥
      </p>
      <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>A Celebration of Love</h2>
      <p className="scratch-instruction" style={{ maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.75 }}>
        You hold a special place in our hearts, and we would be delighted to celebrate this joyful occasion with you.
      </p>

      <div className="reveal-scratch-wrap" style={{ margin: '0 auto 2rem' }}>
        <ScratchCard onReveal={handleReveal} />
      </div>

      <div className={`post-reveal-message ${revealed ? 'visible' : ''}`} id="postRevealMsg">
        <span>We&apos;re getting married!</span>
      </div>
      <p className={`reveal-subtext ${revealed ? 'visible' : ''}`} id="revealSubtext">
        {weddingDetails.venue} &middot; {weddingDetails.address}
      </p>
    </section>
  );
}
