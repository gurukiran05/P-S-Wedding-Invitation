'use client';

import { useState, useEffect, useRef } from 'react';
import weddingDetails from '../weddingDetails';

const facts = [
  "🌼 A day filled with family, friendship and celebration",
  "💛 We can't wait to celebrate with you",
  "🌿 A joyful gathering of two families",
  "✨ Save this invitation and share it with your family",
  "🥁 Music, laughter and lovely memories await",
  "🌸 Thank you for being part of our story"
];

interface DialBlockProps {
  position: 'top' | 'right' | 'bottom' | 'left';
  value: string;
  label: string;
  isSeconds?: boolean;
}

function DialBlock({ position, value, label, isSeconds }: DialBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    const handleMouseMove = (e: MouseEvent) => {
      const r = block.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      block.style.setProperty('--magnet-x', `${x * 0.15}px`);
      block.style.setProperty('--magnet-y', `${y * 0.15}px`);
    };

    const handleMouseLeave = () => {
      block.style.setProperty('--magnet-x', '0px');
      block.style.setProperty('--magnet-y', '0px');
    };

    block.addEventListener('mousemove', handleMouseMove);
    block.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      block.removeEventListener('mousemove', handleMouseMove);
      block.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    const tct = document.getElementById('timeCapsuleToast');
    if (!tct) return;
    const f = facts[Math.floor(Math.random() * facts.length)];
    tct.innerHTML = `<span class="fact-text">${f}</span>`;
    tct.classList.add('show');
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => tct.classList.remove('show'), 3000);
  };

  return (
    <div ref={blockRef} className={`dial-block dial-block-${position} magnetic`} onClick={handleClick}>
      <span className={`countdown-number ${isSeconds ? 'tick-heartbeat' : ''}`}>{value}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ d: '--', h: '--', m: '--', s: '--' });

  useEffect(() => {
    if (!weddingDetails.dateISO) return;
    const tgt = new Date(weddingDetails.dateISO);
    if (Number.isNaN(tgt.getTime())) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = tgt.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ d: '00', h: '00', m: '00', s: '00' });
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        d: String(Math.floor(diff / 864e5)).padStart(2, '0'),
        h: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0'),
        m: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0'),
        s: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section" id="countdownSection">
      <h2 className="section-title" style={{ marginBottom: "0.4rem", textAlign: "center", lineHeight: "1.25" }}>
        <span style={{ display: "block" }}>A Day to Remember</span>
      </h2>
      <p className="section-subtitle">COUNTDOWN TO THE CELEBRATION</p>

      <div className="dial-wrap" id="countdownContainer">
        <div className="dial-ring" aria-hidden="true"></div>
        <DialBlock position="top" value={timeLeft.d} label="Days" />
        <DialBlock position="right" value={timeLeft.h} label="Hours" />
        <DialBlock position="bottom" value={timeLeft.m} label="Minutes" />
        <DialBlock position="left" value={timeLeft.s} label="Seconds" isSeconds={true} />
        <div className="dial-center">
          <span className="dial-center-bismillah">LOVE</span>
          <span className="dial-center-label">Wedding</span>
          <span className="dial-center-date">{weddingDetails.dateISO ? weddingDetails.dateDisplay : 'Date soon'}</span>
        </div>
      </div>

      <div className="venue-details" style={{ margin: "0.5rem auto 1.5rem", position: "relative", zIndex: 5, textAlign: "center" }}>
        <p className="section-subtitle" style={{ marginBottom: "0.6rem" }}>WEDDING CELEBRATION</p>
        <h3 className="venue-name">{weddingDetails.venue}</h3>
        <p className="venue-address" style={{ marginTop: "0.4rem" }}>{weddingDetails.address}</p>
        <p className="ceremony-type">We look forward to celebrating with you</p>
      </div>

    </section>
  );
}
