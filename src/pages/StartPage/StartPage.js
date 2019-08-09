import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import PostPreview from '../../components/PostPreview/PostPreview';
import * as postsSelectors from '../../redux/posts/postsSelectors';
import * as postsOperations from '../../redux/posts/postsOperations';
import Loader from '../../components/shared/Loader/Loader';
import { Container, PostBlock, StyledButton } from './styles';
import PostEditor from '../../components/PostEditor/PostEditor';

class StartPage extends Component {
  state = {
    modalShow: false,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  onModalHandle = () => {
    this.setState(state => ({
      modalShow: !state.modalShow,
    }));
  };

  onCreatePost = e => {
    e.preventDefault();
    this.onModalHandle();
  };

  addPost = post => {
    const { createPost } = this.props;
    const infoDate = new Date(Date.now());
    const postToAdd = {
      ...post,
      date: infoDate.toLocaleDateString('en-US'),
    };
    createPost(postToAdd);
    this.onModalHandle();
  };

  removePost = post => {
    const { deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const { posts, loading } = this.props;
    const { modalShow } = this.state;

    return (
      <Container>
        <StyledButton positive onClick={this.onCreatePost}>
          Create new post
        </StyledButton>
        {!posts || (loading && <Loader />)}
        {posts &&
          (!loading && (
            <PostBlock>
              {posts.map(item => (
                <PostPreview
                  key={item.id}
                  onDelete={this.removePost}
                  {...item}
                />
              ))}
            </PostBlock>
          ))}
        <Modal
          open={modalShow}
          closeOnEscape
          closeOnDimmerClick
          onClose={this.onModalHandle}
        >
          <Modal.Header>Create your post</Modal.Header>
          <Modal.Content>
            <PostEditor onSave={this.addPost} onCancel={this.onModalHandle} />
          </Modal.Content>
        </Modal>
      </Container>
    );
  }
}
StartPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      creator: PropTypes.string,
      date: PropTypes.string,
    }).isRequired,
  ).isRequired,
  fetchPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  posts: postsSelectors.getPosts(state),
  loading: postsSelectors.loading(state),
  error: postsSelectors.error(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: postsOperations.fetchPosts,
  createPost: post => dispatch(postsOperations.createPost(post)),
  deletePost: postId => dispatch(postsOperations.deletePost(postId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartPage);
