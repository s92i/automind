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
