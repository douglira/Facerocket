import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import PostItem from 'components/PostItem';

import { Container } from './styles';

const PostList = ({ posts }) => (
  <Container>
    {posts.map((post) => {
      const data = {
        post,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
      };

      return <PostItem key={post._id} {...data} />;
    })}
  </Container>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default withRouter(PostList);
