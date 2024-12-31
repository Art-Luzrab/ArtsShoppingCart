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
  return (
    <div>
      <GroceryStore />
    </div>
  );
}

function GroceryStore() {
  const groceries = market.map((item) => (
    <Grocery
      id={item.id}
      name={item.name}
      price={item.price}
      category={item.category}
      inStock={item.inStock}
      photo={item.photo}
    />
  ));

  return (
    <>
      <div className="market-container">
        <h1>Welcome To Arthur's Market</h1>
        <div className="market">
          <ul>{groceries}</ul>
        </div>
      </div>
    </>
  );
}

function Grocery({ id, name, price, category, inStock, photo }) {
  return (
    <div className="grocery">
      <img className="picture" src={photo} alt={name} />
      <p>{name}</p>
      <p>${price}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}

export default App;
