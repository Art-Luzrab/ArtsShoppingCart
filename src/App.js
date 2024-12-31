const market = [
  { id: 1, name: "Tomato", price: 0.5, category: "Vegetable", inStock: true, img:  },
  { id: 2, name: "Apple", price: 0.6, category: "Vegetable", inStock: true },
  { id: 3, name: "Bread", price: 2, category: "Wheat", inStock: true },
  { id: 4, name: "Eggs", price: 4, category: "Protein", inStock: true },
  { id: 5, name: "Milk", price: 3, category: "Vegetable", inStock: true },
];

function App() {
  return (
    <div>
      <GroceryStore />
    </div>
  );
}

function GroceryStore() {
  const groceries = market.map((grocery) => <li>{grocery.name}</li>);

  return (
    <div className="market">
      <ul>{groceries}</ul>
    </div>
  );
}

function Grocery() {
  return ()
}

export default App;
