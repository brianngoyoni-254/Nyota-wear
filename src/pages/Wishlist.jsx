import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="p-10 text-zinc-400">
        Your wishlist is empty.
      </div>
    );
  }

  return (
    <section className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Heart className="text-red-500" /> Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-zinc-900 rounded-2xl p-4">
            
            <img
              src={product.images?.[0]}
              className="w-full h-60 object-contain"
            />

            <h2 className="text-xl font-bold mt-3">
              {product.name}
            </h2>

            <p className="text-zinc-400">
              KES {product.price}
            </p>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/product/${product.id}`}
                className="text-sm underline"
              >
                View
              </Link>

              <button
                onClick={() => toggleWishlist(product)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;