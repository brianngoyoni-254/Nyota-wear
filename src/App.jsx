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

/* PUBLIC PAGES (Navbar + Footer)*/
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

/* HOME PAGE (NO Navbar, NO Footer) */
function HomeLayout() {
  return (
    <main className="flex-1">
      <Home />
    </main>
  );
}


function AdminWrapper({ children }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Routes>

        {/* HOME (NO NAVBAR, NO FOOTER)*/}
        <Route path="/" element={<HomeLayout />} />

        {/* PUBLIC PAGES */}
        <Route
          path="/shop"
          element={
            <PublicLayout>
              <Shop />
            </PublicLayout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <PublicLayout>
              <ProductDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PublicLayout>
              <Wishlist />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/privacy"
          element={
            <PublicLayout>
              <Privacy />
            </PublicLayout>
          }
        />

        {/*ADMIN (NO NAVBAR, FOOTER INCLUDED)*/}
        <Route
          path="/admin"
          element={
            <AdminWrapper>
              <AdminLayout />
            </AdminWrapper>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/*FALLBACK */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <ComingSoon title="Page not found" />
            </PublicLayout>
          }
        />

      </Routes>
    </div>
  );
}

export default App;