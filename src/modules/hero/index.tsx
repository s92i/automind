import HeroAnimation from "./parts/HeroAnimation";
import HeroContent from "./parts/HeroContent";
import HeroImage from "./parts/HeroImage";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroImage />
      <HeroAnimation />
      <HeroContent />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
