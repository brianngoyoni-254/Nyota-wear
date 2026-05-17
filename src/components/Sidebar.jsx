import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  Tags,
  ShoppingBag,
  X
} from "lucide-react";

function Sidebar({ onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-white text-black"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <aside
      className="
        fixed md:static top-0 left-0
        h-full md:h-screen w-64
        bg-zinc-950
        border-r border-zinc-800
        p-4
        overflow-y-auto
        z-50
        transform transition-transform duration-300
        md:translate-x-0
      "
    >
      {/* MOBILE HEADER (close button) */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-lg font-bold">Admin Panel</h2>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* DESKTOP TITLE */}
      <h2 className="hidden md:block text-xl font-bold mb-8 px-2">
        Admin Panel
      </h2>

      {/* NAV */}
      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass} onClick={onClose}>
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink to="/admin/products" className={linkClass} onClick={onClose}>
          <Box size={18} />
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass} onClick={onClose}>
          <Tags size={18} />
          Categories
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass} onClick={onClose}>
          <ShoppingBag size={18} />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;