import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import styles from './PostPreview.module.css';
import { setCurrentPostId } from '../../redux/currentPost/currentPostActionCreators';
import { changeDate } from '../../service/helper';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: inherit;
`;
const ButtonContainer = styled(Button.Group)`
  display: flex !important;
  justify-content: center;
  flex-wrap: nowrap;
  width: 70%;
  margin: 0 auto !important;
`;

class PostPreview extends Component {
  state = {
    id: this.props.id,
  };

  deleteBtn = e => {
    const { onDelete } = this.props;
    e.preventDefault();
    onDelete({ ...this.state });
  };

  render() {
    const { id, title, body, creator, date, setCurrentPostId } = this.props;
    return (
      <div className={styles.postContainer}>
        <div className={styles.wrapper}>
          {creator && (
            <p className={styles.creatorText}>
              {creator} published {changeDate(date)}
            </p>
          )}
          <p className={styles.postTitle}>{title}</p>
          <p className={styles.postBody}>{body}</p>
          <ButtonContainer>
            <Button basic color="blue" onClick={() => setCurrentPostId(id)}>
              <StyledNavLink to={`/posts/${id}`}>Read more</StyledNavLink>
            </Button>
            <Button.Or />
            <Button negative onClick={this.deleteBtn}>
              Delete
            </Button>
          </ButtonContainer>
        </div>
      </div>
    );
  }
}

PostPreview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  creator: PropTypes.string,
  date: PropTypes.string,
  setCurrentPostId: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};
PostPreview.defaultProps = {
  creator: '',
  date: '20.12.2017',
  setCurrentPostId: null,
};
const mapDispatchToProps = dispatch => ({
  setCurrentPostId: postId => dispatch(setCurrentPostId(postId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(PostPreview);
