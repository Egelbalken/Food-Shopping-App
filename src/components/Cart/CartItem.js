import { Fragment } from 'react';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `kr ${props.price.toFixed(2)}`;

  return (
    <Fragment>
      <p className={classes['obs-info']}>
        OBS!! This is a fake order for practice!
      </p>
      <li className={classes['cart-item']}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {props.amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </li>
    </Fragment>
  );
};

export default CartItem;
