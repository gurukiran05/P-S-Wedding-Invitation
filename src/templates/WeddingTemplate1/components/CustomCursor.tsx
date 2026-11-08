'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorText] = useState('');
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor globally when this component is active
    document.body.style.cursor = 'none';

    let lastTime = 0;
    const handleTouchTrail = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 140) return;
      lastTime = now;
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      const s = document.createElement('div');
      s.style.cssText = `position:fixed;left:${t.clientX}px;top:${t.clientY}px;font-size:0.8rem;pointer-events:none;z-index:10005;transform:translate(-50%,-50%) scale(0.5);animation:touchSparkleAnim 0.65s cubic-bezier(0.1,0.8,0.3,1) forwards;`;
      s.innerHTML = Math.random() > 0.45 ? '✨' : '🤍';
      document.body.appendChild(s);
      setTimeout(() => { if (s.parentNode) s.remove(); }, 650);
    };

    window.addEventListener('touchmove', handleTouchTrail, { passive: true });
    return () => {
      window.removeEventListener('touchmove', handleTouchTrail);
      document.body.style.cursor = 'auto'; // Restore normal cursor on unmount
    };
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const cursor = cursorRef.current;

    if (isTouchDevice || !cursor) return;

    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    let reqId: number;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.classList.remove('hidden');
    };

    const update = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      reqId = requestAnimationFrame(update);
    };

    const onMouseLeave = () => cursor.classList.add('hidden');
    const onMouseEnter = () => cursor.classList.remove('hidden');

    const interactiveSelector = 'button, canvas, .wax-seal, .color-swatch, .copy-btn, input, textarea, .directions-btn, .calendar-btn, .countdown-block, .pickup-card, .share-option, .gallery-item';

    const onMouseOver = (e: Event) => {
      const interactive = (e.target as Element | null)?.closest(interactiveSelector);
      if (interactive) {
        cursor.classList.add('hover');
        return;
      }
    };

    const onMouseOut = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        cursor.classList.remove('hover');
      }
    };

    const onMouseDown = () => {
      // Empty
    };

    const onMouseUp = () => {
      // Empty
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onMouseDown, { passive: true });
    document.addEventListener('touchend', onMouseUp);

    update();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchstart', onMouseDown);
      document.removeEventListener('touchend', onMouseUp);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <div className="custom-cursor hidden" id="customCursor" ref={cursorRef} style={{ top: 0, left: 0 }}>
      <span className="cursor-text">{cursorText}</span>
    </div>
  );
}
