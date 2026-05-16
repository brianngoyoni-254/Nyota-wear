import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

function Categories({ categories, onAdd, onDelete }) {
  const [newCategory, setNewCategory] = useState("");

  function handleAdd() {
    if (!newCategory.trim()) return;

    onAdd(newCategory);
    setNewCategory("");
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>

      {/* ADD CATEGORY */}
      <div className="flex gap-3">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="bg-white text-black px-4 rounded-xl"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-black border border-zinc-700 px-4 py-2 rounded-full flex items-center gap-3"
          >
            <span>{c.name}</span>

            <button
              type="button"
              onClick={() => onDelete(c.id)}
              className="text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;