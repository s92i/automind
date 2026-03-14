export const NAV_ITEMS = [
  { name: "Features", href: "#features", icon: "zap" },
  { name: "Templates", href: "#templates", icon: "book" },
  { name: "Pricing", href: "#pricing", icon: "credit-card" },
  { name: "Contact", href: "#contact", icon: "message-circle" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    icon: "webhook",
    title: "trigger",
    description:
      "Start workflows from webhooks, schedules, forms, or any event",
    details: [
      "Webhooks",
      "Cron Jobs",
      "Stripe Events",
      "Gmail",
      "HTTP Requests",
    ],
  },
  {
    icon: "workflow",
    title: "Build Workflow",
    description: "Drag-and-drop visual editor with 200+ integrations",
    details: [
      "Visual Editor",
      "AI Nodes",
      "Code Blocks",
      "Conditions",
      "Loops",
    ],
  },
  {
    icon: "playcircle",
    title: "Run & Monitor",
    description: "Execute workflows with real-time logs and error handling",
    details: [
      "Live Execution",
      "Error Retry",
      "Debug Logs",
      "Performance",
      "Alerts",
    ],
  },
  {
    icon: "barchart3",
    title: "Scale & Optimize",
    description: "Monitor performance and scale workflows automatically",
    details: [
      "Analytics",
      "Auto-Scale",
      "Load Balancing",
      "Team Collaboration",
      "API Access",
    ],
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
    description:
      "Integrate OpenAI, Claude, Gemini, and more AI models directly into your workflows",
    color: "text-neon-purple",
  },
  {
    icon: "puzzle",
    title: "200+ Integrations",
    description:
      "Connect Slack, Notion, Google Sheets, Stripe, Discord, and hundreds more services",
    color: "text-neon-blue",
  },
  {
    icon: "shield",
    title: "Secure Credential Vault",
    description:
      "Enterprise-grade security for API keys and sensitive data with encryption",
    color: "text-neon-green",
  },
  {
    icon: "activity",
    title: "Live Logs & Monitoring",
    description:
      "Real-time execution logs, error tracking, and performance monitoring",
    color: "text-neon-cyan",
  },
  {
    icon: "bookopen",
    title: "Templates Library",
    description:
      "Start fast with pre-built workflows for common automation patterns",
    color: "text-neon-purple",
  },
  {
    icon: "creditcard",
    title: "Flexible Billing",
    description:
      "Pay with Stripe or crypto through Cryptomus. Scale as you grow",
    color: "text-neon-blue",
  },
  {
    icon: "zap",
    title: "High Performance",
    description:
      "Lightning-fast execution with automatic scaling and error recovery",
    color: "text-neon-green",
  },
  {
    icon: "globe",
    title: "Global Edge Network",
    description:
      "Run workflows closer to your users with our wolrdwide infrastructure",
    color: "text-neon-orange",
  },
] as const satisfies readonly {
  icon:
    | "brain"
    | "puzzle"
    | "shield"
    | "activity"
    | "bookopen"
    | "creditcard"
    | "zap"
    | "globe";
  title: string;
  description: string;
  color: string;
}[];

export const TEMPLATES = [
  {
    icon: "creditcard",
    title: "Stripe -> Notion CRM",
    description:
      "Automatically create customer records in Notion when Stripe payments are received",
    tags: ["E-commerce", "CRM", "Popular"],
    color: "border-neon-green/30 hover:border-neon-green/50",
  },
  {
    icon: "filetext",
    title: "Google Form -> Sheets -> Slack",
    description:
      "Process form submissions and notify your team with formatted messages",
    tags: ["Forms", "Team", "Notifications"],
    color: "border-neon-blue/30 hover:border-neon-blue/50",
  },
  {
    icon: "mail",
    title: "Gmail -> AI Summarize -> Discord",
    description:
      "Summarize important emails with AI and send alerts to Discord channels",
    tags: ["AI", "Email", "Communication"],
    color: "border-neon-purple/30 hover:border-neon-purple/50",
  },
  {
    icon: "webhook",
    title: "Webhook -> HTTP -> Email",
    description:
      "Transform webhook data and send customized email notifications",
    tags: ["Webhooks", "API", "Email"],
    color: "border-neon-cyan/30 hover:border-neon-cyan/50",
  },
  {
    icon: "database",
    title: "CSV Import -> Validation -> CRM",
    description:
      "Import and validate CSV data before syncing to your CRM system",
    tags: ["Data", "Validation", "CRM"],
    color: "border-neon-green/30 hover:border-neon-green/50",
  },
  {
    icon: "bot",
    title: "Social Media Monitor",
    description:
      "Track brand mentions across platforms and get AI-powered sentiment analysis",
    tags: ["Social", "AI", "Monitoring"],
    color: "border-neon-blue/30 hover:border-neon-blue/50",
  },
] as const satisfies readonly {
  icon: "creditcard" | "filetext" | "mail" | "webhook" | "database" | "bot";
  title: string;
  description: string;
  tags: string[];
  color: string;
}[];

export const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with workflow automation",
    icon: "zap",
    popular: false,
    features: [
      "1000 workflow runs/month",
      "5 active workflows",
      "Basic integrations",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    description: "For teams ready to scale their automation workflows",
    icon: "crown",
    popular: true,
    features: [
      "10,000 workflow runs/month",
      "Unlimited active workflows",
      "All integrations + AI nodes",
      "Priority support",
      "Advanced templates",
      "Real-time monitoring",
      "Team collaboration",
      "Custom webhooks",
      "Error retry logic",
    ],
  },
  {
    name: "Business",
    price: "Custom",
    period: "enterprise pricing",
    description: "Enterprise-grade automation for large organizations",
    icon: "building2",
    popular: false,
    features: [
      "Unlimited workflow runs",
      "Unlimited everything",
      "Dedicated infrastructure",
      "24/7 phone support",
      "Custom integrations",
      "Advanced analytics",
      "SSO & SAML",
      "SLA guarantees",
      "White-label options",
    ],
  },
] as const satisfies readonly {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: "zap" | "crown" | "building2";
  popular: boolean;
  features: string[];
}[];

export const BILLING_PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with workflow automation",
    features: [
      "1000 workflow runs/month",
      "5 active workflows",
      "Basic integrations",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "For teams ready to scale their automation workflows",
    features: [
      "10,000 workflow runs/month",
      "Unlimited active workflows",
      "All integrations + AI nodes",
      "Priority support",
      "Advanced templates",
      "Real-time monitoring",
      "Team collaboration",
      "Custom webhooks",
      "Error retry logic",
    ],
    popular: true,
  },
] as const satisfies readonly {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}[];

export const BILLING_HISTORY = [
  {
    id: 1,
    date: "2024-01-15",
    amount: "$29.00",
    method: "Stripe",
    status: "Paid",
  },
  {
    id: 2,
    date: "2023-12-15",
    amount: "$29.00",
    method: "Stripe",
    status: "Paid",
  },
  {
    id: 3,
    date: "2023-11-15",
    amount: "$29.00",
    method: "Cryptomus",
    status: "Paid",
  },
] as const satisfies readonly {
  id: number;
  date: string;
  amount: string;
  method: string;
  status: string;
}[];
