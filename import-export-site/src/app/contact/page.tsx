import type { Metadata } from "next";
import { ContactPageClient } from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us | Ractysh Global Trade",
  description: "Get in touch with our trade experts for import, export, and logistics solutions.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
