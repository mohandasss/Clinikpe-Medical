// import { Home, ClipboardList, User, Settings } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import { getRouteMeta } from "../routeMeta";

// const items = [
//   { to: "/dashboard", icon: Home, label: "Dashboard" },
//   { to: "/assignments", icon: ClipboardList, label: "Assignments" },
//   { to: "/profile", icon: User, label: "Profile" },
//   { to: "/settings", icon: Settings, label: "Settings" },
// ];

// export default function BottomNav() {
//   const location = useLocation();
//   const meta = getRouteMeta(location.pathname);

//   if (!meta.showBottomNav) {
//     return null;
//   }

//   return (
//     <nav className="fixed bottom-0 w-full max-w-mobile bg-white border-t z-50 safe-bottom">
//       <div className="h-16 flex justify-around items-center">
//         {items.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex flex-col items-center justify-center text-xs min-h-touch w-full transition-colors ${
//                 isActive ? "text-primary" : "text-secondary"
//               }`
//             }
//           >
//             <Icon size={22} />
//             <span className="mt-1">{label}</span>
//           </NavLink>
//         ))}
//       </div>
//     </nav>
//   );
// }
