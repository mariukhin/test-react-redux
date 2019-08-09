import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import Button from '../../components/shared/Button';
import * as currentPostSelectors from '../../redux/currentPost/currentPostSelectors';
import * as currentPostOperations from '../../redux/currentPost/currentPostOperations';
import styles from './PostPage.module.css';
import Loader from '../../components/shared/Loader/Loader';
import PostEditor from '../../components/PostEditor/PostEditor';
import { changeDate } from '../../service/helper';

class PostPage extends Component {
  state = {
    modalShow: false,
    commentModal: false,
  };

  componentDidMount() {
    const { currentPostId, fetchCurrentPost } = this.props;
    fetchCurrentPost(currentPostId);
  }

  onModalHandle = () => {
    this.setState(state => ({
      modalShow: !state.modalShow,
    }));
  };

  onCommentModalHandle = () => {
    this.setState(state => ({
      commentModal: !state.commentModal,
    }));
  };

  onEditPost = e => {
    e.preventDefault();
    this.onModalHandle();
  };

  onAddComment = e => {
    e.preventDefault();
    this.onCommentModalHandle();
  };

  editPost = post => {
    const { updatePost } = this.props;
    const infoDate = new Date(Date.now());
    const postToUpdate = {
      id: post.id,
      creator: post.creator,
      title: post.title,
      body: post.body,
      date: infoDate.toLocaleDateString(),
    };
    updatePost(postToUpdate);
    this.onModalHandle();
  };

  addComment = comment => {
    const {
      createComment,
      currentPost: { comments },
    } = this.props;
    const commentToAdd = {
      postId: comment.id,
      body: comment.comment,
    };
    createComment(commentToAdd);
    comments.push(commentToAdd);
    this.onCommentModalHandle();
  };

  handleBtnBack = e => {
    const { history } = this.props;
    e.preventDefault();
    history.push('/');
  };

  render() {
    const {
      currentPost: { id, title, body, creator, date, comments },
      currentPost,
      loading,
    } = this.props;
    const { modalShow, commentModal } = this.state;
    return (
      <>
        {!currentPost || (loading && <Loader />)}
        {currentPost &&
          (!loading && (
            <div className={styles.container}>
              <div className={styles.wrapper}>
                {creator && (
                  <p className={styles.creatorText}>
                    {creator} published {changeDate(date)}
                  </p>
                )}
                <p className={styles.postTitle}>{title}</p>
                <p className={styles.postBody}>{body}</p>
                <span className={styles.span} />
                <div className={styles.commentContainer}>
                  <p className={styles.commentTitle}>Comments</p>
                  {comments && (
                    <div className={styles.commentBlock}>
                      {comments.map((item, i) => (
                        <p className={styles.commentText} key={item.id}>
                          <b>{i + 1}</b>: {item.body}
                        </p>
                      ))}
                    </div>
                  )}
                  <Button
                    backgrColor="#1ccc1c"
                    hoverColor="#117a11"
                    onClick={this.onAddComment}
                  >
                    Add comment
                  </Button>
                </div>
                <span className={styles.span} />
                <div className={styles.buttonContainer}>
                  <Button onClick={this.handleBtnBack}>Come back</Button>
                  <Button
                    backgrColor="#fa9715"
                    hoverColor="#885614"
                    onClick={this.onEditPost}
                  >
                    Edit post
                  </Button>
                </div>
              </div>
            </div>
          ))}
        <Modal
          open={modalShow}
          closeOnEscape
          closeOnDimmerClick
          onClose={this.onModalHandle}
        >
          <Modal.Content>
            <PostEditor
              id={id}
              title={title}
              creator={creator}
              body={body}
              onSave={this.editPost}
              onCancel={this.onModalHandle}
            />
          </Modal.Content>
        </Modal>
        <Modal
          open={commentModal}
          closeOnEscape
          closeOnDimmerClick
          onClose={this.onCommentModalHandle}
        >
          <Modal.Content>
            <PostEditor
              id={id}
              onComment
              onSave={this.addComment}
              onCancel={this.onCommentModalHandle}
            />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

PostPage.propTypes = {
  currentPostId: PropTypes.number.isRequired,
  currentPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    creator: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  fetchCurrentPost: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
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
  updatePost: post => dispatch(currentPostOperations.updatePost(post)),
  createComment: comment =>
    dispatch(currentPostOperations.createComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostPage);
