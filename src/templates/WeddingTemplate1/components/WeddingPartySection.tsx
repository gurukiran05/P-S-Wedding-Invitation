'use client';

export default function WeddingPartySection() {
  return (
    <section className="section" id="weddingPartySection">
      <h2 className="section-title">The Wedding Party</h2>
      <div className="divider"></div>
      <div className="wedding-party-grid">
        <div className="portrait-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400')" }}>
          <div className="party-card-overlay">
            <span className="party-role">Maid of Honor</span>
            <span className="party-name">Elena Rossi</span>
            <span className="party-relation">Sister of the Bride</span>
          </div>
        </div>
        <div className="portrait-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400')" }}>
          <div className="party-card-overlay">
            <span className="party-role">Best Man</span>
            <span className="party-name">Marco Bianchi</span>
            <span className="party-relation">Brother of the Groom</span>
          </div>
        </div>
      </div>
      <div className="wedding-notes">
        <div className="note-item">
          <span className="note-icon">F</span>
          <div>
            <span className="note-title">Flowers</span>
            <p>Tuscan roses, olive branches & lavender</p>
          </div>
        </div>
        <div className="note-item">
          <span className="note-icon">M</span>
          <div>
            <span className="note-title">Music</span>
            <p>String quartet for ceremony, live band for reception</p>
          </div>
        </div>
        <div className="note-item">
          <span className="note-icon">W</span>
          <div>
            <span className="note-title">Wine</span>
            <p>Selected from the villa's own vineyards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
