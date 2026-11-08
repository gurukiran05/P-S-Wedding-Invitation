'use client';

export default function DressCodeSection() {
  return (
    <section className="section" id="dressCodeSection">
      <h2 className="section-title">Dress Code</h2>
      <p className="dress-code-subtitle">Formal Attire</p>
      <p className="dress-code-note">Please avoid wearing white colors</p>

      <div className="dress-code-frames">
        <div className="frame-circle frame-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566164287518-c2b64d39c099?w=400')" }}></div>
        <div className="frame-circle frame-right" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=400')" }}></div>
      </div>

      <div className="palette-title">
        <span className="palette-line"></span>
        <span>Color Palette</span>
        <span className="palette-line"></span>
      </div>
      <div className="color-palette">
        <div className="color-swatch" style={{ background: "#8b3a3e" }} data-name="Burgundy"></div>
        <div className="color-swatch" style={{ background: "#2d5a4b" }} data-name="Emerald"></div>
        <div className="color-swatch" style={{ background: "#2a3a5c" }} data-name="Navy"></div>
        <div className="color-swatch" style={{ background: "#c9a96e" }} data-name="Gold"></div>
      </div>
    </section>
  );
}
