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
  },
  {
    id: 2,
    name: "Apple",
    price: 0.6,
    category: "Vegetable",
    inStock: true,
    photo: apple,
  },
  {
    id: 3,
    name: "Bread",
    price: 2,
    category: "Wheat",
    inStock: true,
    photo: bread,
  },
  {
    id: 4,
    name: "Eggs",
    price: 4,
    category: "Protein",
    inStock: false,
    photo: eggs,
  },
  {
    id: 5,
    name: "Milk",
    price: 3,
    category: "Dairy",
    inStock: true,
    photo: milk,
  },
];

function App() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="App">
      <GroceryStore quantity={quantity} setQuantity={setQuantity} />
      <Cart />
    </div>
  );
}

function GroceryStore({ quantity, setQuantity }) {
  const groceries = market.map((item) => (
    <Grocery
      id={item.id}
      name={item.name}
      price={item.price}
      category={item.category}
      inStock={item.inStock}
      photo={item.photo}
      key={item.id}
      quantity={quantity}
      setQuantity={setQuantity}
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
  quantity,
  setQuantity,
}) {
  console.log(quantity);

  return (
    <div className="grocery">
      <img className="picture" src={photo} alt={name} />
      <p>{name}</p>
      <p>${price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button>Add To Cart</button>
    </div>
  );
}

function Cart() {
  return (
    <div className="cart-container">
      <div className="word-separator item-price">
        <p>Item</p> <p>Price</p>
      </div>
      <ul className="ul-cart-items">
        <li className="word-separator cart-item">
          <p>Bread (1)</p> <p>$2</p>
        </li>
        <li className="word-separator cart-item">
          <p>Milk (2)</p> <p>$6</p>
        </li>
      </ul>

      <div className="total">
        <div className="word-separator">
          <p>Subtotal:</p> <p>$8.00</p>
        </div>
        <div className="word-separator">
          <p>Tax:</p> <p>$0.80</p>
        </div>
        <div className="word-separator">
          <p>Total:</p> <p>$8.80</p>
        </div>
      </div>
    </div>
  );
}
export default App;
