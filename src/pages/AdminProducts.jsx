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

  
  // PRODUCTS
  
  async function handleSaveProduct(form) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, form);
      setEditingProduct(null);
    } else {
      await addProduct(form);
    }

    await reload();
  }

  async function handleDeleteProduct(id) {
    await deleteProduct(id);
    await reload();
  }

  
  // LOADING STATE
  
  if (loading) {
    return (
      <div className="p-6 text-zinc-400">
        Loading products...
      </div>
    );
  }

  
  // UI
  
  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-zinc-500 text-sm">
          Manage your store products
        </p>
      </div>

      {/* PRODUCT FORM */}
      <ProductForm
        categories={categories}
        onSubmit={handleSaveProduct}
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
      />

      {/* PRODUCTS GRID */}
      {products.length === 0 ? (
        <p className="text-zinc-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </section>
  );
}

export default AdminProducts;