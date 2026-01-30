import { Home, FileText, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/orders", icon: FileText, label: "Orders" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="app-bottom-nav bg-white border-t rounded-t-3xl">
      <div className="h-16 flex justify-around items-center">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-accent" : "text-gray-400"
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
