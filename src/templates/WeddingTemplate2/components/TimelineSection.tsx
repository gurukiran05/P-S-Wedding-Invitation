'use client';

import weddingDetails from '../weddingDetails';

const sharedVenue = `${weddingDetails.venue} · ${weddingDetails.address}`;

interface WeddingEvent {
  id: string;
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  story: string;
  venue?: string;
  isFeatured?: boolean;
}

const events: WeddingEvent[] = [
  {
    id: 'mehendi',
    step: 'I',
    badge: '9 December 2026',
    title: 'Mehendi',
    subtitle: 'A celebration of colour and joy',
    image: '/events/mehendi.jpg',
    imageAlt: 'Traditional illustration of a woman applying mehendi',
    story: 'Join our families as we begin the wedding celebrations with the Mehendi function.'
  },
  {
    id: 'haldi', 
    step: 'II',
    badge: '10 December 2026',
    title: 'Haldi',
    subtitle: 'A bright and joyful family gathering',
    image: '/events/haldi.jpg',
    imageAlt: 'Bride celebrating the Haldi ceremony',
    story: 'Celebrate this beautiful pre-wedding tradition with the couple and their families.'
  },
  {
    id: 'ring-ceremony',
    step: 'III',
    badge: '10 December 2026 · 7:30 PM onwards',
    title: 'Ring Ceremony',
    subtitle: 'A promise celebrated together',
    image: '/events/ring-ceremony.jpg',
    imageAlt: 'The couple joining hands with a ring',
    story: 'Be with us as the couple exchange rings and celebrate their commitment.',
    venue: sharedVenue,
  },
  {
    id: 'muhurtha',
    step: 'IV',
    badge: '11 December 2026 · 9:00 AM–9:50 AM',
    title: 'Muhurtha',
    subtitle: 'The wedding ceremony',
    image: '/events/muhurtha.jpg',
    imageAlt: 'Traditional illustration of Hindu wedding rituals',
    story: 'With the blessings of our families, join us for the auspicious wedding ceremony.',
    venue: sharedVenue,
    isFeatured: true
  },
  {
    id: 'reception',
    step: 'V',
    badge: '11 December 2026 · 11:45 AM onwards',
    title: 'Reception',
    subtitle: 'A warm welcome and celebration',
    image: '/events/reception.jpg',
    imageAlt: 'Illustration of a newly married couple celebrating',
    story: 'Join us as we celebrate the newlyweds with family and friends.',
    venue: sharedVenue
  }
];

export default function TimelineSection() {
  return (
    <section className="section" id="eventsSection">
      <div className="floral-divider" aria-hidden="true"><span>◈</span><span>❄</span><span>◈</span></div>
      <h2 className="section-title">Wedding Celebrations</h2>
      <p className="section-subtitle">A FEW MOMENTS TO CELEBRATE TOGETHER</p>

      <div className="spine-wrap">
        <div className="spine-line" aria-hidden="true"></div>
        {events.map((ev, index) => (
          <div
            key={ev.id}
            className={`spine-row timeline-item ${index % 2 === 1 ? 'spine-row-right' : 'spine-row-left'} ${ev.isFeatured ? 'nikah-featured' : ''}`}
          >
            <div className="spine-node">
              <span>{ev.step}</span>
            </div>
            <div className="spine-card">
              <div className="spine-card-img-wrap">
                <img className="spine-card-img" src={ev.image} alt={ev.imageAlt} loading="lazy" />
                {ev.isFeatured && <div className="spine-featured-badge">✨ The Big Day</div>}
              </div>
              <div className="spine-card-info">
                <span className="spine-card-badge">{ev.badge}</span>
                <h3 className="spine-card-title">{ev.title}</h3>
                <p className="spine-card-subtitle">{ev.subtitle}</p>
                <p className="spine-card-story">{ev.story}</p>
                {ev.venue && <p className="spine-card-venue">📍 {ev.venue}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
