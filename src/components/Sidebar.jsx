import { NavLink } from "react-router-dom";
import { LayoutDashboard, Box, Tags, ShoppingBag } from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-white text-black"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-4">
      <h2 className="text-xl font-bold mb-8 px-2">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <Box size={18} />
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          <Tags size={18} />
          Categories
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingBag size={18} />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;