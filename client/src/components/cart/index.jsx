import React from "react";
import { useStore } from "../../store";
import styles from "./cart.module.scss";

function Index() {
  const {
    cart,
    quantity,
    addToCart,
    decrementQuantity,
    deleteCart,
    removeCart,
  } = useStore((state) => ({
    cart: state.cart,
    quantity: state.quantity,
    addToCart: state.addToCart,
    decrementQuantity: state.decrementQuantity,
    deleteCart: state.deleteCart,
    removeCart: state.removeCart,
  }));

  const cartLength = Object.keys(cart).length;

  const overall = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPrice;
  }, 0);

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["cart-contents"]}>
        {cartLength !== 0 ? (
          cart.map((item, index) => {
            return (
              <CartRow
                key={index}
                product_name={item.product_name}
                product_price={item.product_price}
                quantity={item.quantity}
                totalPrice={item.totalPrice}
                addToCart={addToCart}
                _id={item._id}
                removeCart={removeCart}
              />
            );
          })
        ) : (
          <h2>You have nothing on your cart</h2>
        )}

        <span className={styles["total-price"]}>
          Total: ₱{new Intl.NumberFormat("en-US").format(overall)}.00
        </span>
      </div>
    </div>
  );
}

function CartRow({
  product_name,
  product_price,
  quantity,
  totalPrice,
  addToCart,
  _id,
  removeCart,
}) {
  return (
    <>
      <div className={styles["cart-row"]}>
        <div className={styles.left}>
          <span>{product_name}</span>
          <span>
            x{quantity} = {quantity * product_price}
          </span>
        </div>
        <div className={styles.right}>
          <span
            onClick={() => removeCart({ product_name, _id, product_price })}
          >
            -
          </span>
          <span>Delete</span>
          <span
            onClick={() =>
              addToCart({ product_name, _id, product_price, quantity: 1 })
            }
          >
            +
          </span>
        </div>
      </div>
    </>
  );
}

export default Index;
