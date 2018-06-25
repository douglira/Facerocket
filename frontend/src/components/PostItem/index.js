import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Modal } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PostsActions } from 'store/ducks/posts';

import PostForm from './components/PostForm';
import MenuOptions from './components/MenuOptions';
import CommentsList from './components/CommentsList';

import { Post, PostInteractions } from './styles';

class PostItem extends Component {
  static propTypes = {
    toggleLikeRequest: PropTypes.func.isRequired,
    newCommentRequest: PropTypes.func.isRequired,
    editPostRequest: PropTypes.func.isRequired,
    deletePostRequest: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.shape({
        avatar_url: PropTypes.string,
        name: PropTypes.string,
      }),
      content: PropTypes.string,
    }).isRequired,
    likesCount: PropTypes.number.isRequired,
    commentsCount: PropTypes.number.isRequired,
  };

  state = {
    showComments: false,
    inputComment: '',
    inputEditPost: this.props.post.content,
    showEditField: false,
  };

  handleToggleLike = () => {
    this.props.toggleLikeRequest(this.props.post._id);
  };

  handleAddComment = (e) => {
    if (e) e.preventDefault();

    if (!this.state.inputComment.trim()) return;

    const content = this.state.inputComment;
    const postId = this.props.post._id;

    this.props.newCommentRequest({ content, postId });

    this.setState({ inputComment: '' });
  };

  handleEnterAddComment = (e) => {
    if (e.keyCode === 13) {
      this.handleAddComment();
      e.preventDefault();
    }
  };

  handleEditPost = (e) => {
    if (e) e.preventDefault();

    if (!this.state.inputEditPost.trim()) return;

    const content = this.state.inputEditPost;
    const postId = this.props.post._id;

    this.props.editPostRequest({ content, postId });

    this.setState({ inputEditPost: '', showEditField: false });
  };

  handleEnterEditPost = (e) => {
    if (e.keyCode === 13) {
      this.handleEditPost();
      e.preventDefault();
    }
  };

  handleDeletePost = () => {
    const { deletePostRequest, post } = this.props;
    Modal.confirm({
      title: 'Deseja mesmo excluir esta publicação?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      iconType: 'close-circle',
      onOk() {
        deletePostRequest(post._id);
      },
    });
  };

  handleMenuOptionsClick = (e) => {
    switch (e.key) {
      case '0':
        this.setState({ showEditField: !this.state.showEditField });
        break;
      case '1':
        this.handleDeletePost();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      user, post, likesCount, commentsCount,
    } = this.props;
    post.isLiked = post.likes.includes(user._id);

    return (
      <Post>
        <div>
          <Link to={`/app/profile/${post.author._id}`}>
            <img src={post.author.avatar_url} alt={post.author.name} />
          </Link>
          <Link to={`/app/profile/${post.author._id}`}>
            <p>{post.author.name}</p>
          </Link>
          {post.author._id === user._id ? (
            <MenuOptions onClick={this.handleMenuOptionsClick} />
          ) : null}
        </div>
        {this.state.showEditField ? (
          <PostForm
            onSubmit={this.handleEditPost}
            onKeyDown={this.handleEnterEditPost}
            textareaValue={this.state.inputEditPost}
            onChange={e => this.setState({ inputEditPost: e.target.value })}
            sendIcon
          >
            {/* eslint-disable */}
            <i className="fa fa-times" onClick={() => this.setState({ showEditField: false })} />
          </PostForm>
        ) : (
          <p>{post.content}</p>
        )}
        <PostInteractions>
          <button onClick={this.handleToggleLike}>
            <span>{likesCount}</span>{' '}
            <i className={post.isLiked ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'} />
          </button>
          <button onClick={() => this.setState({ showComments: true })}>
            <span>{commentsCount}</span> <i className="fa fa-comments-o" />
          </button>
          {this.state.showComments ? (
            <CommentsList
              postId={post._id}
              postAuthorId={post.author._id}
              onClose={() => this.setState({ showComments: false })}
              visible={this.state.showComments}
              form={
                <PostForm
                  onSubmit={this.handleAddComment}
                  onKeyDown={this.handleEnterAddComment}
                  placeholder="Escrever comentário..."
                  textareaValue={this.state.inputComment}
                  onChange={e => this.setState({ inputComment: e.target.value })}
                />
              }
            />
          ) : null}
          <PostForm
            onSubmit={this.handleAddComment}
            onKeyDown={this.handleEnterAddComment}
            placeholder="Escrever comentário..."
            textareaValue={this.state.inputComment}
            onChange={e => this.setState({ inputComment: e.target.value })}
          />
        </PostInteractions>
      </Post>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(PostsActions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostItem),
);
