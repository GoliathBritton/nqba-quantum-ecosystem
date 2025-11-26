import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NQBA Quantum Ecosystem",
  description: "FLYFOX AI Quantum Ecosystem – QHC + QDH + Dynex + SigmaEQ v4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
