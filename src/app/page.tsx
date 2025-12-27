import Header from "@/components/header";
import HeroSection from "@/modules/hero";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
    </div>
  );
};

export default Page;
