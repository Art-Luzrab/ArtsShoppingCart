import { useState } from "react";
import { useCart } from "./contexts/CartContext";
import Cart from "./Cart";

function App() {
  return (
    <div className="App">
      <GroceryStore />
      <Cart />
    </div>
  );
}

function GroceryStore() {
  const { handleAddToCart, cart, setCart, newGroceries, setNewGroceries } =
    useCart();
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

export default App;
