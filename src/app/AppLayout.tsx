import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
    setSidebarOpen(false);
  };

  return (
    <div className="app-frame">
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />

      {/* Main Content */}
      <main className="app-content px-4 py-6 bg-blue-50/50">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        onLogoutClick={handleLogout}
      />
    </div>
  );
}
