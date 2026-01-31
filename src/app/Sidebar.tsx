import SidebarContent from "./SidebarContent";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
};

export default function Sidebar({ open, onClose, onLogoutClick }: Props) {
  return (
    <>
      {/* Overlay with smooth fade */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 left-0 top-0 h-full w-72 bg-gradient-to-b from-[#0D52AF] to-[#0a3d7f] shadow-2xl
        transform transition-all duration-300 rounded-tr-xl rounded-br-xl ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={onClose} onLogoutClick={onLogoutClick} />
      </aside>
    </>
  );
}
