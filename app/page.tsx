import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CountryFlags from "@/components/CountryFlags";
import WhyBeautyNationsSection from "@/components/WhyBeautyNationsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FoundationSection from "@/components/FoundationSection";
import DirectorsSection from "@/components/DirectorsSection";
import CompetitionSection from "@/components/CompetitionSection";
import GrandFinalSection from "@/components/GrandFinalSection";
import PartnerEnquirySection from "@/components/PartnerEnquirySection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";


export const metadata: Metadata = {
  title: "Beauty Nations | One World. One Beauty Stage.",
  description: "An international competition combining nail artistry, makeup, costume and photography through one creative theme. Grand Final: 18 September 2027, Zagreb.",
  // The canonical belongs to the home page; legal pages must not inherit it.
  alternates: { canonical: siteUrl },
};

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <CompetitionSection />
      <GrandFinalSection />
      <CountryFlags /> 
      <WhyBeautyNationsSection /> 
      <HowItWorksSection />
      <FoundationSection />
      <DirectorsSection />
      <PartnerEnquirySection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}