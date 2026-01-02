import Auth from "./parts/Auth";
import Logo from "./parts/Logo";
import Navigation from "./parts/Navigation";
import MobileMenu from "./parts/mobile/MobileMenu";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <Navigation />
          <Auth />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
