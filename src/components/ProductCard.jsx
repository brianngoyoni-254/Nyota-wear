import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Heart
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

function ProductCard({
  product,
  onDelete,
  onEdit
}) {
  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const [currentImage, setCurrentImage] = useState(0);

  const isAdminCard = onDelete && onEdit;

  const { toggleWishlist, isWishlisted } = useWishlist();
  const liked = isWishlisted(product.id);

  function nextImage() {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage() {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  return (
    <div className="
      w-full max-w-full min-w-0
      bg-zinc-900 rounded-2xl
      overflow-hidden
      border border-zinc-800
      flex flex-col
    ">

      {/* IMAGE SECTION */}
      <div className="
        relative h-72 bg-black
        flex items-center justify-center
        overflow-hidden w-full
      ">

        {/* WISHLIST ICON */}
        {!isAdminCard && (
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 bg-zinc-900/70 p-2 rounded-full hover:scale-110 transition z-10"
          >
            <Heart
              size={20}
              fill={liked ? "red" : "none"}
              color={liked ? "red" : "white"}
            />
          </button>
        )}

        {/* IMAGE */}
        {images.length > 0 && (
          <img
            src={images[currentImage]}
            alt={product.name}
            className="
              w-full h-full
              object-contain
              p-4
              max-w-full
            "
          />
        )}

        {/* LEFT */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-3 bg-zinc-900/80 hover:bg-zinc-800 transition p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* RIGHT */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-3 bg-zinc-900/80 hover:bg-zinc-800 transition p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* COUNTER */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900/80 text-xs px-3 py-1 rounded-full">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 w-full min-w-0">

        {/* NAME */}
        <h2 className="text-xl font-bold mb-3 font-barlow break-words">
          {product.name}
        </h2>

        {/* PRICE */}
        <p className="font-semibold text-lg">
          KES {product.price}
        </p>

        {/* VIEW DETAILS */}
        {!isAdminCard && (
          <Link
            to={`/product/${product.id}`}
            className="inline-block mt-4 text-sm text-white underline hover:text-zinc-300 transition"
          >
            View Details
          </Link>
        )}

        {/* ADMIN ACTIONS */}
        {isAdminCard && (
          <div className="flex gap-3 mt-5 flex-wrap">
            <button
              onClick={() => onEdit(product)}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-500 px-4 py-2 rounded-lg font-medium"
            >
              Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductCard;