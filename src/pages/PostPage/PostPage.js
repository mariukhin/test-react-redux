import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/shared/Button/Button';
import * as currentPostSelectors from '../../redux/currentPost/currentPostSelectors';
import * as currentPostOperations from '../../redux/currentPost/currentPostOperations';
import styles from './PostPage.module.css';
import Loader from '../../components/shared/Loader/Loader';
import { changeDate } from '../../service/helper';

class PostPage extends Component {
  componentDidMount() {
    const { currentPostId, fetchCurrentPost } = this.props;
    fetchCurrentPost(currentPostId);
  }

  handleBtnBack = e => {
    const { history } = this.props;
    e.preventDefault();
    history.push('/');
  };

  render() {
    const {
      currentPost: { title, body, creator, date },
      currentPost,
      loading,
    } = this.props;
    return (
      <>
        {!currentPost || (loading && <Loader />)}
        {currentPost &&
          (!loading && (
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <p className={styles.postTitle}>{title}</p>
                <p className={styles.creatorText}>
                  {creator} published {date !== '' ? changeDate(date) : date}
                </p>
                <p className={styles.postBody}>{body}</p>
                <div className={styles.buttonContainer}>
                  <Button onClick={this.handleBtnBack}>Come back</Button>
                  <Button>Edit post</Button>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}

PostPage.propTypes = {
  currentPostId: PropTypes.number.isRequired,
  currentPost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    creator: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  fetchCurrentPost: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  currentPostId: currentPostSelectors.getCurrentPostId(state),
  currentPost: currentPostSelectors.getCurrentPost(state),
  loading: currentPostSelectors.loading(state),
  error: currentPostSelectors.error(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPost: currentPost =>
    dispatch(currentPostOperations.fetchCurrentPost(currentPost)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostPage);
