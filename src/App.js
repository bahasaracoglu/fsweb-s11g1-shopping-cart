import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext } from "./contexts/CartContext";
import { nanoid } from "nanoid";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const updateLS = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getCartFromLS = () => {
    const LSdata = JSON.parse(localStorage.getItem("cart", cart));
    LSdata && setCart(LSdata);
  };

  const addItem = (item) => {
    const updatedCart = [...cart, { ...item, id: nanoid() }];
    setCart(updatedCart);
    updateLS(updatedCart);
  };

  const removeItemFromCart = (id) => {
    console.log("consoled id", id);
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateLS(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    updateLS([]);
  };

  console.log(cart);

  useEffect(() => {
    getCartFromLS();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, addItem }}>
      <CartContext.Provider value={{ cart, removeItemFromCart, clearCart }}>
        <div className="App">
          <Navigation />

          {/* Routelar */}

          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
