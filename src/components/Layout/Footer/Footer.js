import React from 'react';
import { Fragment } from 'react';
import classes from './Footer.module.css';
import logo from '../imonit3.png';
const Footer = () => {
  return (
    <Fragment>
      <div className={classes['footer']}>
        <footer className={classes['copyrights']}>
          Imonit AB &#169; 2022-2023
          <p>Created as a developer project by Kent Jakobsson</p>
          <img className={classes['logo']} src={logo} alt="logo"></img>
        </footer>
      </div>
    </Fragment>
  );
};

export default Footer;
