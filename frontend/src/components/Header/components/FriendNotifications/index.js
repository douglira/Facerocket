import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/user';

import { Container, Actions } from './styles';

class FriendNotifications extends Component {
  static propTypes = {
    acceptFriendRequest: PropTypes.func.isRequired,
    declineFriendRequest: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired,
    friendsRequest: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      avatar_url: PropTypes.string,
      name: PropTypes.string,
    })).isRequired,
  };

  acceptRequest = async (id) => {
    this.props.acceptFriendRequest(id);
    this.props.onSelected();
  };

  declineRequest = async (id) => {
    this.props.declineFriendRequest(id);
    this.props.onSelected();
  };

  render() {
    const { friendsRequest } = this.props;

    return (
      <Container>
        {friendsRequest.length === 0 ? (
          <span>Não há notificações</span>
        ) : (
          friendsRequest.map(friend => (
            <section key={String(friend._id)}>
              <div>
                <img src={friend.avatar_url} alt={friend.name} />
                <p>
                  <strong>{friend.name}</strong> enviou uma solicitação de amizade
                </p>
              </div>
              <Actions>
                <Tooltip title="Aceitar" placement="bottomRight">
                  <button onClick={() => this.acceptRequest(friend._id)}>
                    <i className="fa fa-check-circle fa-lg" style={{ color: '#15d8a5' }} />
                  </button>
                </Tooltip>
                <Tooltip title="Recusar" placement="bottomRight">
                  <button onClick={() => this.declineRequest(friend._id)}>
                    <i className="fa fa-times-circle fa-lg" style={{ color: 'tomato' }} />
                  </button>
                </Tooltip>
              </Actions>
            </section>
          ))
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  friendsRequest: user.data.friendsRequest,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendNotifications);
