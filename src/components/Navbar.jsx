import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-4">
      
      <div className="flex items-center justify-between">

        {/* BRAND */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          Nyota Wear
        </h1>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider">

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
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm uppercase tracking-wider">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-white" : "text-zinc-500"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-white" : "text-zinc-500"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/admin"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-white" : "text-zinc-500"
            }
          >
            Admin
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className="text-zinc-400"
          >
            Cart ({totalItems})
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={() => setOpen(false)}
            className="text-zinc-400"
          >
            Wishlist ({wishlist.length})
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;