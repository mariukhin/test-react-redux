import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './PostPreview.module.css';
import Button from '../shared/Button/Button';
import { setCurrentPostId } from '../../redux/currentPost/currentPostActionCreators';
import { changeDate } from '../../service/helper';

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
            <Button onClick={() => setCurrentPostId(id)}>
              <NavLink to={`/posts/${id}`} className={styles.link}>
                Read more
              </NavLink>
            </Button>
            <Button onClick={this.deleteBtn}>Delete</Button>
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
