import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

describe("Navbar Component", () => {
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
          </WishlistProvider>
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/shop/i)).toBeInTheDocument();

    expect(screen.getByText(/admin/i)).toBeInTheDocument();

    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});