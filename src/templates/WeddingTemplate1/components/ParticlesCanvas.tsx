'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  sx: number;
  sy: number;
  o: number;
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const pCanvas = canvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return;

    const particles: Particle[] = [];
    let animId: number;
    let lastPt = 0;
    const FPS_INT = 1000 / 30; // 30fps max

    const resizePC = () => {
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;

      const count = window.innerWidth > 768 ? 80 : 40;

      if (particles.length < count) {
        for (let i = particles.length; i < count; i++) {
          particles.push({
            x: Math.random() * pCanvas.width,
            y: Math.random() * pCanvas.height,
            r: Math.random() * 2 + 0.5,
            sx: (Math.random() - 0.5) * 0.5,
            sy: Math.random() * 0.8 + 0.2,
            o: Math.random() * 0.6 + 0.2
          });
        }
      } else if (particles.length > count) {
        particles.length = count;
      }
    };

    window.addEventListener('resize', resizePC, { passive: true });
    resizePC();

    let isVisible = true;

    const drawParticles = (ts: number) => {
      if (!isVisible) return;
      animId = requestAnimationFrame(drawParticles);
      if (ts - lastPt < FPS_INT) return;
      lastPt = ts;

      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

      particles.forEach(p => {
        p.y -= p.sy;
        p.x += p.sx;

        if (p.y < -10) p.y = pCanvas.height + 10;
        if (p.x < -10) p.x = pCanvas.width + 10;
        if (p.x > pCanvas.width + 10) p.x = -10;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(201, 169, 110, ${p.o})`;
        pCtx.fill();
      });
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastPt = performance.now();
        animId = requestAnimationFrame(drawParticles);
      } else {
        cancelAnimationFrame(animId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener('resize', resizePC);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particlesCanvas" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99 }}></canvas>;
}
