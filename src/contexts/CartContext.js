import { createContext, useContext, useState } from "react";
import { market } from "../data/market";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [newGroceries, setNewGroceries] = useState(
    market
      .map((grocery) => ({
        ...grocery,
        inventory: Math.floor(Math.random() * 101),
      }))
      .map((grocery) =>
        grocery.inventory === 0 ? { ...grocery, inStock: false } : grocery
      )
  );

  function handleAddToCart(grocery) {
    const existingGrocery = cart.find((item) => item.id === grocery.id);

    if (existingGrocery) {
      setCart((currCart) =>
        currCart.map((item) =>
          item.id === grocery.id
            ? {
                ...item,
                amountOrdered: item.amountOrdered + grocery.amountOrdered,
              }
            : item
        )
      );
    } else {
      setCart((currCart) => [...currCart, grocery]);
    }

    setNewGroceries(
      newGroceries
        .map((item) =>
          item.id === grocery.id
            ? {
                ...item,
                inventory: item.inventory - grocery.amountOrdered,
              }
            : item
        )
        .map((item) =>
          item.id === grocery.id
            ? { ...item, inStock: item.inventory === 0 ? false : true }
            : item
        )
    );
  }

  function handleDeleteItem(id) {
    // target deleted item
    const deletedItem = cart.find((item) => item.id === id);

    // Update Grocery' stock
    setNewGroceries((currentGroceries) =>
      currentGroceries.map((grocery) =>
        grocery.id === id
          ? {
              ...grocery,
              inventory: grocery.inventory + deletedItem.amountOrdered,
              inStock: grocery.inventory + deletedItem.amountOrdered > 0,
            }
          : grocery
      )
    );

    // Remove Item from cart
    setCart((currCart) => currCart.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDeleteItem,
        newGroceries,
        setNewGroceries,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext was used outside the CartProvider.");
  return context;
}

export { CartProvider, useCart };
