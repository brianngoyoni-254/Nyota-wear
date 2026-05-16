import { useState, useEffect } from "react";

const initialForm = {
  name: "",
  price: "",
  description: "",
  images: [],
  stock: "",
  category: ""
};

function ProductForm({
  categories,
  onSubmit,
  editingProduct,
  onCancelEdit
}) {
  const [form, setForm] = useState(initialForm);
  const [currentImage, setCurrentImage] = useState(0);

  // SYNC EDIT MODE
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        images: editingProduct.images || [],
        stock: editingProduct.stock || "",
        category: editingProduct.category || ""
      });
      setCurrentImage(0);
    }
  }, [editingProduct]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // IMAGE UPLOAD
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    const images = await Promise.all(imagePromises);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...images]
    }));
  }

  function nextImage() {
    setCurrentImage((prev) =>
      prev === form.images.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage() {
    setCurrentImage((prev) =>
      prev === 0 ? form.images.length - 1 : prev - 1
    );
  }

  function removeImage(index) {
    setForm((prev) => {
      const updated = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updated };
    });

    setCurrentImage(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
    setCurrentImage(0);
  }

  const images = form.images || [];

  return (
    <div className="w-full overflow-x-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl mb-10 space-y-5 w-full max-w-full"
      >
        <h2 className="text-xl font-semibold">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={images[currentImage]}
              alt="product"
              className="w-full h-full object-contain p-4"
            />

            <button
              type="button"
              onClick={() => removeImage(currentImage)}
              className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
            >
              ✕
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 bg-zinc-900/80 px-3 py-2 rounded-full"
              >
                ‹
              </button>
            )}

            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 bg-zinc-900/80 px-3 py-2 rounded-full"
              >
                ›
              </button>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-3 bg-zinc-900/80 px-3 py-1 rounded-full text-xs">
                {currentImage + 1} / {images.length}
              </div>
            )}
          </div>
        )}

        {/* INPUTS */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* ACTIONS */}
        <div className="flex gap-3 flex-wrap">
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Save Product
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="border border-zinc-700 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;