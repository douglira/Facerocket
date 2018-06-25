import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Collapse, Tooltip } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotificationActions } from 'store/ducks/notification';
import { Creators as UserActions } from 'store/ducks/user';

import { api } from 'services/api';

import { Container, HeaderCollapse, FriendCard, AntdPainel, AntdCollapse } from './styles';

class Friends extends Component {
  static propTypes = {
    pushNotification: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired,
    friendsRequest: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    })).isRequired,
  };

  state = {
    friends: [],
    friendsCount: 0,
    loading: true,
  };

  componentDidMount() {
    this.fetchFriendList();
  }

  fetchFriendList = async () => {
    try {
      const { data } = await api.get('/friends');

      this.setState({ ...data });
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        this.props.pushNotification({ text: err.response.data.error, topic: 'error' });
      } else {
        this.props.pushNotification({
          text: 'Não foi possível importar sua lista de amigos',
          topic: 'error',
        });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  removeFriend = async (id) => {
    this.props.removeFriend(id);
  };

  acceptRequest = async (id) => {
    this.props.acceptFriendRequest(id);
  };

  declineRequest = async (id) => {
    this.props.declineFriendRequest(id);
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <i className="fa fa-spinner fa-pulse fa-lg" />
        ) : (
          <Collapse
            bordered={false}
            defaultActiveKey={[!this.props.friendsRequest.length ? '2' : '1']}
            style={AntdCollapse}
          >
            <Collapse.Panel
              key="1"
              header={
                <HeaderCollapse>
                  Solicitações de amizade ({this.props.friendsRequest.length})
                </HeaderCollapse>
              }
              style={AntdPainel}
            >
              {!this.props.friendsRequest.length ? (
                <p>Não há solicitações de amizade.</p>
              ) : (
                this.props.friendsRequest.map(friend => (
                  <FriendCard key={friend._id}>
                    <img src={friend.avatar_url} alt={friend.name} />
                    <section>
                      <strong>{friend.name}</strong>
                      <p>
                        {friend.city} - {friend.state}
                      </p>
                    </section>
                    <Tooltip title="Aceitar" placement="left">
                      <button onClick={() => this.acceptRequest(friend._id)}>
                        <i className="fa fa-check fa-lg" style={{ color: '#15d8a5' }} />
                      </button>
                    </Tooltip>
                    <Tooltip title="Recusar" placement="left">
                      <button onClick={() => this.declineRequest(friend._id)}>
                        <i className="fa fa-minus fa-lg" style={{ color: 'tomato' }} />
                      </button>
                    </Tooltip>
                  </FriendCard>
                ))
              )}
            </Collapse.Panel>
            <Collapse.Panel
              header={<HeaderCollapse>Meus amigos ({this.state.friendsCount})</HeaderCollapse>}
              key="2"
              style={AntdPainel}
            >
              {this.state.friends.map(friend => (
                <FriendCard key={friend._id}>
                  <Link to={`/app/profile/${friend._id}`}>
                    <img src={friend.avatar_url} alt={friend.name} />
                  </Link>
                  <section>
                    <Link to={`/app/profile/${friend._id}`}>
                      <strong>{friend.name}</strong>
                    </Link>
                    <p>
                      {friend.city} - {friend.state}
                    </p>
                  </section>
                  <Tooltip title="Desfazer amizade" placement="left">
                    <button onClick={() => this.removeFriend(friend._id)}>
                      <i className="fa fa-user-times fa-lg" style={{ color: 'tomato' }} />
                    </button>
                  </Tooltip>
                </FriendCard>
              ))}
            </Collapse.Panel>
          </Collapse>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  friendsRequest: user.data.friendsRequest,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...NotificationActions, ...UserActions }, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Friends));
