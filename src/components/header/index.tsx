"use client"

import { useState } from "react";
import Auth from "./parts/Auth";
import Logo from "./parts/Logo";
import Navigation from "./parts/Navigation";
import MobileMenu from "./parts/mobile/MobileMenu";
import AuthModal from "../auth/auth.modal";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { user, loading, refreshUser } = useUser()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    await refreshUser()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Navigation />
          <Auth isOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} user={user} loading={loading} logout={handleLogout} />
          <MobileMenu isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />
          <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} onLoginSuccess={refreshUser} />
        </div>
      </div>
    </header>
  );
};

export default Header;
