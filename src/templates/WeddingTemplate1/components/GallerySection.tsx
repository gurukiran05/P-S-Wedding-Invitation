'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const galleryItems = [
  { thumb: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400', full: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', label: 'The Gardens' },
  { thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400', full: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800', label: 'The Terrace' },
  { thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', full: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', label: 'Reception Hall' },
  { thumb: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400', full: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800', label: 'Sunset View' }
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [curImg, setCurImg] = useState(0);

  const openImg = (i: number) => {
    setCurImg(i);
    setLightboxOpen(true);
    document.documentElement.classList.add('lenis-stopped');
  };

  const closeImg = () => {
    setLightboxOpen(false);
    document.documentElement.classList.remove('lenis-stopped');
  };

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, []);

  return (
    <section className="section" id="gallerySection">
      <h2 className="section-title">Venue Gallery</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, i) => (
          <div key={i} className={`gallery-item item-${i}`} onClick={() => openImg(i)} style={{ backgroundImage: `url(${item.thumb})` }}>
            <span className="gallery-label">{item.label}</span>
          </div>
        ))}
      </div>
      {lightboxOpen && createPortal(
        <div className="gallery-lightbox active" id="galleryLightbox" onClick={closeImg}>
          <button className="lightbox-close">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setCurImg((curImg - 1 + galleryItems.length) % galleryItems.length); }}>‹</button>
          <img id="lightboxImg" src={galleryItems[curImg].full} alt="Venue" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setCurImg((curImg + 1) % galleryItems.length); }}>›</button>
          <div className="lightbox-counter">{curImg + 1} / {galleryItems.length}</div>
        </div>,
        document.body
      )}
    </section>
  );
}
