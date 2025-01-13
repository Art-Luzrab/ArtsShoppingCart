import { useState } from "react";
import apple from "./images/apple.webp";
import bread from "./images/bread.jpg";
import eggs from "./images/eggs.webp";
import milk from "./images/milk.webp";
import tomato from "./images/tomato.jpeg";
const market = [
  {
    id: 1,
    name: "Tomato",
    price: 0.5,
    category: "Vegetable",
    inStock: true,
    photo: tomato,
    amountOrdered: 0,
    emoji: "🍅",
    inventory: 0,
  },
  {
    id: 2,
    name: "Apple",
    price: 0.6,
    category: "Vegetable",
    inStock: true,
    photo: apple,
    amountOrdered: 0,
    emoji: "🍎",
    inventory: 0,
  },
  {
    id: 3,
    name: "Bread",
    price: 2,
    category: "Wheat",
    inStock: true,
    photo: bread,
    amountOrdered: 0,
    emoji: "🍞",
    inventory: 0,
  },
  {
    id: 4,
    name: "Eggs",
    price: 4,
    category: "Protein",
    inStock: true,
    photo: eggs,
    amountOrdered: 0,
    emoji: "🥚",
    inventory: 0,
  },
  {
    id: 5,
    name: "Milk",
    price: 3,
    category: "Dairy",
    inStock: true,
    photo: milk,
    amountOrdered: 0,
    emoji: "🥛",
    inventory: 0,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [newGroceries, setNewGroceries] = useState(
    market
      .map((grocery) => ({
        ...grocery,
        inventory: Math.floor(Math.random() * 11),
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
      newGroceries.map((item) =>
        item.id === grocery.id
          ? {
              ...item,
              inventory: item.inventory - grocery.amountOrdered,
              inStock: item.inventory === 0,
            }
          : item
      )
    );
  }

  function handleDeleteItem(id) {
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
  amountOrdered,
  inventory,
  emoji,
  handleAddToCart,
  cart,
  setCart,
  setNewGroceries,
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

  // console.log("HERE", grocery.inventory);

  // setNewGroceries(
  //   cart.map((item) =>
  //     item.id === grocery.id
  //       ? { ...grocery, inventory: grocery.inventory - item.amountOrdered }
  //       : grocery
  //   )
  // );

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
        onClick={() => handleAddToCart(grocery)}
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
          {cart.map((grocery) => (
            <li className="word-separator cart-item" key={grocery.id}>
              <p>{`${grocery.emoji} (x${grocery.amountOrdered})`}</p>
              <p>{`$${(grocery.price * grocery.amountOrdered).toFixed(2)}`}</p>
              <button onClick={() => DeleteItem(grocery.id)}>❌</button>
            </li>
          ))}

          {/* <li className="word-separator cart-item">
          <p>Bread (1)</p> <p>$2</p>
        </li>
        <li className="word-separator cart-item">
          <p>Milk (2)</p> <p>$6</p>
        </li> */}
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
