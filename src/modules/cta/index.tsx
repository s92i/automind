import { Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-linear-to-r from-secondary/20 via-background to-secondary/20">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-neon-green rounded-full animate-glow-pulse" />
            <div className="absolute -top-2 -right-8 w-2 h-2 bg-neon-blue rounded-full animate-float" />
            <div className="absolute -bottom-4 left-8 w-2.5 h-2.5 bg-accent rounded-full animate-node-pulse" />

            <div className="bg-gradient-card p-12 rounded-3xl border border-primary/20 backdrop-blur-sm shadow-elevated">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Ready to Automate ?</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Build your first workflow today
                <br />
                <span className="text-accent">Free forever</span>
              </h2>

              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers and teams who trust Automind for
                their automation needs. Start building powerful workflows in
                minutes, not hours
              </p>

              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-neon-blue rounded-full animate-glow-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <span>Setup in Under 2 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-accent rounded-full animate-glow-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
