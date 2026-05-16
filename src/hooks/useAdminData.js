import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories
} from "../services/api";

function useAdminData() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);

    const [p, c] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    setProducts(Array.isArray(p) ? p : []);
    setCategories(Array.isArray(c) ? c : []);

    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  return {
    products,
    categories,
    loading,
    reload: loadAll
  };
}

export default useAdminData;