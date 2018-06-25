import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotificationActions } from 'store/ducks/notification';

import { api, socketConnect } from 'services/api';

import { Comment } from './styles';

class CommentList extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    postAuthorId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    form: PropTypes.node.isRequired,
    pushNotification: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    comments: [],
  };

  componentDidMount() {
    this.fetchComments();
    this.fetchRealtimeComment();
  }

  fetchComments = async () => {
    const { data: comments } = await api.get(`/post/${this.props.postId}/comments`);
    this.setState({ comments, loading: false });
  };

  fetchRealtimeComment = () => {
    const socket = socketConnect();
    socket.on(`comment.insert.${this.props.postId}`, async (data) => {
      const { data: comment } = await api.get(`/post/comment/${data.id}`);
      const comments = [comment, ...this.state.comments];
      this.setState({ comments });
    });
  };

  removeComment = async (id) => {
    try {
      await api.delete(`/post/comment/${id}`);
      const comments = [...this.state.comments];
      comments.splice(comments.findIndex(comment => comment._id === id), 1);

      this.setState({ comments });
      this.props.pushNotification({
        topic: 'success',
        text: 'Comentário excluído com sucesso.',
      });
    } catch (err) {
      this.props.pushNotification({
        topic: 'error',
        text: 'Não foi possível excluir o comentário. Tente novamente',
      });
    }
  };

  renderComments = () =>
    (!this.state.comments.length ? (
      <p>Não há comentários a serem exibidos</p>
    ) : (
      this.state.comments.map(comment => (
        <Comment key={comment._id}>
          <img src={comment.author.avatar_url} alt={comment.author.name} />
          <section>
            <div>
              <strong>{comment.author.name}</strong>
              {this.props.postAuthorId === this.props.userId ||
              comment.author._id === this.props.userId ? (
                <button onClick={() => this.removeComment(comment._id)}>
                  <i className="fa fa-times" />
                </button>
              ) : null}
            </div>
            <p>{comment.content}</p>
          </section>
        </Comment>
      ))
    ));

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        destroyOnClose
        footer={this.props.form}
      >
        {this.state.loading ? (
          <i className="fa fa-spinner fa-pulse fa-lg" />
        ) : (
          this.renderComments()
        )}
      </Modal>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userId: user.data._id,
});

const mapDispatchToProps = dispatch => bindActionCreators(NotificationActions, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList));
