import React from "react";
import { useState } from "react";
import Cart from "./components/Cart/Cart.component";
import Header from "./components/Layout/Header/Header.component";
import Meals from "./components/Meals/Meals.component";

function App() {
  const [isCartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <React.Fragment>
      {isCartShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShownCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
