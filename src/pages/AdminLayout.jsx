import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-black text-white min-h-screen overflow-x-hidden">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-black">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>

        <button onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          min-h-screen
          w-64
          bg-black
          border-r border-zinc-800
          z-40
          overflow-y-auto
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          min-w-0
          w-full
          pt-16 md:pt-0
          p-4 sm:p-5 lg:p-6
          overflow-x-hidden
        "
      >
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;