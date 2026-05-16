import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function ProductCard({
  product,
  onDelete,
  onEdit
}) {
  // SUPPORT BOTH OLD image AND NEW images[]
  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const [currentImage, setCurrentImage] =
    useState(0);

  // CHECK IF ADMIN CARD
  const isAdminCard =
    onDelete && onEdit;

  // NEXT IMAGE
  function nextImage() {
    setCurrentImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  }

  // PREVIOUS IMAGE
  function prevImage() {
    setCurrentImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">

      {/* IMAGE SECTION */}
      <div className="relative h-72 bg-black flex items-center justify-center overflow-hidden">

        {/* IMAGE */}
        {images.length > 0 && (
          <img
            src={images[currentImage]}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        )}

        {/* PREVIOUS BUTTON */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-3 bg-zinc-900/80 hover:bg-zinc-800 transition p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* NEXT BUTTON */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-3 bg-zinc-900/80 hover:bg-zinc-800 transition p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* IMAGE COUNTER */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900/80 text-xs px-3 py-1 rounded-full">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* PRODUCT NAME */}
        <h2 className="text-xl font-bold mb-3 font-barlow">
          {product.name}
        </h2>

        {/* PRICE */}
        <p className="font-semibold text-lg">
          KES {product.price}
        </p>

        {/* SHOW ONLY ON SHOP PAGE */}
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
          <div className="flex gap-3 mt-5">

            <button
              onClick={() => onEdit(product)}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(product.id)
              }
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