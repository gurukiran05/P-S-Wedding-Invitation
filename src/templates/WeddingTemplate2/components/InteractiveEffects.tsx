'use client';

import { useEffect } from 'react';
import confetti, { type Options as ConfettiOptions } from 'canvas-confetti';
import gsap from 'gsap';

export default function InteractiveEffects() {
  useEffect(() => {

    const tct = document.getElementById('timeCapsuleToast');
    const shakeHint = document.getElementById('shakeHint');
    const pullIndicator = document.getElementById('pullIndicator');

    // Safe Confetti wrapper
    const safeConfetti = (opts: ConfettiOptions) => {
      confetti(opts);
    };

    // --- Shake Device Logic ---
    let shakeTimer: ReturnType<typeof setTimeout> | undefined;
    let lastX: number | null = null, lastY: number | null = null, lastZ: number | null = null;
    let shakeCount = 0;
    const SHAKE_THRESHOLD = 15;
    const REQ_SHAKES = 4;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;
      if (!lastX) { lastX = acc.x; lastY = acc.y; lastZ = acc.z; return; }

      const delta = Math.abs(acc.x - lastX + acc.y - (lastY ?? 0) + acc.z - (lastZ ?? 0));
      if (delta > SHAKE_THRESHOLD) {
        shakeCount++;
        clearTimeout(shakeTimer);
        shakeTimer = setTimeout(() => { shakeCount = 0; }, 1000);
        if (shakeCount >= REQ_SHAKES) {
          shakeCount = 0;
          triggerShake();
        }
      }
      lastX = acc.x; lastY = acc.y; lastZ = acc.z;
    };

    const triggerShake = () => {
      if (shakeHint) shakeHint.classList.remove('visible');
      const h = ['💕', '🥂', '💐', '✨', '🕌'];

      for (let i = 0; i < 15; i++) {
        const el = document.createElement('span');
        el.className = 'floating-hearts';
        el.textContent = h[Math.floor(Math.random() * h.length)];
        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.top = (window.innerHeight * 0.6 + Math.random() * 200) + 'px';
        el.style.animationDuration = (2 + Math.random() * 3) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
      }

      safeConfetti({
        particleCount: 150, spread: 100, startVelocity: 60,
        colors: ['#d4af37', '#e8d5a3', '#fdfbf7', '#fef3c7'],
        origin: { x: 0.5, y: 0.6 }
      });

      if (navigator.vibrate) navigator.vibrate([50, 100, 50, 100, 50]);

      if (tct) {
        tct.innerHTML = '<span class="fact-text">🌼 Sending you love from the families!</span>';
        tct.classList.add('show');
        setTimeout(() => tct.classList.remove('show'), 3000);
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    // --- Pull to Refresh Surprise ---
    let psy = 0, pulling = false, hasVibratedForPull = false;
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        psy = e.touches[0].clientY;
        pulling = true;
        hasVibratedForPull = false;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling || !pullIndicator) return;
      if (e.touches[0].clientY - psy > 80) {
        if (!pullIndicator.classList.contains('show')) {
          pullIndicator.classList.add('show');
          if (navigator.vibrate && !hasVibratedForPull) {
            navigator.vibrate(15);
            hasVibratedForPull = true;
          }
        }
      }
    };
    const handleTouchEnd = () => {
      if (pullIndicator && pullIndicator.classList.contains('show')) {
        safeConfetti({
          particleCount: 100, spread: 80, startVelocity: 50,
          colors: ['#d4af37', '#e8d5a3', '#fdfbf7'],
          origin: { x: 0.5, y: 0.2 }, angle: 270
        });
        if (tct) {
          tct.innerHTML = '<span class="fact-text">✨ We can’t wait to celebrate with you! ✨</span>';
          tct.classList.add('show');
          setTimeout(() => tct.classList.remove('show'), 2500);
        }
      }
      pulling = false;
      hasVibratedForPull = false;
      if (pullIndicator) pullIndicator.classList.remove('show');
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    // --- Minimalistic & Elegant Double Tap Heart ---
    let dtt: ReturnType<typeof setTimeout> | null = null;
    const spawnSparkles = (x: number, y: number) => {
      const colors = ['#d4af37', '#e8d5a3', '#fdfbf7', '#bf953f'];
      for (let i = 0; i < 6; i++) {
        const sp = document.createElement('span');
        sp.textContent = ['✨', '✦', '·', '✧'][Math.floor(Math.random() * 4)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 30;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        sp.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          font-size: ${0.5 + Math.random() * 0.6}rem;
          color: ${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events: none;
          z-index: 10005;
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.5);
          transition: transform 0.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.8s ease-out;
        `;
        document.body.appendChild(sp);

        requestAnimationFrame(() => {
          sp.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.2)`;
          sp.style.opacity = '0';
        });

        setTimeout(() => sp.remove(), 800);
      }
    };

    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest('button') || target?.closest('canvas') || target?.closest('input') || target?.closest('textarea') || target?.closest('.share-option')) return;
      spawnSparkles(e.clientX, e.clientY);
      if (dtt) {
        clearTimeout(dtt);
        dtt = null;
        spawnH(e.clientX, e.clientY);
      } else {
        dtt = setTimeout(() => { dtt = null; }, 300);
      }
    };

    const spawnH = (x: number, y: number) => {
      const ex = document.querySelectorAll('.minimal-tap-heart');
      if (ex.length > 5) ex[0].remove();

      // Main elegant floating heart
      const heart = document.createElement('div');
      heart.className = 'minimal-tap-heart';
      heart.innerHTML = '🤍';
      heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.65rem;
        pointer-events: none;
        z-index: 10005;
        transform: translate(-50%, -50%) scale(0);
        filter: drop-shadow(0 4px 12px rgba(201, 169, 110, 0.45));
        animation: minimalHeartFloat 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
      document.body.appendChild(heart);

      // 2 tiny subtle golden sparkles
      const sparkles = ['✨', '·'];
      sparkles.forEach((char, index) => {
        const sp = document.createElement('span');
        const offsetX = (index === 0 ? -20 : 20);
        const offsetY = (index === 0 ? -12 : -8);
        sp.textContent = char;
        sp.style.cssText = `
          position: fixed;
          left: ${x + offsetX}px;
          top: ${y + offsetY}px;
          font-size: ${char === '·' ? '1.5rem' : '0.8rem'};
          color: var(--gold);
          pointer-events: none;
          z-index: 10005;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
          animation: minimalSparkleFloat 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 * index}s forwards;
        `;
        document.body.appendChild(sp);
        setTimeout(() => { if (sp.parentNode) sp.remove(); }, 1200);
      });

      if (navigator.vibrate) navigator.vibrate(12);
      setTimeout(() => { if (heart.parentNode) heart.remove(); }, 1200);
    };

    document.addEventListener('click', handleDocClick);

    // --- Premium GSAP Magnetic Hover & 3D Tilt ---
    const arch = document.querySelector('.hero-arch-wrapper');
    const archImg = document.querySelector('.hero-arch-image');

    let hoveredButton: Element | null = null;
    let hoveredTiltItem: Element | null = null;
    let cachedGalleryItems: Element[] | null = null;

    const handleMouseOverGlobal = (e: MouseEvent) => {
      const target = e.target as Element | null;
      hoveredButton = target?.closest('.btn, .rsvp-scroll-btn, .calendar-btn, .directions-btn, .theme-toggle, .share-btn') ?? null;
      hoveredTiltItem = target?.closest('.gallery-item, .party-card') ?? null;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (!clientX || !clientY) return;

      if (hoveredButton) {
        const rect = hoveredButton.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        gsap.to(hoveredButton, {
          x: (clientX - cx) * 0.3,
          y: (clientY - cy) * 0.3,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      if (hoveredTiltItem) {
        const rect = hoveredTiltItem.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const tiltX = (((clientY - rect.top) - cy) / cy) * -10;
        const tiltY = (((clientX - rect.left) - cx) / cx) * 10;
        gsap.to(hoveredTiltItem, {
          rotationX: tiltX,
          rotationY: tiltY,
          scale: 1.02,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
          overwrite: 'auto'
        });
      }

      if (arch && archImg && window.scrollY <= window.innerHeight) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (clientX - cx) / cx;
        const dy = (clientY - cy) / cy;
        gsap.to(arch, {
          rotationY: dx * 8,
          rotationX: -dy * 8,
          transformPerspective: 1000,
          duration: 1,
          ease: 'power2.out'
        });
        gsap.to(archImg, {
          x: -dx * 30,
          y: -dy * 30,
          scale: 1.15,
          duration: 1.5,
          ease: 'power2.out'
        });
      }
    };

    let lastOrientationTime = 0;
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const now = performance.now();
      if (now - lastOrientationTime < 66) return; // Limit orientation to ~15 FPS
      lastOrientationTime = now;

      if (e.gamma === null || e.beta === null) return;
      const dx = Math.max(-1, Math.min(1, e.gamma / 40));
      const dy = Math.max(-1, Math.min(1, (e.beta - 45) / 40));

      if (arch && archImg && window.scrollY <= window.innerHeight) {
        gsap.to(arch, { rotationY: dx * 10, rotationX: -dy * 10, transformPerspective: 1000, duration: 0.8, ease: 'power2.out' });
        gsap.to(archImg, { x: -dx * 25, y: -dy * 25, scale: 1.15, duration: 1.2, ease: 'power2.out' });
      }

      if (!cachedGalleryItems) {
        cachedGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
      }

      const vh = window.innerHeight;
      cachedGalleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          gsap.to(item, { rotationY: dx * 12, rotationX: -dy * 12, transformPerspective: 1000, duration: 0.8, ease: 'power2.out' });
        }
      });
    };

    const handleMouseOutGlobal = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Element | null;
      const btn = target?.closest('.btn, .rsvp-scroll-btn, .calendar-btn, .directions-btn, .theme-toggle, .share-btn') ?? null;
      if (btn) {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
        if (btn === hoveredButton) hoveredButton = null;
      }
      const tilt = target?.closest('.gallery-item, .party-card') ?? null;
      if (tilt) {
        gsap.to(tilt, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
        if (tilt === hoveredTiltItem) hoveredTiltItem = null;
      }
      if (arch && archImg) {
        gsap.to(arch, { rotationY: 0, rotationX: 0, duration: 1.5, ease: 'power2.out' });
        gsap.to(archImg, { x: 0, y: 0, scale: 1.05, duration: 1.5, ease: 'power2.out' });
      }
    };

    document.addEventListener('mouseover', handleMouseOverGlobal);
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    document.addEventListener('mouseout', handleMouseOutGlobal);
    document.addEventListener('touchend', handleMouseOutGlobal);

    // --- "LOVE" Keyboard Easter Egg ---
    let kc = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') { kc = ''; return; }
      kc += e.key.toUpperCase();
      if (kc.length > 4) kc = kc.slice(-4);
      if (kc === 'LOVE') {
        kc = '';
        const o = document.createElement('div');
        o.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle,rgba(201,169,110,0.35),transparent 70%);z-index:10004;pointer-events:none;animation:secretGlow 2.5s ease-out forwards;display:flex;align-items:center;justify-content:center;';
        o.innerHTML = '<span style="font-size:5rem;animation:secretReveal 2.5s ease-out forwards;">🌙</span>';
        document.body.appendChild(o);
        safeConfetti({
          particleCount: 200, spread: 120, startVelocity: 60,
          colors: ['#d4af37', '#e8d5a3', '#fef3c7', '#fdfbf7'],
          origin: { x: 0.5, y: 0.5 }
        });
        setTimeout(() => o.remove(), 2800);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseover', handleMouseOverGlobal);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      document.removeEventListener('mouseout', handleMouseOutGlobal);
      document.removeEventListener('touchend', handleMouseOutGlobal);
    };
  }, []);

  return null;
}
