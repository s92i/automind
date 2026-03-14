import { TEMPLATES } from "@/components/config/home/items";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Bot,
  CreditCard,
  Database,
  FileText,
  Mail,
  Webhook,
} from "lucide-react";

const ICON_MAP = {
  creditcard: CreditCard,
  filetext: FileText,
  mail: Mail,
  webhook: Webhook,
  database: Database,
  bot: Bot,
};

const Templates = () => {
  return (
    <section id="templates" className="py-24 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            Start from Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Launch your automation journey with battle-tested templates.
            One-click setup, instant results
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TEMPLATES?.map((template, index) => {
            const Icon = ICON_MAP[template.icon];

            return (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  className={`p-6 h-full bg-gradient-card border-2 ${template.color} backdrop-blur-sm hover:shadow-glass transition-all duration-300 group`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-card p-8 rounded-2xl border border-primary/20 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">200+ More Templates</h3>
            <p className="text-muted-foreground mb-6">
              Explore our complete library of workflow templates for every use
              case imaginable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
