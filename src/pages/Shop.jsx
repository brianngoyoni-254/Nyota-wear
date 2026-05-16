import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      // prevent crash if API returns null/undefined
      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 font-barlow">
        Shop Collection
      </h1>

      <SearchBar search={search} setSearch={setSearch} />

      {/* LOADING STATE */}
      {loading && (
        <p className="text-zinc-400">Loading products...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-zinc-500">
          No products found.
        </p>
      )}

      {/* PRODUCT GRID */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;