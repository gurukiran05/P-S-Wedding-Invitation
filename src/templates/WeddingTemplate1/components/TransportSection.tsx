'use client';

export default function TransportSection() {
  return (
    <section className="section" id="transportSection">
      <h2 className="section-title">How to Get There</h2>
      <p style={{ fontSize: "1.05rem", color: "var(--cream)", marginBottom: "0.2rem" }}>We would love to see you there!</p>
      <p style={{ fontSize: "0.88rem", color: "var(--gold-light)", fontStyle: "italic", marginBottom: "1.5rem", opacity: 0.9 }}>
        Click below for the venue location & directions
      </p>

      <div className="transport-route" id="transportRoute" style={{ margin: "1rem auto 2rem", maxWidth: "400px" }}>
        <svg className="route-svg" viewBox="0 0 300 70" style={{ overflow: "visible" }}>
          <path className="route-path" id="busRoute" d="M20 40 Q150 5 280 40" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.6" />
          <circle cx="20" cy="40" r="6" fill="var(--wine)" stroke="var(--gold-light)" strokeWidth="2" />
          <text x="5" y="62" fontSize="11" fill="var(--muted-gray)" fontFamily="serif">Florence</text>

          <circle cx="280" cy="40" r="6" fill="var(--gold)" />
          <text x="260" y="62" fontSize="11" fill="var(--gold-light)" fontFamily="serif">Villa</text>

          <g>
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M20 40 Q150 5 280 40"
            />
            <text x="18" y="-4" fontSize="36" transform="scale(-1, 1)" className="bus-icon-svg" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
              🏎️
            </text>
          </g>
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <button
          className="directions-btn"
          id="directionsBtn"
          onClick={() => window.open('https://maps.google.com/?q=Villa+Medicea+di+Artimino', '_blank')}
          style={{
            background: "linear-gradient(135deg, #f5e5c0 0%, #c9a96e 50%, #9e7f3a 100%)",
            color: "#1e080a",
            fontWeight: "700",
            letterSpacing: "2.5px",
            padding: "0.85rem 2.2rem",
            borderRadius: "50px",
            boxShadow: "0 8px 25px rgba(201, 169, 110, 0.35)",
            border: "none"
          }}
        >
          📍 GET DIRECTIONS
        </button>
      </div>
    </section>
  );
}
