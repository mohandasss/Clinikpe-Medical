import { Menu, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "./routeMeta";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const routeMeta = getRouteMeta(location.pathname);

  // Don't show header for 'none' variant
  if (routeMeta.header === 'none') {
    return null;
  }

  return (
    <header className="app-header h-14 bg-white border-b">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {routeMeta.header === 'main' && (
            <button onClick={onMenuClick} className="p-1">
              <Menu size={24} className="text-gray-700" />
            </button>
          )}
          <h1 className="font-semibold text-lg text-primary">
            {routeMeta.title || 'Page'}
          </h1>
        </div>

        <div className="relative">
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
