import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import styles from './PostPreview.module.css';
import Button from '../shared/Button';
import { setCurrentPostId } from '../../redux/currentPost/currentPostActionCreators';
import { changeDate } from '../../service/helper';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;

  padding: 8px 16px;
  border-radius: 3px;
  background-color: '#3884ff';
  transition: all 200ms ease;
  text-align: center;
  display: block;
  color: #3884ff;
  border: 0;
  cursor: pointer;
  margin: 0 auto;

  :hover,
  :focus {
    background-color: '#1f65d6';
  }
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
          <div className={styles.buttonContainer}>
            <StyledNavLink
              onClick={() => setCurrentPostId(id)}
              to={`/posts/${id}`}
            >
              Read more
            </StyledNavLink>
            <Button
              backgrColor="rgba(247, 12, 12, 0.993)"
              hoverColor="rgba(121, 19, 19, 0.993)"
              onClick={this.deleteBtn}
            >
              Delete
            </Button>
          </div>
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
