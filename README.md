#  Nyota Wear – E-Commerce Admin Dashboard (React SPA)

Nyota Wear is a modern React-based Single Page Application (SPA) built as an e-commerce admin and shopping platform.  
It demonstrates advanced React concepts including state management, hooks, routing, API integration, and automated testing.

---

##  Live Features

###  Public Pages
- Home landing page
- Product shop page
- Product details page
- Cart system with checkout simulation
- Wishlist functionality
- About, Contact, and Privacy pages

### Admin Dashboard
- Product management (Create, Read, Update, Delete)
- Category management
- Orders overview
- Real-time analytics dashboard (charts)

---

##  Tech Stack

- React (Vite)
- React Router DOM
- Context API (State Management)
- Tailwind CSS
- Recharts (Analytics Charts)
- JSON Server (Mock Backend)
- Vitest + React Testing Library (Testing)

---

##  Key Features

###  State Management
- CartContext (add/remove items, total price calculation)
- WishlistContext (toggle favorites)
- Custom hooks:
  - useProducts
  - useAdminData

---

### CRUD Functionality
Full API integration using JSON Server:

- **GET** – Fetch products, categories, orders
- **POST** – Add products & categories
- **PATCH** – Update product details
- **DELETE** – Remove products & categories

---

###  Search Functionality
- Real-time product filtering on Shop page
- Case-insensitive search implementation

---

###  Routing (SPA Navigation)
Built using React Router:

- `/` Home
- `/shop`
- `/product/:id`
- `/cart`
- `/wishlist`
- `/admin`
- `/admin/products`
- `/admin/categories`
- `/admin/orders`

---

## Testing Suite

This project includes automated tests using Vitest and React Testing Library.

###  Tested Areas
- Component rendering (Navbar, SearchBar)
- User interaction (typing, clicks)
- Context logic (Cart system)
- API CRUD operations (mocked fetch)
- Routing behavior

###  Run Tests
```bash
npm test
````

###  Run Coverage

```bash
npm run coverage
```

---

## Installation & Setup

```bash
# Clone repository
git clone 

# Install dependencies
npm install

# Run development server
npm run dev
```

---

##  Backend (JSON Server)

Make sure to run the mock backend:

```bash
json-server --watch db.json --port 3001
```

---

## Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── context/
 ├── hooks/
 ├── services/
 ├── test/
```

---

##  Learning Outcomes

This project demonstrates:

* Advanced React hooks usage
* Component-based architecture
* Client-side routing (SPA)
* State management with Context API
* API integration with CRUD operations
* Automated testing with Vitest
* Real-world e-commerce UI logic

---

## Author

Built by Brian Ngoyoni
For educational purposes (React Advanced Module)

---

##  Notes

* All data is stored in a mock JSON server
* No real payment system is integrated
* Designed for learning and demonstration of frontend skills

````





