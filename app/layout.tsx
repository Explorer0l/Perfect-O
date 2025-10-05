import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar Stories: Space Weather Adventure",
  description: "An interactive digital children's story about space weather and its impact on Earth",
  keywords: ["space weather", "solar flares", "NASA", "children's book", "education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images */}
        <link rel="preload" href="/images/scene1.png" as="image" />
        <link rel="preload" href="/images/scene2.png" as="image" />
        <link rel="preload" href="/images/scene3.png" as="image" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Caveat - для главной страницы */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Patrick Hand - для текста книги (читаемый) */}
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
