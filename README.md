# Wedding Invitation

A single-page, mobile-friendly wedding invitation built with Next.js. The site is exported as static files, so it can be hosted without a paid server or database.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Personalize the invitation

Update `src/templates/WeddingTemplate2/weddingDetails.ts` with the couple's names, date, venue, and map link. The countdown starts when `dateISO` is set; use an India time zone offset such as `2027-02-14T10:30:00+05:30`. Replace the illustrated placeholders in `src/templates/WeddingTemplate2/components/GallerySection.tsx` with the couple's photos when ready.

The envelope starts the peaceful background track in `public/wedding-music.mp3`. The music button can pause or resume it afterward.

## Build and deploy

```bash
npm run build
```

The static site is written to `out/`. Import this repository into Vercel and deploy with the free Hobby plan for a personal wedding invitation. Vercel will build it on each push.
