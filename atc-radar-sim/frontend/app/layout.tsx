import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ATC Radar Simulation - Double Quebec Alpha",
  description: "Air Traffic Control Radar Simulation Training System",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* SVG Filter for Glass Distortion */}
        <svg style={{ display: 'none' }} aria-hidden="true">
          <filter id="glass-distortion">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
          </filter>
        </svg>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
