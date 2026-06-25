import { FiSearch } from "react-icons/fi";

export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Date */}
        <p className="text-sm text-gray-400 hidden sm:block">{today}</p>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          <input
            placeholder="Search schools, districts…"
            className="w-full rounded-full border border-gray-200 pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </header>
  );
}