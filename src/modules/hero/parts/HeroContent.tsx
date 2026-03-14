import { Zap } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            Next-Gen Workflow Automation
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Automate Everything
          <br />
          <span className="text-accent">Smarter</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Automind is the next-gen open SaaS to build and run workflows with AI
          superpowers. Connect any service and automate any process
        </p>
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <span>Free Forever Plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-glow-pulse" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse" />
            <span>Setup in 2 Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
