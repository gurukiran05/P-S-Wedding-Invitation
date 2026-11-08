'use client';

import { useState, useEffect, useRef } from 'react';

const facts = [
  "💕 Sam & Sofia met at a coffee shop in Florence in 2019",
  "🍷 Their first date was at the Boboli Gardens",
  "✈️ They've traveled to 12 countries together",
  "🍝 Sofia makes the best homemade pasta",
  "🎵 Their song is 'Can't Help Falling in Love'",
  "🐶 They have a golden retriever named Bella",
  "💍 Sam proposed at sunset on the Ponte Vecchio",
  "🍷 They share a love for Tuscan red wines"
];

interface CountdownBlockProps {
  value: string;
  label: string;
  index: number;
  isSeconds?: boolean;
}

function CountdownBlock({ value, label, isSeconds }: CountdownBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    const handleMouseMove = (e: MouseEvent) => {
      const r = block.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      block.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-6px)`;
    };

    const handleMouseLeave = () => {
      block.style.transform = '';
    };

    const handleTouchStart = () => {
      block.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      block.style.transform = 'translateY(-5px) scale(1.05)';
    };

    const handleTouchEnd = () => {
      block.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      block.style.transform = '';
    };

    block.addEventListener('mousemove', handleMouseMove);
    block.addEventListener('mouseleave', handleMouseLeave);
    block.addEventListener('touchstart', handleTouchStart, { passive: true });
    block.addEventListener('touchend', handleTouchEnd);

    return () => {
      block.removeEventListener('mousemove', handleMouseMove);
      block.removeEventListener('mouseleave', handleMouseLeave);
      block.removeEventListener('touchstart', handleTouchStart);
      block.removeEventListener('touchend', handleTouchEnd);
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
    <div ref={blockRef} className="countdown-block magnetic" onClick={handleClick}>
      <span className={`countdown-number ${isSeconds ? 'tick-heartbeat' : ''}`}>{value}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

const villaPhotos = [
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800",
  "https://images.unsplash.com/photo-1543832923-44667a44c804?w=800",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800"
];

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % villaPhotos.length);
    }, 3800);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const tgt = new Date('2027-09-10T16:30:00');
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
        <span style={{ display: "block" }}>Until We Say</span>
        <span style={{ display: "block" }}>"I Do"</span>
      </h2>
      <p className="section-subtitle">COUNTDOWN TO OUR CEREMONY</p>

      <div className="countdown-container" id="countdownContainer" style={{ margin: "1.5rem 0 1.8rem" }}>
        <CountdownBlock value={timeLeft.d} label="Days" index={0} />
        <CountdownBlock value={timeLeft.h} label="Hours" index={1} />
        <CountdownBlock value={timeLeft.m} label="Minutes" index={2} />
        <CountdownBlock value={timeLeft.s} label="Seconds" index={3} isSeconds={true} />
      </div>

      <div className="venue-details" style={{ margin: "1.2rem 0 1.2rem" }}>
        <p className="section-subtitle" style={{ marginBottom: "0.6rem" }}>WEDDING CELEBRATION VENUE</p>
        <h3 className="venue-name">Villa Medicea di Artimino</h3>
        <p className="venue-address" style={{ marginTop: "0.4rem" }}>Viale Papa Meli, 59016 Artimino PO, Italy</p>
        <p className="ceremony-type">Civil Ceremony in the Italian Gardens</p>
      </div>

      <div className="venue-illustration" id="venueIllustration">
        <div className="venue-postcard" style={{ position: "relative" }}>
          <div className="postcard-image" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
            {villaPhotos.map((url, idx) => (
              <div
                key={url}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: idx === currentSlide ? 1 : 0,
                  transition: "opacity 1.2s ease-in-out, transform 5s ease-out",
                  transform: idx === currentSlide ? "scale(1.08)" : "scale(1.0)",
                  filter: "sepia(0.2) contrast(1.15) brightness(1.04)"
                }}
              ></div>
            ))}
            <div className="polaroid-sunlight-ray"></div>
          </div>
          <div style={{ position: "absolute", bottom: "35px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 10 }}>
            {villaPhotos.map((_, idx) => (
              <span
                key={idx}
                style={{
                  width: idx === currentSlide ? "14px" : "4px",
                  height: "4px",
                  borderRadius: "4px",
                  background: idx === currentSlide ? "var(--wine)" : "rgba(0,0,0,0.15)",
                  transition: "all 0.4s ease"
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
