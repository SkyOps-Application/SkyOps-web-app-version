import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyOps - ATC Radar Simulation",
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
        {children}
      </body>
    </html>
  );
}
