'use client';

export default function HeroSection() {
  return (
    <section className="section" id="heroSection">
      <div className="hero-bg parallax-bg"></div>
      <div className="hero-arch-wrapper" id="heroArch">
        <div className="hero-arch-mask">
          <div className="hero-arch-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200')" }}></div>
        </div>
      </div>
      <p className="hero-sub">THE WEDDING OF</p>
      <div className="guest-welcome visible" id="guestWelcome"></div>
      <div className="hero-names">
        <span id="nameSamText">Sam</span><span className="ampersand">&</span><span id="nameSofiaText">Sofia</span>
        <span className="typewriter-cursor" id="typewriterCursor" style={{ display: 'none' }}></span>
      </div>
      <p className="wedding-tagline" style={{ opacity: 1, animation: 'none' }}>Together with our families, we invite you to celebrate our marriage</p>
      <div className="scroll-hint">
        <span style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>SCROLL TO DISCOVER</span>
        <span className="scroll-arrow">⌄</span>
      </div>
    </section>
  );
}
