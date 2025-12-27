import { Button } from "@/components/ui/button";

interface MobileButtonsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileButtons = ({ isOpen, setIsOpen }: MobileButtonsProps) => {
  return (
    <div className="space-y-3 px-2">
      <div className="w-[80%] mx-auto flex flex-col gap-y-4 justify-start">
        <Button
          variant="ghost"
          size="lg"
          className="w-full justify-start"
          onClick={() => setIsOpen(false)}
        >
          Sign In
        </Button>
        <Button
          variant="hero"
          size="lg"
          className="justify-start"
          onClick={() => setIsOpen(false)}
        >
          Get Started Free
        </Button>
      </div>
    </div>
  );
};

export default MobileButtons;
