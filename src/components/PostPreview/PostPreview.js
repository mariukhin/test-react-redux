import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './PostPreview.module.css';
import Button from '../shared/Button/Button';
import { setCurrentPostId } from '../../redux/currentPost/currentPostActionCreators';
import { changeDate } from '../../service/helper';

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// eslint-disable-next-line no-shadow
const PostPreview = ({ id, title, body, creator, date, setCurrentPostId }) => (
  <div className={styles.postContainer}>
    <div className={styles.wrapper}>
      <div className={styles.infoPostBlock}>
        <p className={styles.creator}>{creator}</p>
        <p>published {date !== '' ? changeDate(date) : date}</p>
      </div>
      <p className={styles.postTitle}>{title}</p>
      <p className={styles.postBody}>{body}</p>
      <Button onClick={() => setCurrentPostId(id)}>
        <NavLink to={`/posts/${id}`} className={styles.link}>
          Read more
        </NavLink>
      </Button>
    </div>
  </div>
);

PostPreview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  creator: PropTypes.string,
  date: PropTypes.string,
  setCurrentPostId: PropTypes.func,
};
PostPreview.defaultProps = {
  // date: randomDate(new Date(2012, 0, 1), new Date()),
  creator: '',
  date: '',
  setCurrentPostId: null,
};
const mapDispatchToProps = dispatch => ({
  setCurrentPostId: postId => dispatch(setCurrentPostId(postId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(PostPreview);
