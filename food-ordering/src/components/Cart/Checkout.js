import { useRef, useState } from 'react'
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isSixChars(enteredPostal)
    const enteredCityIsValid = !isEmpty(enteredCity)


    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalIsValid,
        city: enteredCityIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostal,
        city: enteredCity
    })
  };

  const nameControlClasses = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`
  const streetControlClasses = `${styles.control} ${formInputValidity.street ? '' : styles.invalid}`
  const postalControlClasses = `${styles.control} ${formInputValidity.postalCode ? '' : styles.invalid}`
  const cityControlClasses = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Full Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
      <button className={styles.submit}>Confirm</button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        
      </div>
    </form>
  );
};

export default Checkout;

