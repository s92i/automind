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

export const TEMPLATES = [
  {
    icon: "creditcard",
    title: "Stripe -> Notion CRM",
    description: "Automatically create customer records in Notion when Stripe payments are received",
    tags: ["E-commerce", "CRM", "Popular"],
    color: "border-neon-green/30 hover:border-neon-green/50"
  },
  {
    icon: "filetext",
    title: "Google Form -> Sheets -> Slack",
    description: "Process form submissions and notify your team with formatted messages",
    tags: ["Forms", "Team", "Notifications"],
    color: "border-neon-blue/30 hover:border-neon-blue/50"
  },
  {
    icon: "mail",
    title: "Gmail -> AI Summarize -> Discord",
    description: "Summarize important emails with AI and send alerts to Discord channels",
    tags: ["AI", "Email", "Communication"],
    color: "border-neon-purple/30 hover:border-neon-purple/50"
  },
  {
    icon: "webhook",
    title: "Webhook -> HTTP -> Email",
    description: "Transform webhook data and send customized email notifications",
    tags: ["Webhooks", "API", "Email"],
    color: "border-neon-cyan/30 hover:border-neon-cyan/50"
  },
  {
    icon: "database",
    title: "CSV Import -> Validation -> CRM",
    description: "Import and validate CSV data before syncing to your CRM system",
    tags: ["Data", "Validation", "CRM"],
    color: "border-neon-green/30 hover:border-neon-green/50"
  },
  {
    icon: "bot",
    title: "Social Media Monitor",
    description: "Track brand mentions across platforms and get AI-powered sentiment analysis",
    tags: ["Social", "AI", "Monitoring"],
    color: "border-neon-blue/30 hover:border-neon-blue/50"
  }
] as const satisfies readonly {
  icon: "creditcard" | "filetext" | "mail" | "webhook" | "database" | "bot";
  title: string;
  description: string;
  tags: string[];
  color: string
}[]

export const PRICING = []