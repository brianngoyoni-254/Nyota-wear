const PRODUCTS_API = "http://localhost:3001/products";

const CATEGORIES_API =
  "http://localhost:3001/categories";

const ORDERS_API =
  "http://localhost:3001/orders";


// SAFE REQUEST HANDLER


async function handleRequest(
  request,
  { expectJson = true } = {}
) {
  const response = await request;

  if (!response.ok) {
    const text = await response
      .text()
      .catch(() => null);

    throw new Error(text || "Request failed");
  }

  // DELETE / EMPTY RESPONSES
  if (
    !expectJson ||
    response.status === 204
  ) {
    return null;
  }

  const data = await response.json();

  return data;
}


// PRODUCTS API


// GET ALL PRODUCTS
export async function getProducts() {
  const data = await handleRequest(
    fetch(PRODUCTS_API)
  );

  return Array.isArray(data)
    ? data
    : [];
}

// GET SINGLE PRODUCT
export async function getProduct(id) {
  const data = await handleRequest(
    fetch(`${PRODUCTS_API}/${id}`)
  );

  return data;
}

// ADD PRODUCT
export async function addProduct(product) {
  const data = await handleRequest(
    fetch(PRODUCTS_API, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(product)
    })
  );

  return data;
}

// DELETE PRODUCT
export async function deleteProduct(id) {
  await handleRequest(
    fetch(`${PRODUCTS_API}/${id}`, {
      method: "DELETE"
    }),
    { expectJson: false }
  );

  return id;
}

// UPDATE PRODUCT
export async function updateProduct(
  id,
  data
) {
  const updated = await handleRequest(
    fetch(`${PRODUCTS_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(data)
    })
  );

  return updated;
}


// CATEGORIES API


// GET CATEGORIES
export async function getCategories() {
  const data = await handleRequest(
    fetch(CATEGORIES_API)
  );

  return Array.isArray(data)
    ? data
    : [];
}

// ADD CATEGORY
export async function addCategory(
  category
) {
  const created = await handleRequest(
    fetch(CATEGORIES_API, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(category)
    })
  );

  return created;
}

// DELETE CATEGORY
export async function deleteCategory(
  id
) {
  await handleRequest(
    fetch(`${CATEGORIES_API}/${id}`, {
      method: "DELETE"
    }),
    { expectJson: false }
  );

  return id;
}


// ORDERS API


// GET ALL ORDERS
export async function getOrders() {
  const data = await handleRequest(
    fetch(ORDERS_API)
  );

  return Array.isArray(data)
    ? data
    : [];
}

// CREATE ORDER
export async function createOrder(
  order
) {
  const created = await handleRequest(
    fetch(ORDERS_API, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(order)
    })
  );

  return created;
}