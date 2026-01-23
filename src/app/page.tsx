import Header from "@/components/header";
import Features from "@/modules/features";
import HeroSection from "@/modules/hero";
import HowItWorks from "@/modules/howitworks";
import Templates from "@/modules/templates";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Templates />
    </div>
  );
};

export default Page;
