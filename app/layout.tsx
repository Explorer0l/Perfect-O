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
      </head>
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
