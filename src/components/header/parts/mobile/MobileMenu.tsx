"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import MobileButtons from "./MobileButtons";
import { useState } from "react";
import logo from "@/assets/logo.png";

interface AuthModalProps {
  isAuthOpen: boolean
  setIsAuthOpen: (open: boolean) => void
}

const MobileMenu = ({ isAuthOpen, setIsAuthOpen }: AuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 bg-background/95 backdrop-blur-xl border-primary/20"
      >
        <SheetTitle className="sr-only">Mobile menu</SheetTitle>
        <div className="flex items-center justify-between mb-8 px-2">
          <Link href="/">
            <div className="flex items-center gap-2 animate-fade-in">
              <Image src={logo} alt="Logo" width={120} height={50} priority />
            </div>
          </Link>
        </div>
        <MobileNavigation />
        <MobileButtons isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthOpen={setIsAuthOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
