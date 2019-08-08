/* elslint-disable */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    const { onClose } = this.props;
    if (e.code !== 'Escape') return;

    onClose();
  };

  handleBackdropClick = e => {
    const { current } = this.backdropRef;
    const { onClose } = this.props;

    if (current && e.target !== current) {
      return;
    }

    onClose();
  };

  render() {
    const { children } = this.props;
    return (
      <div
        className={styles.overlay}
        ref={this.backdropRef}
        role="presentation"
        onClick={this.handleBackdropClick}
        onKeyDown={this.handleKeyPress}
      >
        <div className={styles.modal}>{children}</div>
      </div>
    );
  }
}
