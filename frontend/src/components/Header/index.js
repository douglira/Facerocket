import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Popover, Tooltip } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PostActions } from 'store/ducks/posts';
import { Creators as UserActions } from 'store/ducks/user';

import UpdateAvatar from 'components/UpdateAvatar';
import PostNotifications from './components/PostNotifications';
import FriendNotifications from './components/FriendNotifications';

import { ContainerInfo, Container } from './styles';


class Header extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    signoutRequest: PropTypes.func.isRequired,
    postsNotificationsCount: PropTypes.number.isRequired,
    friendsRequestCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    friend: PropTypes.shape({
      avatar_url: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  };

  state = {
    form: {
      post: '',
    },
    tooltipFriendsRequest: false,
    tooltipPosts: false,
    tooltipSignout: false,
    popoverFriendsRequest: false,
    popoverPosts: false,
  };

  handleAddPost = (e) => {
    e.preventDefault();
    const { post } = this.state.form;

    if (!post) return;

    this.props.addPost(post);

    this.setState({ form: { post: '' } });
  };

  handleSignout = () => {
    const { history } = this.props;

    this.props.signoutRequest({
      redirect: () => history.replace('/login'),
    });
  };

  handleChange = fieldname => (event) => {
    const form = { ...this.state.form };
    form[fieldname] = event.target.value;
    this.setState({ form });
  };

  handleTooltipVisible = tooltipName => (visible) => {
    this.setState({ [tooltipName]: visible });
  };

  handlePopoverVisible = popoverName => (visible) => {
    this.setState({ [popoverName]: visible });
  };

  handleCloseTootip = tooltipName => () => {
    this.setState({ [tooltipName]: false });
  };

  render() {
    const {
      user,
      friend,
      loading,
      location,
      postsNotificationsCount,
      friendsRequestCount,
    } = this.props;
    const friendId = location.pathname.split(/\/app\/profile\//)[1];

    if (/\/app\/profile\//.test(location.pathname) && friendId !== user._id) {
      return loading ? (
        <i className="fa fa-spinner fa-pulse" />
      ) : (
        <ContainerInfo>
          <div>
            <img src={friend.avatar_url} alt={friend.name} />
            <p>{friend.name}</p>
            <span style={{ color: '#8d70ff', fontSize: '16px', marginBottom: '10px' }}>
              {friend.city}, {friend.state}
            </span>
            {friend.commonFriends && friend.commonFriends.count ? (
              <span style={{ marginBottom: '10px' }}>
                {friend.commonFriends.count} {friend.commonFriends.count === 1 ? 'amigo' : 'amigos'}{' '}
                em comum
              </span>
            ) : null}
          </div>
        </ContainerInfo>
      );
    }

    return (
      <Container>
        <nav>
          <Popover
            content={
              <FriendNotifications
                onSelected={() => this.setState({ popoverFriendsRequest: false })}
              />
            }
            trigger="click"
            visible={this.state.popoverFriendsRequest}
            onVisibleChange={this.handlePopoverVisible('popoverFriendsRequest')}
            placement="bottomRight"
            arrowPointAtCenter
          >
            <button>
              <Tooltip
                onClick={this.handleCloseTootip('tooltipFriendsRequest')}
                onVisibleChange={this.handleTooltipVisible('tooltipFriendsRequest')}
                visible={this.state.tooltipFriendsRequest}
                mouseEnterDelay={0.15}
                placement="bottomRight"
                arrowPointAtCenter
                title="Solicitações de amizade"
              >
                <i className="fa fa-user-plus" />
              </Tooltip>
              {friendsRequestCount > 0 ? <span>{friendsRequestCount}</span> : null}
            </button>
          </Popover>
          <Popover
            content={
              <PostNotifications onSelected={() => this.setState({ popoverPosts: false })} />
            }
            trigger="click"
            visible={this.state.popoverPosts}
            onVisibleChange={this.handlePopoverVisible('popoverPosts')}
            placement="bottomRight"
            arrowPointAtCenter
          >
            <button>
              <Tooltip
                onClick={this.handleCloseTootip('tooltipPosts')}
                onVisibleChange={this.handleTooltipVisible('tooltipPosts')}
                visible={this.state.tooltipPosts}
                mouseEnterDelay={0.15}
                placement="bottomRight"
                arrowPointAtCenter
                title="Notificações"
              >
                <i className="fa fa-bell-o" />
              </Tooltip>
              {postsNotificationsCount > 0 ? <span>{postsNotificationsCount}</span> : null}
            </button>
          </Popover>
          <button onClick={this.handleSignout}>
            <Tooltip
              onClick={this.handleCloseTootip('tooltipSignout')}
              onVisibleChange={this.handleTooltipVisible('tooltipSignout')}
              visible={this.state.tooltipSignout}
              mouseEnterDelay={0.15}
              placement="bottomRight"
              arrowPointAtCenter
              title="Sair"
            >
              <i className="fa fa-sign-out" />
            </Tooltip>
          </button>
        </nav>
        <ContainerInfo>
          <div>
            {location.pathname === `/app/profile/${user._id}` ? (
              <UpdateAvatar>
                <img src={this.props.user.avatar_url} alt={this.props.user.name} />
              </UpdateAvatar>
            ) : (
              <img src={this.props.user.avatar_url} alt={this.props.user.name} />
            )}
            <p>{this.props.user.name}</p>
          </div>
          {location.pathname === `/app/profile/${user._id}` || (
            <form onSubmit={this.handleAddPost}>
              <textarea
                placeholder="No que está pensando?"
                value={this.state.form.post}
                onChange={this.handleChange('post')}
                draggable={false}
              />
              <button type="submit">Publicar</button>
            </form>
          )}
        </ContainerInfo>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, posts }) => ({
  user: user.data,
  friend: user.info,
  loading: user.loading,
  friendsRequestCount: user.data.friendsRequest.length,
  postsNotificationsCount: posts.notifications.length,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UserActions, ...PostActions }, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
