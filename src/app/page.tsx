import Header from "@/components/header";
import Features from "@/modules/features";
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
    </div>
  );
};

export default Page;
