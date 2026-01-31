import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/appointments", icon: Calendar, label: "Appointments" },
  { to: "/providers", icon: Users, label: "Providers" },
  { to: "/settings", icon: Settings, label: "Settings" },
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
                isActive ? "text-primary" : "text-gray-400"
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
