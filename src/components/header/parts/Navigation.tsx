import { BookOpen, CreditCard, Github, Users, Zap } from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    name: "Features",
    href: "#features",
    icon: Zap,
  },
  {
    name: "Templates",
    href: "#templates",
    icon: BookOpen,
  },
  {
    name: "Pricing",
    href: "#pricing",
    icon: CreditCard,
  },
  {
    name: "Community",
    href: "#community",
    icon: Users,
  },
  {
    name: "Github",
    href: "#github",
    icon: Github,
  },
];

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item, index) => (
        <Link
          href={item.href}
          key={item.name}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <item.icon className="w-4 h-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
