import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  return (
    <div className="app-frame">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="app-content px-4 py-6 bg-blue-50/50">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
