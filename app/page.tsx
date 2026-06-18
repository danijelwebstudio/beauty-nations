import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoundationSection from "@/components/FoundationSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DirectorsSection from "@/components/DirectorsSection";
import FounderSection from "@/components/FounderSection";
// Uncomment once sponsor/partner logos are supplied by the client:
// import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FoundationSection />
      <HowItWorksSection />
      <DirectorsSection />
      <FounderSection />
      {/* <PartnersSection /> */}
      <ContactSection />
    </main>
  );
}
