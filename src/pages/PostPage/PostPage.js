import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
// import Button from '../../components/shared/Button';
import * as currentPostSelectors from '../../redux/currentPost/currentPostSelectors';
import * as currentPostOperations from '../../redux/currentPost/currentPostOperations';
import {
  Container,
  Wrapper,
  CreatorText,
  PostTitle,
  PostBody,
  Span,
  CommentContainer,
  CommentTitle,
  CommentText,
  ButtonContainer,
  StyledButton,
} from './styles';
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
            <Container>
              <Wrapper>
                {creator && (
                  <CreatorText>
                    {creator} published {changeDate(date)}
                  </CreatorText>
                )}
                <PostTitle>{title}</PostTitle>
                <PostBody>{body}</PostBody>
                <Span />
                <CommentContainer>
                  <CommentTitle>Comments</CommentTitle>
                  {comments && (
                    <div>
                      {comments.map((item, i) => (
                        <CommentText key={item.id}>
                          <b>{i + 1}</b>: {item.body}
                        </CommentText>
                      ))}
                    </div>
                  )}
                </CommentContainer>
                <StyledButton basic color="green" onClick={this.onAddComment}>
                  Add comment
                </StyledButton>
                <Span />
                <ButtonContainer>
                  <Button onClick={this.handleBtnBack}>Come back</Button>
                  <Button.Or />
                  <Button color="orange" onClick={this.onEditPost}>
                    Edit post
                  </Button>
                </ButtonContainer>
              </Wrapper>
            </Container>
          ))}
        <Modal
          open={modalShow}
          closeOnEscape
          closeOnDimmerClick
          onClose={this.onModalHandle}
        >
          <Modal.Header>Edit your post</Modal.Header>
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
          <Modal.Header>Add new comment</Modal.Header>
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
