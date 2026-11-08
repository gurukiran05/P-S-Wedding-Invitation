'use client';

export default function DressCodeSection() {
  return (
    <section className="section" id="dressCodeSection">
      <div className="floral-divider" aria-hidden="true"><span>◈</span><span>❖</span><span>◈</span></div>
      
      <h2 className="section-title">Attire</h2>
      <p className="dress-code-subtitle">Celebrate with us in festive South Indian style</p>
      
      <div className="dress-code-arch-container">
        <div className="dress-code-arch-offset-frame"></div>
        <div className="dress-code-arch-frame">
          <div className="dress-code-inner-arch-border"></div>
          <div className="dress-code-illustration" role="img" aria-label="Festive South Indian wedding attire inspiration">
            <span aria-hidden="true">🥻</span>
            <span aria-hidden="true">🌼</span>
          </div>
        </div>
      </div>

      <div className="attire-unified-card">
        <div className="attire-split-grid">
          <div className="attire-col">
            <div className="inspiration-icon">✨</div>
            <h4 className="inspiration-title">Ladies</h4>
            <p className="inspiration-desc">Sarees and festive attire</p>
          </div>
          <div className="attire-divider-vertical" aria-hidden="true"></div>
          <div className="attire-col">
            <div className="inspiration-icon">👑</div>
            <h4 className="inspiration-title">Gentlemen</h4>
            <p className="inspiration-desc">Traditional and festive attire</p>
          </div>
        </div>

        <div className="attire-palette-section">
          <div className="palette-title">
            <span className="palette-line"></span>
            <span>Recommended Palette</span>
            <span className="palette-line"></span>
          </div>
          
          <div className="color-palette">
            <div className="palette-item">
              <div className="color-swatch-circle swatch-ivory" style={{ background: "#ffffff", border: "1.5px solid #d4af37" }} title="Ivory White"></div>
              <span className="swatch-label">Ivory White</span>
            </div>
            <div className="palette-item">
              <div className="color-swatch-circle swatch-gold" style={{ background: "#d4af37" }} title="Gold Zari"></div>
              <span className="swatch-label">Gold Zari</span>
            </div>
            <div className="palette-item">
              <div className="color-swatch-circle swatch-champagne" style={{ background: "#f0e6d2" }} title="Champagne"></div>
              <span className="swatch-label">Champagne</span>
            </div>
            <div className="palette-item">
              <div className="color-swatch-circle swatch-bronze" style={{ background: "#7a6348" }} title="Antique Bronze"></div>
              <span className="swatch-label">Antique Bronze</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
