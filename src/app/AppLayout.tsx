import Header from "./Header";
import BottomNav from "./BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 pb-20 px-3">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
