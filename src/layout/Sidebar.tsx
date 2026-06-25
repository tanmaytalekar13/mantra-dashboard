import { NavLink } from "react-router-dom";
import { FiGrid, FiBarChart2 } from "react-icons/fi";

const menuItems = [
  {
    name: "PBL Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
  },
  {
    name: "Grant Reporting",
    path: "/grants",
    icon: <FiBarChart2 />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            M4
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">Mantra4Change</h1>
            <p className="text-xs text-slate-400">PBL Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-4">
        <p className="text-xs text-slate-500">Version 1.0 · Assessment Build</p>
      </div>
    </aside>
  );
}