import { useEffect, useState } from "react";

import { getOrders } from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getOrders();
    setOrders(data);
  }

  return (
    <section className="space-y-6">

      <h1 className="text-3xl font-bold">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-zinc-500">
          No orders yet.
        </p>
      ) : (
        <div className="space-y-5">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 p-6 rounded-2xl"
            >

              <div className="flex justify-between mb-4">

                <h2 className="text-xl font-semibold">
                  Order #{order.id}
                </h2>

                <p className="text-zinc-400 text-sm">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <div className="space-y-2">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-zinc-300"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      KES{" "}
                      {item.price *
                        item.quantity}
                    </span>
                  </div>
                ))}

              </div>

              <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>
                  KES {order.total}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;