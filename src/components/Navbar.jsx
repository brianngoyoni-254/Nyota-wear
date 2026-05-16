import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      <h1 className="text-2xl font-bold tracking-wide">
        Nyota Wear
      </h1>

      <div className="flex gap-6 text-sm uppercase tracking-wider">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;