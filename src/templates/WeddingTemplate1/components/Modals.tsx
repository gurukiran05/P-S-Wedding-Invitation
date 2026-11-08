'use client';

export default function Modals() {
  const getGoogleCalUrl = () => {
    const title = encodeURIComponent("Wedding of Sam & Sofia");
    const details = encodeURIComponent("We can't wait to celebrate our special day with you! Ceremony starts at 4:30 PM.");
    const location = encodeURIComponent("Villa Medicea di Artimino, Viale Papa Meli, 59016 Artimino PO, Italy");
    const dates = "20270910T143000Z/20270910T213000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const getOutlookCalUrl = () => {
    const title = encodeURIComponent("Wedding of Sam & Sofia");
    const body = encodeURIComponent("We can't wait to celebrate our special day with you! Ceremony starts at 4:30 PM.");
    const location = encodeURIComponent("Villa Medicea di Artimino, Viale Papa Meli, 59016 Artimino PO, Italy");
    const startdt = "2027-09-10T16:30:00";
    const enddt = "2027-09-10T23:30:00";
    return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&startdt=${startdt}&enddt=${enddt}&body=${body}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sam and Sofia Wedding//EN",
      "BEGIN:VEVENT",
      "UID:wedding-sam-sofia-20270910@wedding.com",
      "DTSTAMP:20260101T000000Z",
      "DTSTART:20270910T143000Z",
      "DTEND:20270910T213000Z",
      "SUMMARY:Wedding of Sam & Sofia",
      "DESCRIPTION:We can't wait to celebrate our special day with you! Ceremony starts at 4:30 PM.",
      "LOCATION:Villa Medicea di Artimino, Viale Papa Meli, 59016 Artimino PO, Italy",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Sam_and_Sofia_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    const m = document.getElementById('calendarModal');
    if (m) m.classList.remove('show');
  };

  return (
    <>
      <div className="success-modal" id="successModal">
        <div style={{ fontSize: "3rem" }}>✨</div>
        <h2 style={{ fontFamily: "Playfair", color: "var(--wine)" }}>Thank You!</h2>
        <p>Your response has been recorded.</p>
      </div>
      <div className="share-modal" id="shareModal">
        <h3 style={{ fontFamily: "Playfair", color: "var(--wine)" }}>Share the Joy</h3>
        <div className="share-options">
          <button className="share-option" id="shareCopy">📋<span>Copy</span></button>
          <button className="share-option" id="shareWhatsApp">💬<span>WhatsApp</span></button>
          <button className="share-option" id="shareNative" onClick={() => document.getElementById('shareModal')?.classList.remove('show')}>✕<span>Close</span></button>
        </div>
      </div>
      <div className="calendar-modal" id="calendarModal">
        <h3 style={{ fontFamily: "Playfair", color: "var(--wine)", marginBottom: "0.5rem" }}>Add to Calendar</h3>
        <p style={{ fontSize: "0.82rem", color: "var(--muted-gray)", marginBottom: "1.2rem" }}>Select your calendar platform below:</p>
        <button className="cal-option cal-google" id="calGoogle" onClick={() => { window.open(getGoogleCalUrl(), '_blank'); closeModal(); }}>📅 Google Calendar</button>
        <button className="cal-option cal-apple" id="calApple" onClick={() => { downloadIcsFile(); closeModal(); }}>🍎 Apple Calendar (.ics)</button>
        <button className="cal-option cal-outlook" id="calOutlook" onClick={() => { window.open(getOutlookCalUrl(), '_blank'); closeModal(); }}>📧 Outlook Calendar</button>
        <button className="cal-option cal-close" id="calClose" onClick={closeModal}>Close</button>
      </div>
    </>
  );
}
