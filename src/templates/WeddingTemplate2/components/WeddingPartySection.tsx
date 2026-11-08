'use client';
import weddingDetails from '../weddingDetails';

export default function WeddingPartySection() {
  return (
    <section className="section" id="weddingPartySection">
      <div className="floral-divider" aria-hidden="true"><span>◈</span><span>❄</span><span>◈</span></div>
      <h2 className="section-title">With the Blessings of Our Families</h2>
      <p className="section-subtitle">TWO FAMILIES, ONE JOYOUS CELEBRATION</p>

      <div className="family-tree-wrap">
        <svg viewBox="0 0 500 260" preserveAspectRatio="none" className="family-tree-svg" aria-hidden="true">
          <path d="M125 60 Q125 130 250 200" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M375 60 Q375 130 250 200" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>
        <div className="family-tree-top-row">
          <div className="family-branch party-card">
            <span className="family-branch-label">GROOM'S FAMILY</span>
            <h4 className="family-branch-name">HODANURU Family</h4>
            <span className="family-branch-relation">With love and blessings</span>
          </div>
          
          <div className="family-branch party-card">
            <span className="family-branch-label">BRIDE'S FAMILY</span>
            <h4 className="family-branch-name">MATASUGURU FAMILY</h4>
            <span className="family-branch-relation">With love and blessings</span>
          </div>
        </div>
        <div className="family-union party-card">
          <span className="family-union-small">Together we celebrate</span>
          <h3 className="family-union-names">{weddingDetails.groom} <br /> &amp; <br /> {weddingDetails.bride}</h3>
          <span className="family-union-date">{weddingDetails.dateDisplay} &middot; Karnataka</span>
        </div>
      </div>

      <div className="experience-header-wrap">
        <div className="floral-divider" aria-hidden="true" style={{ margin: "3.5rem auto 1.2rem" }}><span>◈</span><span>✨</span><span>◈</span></div>
        <h3 className="section-title" style={{ fontSize: "2rem", marginBottom: "0.4rem", color: "var(--wine)" }}>The Celebration Experience</h3>
        <p className="section-subtitle" style={{ color: "var(--gold)", letterSpacing: "2px", marginBottom: "2rem" }}>
          NORTH KARNATAKA TRADITIONS &amp; WARM HOSPITALITY
        </p>
      </div>

      <div className="wedding-notes">
        <div className="note-item">
          <span className="note-icon">🍛</span>
          <div className="note-content">
            <span className="note-title">A Meal Together</span>
            <p>A delicious meal shared with family and friends</p>
          </div>
        </div>
      </div>
    </section>
  );
}
