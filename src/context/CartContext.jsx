import {
createContext,
useContext,
useEffect,
useState
} from "react";

const CartContext = createContext();

// SAFE JSON PARSE (prevents 500 crash)
function safeParse(data) {
try {
return data ? JSON.parse(data) : [];
} catch (err) {
return [];
}
}

export function CartProvider({ children }) {
const [cartItems, setCartItems] = useState(() => {
const saved = localStorage.getItem("cart");
return safeParse(saved);
});

// SAVE TO LOCAL STORAGE
useEffect(() => {
localStorage.setItem(
"cart",
JSON.stringify(cartItems)
);
}, [cartItems]);

// ADD TO CART
function addToCart(product) {
setCartItems((prev) => {
const existing = prev.find(
(item) => item.id === product.id
);

if (existing) {
return prev.map((item) =>
item.id === product.id
? {
...item,
quantity: item.quantity + 1
}
: item
);
}

return [
...prev,
{
...product,
quantity: 1
}
];
});
}

// REMOVE ITEM
function removeFromCart(id) {
setCartItems((prev) =>
prev.filter((item) => item.id !== id)
);
}

// CLEAR CART
function clearCart() {
setCartItems([]);
}

// TOTAL ITEMS
const totalItems = cartItems.reduce(
(sum, item) => sum + item.quantity,
0
);

// TOTAL PRICE
const totalPrice = cartItems.reduce(
(sum, item) =>
sum + item.price * item.quantity,
0
);

return (
<CartContext.Provider
value={{
cartItems,
addToCart,
removeFromCart,
clearCart,
totalItems,
totalPrice
}}
>
{children}
</CartContext.Provider>
);
}

export function useCart() {
return useContext(CartContext);
}
