import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { createOrder } from "../services/api";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalPrice
  } = useCart();

  async function handleCheckout() {
    if (cartItems.length === 0) return;

    const order = {
      items: cartItems,
      total: totalPrice,
      createdAt: new Date().toISOString()
    };

    await createOrder(order);

    clearCart();

    alert("Order placed successfully!");

    navigate("/shop");
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-zinc-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 p-5 rounded-2xl flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-zinc-400">
                  Quantity: {item.quantity}
                </p>

                <p className="font-semibold mt-2">
                  KES {item.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Total: KES {totalPrice}
            </h2>

            <button
              onClick={handleCheckout}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Checkout
            </button>

          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;