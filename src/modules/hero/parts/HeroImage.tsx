import heroBg from "@/assets/hero-bg.jpg";

const HeroImage = () => {
  return (
    <div
      className="absolute inset-0 top-16 bg-gradient-hero"
      style={{
        backgroundImage: `url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    />
  );
};

export default HeroImage;
