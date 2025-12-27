import { Button } from "@/components/ui/button";

const Auth = () => {
  return (
    <div className="hidden md:flex items-center gap-3 animate-fade-in">
      <Button variant="ghost" size="sm">
        Sign In
      </Button>
      <Button variant="hero" size="sm">
        Get Started Free
      </Button>
    </div>
  );
};

export default Auth;
