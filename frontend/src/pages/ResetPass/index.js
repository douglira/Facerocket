import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Creators as NotificationActions } from 'store/ducks/notification';

import { api } from 'services/api';

import { Container, Form, Animations } from './styles';

class ResetPass extends Component {
  static propTypes = {
    pushNotification: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  };

  state = {
    requestPassStatus: false,
    email: '',
    token: '',
    password: '',
    confirmPassword: '',
    loadingRequest: false,
    loadingReset: false,
  };

  handleForgotPassSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loadingRequest: true });

    const { email } = this.state;

    if (!email) {
      return this.props.pushNotification({
        topic: 'error',
        text: 'Preenchimento obrigatório',
      });
    }

    try {
      const { data } = await api.post('/forgot_pass', { email });

      this.setState({ requestPassStatus: true });
      return this.props.pushNotification({
        topic: 'success',
        text: data.message,
      });
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        return this.props.pushNotification({ text: err.response.data.error, topic: 'error' });
      }

      return this.props.pushNotification({
        text: 'Erro inesperado. Tente novamente',
        topic: 'error',
      });
    } finally {
      this.setState({ loadingRequest: false });
    }
  };

  handleResetPassSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loadingReset: true });

    const { token, password, confirmPassword } = this.state;

    if (!token || !password || !confirmPassword) {
      return this.props.pushNotification({
        topic: 'error',
        text: 'Preenchimento obrigatório dos campos',
      });
    }

    try {
      await api.post('/reset_pass', { token, password, confirmPassword });

      this.props.pushNotification({
        topic: 'success',
        text: 'Senha redefinida com sucesso',
      });
      return this.props.history.replace('/login');
    } catch (err) {
      if (err.response.data && err.response.data.error) {
        return this.props.pushNotification({ text: err.response.data.error, topic: 'error' });
      }

      return this.props.pushNotification({
        text: 'Erro inesperado. Tente novamente',
        topic: 'error',
      });
    } finally {
      this.setState({ loadingReset: false });
    }
  };

  render() {
    return (
      <Container>
        <Form
          onSubmit={this.handleForgotPassSubmit}
          style={{
            borderRadius: '5px 5px 0 0',
            animation: `${Animations.fadeIn} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both`,
          }}
        >
          <h1>Solicitação de nova senha</h1>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="Envie-nos seu email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          {this.state.loadingRequest ? (
            <button style={{ alignSelf: 'flex-end', background: '#fff', padding: 0 }}>
              <i style={{ color: '#15d8a5', padding: 0 }} className="fa fa-spinner fa-pulse" />
            </button>
          ) : (
            <button style={{ alignSelf: 'flex-end', background: '#fff', padding: 0 }}>
              <i style={{ color: '#15d8a5', padding: 0 }} className="fa fa-check-circle" />
            </button>
          )}
        </Form>
        <Form
          onSubmit={this.handleResetPassSubmit}
          style={{
            borderRadius: '0 0 5px 5px',
            opacity: 0,
            animation:
              this.state.requestPassStatus &&
              `${Animations.fadeIn} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both`,
          }}
        >
          <h1>Redefinição de senha</h1>
          <label htmlFor="token">
            Token
            <input
              id="token"
              type="text"
              placeholder="Token recebido no email"
              value={this.state.token}
              onChange={e => this.setState({ token: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              placeholder="Sua nova senha"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <label htmlFor="confirmPassword">
            Nova senha
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua nova senha"
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </label>
          <button type="submit">
            {this.state.loadingReset ? <i className="fa fa-spinner fa-pulse" /> : 'Entrar'}
          </button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pushNotification: payload => dispatch(NotificationActions.pushNotification(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ResetPass);
