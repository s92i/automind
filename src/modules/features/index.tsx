import { FEATURES } from "@/components/config/items"
import { Card } from "@/components/ui/card"
import { Activity, BookOpen, Brain, CreditCard, Globe, Puzzle, Shield, Zap } from "lucide-react";

const ICON_MAP = {
    brain: Brain,
    puzzle: Puzzle,
    shield: Shield,
    activity: Activity,
    bookopen: BookOpen,
    creditcard: CreditCard,
    zap: Zap,
    globe: Globe
} as const;

const Features = () => {
    return (
        <section id="features" className="py-24 px-6 bg-linear-to-b from-secondary/20 to-background">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Everything You Need to Automate</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Powerful features designed for developers and teams who want to build sophisticated automation workflows</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => {
                        const Icon = ICON_MAP[feature.icon]
                        return (
                            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                                <Card className="p-6 h-full bg-gradient-card border-primary/10 backdrop-blur-sm hover:shadow-glow-primary transition-all duration-300 group">
                                    <div className="mb-4">
                                        <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center">
                                            <Icon className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-secondary/30 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <span className="text-sm">
                            <span className="text-muted-foreground">Payments powered by</span>
                            <span className="font-semibold text-foreground ml-1">Stripe</span>
                            <span className="text-muted-foreground mx-2">+</span>
                            <span className="font-semibold text-foreground">Cryptomus</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features