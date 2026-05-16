import { useState } from "react";

import {
  addProduct,
  updateProduct,
  deleteProduct
} from "../services/api";

import useAdminData from "../hooks/useAdminData";

import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

function AdminProducts() {
  const { products, categories, loading, reload } = useAdminData();

  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  // =========================
  // SAVE PRODUCT (FIXED + SAFE)
  // =========================
  async function handleSaveProduct(form) {
    try {
      setSaving(true);

      // 🔥 CLEAN DATA BEFORE SENDING TO BACKEND
      const cleanedForm = {
        ...form,
        name: form.name?.trim(),
        description: form.description?.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        images: Array.isArray(form.images) ? form.images : []
      };

      // REMOVE INVALID VALUES (extra safety)
      if (!cleanedForm.name || !cleanedForm.category) {
        alert("Name and category are required");
        return;
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, cleanedForm);
        setEditingProduct(null);
      } else {
        await addProduct(cleanedForm);
      }

      await reload();
    } catch (err) {
      console.error("❌ SAVE FAILED:", err.message);
      alert(err.message || "Failed to save product. Check backend.");
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // DELETE PRODUCT
  // =========================
  async function handleDeleteProduct(id) {
    try {
      await deleteProduct(id);
      await reload();
    } catch (err) {
      console.error("❌ DELETE FAILED:", err.message);
      alert("Failed to delete product.");
    }
  }

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="p-6 text-zinc-400">
        Loading products...
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <section className="w-full max-w-full overflow-x-hidden space-y-8">

      {/* HEADER */}
      <div className="w-full">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-zinc-500 text-sm">
          Manage your store products
        </p>
      </div>

      {/* PRODUCT FORM */}
      <div className="w-full max-w-full overflow-x-hidden">
        <ProductForm
          categories={categories}
          onSubmit={handleSaveProduct}
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {saving && (
          <p className="text-sm text-zinc-400 mt-2">
            Saving product...
          </p>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <div className="w-full max-w-full overflow-x-hidden">
        {products.length === 0 ? (
          <p className="text-zinc-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
                onEdit={setEditingProduct}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}

export default AdminProducts;