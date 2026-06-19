import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CountryFlags from "@/components/CountryFlags";
import WhyBeautyNationsSection from "@/components/WhyBeautyNationsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FoundationSection from "@/components/FoundationSection";
import DirectorsSection from "@/components/DirectorsSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <CountryFlags /> 
      <WhyBeautyNationsSection /> 
      <HowItWorksSection />
      <FoundationSection />
      <DirectorsSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}