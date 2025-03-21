import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, handleDeleteItem: DeleteItem } = useCart();
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
