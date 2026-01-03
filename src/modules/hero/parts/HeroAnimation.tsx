const HeroAnimation = () => {
  return (
    <>
      <div className="absolute inset-0 top-16 bg-background/50 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 top-16 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-neon-green rounded-full animate-glow-pulse opacity-70 blur-[1px]" />
        <div
          className="absolute top-[30%] right-[25%] w-2.5 h-2.5 bg-neon-blue rounded-full animate-float opacity-60 blur-[0.5px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[35%] left-[20%] w-4 h-4 bg-neon-purple rounded-full animate-node-glow opacity-65 blur-[1px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[55%] right-[18%] w-2 h-2 bg-electric-cyan rounded-full animate-node-pulse opacity-55 blur-[0.5px]"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-[25%] right-[30%] w-3 h-3 bg-neon-green rounded-full animate-float opacity-50 blur-[1px]"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-2 h-2 bg-neon-purple rounded-full animate-glow-pulse opacity-60 blur-[0.5px]"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
    </>
  );
};

export default HeroAnimation;
