import React from 'react';
import { Fragment } from 'react';
import style from './Card.module.css';

// Wrapping card for all items.
const Card = (props) => {
  return (
    <Fragment>
      <div className={style.card}>{props.children}</div>
    </Fragment>
  );
};

export default Card;
