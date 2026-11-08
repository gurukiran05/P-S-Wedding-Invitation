'use client';

import { useState, type FormEvent } from 'react';
import confetti from 'canvas-confetti';

export default function RSVPSection() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [intolerances, setIntolerances] = useState('');
  const [wishes, setWishes] = useState('');

  const handleRSVP = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (attendance === 'yes' || attendance === 'probably') {
      confetti({ particleCount: 60, spread: 70, colors: ['#8b3a3e', '#c9a96e', '#e8c4b8'], origin: { y: 0.7 } });
      if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
    }

    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('show');
      setTimeout(() => modal.classList.remove('show'), 3000);
    }
  };

  return (
    <section className="section" id="rsvpSection">
      <h2 className="section-title">Confirm Your Attendance</h2>
      <p style={{ fontSize: '0.95rem', color: 'var(--muted-gray)', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", marginTop: '-0.2rem', marginBottom: '1.2rem' }}>
        Looking forward to sharing our special day with you
      </p>
      <form className="rsvp-form" onSubmit={handleRSVP}>
        <div className="input-group">
          <input
            type="text"
            id="fullName"
            placeholder=" "
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="fullName">Full Name</label>
        </div>

        <div className="attendance-group" style={{ textAlign: 'left', margin: '0.6rem 0' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--wine)', marginBottom: '0.7rem', marginLeft: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
            Would you be joining us?
          </p>
          <div className="attendance-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {[
              { id: 'yes', label: '✨ Yes' },
              { id: 'no', label: '🤍 No' },
              { id: 'probably', label: '🤔 Maybe' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAttendance(opt.id)}
                className={`attendance-pill ${attendance === opt.id ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            id="dietary"
            placeholder=" "
            maxLength={60}
            value={intolerances}
            onChange={(e) => setIntolerances(e.target.value)}
          />
          <label htmlFor="dietary">Any food intolerances? (Brief)</label>
        </div>

        <div className="leave-message-group" style={{ textAlign: 'left', margin: '0.8rem 0 0' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--wine)', marginBottom: '0.6rem', marginLeft: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
            Leave a message ✨
          </p>
          <textarea
            id="wishes"
            rows={3}
            placeholder="Write your congratulations and love notes for the couple here..."
            maxLength={200}
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            className="rsvp-textarea"
          ></textarea>
        </div>

        <button type="submit" className="btn-rsvp-submit">
          RSVP
        </button>
      </form>
    </section>
  );
}
