import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    {children}
  </button>
);
Button.propTypes = {
  onClick: PropTypes.func,
};
Button.defaultProps = {
  onClick: null,
};
export default Button;
