import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import styled from 'styled-components';

const ButtonContainer = styled(Button.Group)`
  width: 30%;
  margin: 0 auto;
`;

class PostEditor extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    creator: this.props.creator,
    body: this.props.body,
    comment: this.props.comment,
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
    const { onSave, onComment } = this.props;
    const { title, creator, body, comment } = this.state;
    e.preventDefault();
    if (onComment) {
      if (comment === '') {
        this.addNotification('Please fill in all fields');
      } else {
        onSave({ ...this.state });
        this.reset();
      }
    } else if (title === '' || creator === '' || body === '') {
      this.addNotification('Please fill in all fields');
    } else {
      onSave({ ...this.state });
      this.reset();
    }
  };

  render() {
    const { creator, title, body, comment } = this.state;
    const { onCancel, onComment } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {onComment ? (
          <Fragment>
            <Form.Field>
              <Form.TextArea
                label="Your comment"
                placeholder="Write comment"
                name="comment"
                value={comment}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Fragment>
        ) : (
          <Fragment>
            <Form.Field>
              <Form.Input
                label="Creator name"
                type="text"
                placeholder="Enter your name"
                name="creator"
                value={creator}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Post title"
                type="text"
                placeholder="Enter post title"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Post text"
                placeholder="Write post"
                name="body"
                value={body}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Fragment>
        )}
        <ButtonContainer>
          <Button positive type="submit">
            Save
          </Button>
          <Button.Or />
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonContainer>
      </Form>
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
  comment: PropTypes.string,
  onComment: PropTypes.bool,
};
PostEditor.defaultProps = {
  title: '',
  creator: '',
  body: '',
  comment: '',
  onComment: false,
};
export default withToastManager(PostEditor);
