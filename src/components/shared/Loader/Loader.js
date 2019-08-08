import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

const LoaderBlock = () => (
  <div className={styles.loader}>
    <Loader type="Circles" color="#00BFFF" height="100" width="100" />
  </div>
);
export default LoaderBlock;
