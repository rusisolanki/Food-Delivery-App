import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false)

  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed()}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
      cartCtx.addItems({...item, amount:1});
  };

  const cartItemRemoveHandler = (id) => {
      cartCtx.removeItems(id)
  };

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitHandler = (userData) => {
    fetch("https://react-http-d4e48-default-rtdb.firebaseio.com/meals.json", {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Cancel
        </button>
      </div>
  )

  return (
    <Modal onHide={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onHideCard}/>}
      {!isCheckout && modalActions}
      
    </Modal>
  );
}
