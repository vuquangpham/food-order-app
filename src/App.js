import React from "react";
import { useState } from "react";
import Cart from "./components/Cart/Cart.component";
import Header from "./components/Layout/Header/Header.component";
import Meals from "./components/Meals/Meals.component";
import CartProvider from "./store/CartProvider.component";

function App() {
  const [isCartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShownCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
