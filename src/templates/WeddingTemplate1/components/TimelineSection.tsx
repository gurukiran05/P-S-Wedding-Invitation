'use client';

import { useState } from 'react';

export default function TimelineSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const events = [
    { time: '4:30 PM', title: 'Wedding Ceremony', desc: 'Civil ceremony in the Renaissance gardens', icon: 'I', extra: 'We decided on a short, personal ceremony surrounded by our closest friends and family.' },
    { time: '6:00 PM', title: 'Cocktail Hour', desc: 'Aperitivo & live string quartet on the terrace', icon: 'II', extra: 'Try the signature "Tuscan Sunset" cocktail! It was the first drink we ever shared.' },
    { time: '8:00 PM', title: 'Wedding Dinner', desc: 'Four-course Tuscan feast under the stars', icon: 'III', extra: 'We personally taste-tested all 4 courses. The truffle risotto is to die for!' },
    { time: '10:30 PM', title: 'Wedding Reception', desc: 'Dancing, cake cutting & celebration until late', icon: 'IV', extra: 'Bring your dancing shoes. Sam has been practicing his moonwalk.' },
    { time: '1:00 AM', title: 'Farewell Send-off', desc: 'Sparkler exit & late-night snacks', icon: 'V', extra: 'Midnight pizza slices before we head off!' }
  ];

  return (
    <section className="section">
      <h2 className="section-title">Wedding Day Timeline</h2>
      <p className="section-subtitle">A CELEBRATION OF LOVE IN TUSCANY</p>
      <div className="divider"></div>
      <div className="timeline">
        <div className="timeline-line"></div>
        {events.map((ev, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <div key={i} className="timeline-item" style={{ opacity: 1, transform: 'none', cursor: 'pointer' }} onClick={() => setExpandedIndex(isExpanded ? null : i)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-time">{ev.time}</span>
                <h3 className="timeline-title">{ev.title}</h3>
                <p className="timeline-desc">{ev.desc}</p>
                <div style={{ maxHeight: isExpanded ? '100px' : '0', overflow: 'hidden', transition: 'all 0.4s ease', marginTop: isExpanded ? '0.5rem' : '0', opacity: isExpanded ? 1 : 0 }}>
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--wine)' }}>✨ {ev.extra}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
