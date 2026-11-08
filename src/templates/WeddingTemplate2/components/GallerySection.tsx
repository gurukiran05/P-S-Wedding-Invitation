'use client';

const memories = [
  { src: '/photos/memory-cafe.png', label: 'A joyful day', alt: 'The couple sharing a happy moment together' },
  { src: '/photos/memory-tradition.png', label: 'Together in tradition', alt: 'The couple holding hands outdoors' },
  { src: '/photos/memory-family.png', label: 'Family blessings', alt: 'The couple celebrating with family' },
  { src: '/photos/memory-outing.png', label: 'Little adventures', alt: 'The couple enjoying an outing together' },
];

export default function GallerySection() {
  return (
    <section className="section" id="gallerySection">
      <div className="floral-divider" aria-hidden="true"><span>◈</span><span>✦</span><span>◈</span></div>
      <h2 className="section-title">A Few Happy Memories</h2>
      <p className="section-subtitle" style={{ color: 'var(--gold)', letterSpacing: '2px', marginBottom: '2rem' }}>
        A FEW MOMENTS WE CHERISH
      </p>
      <div className="gallery-bento">
        {memories.map((memory, index) => (
          <div key={memory.label} className={`gallery-bento-item gallery-bento-item-${index + 1} gallery-item`}>
            <img className="gallery-bento-img" src={memory.src} alt={memory.alt} loading="lazy" />
            <div className="gallery-bento-overlay" />
            <div className="gallery-bento-label">{memory.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
