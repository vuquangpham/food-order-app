import React from "react";
import MealItemForm from "../MealItemForm/MealItemForm.component";
import classes from "./MealItem.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cardCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cardCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
    </li>
  );
};

export default MealItem;
