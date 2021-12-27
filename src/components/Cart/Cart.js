import { useContext, useState } from 'react';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { Fragment } from 'react';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // State to check if we have submitted a order end finnished checkout.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `kr ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Adds and spred the amount by bye one.
  const cartItemAddHandler = (item) => {
    // Added to brake the times the sum error.
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  // On submot we send a Post to server as a json file
  // of the userdata and the cart items. Props from checkout method.
  const submitOrderHandler = async (userData) => {
    //
    setIsSubmitting(true);
    const response = await fetch(
      'https://food-react-app-92c1d-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Somthong went wrong when submitting the order!');
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    //clear the cart context from the CartProvider.js
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckingOut && modalActions}
    </Fragment>
  );

  const isSubmittingModalContant = (
    <p>Sending "order data" to the backend...</p>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order to the backend!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContant}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
