import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPreview from '../../components/PostPreview/PostPreview';
import * as postsSelectors from '../../redux/posts/postsSelectors';
import * as postsOperations from '../../redux/posts/postsOperations';
import Loader from '../../components/shared/Loader/Loader';
import Button from '../../components/shared/Button/Button';
import styles from './StartPage.module.css';


class StartPage extends Component {

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  onCreatePost = e => {
    e.preventDefault();
  };

  // readMoreEvent = e => {
  //   const { fetchCurrentPost } = this.props;
  //   e.preventDefault();

  // };

  render() {
    const { posts, loading } = this.props;
    return (
      <div className={styles.container}>
        <Button onClick={this.onCreatePost}>Create new post</Button>
        {!posts || (loading && <Loader />)}
        {posts &&
          (!loading && (
            <div className={styles.postBlock}>
              {posts.map(item => (
                <PostPreview key={item.id} {...item} />
              ))}
            </div>
          ))}
      </div>
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
};
const mapStateToProps = state => ({
  posts: postsSelectors.getPosts(state),
  loading: postsSelectors.loading(state),
  error: postsSelectors.error(state),
});

const mapDispatchToProps = {
  fetchPosts: postsOperations.fetchPosts,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartPage);
