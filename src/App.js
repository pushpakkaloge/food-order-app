import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartVisible,setCartVisibility] = useState(false);

  const CartShowHandler=()=>{
    setCartVisibility(true);
  };
  
  const CartHideHandler=()=>{
    setCartVisibility(false);
  }

  return (
    <CartProvider>
      {isCartVisible && <Cart hideCart={CartHideHandler}/>}
      <Header showCart={CartShowHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
