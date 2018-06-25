import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Container, Animations } from './styles';

class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape({
      text: PropTypes.string,
      visible: PropTypes.bool,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    window.addEventListener('scroll', this.onScroll);
    this.state = {
      topPosition: 25,
    };
  }

  onScroll = () => {
    const topPosition = window.pageYOffset + 25;
    this.setState({ topPosition });
  };

  render() {
    const { notification } = this.props;

    return (
      <Container
        topPosition={this.state.topPosition}
        topic={notification.topic}
        style={
          notification.visible
            ? {
                opacity: 0.8,
                animation: `${Animations.bounceIn} 1.1s both`,
              }
            : {
                opacity: 0,
                animation: notification.text
                  ? `${Animations.scaleOut} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`
                  : '',
              }
        }
      >
        <p>{notification.text}</p>
      </Container>
    );
  }
}

const mapStateToProps = ({ notification }) => ({
  notification,
});

export default connect(mapStateToProps)(Notification);
