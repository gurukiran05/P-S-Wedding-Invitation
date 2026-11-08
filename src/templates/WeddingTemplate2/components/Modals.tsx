'use client';

import { useState } from 'react';
import weddingDetails from '../weddingDetails';

export default function Modals() {
  const [copyLabel, setCopyLabel] = useState('Copy link');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy link'), 1500);
    } catch {
      setCopyLabel('Copy unavailable');
    }
  };

  const handleWhatsAppShare = () => {
    const message = `✨ *With the blessings of our families* ✨

We joyfully invite you to celebrate the wedding of
💐 *${weddingDetails.groom} & ${weddingDetails.bride}* 💐

🌿 *Mehendi* — 8 December 2026
🌼 *Haldi* — 10 December 2026
💍 *Ring Ceremony* — 10 December 2026, 7:30 PM onwards
🪔 *Muhurtha* — 11 December 2026, 9:00 AM to 9:50 AM
🎉 *Reception* — 11 December 2026, 11:45 AM onwards

📍 *${weddingDetails.venue}*
${weddingDetails.address}
🗺️ ${weddingDetails.mapUrl}

Your presence and blessings will make our celebration even more special. We look forward to celebrating with you! 💛

💌 View the invitation: ${window.location.href}`;
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="share-modal" id="shareModal">
        <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--wine)' }}>Share the Invitation</h3>
        <div className="share-options">
          <button className="share-option" id="shareCopy" onClick={handleCopyLink}>📋<span>{copyLabel}</span></button>
          <button className="share-option" id="shareWhatsApp" onClick={handleWhatsAppShare}>💬<span>WhatsApp</span></button>
          <button className="share-option" id="shareNative" onClick={() => document.getElementById('shareModal')?.classList.remove('show')}>✕<span>Close</span></button>
        </div>
      </div>
    </>
  );
}
