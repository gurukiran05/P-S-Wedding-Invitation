'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { getLenis } from '@/lib/lenis-store';
import weddingDetails from '../weddingDetails';

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
    const ribbonWrap = document.getElementById('ribbonWrap');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const envelopeCard = document.getElementById('envelopeCard');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const envelope3d = document.getElementById('envelope3d');

    if (navigator.vibrate) navigator.vibrate(30);
    window.dispatchEvent(new Event('playWeddingMusic'));

    const tl = gsap.timeline();

    // 1. Animate wax seal and silk ribbon wrap breaking / fading away
    tl.to([waxSeal, ribbonWrap], {
      scale: 0.7,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.inOut'
    });

    // 2. Open the triangular flap backward to reveal gold arabesque liner
    tl.to(envelopeFlap, {
      rotateX: 165,
      duration: 1.25,
      ease: 'power2.inOut'
    }, 0.15);

    // 3. Slide the foil-stamped card up from inside the envelope body
    tl.to(envelopeCard, {
      y: -145,
      scale: 1.03,
      duration: 1.35,
      ease: 'power2.out'
    }, 0.45);

    // 4. Fade out the whole envelope assembly
    tl.to(envelope3d, {
      scale: 0.82,
      opacity: 0,
      y: 45,
      duration: 0.9,
      ease: 'power2.inOut'
    }, 2.5);

    // 5. Deactivate overlay and fire celebratory gold confetti
    setTimeout(() => {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      getLenis()?.scrollTo(0, { immediate: true });

      envelopeOverlay?.classList.add('fade-out');

      const d = { spread: 75, startVelocity: 42, colors: ['#d4af37', '#e8d5a3', '#fdfbf7', '#bf953f'] };
      confetti({ ...d, particleCount: 80, origin: { x: 0.3, y: 0.5 } });
      setTimeout(() => confetti({ ...d, particleCount: 85, origin: { x: 0.7, y: 0.5 } }), 200);
      setTimeout(() => confetti({ ...d, particleCount: 110, origin: { x: 0.5, y: 0.4 }, spread: 95 }), 400);
    }, 3500);
  };

  return (
    <div className={`envelope-overlay ${isOpen ? 'is-opening' : ''}`} id="envelopeOverlay">
      {/* Inline SVG filter for authentic luxury cotton paper grain */}
      <svg className="envelope-svg-filters" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0" result="coloredNoise" />
          <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
        </filter>
      </svg>

      <div className="envelope-3d" id="envelope3d">
        <div className="envelope-base textured-paper">
          {/* Opulent Gold Arabesque Interior Liner visible behind the card */}
          <div className="envelope-interior-liner"></div>

          <div className="envelope-card textured-paper" id="envelopeCard">
            <div className="envelope-card-inner-border">
              <div className="envelope-content">
                <span className="envelope-bismillah foil-text-gold" style={{ fontFamily: 'Cinzel', fontSize: '1rem' }}>WITH LOVE</span>
                <span className="names-preview foil-text-gold">{weddingDetails.groom} &amp; {weddingDetails.bride}</span>
                <div className="envelope-divider" aria-hidden="true"><span>◈</span></div>
                <span className="envelope-subtitle foil-text-sub">Wedding Invitation</span>
              </div>
            </div>
          </div>

          <div className="envelope-pocket textured-paper"></div>
        </div>

        <div className="envelope-flap" id="envelopeFlap">
          <div className="envelope-flap-front textured-paper"></div>
          <div className="envelope-flap-liner"></div>
        </div>

        <div className="envelope-ribbon-wrap" id="ribbonWrap">
          <div className="ribbon-band"></div>
          <div className="ribbon-gold-line"></div>
        </div>

        <button className="wax-seal" id="waxSeal" type="button" onClick={handleOpen} aria-label="Open the wedding invitation" title="Tap or click to open invitation">
          <div className="wax-seal-inner">
            <span className="wax-emblem" style={{ fontFamily: 'Cinzel', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '1px' }}>P&amp;S</span>
          </div>
        </button>
      </div>
      <p className="envelope-open-hint">TAP THE SEAL TO OPEN</p>
    </div>
  );
}
