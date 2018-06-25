import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/user';
import PropTypes from 'prop-types';

import { Form } from './styles';

class FormChangePassword extends Component {
  static propTypes = {
    changePassRequest: PropTypes.func.isRequired,
  };

  state = {
    form: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  };

  onInputChange = fieldname => (e) => {
    const form = { ...this.state.form };
    form[fieldname] = e.target.value;
    this.setState({ form });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state.form;

    if (!oldPassword || !newPassword || !confirmPassword) return;

    this.props.changePassRequest(this.state.form);
  };

  render() {
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <label htmlFor="oldPassword">
          Senha
          <input
            id="oldPassword"
            placeholder="Senha atual"
            type="password"
            value={this.state.form.oldPassword}
            onChange={this.onInputChange('oldPassword')}
          />
        </label>
        <label htmlFor="newPassword">
          Nova senha
          <input
            id="newPassword"
            placeholder="Sua nova senha"
            type="password"
            value={this.state.form.newPassword}
            onChange={this.onInputChange('newPassword')}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirmar senha
          <input
            id="confirmPassword"
            placeholder="Confirmar nova senha"
            type="password"
            value={this.state.form.confirmPassword}
            onChange={this.onInputChange('confirmPassword')}
          />
        </label>
        <button type="submit">Salvar</button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(FormChangePassword);
