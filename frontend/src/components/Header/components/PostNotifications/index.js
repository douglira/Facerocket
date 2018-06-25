import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PostActions } from 'store/ducks/posts';

import { api } from 'services/api';
import { Container } from './styles';

class PostNotifications extends Component {
  static propTypes = {
    postsNotificationsRemove: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      from: PropTypes.shape({
        avatar_url: PropTypes.string,
        name: PropTypes.string,
      }),
    })).isRequired,
  };

  remove = (id) => {
    api.delete(`/posts/notifications/${id}`);
    this.props.postsNotificationsRemove(id);
  };

  selected = (id) => {
    this.remove(id);
    this.props.onSelected();
  };

  render() {
    const { notifications } = this.props;

    return (
      <Container>
        {notifications.length === 0 ? (
          <span>Não há notificações</span>
        ) : (
          notifications.map(notification => (
            <section key={String(notification.id)}>
              <button onClick={() => this.remove(notification.id)}>
                <i className="fa fa-times" />
              </button>
              <div>
                <Link
                  to={`/app/posts/${notification.postId}`}
                  onClick={() => this.selected(notification.id)}
                >
                  <img src={notification.from.avatar_url} alt={notification.from.name} />
                  {notification.topic === 'like' ? (
                    <p>
                      <strong>{notification.from.name}</strong> curtiu sua publicação
                    </p>
                  ) : (
                    <p>
                      <strong>{notification.from.name}</strong> comentou em sua publicação
                    </p>
                  )}
                </Link>
              </div>
            </section>
          ))
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  const notifications = [];
  posts.notifications.forEach(notification =>
    posts.data.forEach((post) => {
      if (notification.post === post._id) {
        notifications.push({
          postId: post._id,
          topic: notification.topic,
          id: notification._id,
          from: notification.from,
          time: notification.createdAt,
        });
      }
    }));
  return {
    notifications: _.orderBy(notifications, 'time', 'desc'),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(PostActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostNotifications);
