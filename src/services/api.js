const BASE_URL = "http://localhost:3001";

const PRODUCTS_API = `${BASE_URL}/products`;
const CATEGORIES_API = `${BASE_URL}/categories`;
const ORDERS_API = `${BASE_URL}/orders`;


  // SAFE REQUEST HANDLER

async function handleRequest(request, { expectJson = true } = {}) {
  try {
    const response = await request;

    // HTTP ERROR HANDLING
    if (!response.ok) {
      const errorText = await response.text().catch(() => null);

      console.error("API ERROR:", response.status, errorText);

      throw new Error(
        errorText || `Request failed with status ${response.status}`
      );
    }

    
    if (!expectJson || response.status === 204) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("NETWORK ERROR:", err.message);
    throw err;
  }
}


  //PRODUCTS API


// GET ALL PRODUCTS
export async function getProducts() {
  const data = await handleRequest(fetch(PRODUCTS_API));
  return Array.isArray(data) ? data : [];
}

// GET SINGLE PRODUCT
export async function getProduct(id) {
  return await handleRequest(fetch(`${PRODUCTS_API}/${id}`));
}

// ADD PRODUCT
export async function addProduct(product) {
  return await handleRequest(
    fetch(PRODUCTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
  );
}

// DELETE PRODUCT
export async function deleteProduct(id) {
  await handleRequest(fetch(`${PRODUCTS_API}/${id}`, { method: "DELETE" }), {
    expectJson: false
  });

  return id;
}

// UPDATE PRODUCT
export async function updateProduct(id, data) {
  return await handleRequest(
    fetch(`${PRODUCTS_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  );
}


// CATEGORIES API


// GET CATEGORIES
export async function getCategories() {
  const data = await handleRequest(fetch(CATEGORIES_API));
  return Array.isArray(data) ? data : [];
}

// ADD CATEGORY
export async function addCategory(category) {
  return await handleRequest(
    fetch(CATEGORIES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    })
  );
}

// DELETE CATEGORY
export async function deleteCategory(id) {
  await handleRequest(
    fetch(`${CATEGORIES_API}/${id}`, { method: "DELETE" }),
    { expectJson: false }
  );

  return id;
}

//ORDERS API 

// GET ORDERS
export async function getOrders() {
  const data = await handleRequest(fetch(ORDERS_API));
  return Array.isArray(data) ? data : [];
}

// CREATE ORDER
export async function createOrder(order) {
  return await handleRequest(
    fetch(ORDERS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })
  );
}