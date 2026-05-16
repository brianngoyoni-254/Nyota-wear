import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/api";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    setProducts, // keep ONLY if you truly need manual overrides
    fetchProducts,
    loading,
    error
  };
}

export default useProducts;