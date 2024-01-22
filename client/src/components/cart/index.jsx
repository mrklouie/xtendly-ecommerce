import React from "react";
import { useStore } from "../../store";
import styles from "./cart.module.scss";

function index() {
  const { cart, quantity, addToCart, decrementQuantity, deleteCart } = useStore(
    (state) => ({
      cart: state.cart,
      quantity: state.quantity,
      addToCart: state.addToCart,
      decrementQuantity: state.decrementQuantity,
      deleteCart: state.deleteCart,
    })
  );

  const cartLength = Object.keys(cart).length;

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-contents"]}>
        {cartLength !== 0 ? (
          <CartRow
            decrementQuantity={decrementQuantity}
            addToCart={addToCart}
            cart={cart}
            quantity={quantity}
            deleteCart={deleteCart}
          />
        ) : (
          <h2>You have nothing on your cart</h2>
        )}
      </div>
    </div>
  );
}

function CartRow({ cart, quantity, addToCart, decrementQuantity, deleteCart }) {
  const { product_name, product_price } = cart;

  console.log({ product_name, product_price });
  return (
    <>
      <div className={styles["cart-row"]}>
        <div className={styles.left}>
          <span>{cart.product_name}</span>
          <span>x{quantity}</span>
        </div>
        <div className={styles.right}>
          <span onClick={decrementQuantity}>-</span>
          <span onClick={deleteCart}>Delete</span>
          <span onClick={() => addToCart({ product_name, product_price })}>
            +
          </span>
        </div>
      </div>

      <span>Total: {quantity * product_price}</span>
    </>
  );
}

export default index;
