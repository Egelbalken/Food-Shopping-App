import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

// Helpers check if the input is empty.
const isEmpty = (value) => value.trim() === '';

// Helpers check if length is more then 5.
const correctPostalLength = (value) => value.trim().length === 5;

// Validity object as a state object
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
    number: true,
    email: true,
  });

  // setting up the refs. Needed to validate inpits. Ref method.
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const numberInputRef = useRef();
  const emailInputRef = useRef();

  // saves teh current value of inputs from refs
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const eneredNumber = numberInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // Chech if the inputs are valid.
    const enteredNameIsValid = !isEmpty(enteredName);
    console.log(enteredNameIsValid);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = correctPostalLength(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredNumberisValid = !isEmpty(eneredNumber);
    const enteredEmailIsValid = !isEmpty(enteredEmail);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
      number: enteredNumberisValid,
      email: enteredEmailIsValid,
    });

    // Chech the valdiity of all inputfields
    const formisValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid &&
      enteredNumberisValid &&
      enteredEmailIsValid;

    // if not valid
    if (!formisValid) {
      return;
    }

    // Submit the form
    props.onConfirm({
      name: enteredName,
      Street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
      number: eneredNumber,
      email: enteredEmail,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && (
          <p className={classes.invalid}>Please enter a name!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a street name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? '' : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>Please enter a postal code, 5 chararacters long!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a city!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.number ? '' : classes.invalid
        }`}
      >
        <label htmlFor="number">Mobile Number</label>
        <input type="text" id="number" ref={numberInputRef} />
        {!formInputValidity.number && <p>Please enter a mobile number!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.email ? '' : classes.invalid
        }`}
      >
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} />
        {!formInputValidity.email && <p>Please enter a email!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
