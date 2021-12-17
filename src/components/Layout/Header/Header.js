// Root element.
import { Fragment } from 'react';
import styles from './Header.module.css';
import mealImage from '../../../Assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Imonit Meals</h1>
        <HeaderCartButton>Cart</HeaderCartButton>
      </header>
      <div className={styles['main-image']}>
        <img src={mealImage} alt="pic of food" />
      </div>
      <div></div>
    </Fragment>
  );
};

export default Header;
