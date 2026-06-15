"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { WhoWeAreSection } from "@/components/sections/who-we-are-section";
import { ServicesSection } from "@/components/sections/services-section";
import { GlobalNetworkSection } from "@/components/sections/global-network-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

export function TradeExperience() {
  return (
    <SmoothScrollProvider>
      <main className="relative bg-[#f8f7f4]">
        <HeroSection />
        <WhoWeAreSection />
        <ServicesSection />
        <GlobalNetworkSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <IndustriesSection />
        <ContactSection />
        <FooterSection />
      </main>
    </SmoothScrollProvider>
  );
}
