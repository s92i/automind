export const SIDEBAR_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: "activity" },
  { name: "Workflows", href: "/dashboard/workflows", icon: "workflow" },
  { name: "Templates", href: "/dashboard/templates", icon: "template" },
  { name: "Billing", href: "/dashboard/billing", icon: "credit-card" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
] as const satisfies readonly {
  name: string;
  href: string;
  icon: "activity" | "workflow" | "template" | "credit-card" | "settings";
}[];
