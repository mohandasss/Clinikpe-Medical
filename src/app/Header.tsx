export default function Header() {
  return (
    <header className="fixed top-0 w-full max-w-[430px] h-14 bg-white border-b z-50">
      <div className="h-full flex items-center justify-between px-4">
        <h1 className="font-semibold text-lg text-primary">
          ClinicPe
        </h1>

        <button className="text-sm bg-accent text-white px-3 py-1 rounded">
          Help
        </button>
      </div>
    </header>
  );
}
