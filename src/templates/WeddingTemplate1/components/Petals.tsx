'use client';

import { useEffect, useRef } from 'react';

export default function Petals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let petals: HTMLDivElement[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const createPetal = () => {
      const el = document.createElement('div');
      el.className = 'petal';
      el.style.left = Math.random() * 100 + 'vw';
      // Use different petals
      if (Math.random() > 0.7) el.classList.add('leaf');

      // Random animation duration between 12s and 20s for calm drift
      const dur = Math.random() * 8 + 12;
      el.style.animationDuration = `${dur}s`;

      // Random initial rotation
      el.style.transform = `rotate(${Math.random() * 360}deg)`;

      container.appendChild(el);
      petals.push(el);

      // Clean up after animation
      const t = setTimeout(() => {
        if (container.contains(el)) {
          container.removeChild(el);
          petals = petals.filter(p => p !== el);
        }
      }, dur * 1000);
      timeouts.push(t);
    };

    // Initial batch
    const isMobile = window.innerWidth < 600;
    const initialBatch = isMobile ? 5 : 10;
    for (let i = 0; i < initialBatch; i++) {
      timeouts.push(setTimeout(createPetal, Math.random() * 4000));
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startAnimation = () => {
      if (!intervalId) {
        intervalId = setInterval(createPetal, isMobile ? 3800 : 2200);
      }
    };

    const stopAnimation = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }, { threshold: 0 });

    observer.observe(container);

    return () => {
      stopAnimation();
      observer.disconnect();
      timeouts.forEach(clearTimeout);
      petals.forEach(p => {
        if (container.contains(p)) container.removeChild(p);
      });
    };
  }, []);

  return <div ref={containerRef} className="petals-container" id="petalsContainer"></div>;
}
