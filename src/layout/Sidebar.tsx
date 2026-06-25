import { NavLink } from "react-router-dom";
import { FiGrid, FiBarChart2, FiFileText, FiSettings } from "react-icons/fi";

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
  {
    name: "AI Assistant",
    path: "/ai",
    icon: <FiFileText />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="
w-10
h-10
rounded-lg
bg-blue-600
flex
items-center
justify-center
text-white
font-bold
"
          >
            M
          </div>

          <div>
            <h1 className="font-bold text-xl">Mantra4Change</h1>

            <p className="text-xs text-slate-400">AI Dashboard</p>
          </div>
        </div>

        <p className="text-sm text-slate-400 mt-2">AI Analytics Dashboard</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 mb-3 transition-all
              
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">
        <p className="text-sm text-slate-400">Version 1.0</p>
      </div>
    </aside>
  );
}
