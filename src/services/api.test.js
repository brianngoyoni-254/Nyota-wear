import { describe, test, expect, vi, beforeEach } from "vitest";

// IMPORT FUNCTIONS
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from "./api";

// MOCK fetch globally
beforeEach(() => {
  vi.restoreAllMocks();
});
function mockFetch(data, ok = true) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data))
    })
  );
}
test("GET products", async () => {
  mockFetch([{ id: 1, name: "Hoodie" }]);

  const data = await getProducts();

  expect(data.length).toBe(1);
  expect(data[0].name).toBe("Hoodie");
});
test("POST product", async () => {
  mockFetch({ id: 2, name: "Jacket" });

  const result = await addProduct({ name: "Jacket" });

  expect(result.name).toBe("Jacket");
});
test("PATCH product", async () => {
  mockFetch({ id: 1, price: 5000 });

  const result = await updateProduct(1, { price: 5000 });

  expect(result.price).toBe(5000);
});
test("DELETE product", async () => {
  mockFetch({}, true);

  const result = await deleteProduct(1);

  expect(result).toBe(1);
});