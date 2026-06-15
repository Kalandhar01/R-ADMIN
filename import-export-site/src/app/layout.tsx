import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ractysh Global Trade | Import, Export & Logistics Solutions",
  description:
    "Premium international trading company connecting manufacturers, suppliers, distributors and businesses through reliable global sourcing, logistics and trade solutions.",
  applicationName: "Ractysh Global Trade",
  keywords: ["import export", "global trade", "logistics", "freight forwarding", "customs clearance", "supply chain"],
  openGraph: {
    title: "Ractysh Global Trade",
    description: "Global Trade. Delivered With Precision.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
