import NavLink from "../NavLink";
import { NAV_ITEMS } from "../../config/nav";

const MobileNavigation = () => {
  return (
    <nav className="space-y-4 mb-8 -mt-14 px-2">
      {NAV_ITEMS.map((item, index) => (
        <NavLink
          key={item.name}
          href={item.href}
          label={item.name}
          icon={item.icon}
          delay={index * 0.1}
          className="gap-3 text-base font-medium text-muted-foreground hover:text-primary"
        />
      ))}
    </nav>
  );
};

export default MobileNavigation;
