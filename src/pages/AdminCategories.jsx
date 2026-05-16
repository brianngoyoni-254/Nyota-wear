import { useState } from "react";
import useAdminData from "../hooks/useAdminData";
import { addCategory, deleteCategory } from "../services/api";

function AdminCategories() {
  const { categories, reload } = useAdminData();
  const [name, setName] = useState("");

  async function handleAdd() {
    if (!name.trim()) return;

    await addCategory({ name });
    setName("");
    reload();
  }

  async function handleDelete(id) {
    await deleteCategory(id);
    reload();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Categories</h1>

      {/* ADD CATEGORY */}
      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
        />
        <button
          onClick={handleAdd}
          className="bg-white text-black px-4 rounded-xl"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-zinc-900 px-4 py-2 rounded-full flex items-center gap-3"
          >
            <span>{c.name}</span>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;