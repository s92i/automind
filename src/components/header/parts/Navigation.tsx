import NavLink from "./NavLink";
import { NAV_ITEMS } from "../config/nav";

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_ITEMS.map((item, index) => (
        <NavLink
          key={item.name}
          href={item.href}
          label={item.name}
          icon={item.icon}
          delay={index * 0.1}
          className="text-sm font-medium"
        />
      ))}
    </nav>
  );
};

export default Navigation;
