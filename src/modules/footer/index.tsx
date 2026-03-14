import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Book,
  Cookie,
  Earth,
  FileText,
  Github,
  MessageCircle,
  Scroll,
  Shield,
  Twitter,
  UserCheck,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 bg-linear-to-t from-secondary/30 to-background border-t border-primary/10">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Link href={"/"}>
                <div className="flex items-center gap-2 animate-fade-in">
                  <Image src={logo} alt="" width={200} height={190} />
                </div>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              The next-generation workflow automation platform with AI
              superpowers. Build, deploy and scale your automations effortlessly
            </p>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="ghost" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-semibold mb-4">Product</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Templates
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Integrations
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                API Reference
              </a>
            </div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Book className="w-3 h-3" />
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Github className="w-3 h-3" />
                Github
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <FileText className="w-3 h-3" />
                Blog
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-3 h-3" />
                Discord Community
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Earth className="w-3 h-3" />
                Status Page
              </a>
            </div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-3">
              <a
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Shield className="w-3 h-3" />
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-3 h-3" />
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Shield className="w-3 h-3" />
                Security
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Scroll className="w-3 h-3" />
                GDPR
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Cookie className="w-3 h-3" />
                Cookies
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Automind. All rights reserved
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Made with ❤️ for developers</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                <span>System Status: Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
