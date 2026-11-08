import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../global.css";

export const metadata: Metadata = {
  title: "P&S Wedding Invitation",
  description:
    "A joyful invitation to celebrate a South Indian wedding.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>',
  },
  openGraph: {
    title: "P&S Wedding Invitation",
    description: "Join us to celebrate a wedding.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P&S Wedding Invitation",
    description: "Join us to celebrate a wedding.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
