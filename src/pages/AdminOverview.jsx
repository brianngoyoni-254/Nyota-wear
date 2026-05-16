import useAdminData from "../hooks/useAdminData";

function AdminOverview() {
  const { products, categories } = useAdminData();

  const totalProducts = products.length;
  const totalCategories = categories.length;

  const totalStock = products.reduce(
    (sum, p) => sum + (Number(p.stock) || 0),
    0
  );

  const totalRevenue = products.reduce(
    (sum, p) =>
      sum + (Number(p.price) || 0) * (Number(p.sold || 0)),
    0
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Admin Overview
      </h1>

      <p className="text-zinc-400">
        Quick summary of your store performance
      </p>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400 text-sm">Products</p>
          <h2 className="text-3xl font-bold">{totalProducts}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400 text-sm">Categories</p>
          <h2 className="text-3xl font-bold">{totalCategories}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400 text-sm">Stock Items</p>
          <h2 className="text-3xl font-bold">{totalStock}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold">
            KES {totalRevenue}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default AdminOverview;