import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex bg-black text-white min-h-screen overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="
        flex-1
        min-w-0
        ml-64
        p-6
        overflow-x-hidden
        max-w-full
      ">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;