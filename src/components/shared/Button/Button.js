import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ type, onClick, children }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={styles.button} onClick={onClick}>
    {children}
  </button>
);
Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};
Button.defaultProps = {
  onClick: null,
  type: 'button',
};
export default Button;
