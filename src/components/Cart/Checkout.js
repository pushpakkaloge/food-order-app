import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formValid, setFormValid] = useState({
    isNameValid: true,
    isstreetValid: true,
    isPostalValid: true,
    isCityValid: true
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const isNameValid = !isEmpty(name);
    const isstreetValid = !isEmpty(street);
    const isCityValid = !isEmpty(city);
    const isPostalValid = !isEmpty(postal);

    setFormValid({
        isNameValid:isNameValid,
        isstreetValid:isstreetValid,
        isPostalValid:isPostalValid,
        isCityValid:isCityValid
    })

    const isFormValid =
      isNameValid &&
      isstreetValid &&
      isPostalValid &&
      isCityValid;

    if (!isFormValid) {
      return;
    }

    props.onConfirm({
        name:name,
        street:street,
        city:city,
        postal:postal
    })
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name:</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValid.isNameValid && <p>Please enter a valid name</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street:</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValid.isstreetValid && <p>Please enter a valid street</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal Code:</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formValid.isPostalValid && <p>Please enter a valid postal code</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City:</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValid.isCityValid && <p>Please enter a valid city</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" style={{ backgroundColor: "pink" }}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
