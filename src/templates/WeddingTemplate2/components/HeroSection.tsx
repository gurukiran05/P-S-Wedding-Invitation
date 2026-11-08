'use client';
import weddingDetails from '../weddingDetails';


export default function HeroSection() {
  return (
    <section className="section" id="heroSection">
      <div className="hero-bg parallax-bg"></div>
      <div style={{ textAlign: 'center', margin: '0.5rem auto 2.5rem', zIndex: 10, position: 'relative' }}>
        <div style={{ fontFamily: "'Noto Sans Kannada', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--wine)' }}>
          ಶುಭ ವಿವಾಹ
        </div>
        <p style={{ fontFamily: 'Cinzel', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.4rem' }}>
          WITH THE BLESSINGS OF OUR FAMILIES
        </p>
      </div>
      <div className="hero-arch-wrapper" id="heroArch">
        <div className="hero-arch-mask">
          <div className="hero-arch-image" role="img" aria-label="The couple together"></div>
        </div>
      </div>
      <p className="hero-sub">A JOYOUS CELEBRATION OF</p>
      <div className="guest-welcome visible" id="guestWelcome"></div>
      <div className="hero-names">
        <span id="nameSamText">{weddingDetails.groom}</span><span className="ampersand">&</span><span id="nameSofiaText">{weddingDetails.bride}</span>
        <span className="typewriter-cursor" id="typewriterCursor" style={{ display: 'none' }}></span>
      </div>
      <p className="wedding-tagline" style={{ opacity: 1, animation: 'none' }}>Together with our families, we invite you to celebrate our wedding</p>
      <div className="scroll-hint">
        <span style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>SCROLL TO DISCOVER</span>
        <span className="scroll-arrow">⌄</span>
      </div>
    </section>
  );
}
