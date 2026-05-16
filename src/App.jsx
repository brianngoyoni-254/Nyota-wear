import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import AdminLayout from "./pages/AdminLayout";
import AdminOverview from "./pages/AdminOverview";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCategories from "./pages/AdminCategories";
import Wishlist from "./pages/Wishlist";

// fallback
function ComingSoon({ title }) {
  return (
    <div className="p-6 text-zinc-400">
      {title} coming soon...
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist />} />

        {/* FALLBACK */}
        <Route path="*" element={<ComingSoon title="Page not found" />} />

      </Routes>
    </div>
  );
}

export default App;