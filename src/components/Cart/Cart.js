import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const OrderButtonHandler = () => {
    setCheckout(true);
  };

  //when user presses confirm button. Sending request to firebase
  const onSubmitDataHandler = (data) => {
    setIsSubmiting(true);
    fetch(
      "https://food-order-web-b944a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: data,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setOrderPlaced(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.hideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={OrderButtonHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalData = (
    <Fragment>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={onSubmitDataHandler} onCancel={props.hideCart} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmitingData = <p>Placing order....</p>;

  const orderPlacedData = (
    <Fragment>
      <p style={{ color: "green", fontSize: "20px" ,fontWeight:"bold"}}>
        Order placed successfully....
      </p>

      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={props.hideCart} >
      {!isSubmiting && !orderPlaced && modalData}
      {!orderPlaced && isSubmiting && isSubmitingData}
      {!isSubmiting && orderPlaced && orderPlacedData}
    </Modal>
  );
};

export default Cart;
