import { useEffect, useState } from "react";
import { getOrders } from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function AdminOverview() {
  const [orders, setOrders] = useState([]);

  
  // REAL-TIME FETCH (POLLING)
  
  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function loadOrders() {
    try {
      const res = await getOrders();
      setOrders(Array.isArray(res) ? res : []);
    } catch (err) {
      setOrders([]);
    }
  }


  // SAFE HELPERS
  
  const safeItems = (order) => order.items || [];

  
  // KPI CALCULATIONS (STATS CARDS)
  

  const totalOrders = orders.length;

  const totalItemsSold = orders.reduce((sum, order) => {
    return (
      sum +
      safeItems(order).reduce(
        (acc, item) => acc + Number(item.quantity || 1),
        0
      )
    );
  }, 0);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const avgOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  
  // DATE HELPERS
  
  function getDay(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short"
    });
  }

  function getMonth(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short"
    });
  }

  
  // WEEKLY DATA
  
  const weekly = {};

  orders.forEach((order) => {
    const day = getDay(order.createdAt);

    if (!weekly[day]) {
      weekly[day] = { name: day, items: 0, revenue: 0 };
    }

    safeItems(order).forEach((item) => {
      weekly[day].items += Number(item.quantity || 1);
    });

    weekly[day].revenue += Number(order.total || 0);
  });

  const weeklyData = Object.values(weekly);

  const weeklyRevenue = weeklyData.reduce(
    (sum, d) => sum + d.revenue,
    0
  );

  
  // MONTHLY DATA
  
  const monthly = {};

  orders.forEach((order) => {
    const month = getMonth(order.createdAt);

    if (!monthly[month]) {
      monthly[month] = { name: month, items: 0, revenue: 0 };
    }

    safeItems(order).forEach((item) => {
      monthly[month].items += Number(item.quantity || 1);
    });

    monthly[month].revenue += Number(order.total || 0);
  });

  const monthlyData = Object.values(monthly);

  const monthlyRevenue = monthlyData.reduce(
    (sum, d) => sum + d.revenue,
    0
  );

  
  // CATEGORY DATA
  
  const categories = {};

  orders.forEach((order) => {
    safeItems(order).forEach((item) => {
      const cat = item.category || "Unknown";

      if (!categories[cat]) {
        categories[cat] = { name: cat, value: 0 };
      }

      categories[cat].value +=
        Number(item.price || 0) *
        Number(item.quantity || 1);
    });
  });

  const categoryData = Object.values(categories);

  const COLORS = ["#ff7300", "#00c49f", "#ffbb28", "#0088fe"];

  
  // UI
  
  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">
        Admin Overview
      </h1>

      {/* STATS CARDS*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Total Orders
          </p>
          <h2 className="text-2xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Items Sold
          </p>
          <h2 className="text-2xl font-bold">
            {totalItemsSold}
          </h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Total Revenue
          </p>
          <h2 className="text-2xl font-bold">
            KES {totalRevenue.toFixed(0)}
          </h2>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Avg Order Value
          </p>
          <h2 className="text-2xl font-bold">
            KES {avgOrderValue.toFixed(0)}
          </h2>
        </div>

      </div>

      {/* WEEKLY */}
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">
          Weekly Sales
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="items"
              stroke="#ff7300"
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="mt-4 text-zinc-300">
          Total Weekly Revenue:{" "}
          <span className="font-bold text-white">
            KES {weeklyRevenue.toFixed(0)}
          </span>
        </p>
      </div>

      {/*  MONTHLY */}
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">
          Monthly Sales
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="items"
              stroke="#00c49f"
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="mt-4 text-zinc-300">
          Total Monthly Revenue:{" "}
          <span className="font-bold text-white">
            KES {monthlyRevenue.toFixed(0)}
          </span>
        </p>
      </div>

      {/* ATEGORY PIE */}
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">
          Category Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AdminOverview;