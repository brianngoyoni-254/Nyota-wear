import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import AdminLayout from "./pages/AdminLayout";
import AdminOverview from "./pages/AdminOverview";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCategories from "./pages/AdminCategories";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

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
    <div className="min-h-screen flex flex-col bg-black text-white">

      {/* NAVBAR (always top) */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<ComingSoon title="Page not found" />} />

        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;