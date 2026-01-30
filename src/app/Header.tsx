import { Menu, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="app-header h-14 bg-white border-b">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Menu size={24} className="text-gray-700" />
          <h1 className="font-semibold text-lg text-primary">
            Dashboard
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
