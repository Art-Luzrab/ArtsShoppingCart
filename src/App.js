import { useState } from "react";
import { market } from "./market";

function App() {
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
    <div className="App">
      <GroceryStore
        handleAddToCart={handleAddToCart}
        cart={cart}
        setCart={setCart}
        newGroceries={newGroceries}
        setNewGroceries={setNewGroceries}
      />
      <Cart cart={cart} DeleteItem={handleDeleteItem} />
    </div>
  );
}

function GroceryStore({
  handleAddToCart,
  cart,
  setCart,
  newGroceries,
  setNewGroceries,
}) {
  const groceries = newGroceries.map((grocery) => (
    <Grocery
      id={grocery.id}
      name={grocery.name}
      price={grocery.price}
      category={grocery.category}
      inStock={grocery.inStock}
      photo={grocery.photo}
      key={grocery.id}
      amountOrdered={grocery.amountOrdered}
      inventory={grocery.inventory}
      emoji={grocery.emoji}
      handleAddToCart={handleAddToCart}
      cart={cart}
      setCart={setCart}
      setNewGroceries={setNewGroceries}
    />
  ));

  return (
    <>
      <div className="market-container">
        <h1>Welcome To Arthur's Market</h1>
        <div className="market">
          <ul className="ul-groceries">{groceries}</ul>
        </div>
      </div>
    </>
  );
}

function Grocery({
  id,
  name,
  price,
  category,
  inStock,
  photo,
  inventory,
  emoji,
  handleAddToCart,
}) {
  const [quantity, setQuantity] = useState(0);

  const grocery = {
    id,
    name,
    price,
    category,
    amountOrdered: quantity,
    inventory,
    emoji,
    inStock,
  };

  return (
    <div className="grocery">
      <img className="picture" src={photo} alt={name} />
      <p>{name}</p>
      <p>${price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
      <p>{inventory}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          e.target.value < 0 || e.target.value > grocery.inventory
            ? null
            : setQuantity(Number(e.target.value))
        }
        disabled={inStock ? false : true}
      />
      <button
        onClick={() => {
          handleAddToCart(grocery);
          setQuantity(0);
        }}
        disabled={inStock ? false : true}
      >
        Add To Cart
      </button>
    </div>
  );
}

function Cart({ cart, DeleteItem }) {
  const subTotal = cart.reduce((acc, curr) => {
    return Number(acc + curr.price * curr.amountOrdered);
  }, 0);

  const taxTotal = subTotal * 0.1;
  const total = subTotal + taxTotal;

  return (
    <>
      <div className="cart-container">
        <div className="word-separator item-price">
          <p>Item</p> <p>Price</p>
        </div>
        <ul className="ul-cart-items">
          {cart.map((grocery) =>
            grocery.amountOrdered <= 0 ? null : (
              <li className="word-separator cart-item" key={grocery.id}>
                <p>{`${grocery.emoji} (x${grocery.amountOrdered})`}</p>
                <p>{`$${(grocery.price * grocery.amountOrdered).toFixed(
                  2
                )}`}</p>
                <button onClick={() => DeleteItem(grocery.id)}>❌</button>
              </li>
            )
          )}
        </ul>

        <div className="total">
          <div className="word-separator">
            <p>Subtotal:</p> <p>{`$${subTotal.toFixed(2)}`}</p>
          </div>
          <div className="word-separator">
            <p>Tax:</p> <p>{`$${taxTotal.toFixed(2)}`}</p>
          </div>
          <div className="word-separator">
            <p>Total:</p> <p>{`$${total.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
