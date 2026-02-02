import Header from "@/components/header";
import CTA from "@/modules/cta";
import Features from "@/modules/features";
import Footer from "@/modules/footer";
import HeroSection from "@/modules/hero";
import HowItWorks from "@/modules/howitworks";
import Pricing from "@/modules/pricing";
import Templates from "@/modules/templates";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Templates />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Page;
