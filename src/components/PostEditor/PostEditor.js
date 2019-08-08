import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';
import styles from './PostEditor.module.css';
import Button from '../shared/Button/Button';

class PostEditor extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    creator: this.props.creator,
    body: this.props.body,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  reset = () => {
    this.setState({
      title: '',
      creator: '',
      body: '',
    });
  };

  addNotification = text => {
    const { toastManager } = this.props;
    toastManager.add(text, {
      appearance: 'warning',
      autoDismiss: true,
      pauseOnHover: true,
    });
  };

  handleSubmit = e => {
    const { onSave } = this.props;
    const { title, creator, body } = this.state;
    e.preventDefault();
    if (title === '' || creator === '' || body === '') {
      this.addNotification('Please fill in all fields');
    } else {
      onSave({ ...this.state });
      this.reset();
    }
  };

  render() {
    const { creator, title, body } = this.state;
    const { onCancel } = this.props;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="creator"
          value={creator}
          onChange={this.handleChange}
          placeholder="Enter your name"
        />
        <input
          className={styles.input}
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Enter post title"
        />
        <textarea
          className={styles.textarea}
          name="body"
          value={body}
          placeholder="Write post"
          onChange={this.handleChange}
        />

        <div className={styles.buttonContainer}>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
}
PostEditor.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  creator: PropTypes.string,
  body: PropTypes.string,
  toastManager: PropTypes.shape({
    add: PropTypes.func,
    remove: PropTypes.func,
    toasts: PropTypes.array,
  }).isRequired,
};
PostEditor.defaultProps = {
  title: '',
  creator: '',
  body: '',
};
export default withToastManager(PostEditor);
