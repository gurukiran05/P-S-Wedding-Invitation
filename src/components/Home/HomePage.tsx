'use client';

import Link from 'next/link';
import { useState, useEffect, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import confetti from 'canvas-confetti';
import './HomePage.css';
import realWeddingMain from '../../assets/real-wedding-main.png';
import realWeddingLeft from '../../assets/real-wedding-left.png';
import realWeddingRight from '../../assets/real-wedding-right.png';

import minimalistPreview from '../../assets/modern-minimalist.png';
import minimalistLeft from '../../assets/minimalist-left.png';
import minimalistRight from '../../assets/minimalist-right.png';

import etherealRomance from '../../assets/ethereal-romance.png';
import etherealLeft from '../../assets/ethereal-left.png';
import etherealRight from '../../assets/ethereal-right.png';

interface Template {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeStyle: CSSProperties;
  imageMain: string;
  imageLeft?: string;
  imageRight?: string;
  isExternalImage?: boolean;
  previewLink: string;
  description: string;
  features: string[];
}

type Device = 'mobile' | 'tablet' | 'desktop';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickViewTemplate, setQuickViewTemplate] = useState<Template | null>(null);

  // Magic UI & Aceternity UI Bento Grid Feature Template Demo States
  const [sealBroken, setSealBroken] = useState(false);
  const [activeDevice, setActiveDevice] = useState<Device>('mobile');
  const [activeDay, setActiveDay] = useState(0);
  const [liveRsvpCount, setLiveRsvpCount] = useState(284);
  const [rsvpFeedIndex, setRsvpFeedIndex] = useState(0);

  const rsvpFeedItems = [
    { name: "Ayesha & Bilal Khan", status: "Attending (2 Guests) • VIP Table", time: "Just now" },
    { name: "Zayn & Sara Malik", status: "Attending (4 Guests) • Halal Gourmet", time: "2m ago" },
    { name: "Dr. Vikram & Sneha", status: "Attending (2 Guests) • Sunset Lounge", time: "5m ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRsvpFeedIndex((prev) => (prev + 1) % rsvpFeedItems.length);
      setLiveRsvpCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [rsvpFeedItems.length]);

  const handleBreakSeal = () => {
    setSealBroken(!sealBroken);
    if (!sealBroken) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fde047', '#f43f5e', '#38bdf8', '#a855f7']
      });
    }
  };

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const categories = ['All', 'Modern & Ethereal', 'Royal & Traditional', 'Destination'];

  const templates: Template[] = [
    {
      id: 'wedding-1',
      title: 'Ethereal Romance',
      category: 'Modern & Ethereal',
      badge: 'NEW ✨',
      badgeStyle: {},
      imageMain: realWeddingMain.src,
      imageLeft: realWeddingLeft.src,
      imageRight: realWeddingRight.src,
      previewLink: '/templates/wedding-1',
      description: 'A delicate blend of soft florals, modern typography, and floating pastel animations tailored for romantic souls.',
      features: ['Floating Petals Animation', 'Interactive RSVP Form', 'Music Player Built-in', 'Custom Countdown Timer']
    },
    {
      id: 'wedding-2',
      title: 'South Indian Muslim',
      category: 'Royal & Traditional',
      badge: 'ROYAL ISLAMIC 🌙',
      badgeStyle: { background: '#064e3b', color: '#fde047' },
      imageMain: 'https://commons.wikimedia.org/wiki/Special:FilePath/Falaknuma_Palace_01.jpg?width=600',
      isExternalImage: true,
      previewLink: '/templates/wedding-2',
      description: 'Inspired by royal palatial architecture, featuring intricate motifs, Urdu/Arabic calligraphy accents, and regal green & gold tones.',
      features: ['Bismillah & Nikaah Intro', 'Royal Palatial Theme', 'Multi-event Timeline', 'GPS Map Directions']
    },
    {
      id: 'destination-1',
      title: 'Destination Love',
      category: 'Destination',
      badge: 'Most Popular 🔥',
      badgeStyle: {},
      imageMain: minimalistPreview.src,
      imageLeft: minimalistLeft.src,
      imageRight: minimalistRight.src,
      previewLink: '#',
      description: 'Designed for beachside vows and destination getaways. Crisp minimalist layout with vibrant sunset and ocean accents.',
      features: ['Travel & Accommodation Guide', 'RSVP for Multiple Events', 'Interactive Weather Widget', 'Photo Gallery']
    },
    {
      id: 'modern-1',
      title: 'Modern Minimalist',
      category: 'Modern & Ethereal',
      badge: 'TRENDING ⚡',
      badgeStyle: { background: '#1e293b', color: '#38bdf8' },
      imageMain: etherealRomance.src,
      imageLeft: etherealLeft.src,
      imageRight: etherealRight.src,
      previewLink: '/templates/wedding-1',
      description: 'Sleek editorial typography combined with generous whitespace and smooth glassmorphic transition effects.',
      features: ['Editorial Magazine Style', 'Instant Calendar Add', 'Gift Registry Link', 'Interactive Love Story']
    }
  ];

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const faqs = [
    {
      question: "Do my guests need to download an app?",
      answer: "Not at all! Our digital invitations are fully web-based and work seamlessly on any modern smartphone, tablet, or desktop browser without any downloads."
    },
    {
      question: "Can I customize the colors, typography, and music?",
      answer: "Absolutely. Every template is highly customizable. We can adjust the typography, color palette, background track, and 3D elements to perfectly match your event's theme."
    },
    {
      question: "How does the live RSVP tracking work?",
      answer: "When guests submit their RSVP through your digital invitation, the data is instantly synced in real-time to a private dashboard or Google Sheet that you can access 24/7."
    },
    {
      question: "How long does the invitation website stay active?",
      answer: "Your invitation website will remain active for 1 full year from the date of creation, giving guests plenty of time to revisit event details and photo galleries."
    }
  ];

  return (
    <div className="home-container">
      {/* Decorative Background for Glassmorphism */}
      <div className="home-bg-wrapper">
        <div className="home-bg-blob blob-1"></div>
        <div className="home-bg-blob blob-2"></div>
        <div className="home-bg-blob blob-3"></div>
      </div>

      {/* Header */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-logo-container">
            <Link href="/" className="home-logo">AlFaaz Invitations</Link>
          </div>

          <nav className="home-nav-links">
            <a href="#designs" className="home-nav-link">Designs</a>
            <a href="#features" className="home-nav-link">Features</a>
            <a href="#how-it-works" className="home-nav-link">How It Works</a>
            <a href="#pricing" className="home-nav-link">Pricing</a>
            <a href="#testimonials" className="home-nav-link">Stories</a>
            <a href="#qa" className="home-nav-link">Q&A</a>
          </nav>

          <div className="home-header-actions">
            <a href="#designs" className="home-btn-outline">Let's Talk</a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-drawer glass-panel">
            <a href="#designs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Designs</a>
            <a href="#features" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#testimonials" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Stories</a>
            <a href="#qa" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Q&A</a>
            <a href="#designs" className="home-btn-primary mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="hero-badge pulse-glow">
            <span>✨ New: 3D Interactive Wax Seals & Falling Petals</span>
          </div>
          <h1 className="home-hero-title">Bespoke Digital Invitations</h1>
          <p className="home-hero-subtitle">
            Celebrate your special moments with elegant, highly interactive, and personalized digital invitations that captivate guests from the very first tap.
          </p>
          <div className="hero-cta-group">
            <a href="#designs" className="home-btn-primary glow-effect">Browse Collection</a>
            <a href="#features" className="home-btn-secondary">Explore Features</a>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="hero-showcase">
          <div className="showcase-card left-card glass-panel">
            <img src={realWeddingLeft.src} alt="Wedding Preview Left" loading="lazy" />
          </div>
          <div className="showcase-card main-card glass-panel">
            <img src={realWeddingMain.src} alt="Wedding Preview Main" fetchPriority="high" />
            <div className="showcase-floating-tag">🌸 Live RSVP Sync</div>
          </div>
          <div className="showcase-card right-card glass-panel">
            <img src={realWeddingRight.src} alt="Wedding Preview Right" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="home-stats-bar glass-panel">
        <div className="stat-item">
          <span className="stat-number">1,000+</span>
          <span className="stat-label">RSVPs Tracked Seamlessly</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">4.9 ★★★★★</span>
          <span className="stat-label">Verified Couple Rating</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Paperless & Eco-Friendly</span>
        </div>
      </section>

      {/* Features Section - Powered by Magic UI & Aceternity UI Bento Grid Template */}
      <section id="features" className="home-features-section">
        <div className="home-section-header">
          <div className="bento-library-badge pulse-glow">
            <span>🚀 Replaced with Magic UI / Aceternity UI Interactive Bento Grid</span>
          </div>
          <span className="section-pretitle">NEXT-GEN INTERACTIVITY</span>
          <h2 className="home-section-title">Engineered to Mesmerize Your Guests</h2>
          <p className="home-section-desc">We upgraded our feature showcase to an open-source animated Bento Grid featuring live micro-widgets, spotlight mouse tracking, and real-time state sync.</p>
        </div>

        <div className="bento-features-grid">
          {/* Card 1: Span 2 cols - Interactive 3D Elements & Wax Seal Demo */}
          <div className="bento-magic-card span-2 glass-panel" onMouseMove={handleCardMouseMove}>
            <div className="bento-card-header">
              <div className="bento-tag">TACTILE 3D MICRO-INTERACTIONS ✨</div>
              <h3 className="bento-title">Interactive Wax Seals & Falling Petals</h3>
              <p className="bento-desc">Guests tap digital royal wax seals that burst into celebratory petals and unlock personalized invite envelopes.</p>
            </div>
            <div className="bento-interactive-showcase">
              <div className="wax-seal-demo-box">
                <button
                  className={`interactive-wax-seal ${sealBroken ? 'broken' : ''}`}
                  onClick={handleBreakSeal}
                  aria-label={sealBroken ? 'Wax seal broken, envelope unlocked' : 'Tap to break royal wax seal and unleash petals'}
                >
                  <span className="seal-emblem" aria-hidden="true">👑</span>
                  <span className="seal-text">{sealBroken ? 'UNSEALED ✨' : 'TAP TO BREAK SEAL'}</span>
                </button>
                <div className="seal-demo-status" aria-live="polite">
                  {sealBroken ? (
                    <span className="status-unlocked animate-fade-in">🎉 Envelope Unlocked! Petals Dispersed.</span>
                  ) : (
                    <span className="status-locked">👆 Interactive Live Demo: Tap seal above</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Span 1 col - Device Switcher Demo */}
          <div className="bento-magic-card span-1 glass-panel" onMouseMove={handleCardMouseMove}>
            <div className="bento-card-header">
              <div className="bento-tag">RESPONSIVE ARCHITECTURE 📱</div>
              <h3 className="bento-title">Bespoke Native App Feel</h3>
              <p className="bento-desc">Fluid layouts optimized for every viewport, retina display, and touch device.</p>
            </div>
            <div className="device-switcher-widget">
              <div className="device-tabs" role="tablist" aria-label="Viewport Preview Mode">
                <button role="tab" aria-selected={activeDevice === 'mobile'} className={`device-tab ${activeDevice === 'mobile' ? 'active' : ''}`} onClick={() => setActiveDevice('mobile')}>📱 Mobile</button>
                <button role="tab" aria-selected={activeDevice === 'tablet'} className={`device-tab ${activeDevice === 'tablet' ? 'active' : ''}`} onClick={() => setActiveDevice('tablet')}>💻 Tablet</button>
                <button role="tab" aria-selected={activeDevice === 'desktop'} className={`device-tab ${activeDevice === 'desktop' ? 'active' : ''}`} onClick={() => setActiveDevice('desktop')}>🖥️ Desktop</button>
              </div>
              <div className={`device-preview-frame ${activeDevice}`}>
                <div className="preview-screen-header">
                  <span className="dot dot-r"></span>
                  <span className="dot dot-y"></span>
                  <span className="dot dot-g"></span>
                  <span className="preview-url">alfaaz.com/ayesha-bilal</span>
                </div>
                <div className="preview-screen-body">
                  <div className="mini-invite-card">
                    <h4>{activeDevice.toUpperCase()} VIEW</h4>
                    <p>Optimized 60 FPS Scroll</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Span 1 col - Live RSVP Concierge */}
          <div className="bento-magic-card span-1 glass-panel" onMouseMove={handleCardMouseMove}>
            <div className="bento-card-header">
              <div className="bento-tag">REAL-TIME CONCIERGE ⚡</div>
              <h3 className="bento-title">Live RSVP & Meal Tracking</h3>
              <p className="bento-desc">Instant cloud sync connects guest responses directly to your WhatsApp and private Google Sheet.</p>
            </div>
            <div className="rsvp-live-widget">
              <div className="rsvp-ticker-header">
                <span className="live-indicator"><span className="ping-circle"></span> LIVE SYNC</span>
                <span className="rsvp-counter">{liveRsvpCount} Confirmed</span>
              </div>
              <div className="rsvp-feed-card animate-slide-up">
                <div className="rsvp-guest-avatar">{rsvpFeedItems[rsvpFeedIndex].name[0]}</div>
                <div className="rsvp-guest-info">
                  <div className="rsvp-guest-name">{rsvpFeedItems[rsvpFeedIndex].name}</div>
                  <div className="rsvp-guest-status">{rsvpFeedItems[rsvpFeedIndex].status}</div>
                </div>
                <div className="rsvp-time">{rsvpFeedItems[rsvpFeedIndex].time}</div>
              </div>
              <div className="rsvp-sheet-badge">
                <span>📊 Auto-Synced to Google Sheets</span>
              </div>
            </div>
          </div>

          {/* Card 4: Span 2 cols - Multi-Event Timeline & GPS Navigation */}
          <div className="bento-magic-card span-2 glass-panel" onMouseMove={handleCardMouseMove}>
            <div className="bento-card-header">
              <div className="bento-tag">PALATIAL LOGISTICS 📍</div>
              <h3 className="bento-title">Multi-Day Timeline & Interactive GPS Concierge</h3>
              <p className="bento-desc">Guide your guests seamlessly through multiple celebrations with embedded interactive maps, dress codes, and calendar reminders.</p>
            </div>
            <div className="timeline-interactive-widget">
              <div className="timeline-day-tabs" role="tablist" aria-label="Multi-Day Timeline Tabs">
                {['Day 1: Mehendi Night', 'Day 2: Royal Nikaah', 'Day 3: Grand Walima'].map((dayStr, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={activeDay === idx}
                    className={`timeline-tab ${activeDay === idx ? 'active' : ''}`}
                    onClick={() => setActiveDay(idx)}
                  >
                    {dayStr}
                  </button>
                ))}
              </div>
              <div className="timeline-day-details">
                <div className="timeline-detail-box">
                  <div className="detail-time-badge">
                    {activeDay === 0 ? '🕒 5:00 PM • Sunset Garden' : activeDay === 1 ? '🕌 11:00 AM • Falaknuma Grand Hall' : '✨ 7:30 PM • Imperial Ballroom'}
                  </div>
                  <h4>{activeDay === 0 ? 'Traditional Mehendi & Sangeet' : activeDay === 1 ? 'Bismillah & Royal Nikaah Ceremony' : 'Grand Reception & Gala Dinner'}</h4>
                  <p>{activeDay === 0 ? 'Dress Code: Vibrant Marigold & Emerald Green pastel ethnic attire.' : activeDay === 1 ? 'Dress Code: Ivory, Gold & Royal Blue Sherwanis & Ghararas.' : 'Dress Code: Formal Black Tie & Evening Gowns.'}</p>
                </div>
                <div className="timeline-map-box">
                  <div className="map-pin-pulse">📍</div>
                  <span>One-Tap GPS Navigation</span>
                  <button className="btn-mini-map" onClick={() => alert('Launching Google Maps navigation demo...')}>🗺️ View Direction Map</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates / Designs Section */}
      <section id="designs" className="home-templates-section">
        <div className="home-section-header">
          <span className="section-pretitle">CURATED PORTFOLIO</span>
          <h2 className="home-section-title">Choose Your Aesthetic</h2>
          <p className="home-section-desc">Select from our artisanal layouts tailored for weddings, nikaahs, and milestone celebrations.</p>

          {/* Category Filter Tabs */}
          <div className="category-filter-tabs" role="tablist" aria-label="Portfolio Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="home-templates-grid">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="template-card">
              <div className="template-card-image-placeholder">
                <img
                  src={template.imageMain}
                  alt={template.title}
                  loading="lazy"
                  className="template-preview-image preview-main"
                  style={template.isExternalImage ? { objectFit: 'cover' } : {}}
                />
                {!template.isExternalImage && (
                  <div className="preview-hover-group">
                    <img src={template.imageLeft} alt="Inside view left" loading="lazy" className="template-preview-image preview-left" />
                    <img src={template.imageRight} alt="Inside view right" loading="lazy" className="template-preview-image preview-right" />
                  </div>
                )}
              </div>
              <div className="template-card-content">
                <span className="template-badge-inline" style={template.badgeStyle}>{template.badge}</span>
                <h3 className="template-card-title serif">{template.title}</h3>
                <p className="template-card-desc">{template.description}</p>
                <div className="template-card-actions">
                  <Link href={template.previewLink} className="btn-preview" aria-label={`Preview ${template.title}`}>Preview</Link>
                  <button onClick={() => setQuickViewTemplate(template)} className="btn-quickview" aria-label={`Quick view ${template.title}`}>Quick View</button>
                  <a href="#pricing" className="btn-order" aria-label={`Order ${template.title}`}>Order</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewTemplate && (
        <div className="quickview-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="quickview-title" onClick={() => setQuickViewTemplate(null)}>
          <div className="quickview-modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="quickview-close" aria-label="Close modal" onClick={() => setQuickViewTemplate(null)}>✕</button>
            <div className="quickview-grid">
              <div className="quickview-image-col">
                <img src={quickViewTemplate.imageMain} alt={quickViewTemplate.title} className="quickview-img" />
              </div>
              <div className="quickview-info-col">
                <span className="template-badge-inline" style={quickViewTemplate.badgeStyle}>{quickViewTemplate.badge}</span>
                <h3 className="quickview-title serif">{quickViewTemplate.title}</h3>
                <p className="quickview-desc">{quickViewTemplate.description}</p>

                <h4 className="quickview-features-heading">Included Features:</h4>
                <ul className="quickview-features-list">
                  {quickViewTemplate.features.map((feat, idx) => (
                    <li key={idx}>✓ {feat}</li>
                  ))}
                </ul>

                <div className="quickview-action-buttons">
                  <Link href={quickViewTemplate.previewLink} className="home-btn-primary" onClick={() => setQuickViewTemplate(null)}>Launch Full Preview</Link>
                  <a href="#pricing" className="home-btn-outline" onClick={() => setQuickViewTemplate(null)}>View Packages</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="home-steps-section">
        <div className="home-section-header">
          <span className="section-pretitle">EFFORTLESS PROCESS</span>
          <h2 className="home-section-title">Three Steps to Perfection</h2>
          <p className="home-section-desc">We handle the technical heavy lifting so you can focus on celebrating.</p>
        </div>

        <div className="home-steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3 className="step-title">Select a Design</h3>
            <p className="step-desc">Choose a template from our curated portfolio that complements the vibe and aesthetic of your event.</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3 className="step-title">Personalize & Tailor</h3>
            <p className="step-desc">Provide your event timeline, love story, couple photographs, and specific typography or color requests.</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3 className="step-title">Share & Track RSVPs</h3>
            <p className="step-desc">Receive your bespoke invitation link, share via WhatsApp or Email, and watch real-time RSVPs roll in.</p>
          </div>
        </div>
      </section>

      {/* Pricing / Packages Section */}
      <section id="pricing" className="home-pricing-section">
        <div className="home-section-header">
          <span className="section-pretitle">TRANSPARENT PACKAGES</span>
          <h2 className="home-section-title">Investment for Your Big Day</h2>
          <p className="home-section-desc">Choose the level of interactivity and customization that suits your celebration.</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card glass-panel">
            <h3 className="pricing-tier-name">Essential Digital</h3>
            <div className="pricing-price">$49 <span className="pricing-duration">/ event</span></div>
            <p className="pricing-tier-desc">Perfect for intimate gatherings and sleek single-event invites.</p>
            <ul className="pricing-features">
              <li>✓ Choice of Standard Template</li>
              <li>✓ Responsive Mobile & Desktop View</li>
              <li>✓ Integrated RSVP Form Sync</li>
              <li>✓ Event Directions & Google Maps</li>
              <li>✓ 1 Full Year Website Hosting</li>
            </ul>
            <a href="#designs" className="home-btn-outline pricing-btn">Select Essential</a>
          </div>

          <div className="pricing-card popular-tier glass-panel">
            <div className="popular-badge">MOST POPULAR 🔥</div>
            <h3 className="pricing-tier-name">Royal Interactive</h3>
            <div className="pricing-price">$99 <span className="pricing-duration">/ event</span></div>
            <p className="pricing-tier-desc">Our flagship experience with immersive 3D animations and audio.</p>
            <ul className="pricing-features">
              <li>✓ Everything in Essential Digital</li>
              <li>✓ 3D Interactive Wax Seal & Petals</li>
              <li>✓ Custom Background Audio Track</li>
              <li>✓ Multi-Event Timeline & Countdown</li>
              <li>✓ Dedicated Photo & Video Gallery</li>
              <li>✓ Custom Slug (alfaaz.com/you)</li>
            </ul>
            <a href="#designs" className="home-btn-primary pricing-btn glow-effect">Select Royal</a>
          </div>

          <div className="pricing-card glass-panel">
            <h3 className="pricing-tier-name">Bespoke Luxury</h3>
            <div className="pricing-price">$199 <span className="pricing-duration">/ event</span></div>
            <p className="pricing-tier-desc">Tailor-made design built from scratch with our lead designers.</p>
            <ul className="pricing-features">
              <li>✓ 100% Custom Layout & Artwork</li>
              <li>✓ Custom Domain (yournames.com)</li>
              <li>✓ Password Protected VIP Access</li>
              <li>✓ WhatsApp RSVP Integration Concierge</li>
              <li>✓ Priority 24/7 Design Support</li>
            </ul>
            <a href="#designs" className="home-btn-outline pricing-btn">Consult Designer</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="home-testimonials-section">
        <div className="home-section-header">
          <span className="section-pretitle">COUPLE LOVE STORIES</span>
          <h2 className="home-section-title">Loved by Couples Worldwide</h2>
          <p className="home-section-desc">See what brides and grooms have to say about their AlFaaz experience.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card glass-panel">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"Our guests couldn't stop talking about the interactive wax seal and falling rose petals. AlFaaz made collecting our 300+ RSVPs completely effortless!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">A&B</div>
              <div className="author-info">
                <h4>Ayesha & Bilal</h4>
                <span>Hyderabad • Royal Islamic Invite</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"Planning a destination wedding in Goa meant sharing flight and hotel details. The custom timeline and travel guide section saved us hundreds of questions."</p>
            <div className="testimonial-author">
              <div className="author-avatar">Z&K</div>
              <div className="author-info">
                <h4>Zara & Kabir</h4>
                <span>Mumbai • Destination Love Invite</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"We wanted something modern yet timeless. The editorial typography and built-in music player set the exact romantic mood we dreamed of."</p>
            <div className="testimonial-author">
              <div className="author-avatar">S&V</div>
              <div className="author-info">
                <h4>Sneha & Vikram</h4>
                <span>Bangalore • Ethereal Romance Invite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section id="qa" className="home-qa-section">
        <div className="home-section-header">
          <span className="section-pretitle">QUESTIONS & ANSWERS</span>
          <h2 className="home-section-title">Frequently Asked Questions</h2>
          <p className="home-section-desc">Everything you need to know about our digital invitation experience.</p>
        </div>

        <div className="home-faq-container" role="region" aria-label="Frequently Asked Questions">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
            >
              <div
                className="faq-question"
                role="button"
                tabIndex={0}
                aria-expanded={activeFaq === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                onClick={() => toggleFaq(index)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaq(index);
                  }
                }}
              >
                {faq.question}
                <span className="faq-toggle" aria-hidden="true">{activeFaq === index ? '−' : '+'}</span>
              </div>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="home-cta-section">
        <div className="home-cta-content">
          <h2 className="home-cta-title">Ready to Craft Something Beautiful?</h2>
          <p className="home-cta-desc">Let's build an unforgettable digital experience that sets the tone for your special day.</p>
          <a href="#designs" className="home-btn-primary glow-effect">Get Started Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-content">
          <div className="home-logo">AlFaaz Invitations</div>
          <p className="footer-tagline">Elevating wedding invitations through immersive digital craftsmanship.</p>
          <p className="footer-copyright">&copy; {new Date().getFullYear()} AlFaaz Invitations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
