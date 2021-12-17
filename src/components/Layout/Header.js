import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../Assets/pexels-jonathan-borba-2983101.jpg';
import classes from './Header.module.css';
import imonitLogo from './imonit3.png';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes['logo-text']}>
          <img
            className={classes['imonit-logo']}
            src={imonitLogo}
            alt="imonit"
          ></img>
          Imonit Meals
        </h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
