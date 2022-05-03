import Modal from "../UI/Modal/Modal.component";
import classes from "./Cart.module.css";
import CardContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem.component";
import React, { useState } from "react";
import Checkout from "./Checkout.component";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cardCtx = useContext(CardContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `$${cardCtx.totalAmount.toFixed(2)}`;
  const hasItems = cardCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cardCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cardCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (e) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-bf42c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: data,
          orderedItems: cardCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cardCtx.clear();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cardCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
