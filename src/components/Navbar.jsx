import { NavLink } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      
      {/* BRAND */}
      <h1 className="text-2xl font-bold tracking-wide">
        Nyota Wear
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 text-sm uppercase tracking-wider">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-zinc-500"
          }
        >
          Admin
        </NavLink>

        {/* CART */}
        <NavLink
          to="/cart"
          className="relative flex items-center gap-1 text-zinc-400 hover:text-white"
        >
          <ShoppingCart size={18} />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </NavLink>

        {/* WISHLIST */}
        <NavLink
          to="/wishlist"
          className="relative flex items-center gap-1 text-zinc-400 hover:text-red-400"
        >
          <Heart size={18} />

          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;