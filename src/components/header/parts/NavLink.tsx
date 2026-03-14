"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, BookOpen, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  zap: Zap,
  book: BookOpen,
  "credit-card": CreditCard,
  "message-circle": MessageCircle,
};

interface NavLinkProps {
  href: string;
  label: string;
  icon: keyof typeof ICON_MAP;
  className?: string;
  iconClassName?: string;
  delay?: number;
  onClick?: () => void;
}

const NavLink = ({
  href,
  label,
  icon,
  className,
  iconClassName,
  delay = 0,
  onClick,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = ICON_MAP[icon];

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 animate-fade-in transition-colors",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-primary",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className={cn(iconClassName ?? "w-4 h-4")} aria-hidden />
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
