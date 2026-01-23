export const NAV_ITEMS = [
  { name: "Features", href: "#features", icon: "zap" },
  { name: "Templates", href: "#templates", icon: "book" },
  { name: "Pricing", href: "#pricing", icon: "credit-card" },
  { name: "Community", href: "#community", icon: "users" },
  { name: "Github", href: "#github", icon: "github" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    icon: "webhook",
    title: "trigger",
    description: "Start workflows from webhooks, schedules, forms, or any event",
    details: ["Webhooks", "Cron Jobs", "Stripe Events", "Gmail", "HTTP Requests"],
  },
  {
    icon: "workflow",
    title: "Build Workflow",
    description: "Drag-and-drop visual editor with 200+ integrations",
    details: ["Visual Editor", "AI Nodes", "Code Blocks", "Conditions", "Loops"],
  },
  {
    icon: "playcircle",
    title: "Run & Monitor",
    description: "Execute workflows with real-time logs and error handling",
    details: ["Live Execution", "Error Retry", "Debug Logs", "Performance", "Alerts"],
  },
  {
    icon: "barchart3",
    title: "Scale & Optimize",
    description: "Monitor performance and scale workflows automatically",
    details: ["Analytics", "Auto-Scale", "Load Balancing", "Team Collaboration", "API Access"],
  },
] as const satisfies readonly {
  icon: "webhook" | "workflow" | "playcircle" | "barchart3";
  title: string;
  description: string;
  details: readonly string[];
}[];

export const FEATURES = [
  {
    icon: "brain",
    title: "AI Nodes",
    description: "Integrate OpenAI, Claude, Gemini, and more AI models directly into your workflows",
    color: "text-neon-purple"
  },
  {
    icon: "puzzle",
    title: "200+ Integrations",
    description: "Connect Slack, Notion, Google Sheets, Stripe, Discord, and hundreds more services",
    color: "text-neon-blue"
  },
  {
    icon: "shield",
    title: "Secure Credential Vault",
    description: "Enterprise-grade security for API keys and sensitive data with encryption",
    color: "text-neon-green"
  },
  {
    icon: "activity",
    title: "Live Logs & Monitoring",
    description: "Real-time execution logs, error tracking, and performance monitoring",
    color: "text-neon-cyan"
  },
  {
    icon: "bookopen",
    title: "Templates Library",
    description: "Start fast with pre-built workflows for common automation patterns",
    color: "text-neon-purple"
  },
  {
    icon: "creditcard",
    title: "Flexible Billing",
    description: "Pay with Stripe or crypto through Cryptomus. Scale as you grow",
    color: "text-neon-blue"
  },
  {
    icon: "zap",
    title: "High Performance",
    description: "Lightning-fast execution with automatic scaling and error recovery",
    color: "text-neon-green"
  },
  {
    icon: "globe",
    title: "Global Edge Network",
    description: "Run workflows closer to your users with our wolrdwide infrastructure",
    color: "text-neon-orange"
  }
] as const satisfies readonly {
  icon: "brain" | "puzzle" | "shield" | "activity" | "bookopen" | "creditcard" | "zap" | "globe";
  title: string;
  description: string;
  color: string;
}[]

export const TEMPLATES = []