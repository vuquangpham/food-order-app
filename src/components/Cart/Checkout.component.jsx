import { useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    // isTouched: isNameTouched,
    hasError: hasNameError,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    reset: nameReset,
  } = useInput((name) => name.length > 0);
  const {
    value: enteredStreet,
    // isTouched: isStreetTouched,
    hasError: hasStreetError,
    handleInputChange: handleStreetChange,
    handleInputBlur: handleStreetBlur,
    reset: streetReset,
  } = useInput((name) => name.length > 0);
  const {
    value: enteredPostal,
    // isTouched: isPostalTouched,
    hasError: hasPostalError,
    handleInputChange: handlePostalChange,
    handleInputBlur: handlePostalBlur,
    reset: postalReset,
  } = useInput((postal) => postal.length > 0);
  const {
    value: enteredCity,
    // isTouched: isCityTouched,
    hasError: hasCityError,
    handleInputChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    reset: cityReset,
  } = useInput((city) => city.length > 0);

  const isFormValid =
    !hasNameError && !hasStreetError && !hasCityError && !hasPostalError;

  const invalidCheck = (hasErrorRef) => {
    return hasErrorRef
      ? `${classes.control} ${classes.invalid}`
      : `${classes.control} `;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postal: enteredPostal,
      street: enteredStreet,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={invalidCheck(hasNameError)}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          value={enteredName}
          type="text"
          id="name"
        />
      </div>
      <div className={invalidCheck(hasStreetError)}>
        <label htmlFor="street">Street</label>
        <input
          onChange={handleStreetChange}
          onBlur={handleStreetBlur}
          value={enteredStreet}
          type="text"
          id="street"
        />
      </div>
      <div className={invalidCheck(hasPostalError)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          onChange={handlePostalChange}
          onBlur={handlePostalBlur}
          value={enteredPostal}
          type="text"
          id="postal"
        />
      </div>
      <div className={invalidCheck(hasCityError)}>
        <label htmlFor="city">City</label>
        <input
          onChange={handleCityChange}
          onBlur={handleCityBlur}
          value={enteredCity}
          type="text"
          id="city"
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!isFormValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
