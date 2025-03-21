import apple from "../images/apple.webp";
import bread from "../images/bread.jpg";
import eggs from "../images/eggs.webp";
import milk from "../images/milk.webp";
import tomato from "../images/tomato.jpeg";

export const market = [
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
