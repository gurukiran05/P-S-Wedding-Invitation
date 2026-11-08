'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { getLenis } from '@/lib/lenis-store';

export default function EnvelopeOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const waxSeal = document.getElementById('waxSeal');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const envelope3d = document.getElementById('envelope3d');

    waxSeal?.classList.add('cracked');
    if (navigator.vibrate) navigator.vibrate(30);
    window.dispatchEvent(new Event('playWeddingMusic'));

    setTimeout(() => envelopeFlap?.classList.add('open'), 200);
    setTimeout(() => {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      getLenis()?.scrollTo(0, { immediate: true });

      gsap.to(envelope3d, { scale: 0.7, rotationX: -15, rotationY: 10, opacity: 0, duration: 1.2, ease: 'power2.inOut' });
      envelopeOverlay?.classList.add('fade-out');

      const d = { spread: 70, startVelocity: 40, colors: ['#8b3a3e', '#c9a96e', '#faf7f2'] };
      confetti({ ...d, particleCount: 80, origin: { x: 0.3, y: 0.5 } });
      setTimeout(() => confetti({ ...d, particleCount: 80, origin: { x: 0.7, y: 0.5 } }), 200);
      setTimeout(() => confetti({ ...d, particleCount: 100, origin: { x: 0.5, y: 0.4 }, spread: 90 }), 400);
    }, 1100);
  };

  return (
    <div className="envelope-overlay" id="envelopeOverlay">
      <div className="envelope-3d" id="envelope3d">
        <div className="envelope-base">
          <div className="envelope-content">
            <span className="names-preview">Sam & Sofia</span>
            <span className="envelope-subtitle">Wedding Invitation</span>
          </div>
        </div>
        <div className="envelope-flap" id="envelopeFlap">
          <div className="wax-seal" id="waxSeal" onClick={handleOpen}>💌</div>
        </div>
      </div>
    </div>
  );
}
