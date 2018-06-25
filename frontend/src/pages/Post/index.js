import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { api } from 'services/api';

import PostItem from 'components/PostItem';

import { Container } from './styles';

class Post extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  };

  state = {
    postData: {},
    loading: true,
  };

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = async () => {
    const { id } = this.props.match.params;
    try {
      const { data: post } = await api.get(`/posts/${id}`);

      const postData = {
        post,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
      };

      this.setState({ postData });
    } catch (err) {
      this.props.history.replace('/app');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <i className="fa fa-spinner fa-pulse fa-lg" />
        ) : (
          <PostItem {...this.state.postData} />
        )}
      </Container>
    );
  }
}

export default Post;
