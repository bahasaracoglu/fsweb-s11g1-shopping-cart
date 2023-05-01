import React, { useContext } from "react";
import { ScCartCheckout } from "./scParts";
import { CartContext } from "../contexts/CartContext";
import { nanoid } from "nanoid";
// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  //console.log(nanoid());

  return (
    <div>
      {cart.map((item) => (
        <Item key={nanoid()} {...item} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
