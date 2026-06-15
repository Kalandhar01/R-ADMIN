import type { Metadata } from "next";
import { ServicesPageClient } from "./services-page-client";

export const metadata: Metadata = {
  title: "All Services | Ractysh Global Trade",
  description: "Comprehensive import, export, sourcing, logistics, and compliance services for global businesses.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
