import React from "react";
import AvailableMeals from "./AvailableMeals/AvailableMeals.component";
import MealsSummary from "./MealsSummary/MealsSummary.component";
import classes from "./Meals.module.css";

const Meals = (props) => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;
