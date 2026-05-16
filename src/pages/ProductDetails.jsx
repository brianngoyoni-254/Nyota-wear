import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Heart
} from "lucide-react";

import { getProduct } from "../services/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data);
    } catch (err) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  // LOADING
  if (loading) {
    return (
      <div className="p-10 text-zinc-400">
        Loading product...
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="p-10 text-red-500">
        Product not found.
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const liked = isWishlisted(product.id);

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
    <section className="max-w-5xl mx-auto px-6 py-10">

      {/* PRODUCT CARD */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">

        {/* IMAGE SECTION */}
        <div className="relative h-[500px] bg-black flex items-center justify-center">

          {/* ❤️ WISHLIST BUTTON */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 bg-zinc-900/70 p-3 rounded-full hover:scale-110 transition"
          >
            <Heart
              size={22}
              fill={liked ? "red" : "none"}
              color={liked ? "red" : "white"}
            />
          </button>

          {/* IMAGE */}
          {images.length > 0 && (
            <img
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-full object-contain p-6"
            />
          )}

          {/* LEFT BUTTON */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 bg-zinc-900/80 p-3 rounded-full hover:bg-zinc-800 transition"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* RIGHT BUTTON */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 bg-zinc-900/80 p-3 rounded-full hover:bg-zinc-800 transition"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* IMAGE COUNTER */}
          {images.length > 1 && (
            <div className="absolute bottom-4 bg-zinc-900/80 px-4 py-2 rounded-full text-sm">
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-4">

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold">
            KES {product.price}
          </p>

          <p className="text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm text-zinc-500">
            Category: {product.category}
          </p>

          <p className="text-sm text-zinc-500">
            Stock: {product.stock}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-6">

            {/* ADD TO CART */}
            <button
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add To Cart
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;