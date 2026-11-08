'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import SplitType from 'split-type';
import { setLenis } from '@/lib/lenis-store';
import Header from './components/Header';
import EnvelopeOverlay from './components/EnvelopeOverlay';
import HeroSection from './components/HeroSection';
import RevealSection from './components/RevealSection';
import CountdownSection from './components/CountdownSection';
import GallerySection from './components/GallerySection';
import TimelineSection from './components/TimelineSection';
import WeddingPartySection from './components/WeddingPartySection';
import TransportSection from './components/TransportSection';
import ClosingSection from './components/ClosingSection';
import Modals from './components/Modals';
import CustomCursor from './components/CustomCursor';
import InteractiveEffects from './components/InteractiveEffects';
import ParticlesCanvas from './components/ParticlesCanvas';
import Petals from './components/Petals';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

export default function WeddingTemplate2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    setLenis(lenis);
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Cleanup Lenis on unmount
    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      setLenis(null);
    };
  });

  useGSAP(() => {
    // Hero arch initial reveal
    gsap.from('.hero-arch-wrapper', {
      opacity: 0,
      y: 40,
      duration: 1.8,
      delay: 1.5,
      ease: 'power3.out'
    });

    // Reveal section scroll animation
    gsap.from('#revealSection', {
      scrollTrigger: { trigger: '#revealSection', start: 'top 80%' },
      opacity: 0, y: 30, duration: 1
    });

    // Timeline items scroll animation
    gsap.utils.toArray<Element>('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%' },
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Venue postcard reveal
    gsap.from('.venue-postcard', {
      scrollTrigger: { trigger: '#venueIllustration', start: 'top 90%' },
      y: 50,
      opacity: 0,
      rotation: -5,
      duration: 1.2,
      ease: 'power2.out'
    });

    // Gallery Items Stagger
    gsap.from('.gallery-item', {
      scrollTrigger: { trigger: '#gallerySection', start: 'top 80%' },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'back.out(1.2)'
    });

    // Wedding Party Cards Stagger
    gsap.from('.party-card', {
      scrollTrigger: { trigger: '#weddingPartySection', start: 'top 80%' },
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Countdown dial reveal
    gsap.from('.dial-wrap', {
      scrollTrigger: { trigger: '#countdownSection', start: 'top 80%' },
      opacity: 0,
      scale: 0.85,
      duration: 1,
      ease: 'back.out(1.4)'
    });

    // Closing dua reveal
    gsap.from('.dua-card', {
      scrollTrigger: { trigger: '#closingSection', start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out'
    });

    // Parallax velocity tuning for Timeline images
    gsap.utils.toArray<Element>('.spine-card-img').forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -15,
        ease: 'none'
      });
    });

    // Cinematic Text Reveals for Titles
    gsap.utils.toArray<HTMLElement>('.section-title').forEach(title => {
      const splitTitle = new SplitType(title, { types: 'words,chars' });

      gsap.from(splitTitle.chars, {
        scrollTrigger: { trigger: title, start: 'top 85%' },
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: 'power3.out',
        transformOrigin: '0% 50% -50'
      });
    });
  }, { scope: containerRef });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="wedding-template-2-root">
      <Header />
      <CustomCursor />

      <EnvelopeOverlay />

      <ParticlesCanvas />
      <Petals />

      <div className="main-container" id="mainContainer">
        <HeroSection />
        <RevealSection />
        <CountdownSection />
        <GallerySection />
        <TimelineSection />
        <WeddingPartySection />
        <TransportSection />
        <ClosingSection />
      </div>

      <Modals />
      <InteractiveEffects />
      <div className="time-capsule-toast" id="timeCapsuleToast"></div>
      <div className="shake-hint" id="shakeHint">📱 Shake your phone!</div>
      <div className="pull-indicator" id="pullIndicator">↓ Pull for a surprise</div>
    </div>
  );
}
