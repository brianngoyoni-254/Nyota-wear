import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // TOGGLE WISHLIST (ADD / REMOVE)
  function toggleWishlist(product) {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      // REMOVE if already exists
      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      // ADD if not exists
      return [...prev, product];
    });
  }

  // CHECK IF ITEM IS IN WISHLIST
  function isWishlisted(id) {
    return wishlist.some(
      (item) => item.id === id
    );
  }

  // REMOVE EXPLICITLY (optional use)
  function removeFromWishlist(id) {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // CLEAR WISHLIST
  function clearWishlist() {
    setWishlist([]);
  }

  // TOTAL ITEMS
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}