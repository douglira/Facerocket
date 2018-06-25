import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotificationActions } from 'store/ducks/notification';

import PostList from 'pages/PostList';

import { api } from 'services/api';

import { Container } from './styles';

class FriendFeedProfile extends Component {
  static propTypes = {
    pushNotification: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  };

  state = {
    posts: [],
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const { friendId: id } = this.props;

      if (!id || !id.length) {
        this.props.history.replace('/app');
      }

      const { data: posts } = await api.get(`/posts/user/${id}`);

      this.setState({ posts });
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        this.props.pushNotification(NotificationActions.pushNotification({ text: err.response.data.error, topic: 'error' }));
        return;
      }

      this.props.pushNotification({
        topic: 'error',
        text: 'Não foi possível carregar o feed. Tente novamente',
      });
    }
  };

  render() {
    return (
      <Container>
        <PostList posts={this.state.posts} />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(NotificationActions, dispatch);

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(FriendFeedProfile));
