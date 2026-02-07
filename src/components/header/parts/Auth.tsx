import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
};

interface AuthModalProps {
  isOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const Auth = ({ isOpen, setIsAuthOpen, user, loading, logout }: AuthModalProps) => {
  return (
    <div className="hidden md:flex items-center gap-3 animate-fade-in">
      {loading ? (
        <span className="text-muted-foreground text-sm">Loading...</span>
      ) : user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link href="/dashboard" passHref>
                <DropdownMenuItem className="hover:bg-slate-900! text-white! cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/billing" passHref>
                <DropdownMenuItem className="hover:bg-slate-900! text-white! cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings" passHref>
                <DropdownMenuItem className="hover:bg-slate-900! text-white! cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer" onSelect={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" className="hover:text-white!" onClick={() => setIsAuthOpen(true)}>
            Sign In
          </Button>
          <Button variant="hero" size="sm" onClick={() => setIsAuthOpen(true)}>
            Get Started Free
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
