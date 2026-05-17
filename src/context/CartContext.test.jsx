import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  test("adds product to cart", () => {
    const wrapper = ({ children }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({
        id: 1,
        name: "Hoodie",
        price: 3000,
      });
    });

    expect(result.current.totalItems).toBe(1);
  });
});