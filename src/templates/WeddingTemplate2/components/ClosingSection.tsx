'use client';
import weddingDetails from '../weddingDetails';

export default function ClosingSection() {
  const stars = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 6.5) % 92 + 4}%`,
    delay: `${(i * 1.2) % 7}s`,
    duration: `${6 + ((i * 2) % 5)}s`,
    size: `${3 + (i % 4)}px`
  }));

  return (
    <section className="section" id="closingSection" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="golden-dust-container" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="golden-dust-particle"
            style={{
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
              width: s.size,
              height: s.size
            }}
          />
        ))}
      </div>
      <div className="floral-divider" aria-hidden="true"><span>◈</span><span>❄</span><span>◈</span></div>
      <div className="dua-card">
        <p className="dua-arabic">ಮಂಗಳಕರವಾಗಲಿ</p>
        <p className="dua-translit">May this new beginning be filled with love and joy</p>
        <p className="dua-ayah">With love, from both families</p>
      </div>
      <p className="footer-credit">With love, {weddingDetails.groom} &amp; {weddingDetails.bride} ✦</p> <br />
      <p className="developer-credit">Developed by Gurukiran G</p>
    </section>
  );
}
