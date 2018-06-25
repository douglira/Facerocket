import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { Creators as NotificationActions } from 'store/ducks/notification';
import { Creators as UserActions } from 'store/ducks/user';

import logo from 'assets/images/logo-2.jpg';

import { api } from 'services/api';

import { Container, Form } from './styles';

class Signup extends Component {
  static propTypes = {
    pushNotification: PropTypes.func.isRequired,
    authorized: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
    form: {
      name: '',
      gender: 'male',
      birthday: new Date(),
      city: '',
      state: 'SP',
      country: 'BRA',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  onInputChange = fieldname => (e) => {
    const form = { ...this.state.form };
    form[fieldname] = e.target.value;
    this.setState({ form });
  };

  handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      this.setState({ loading: true });

      const { form } = this.state;

      if (form.password !== form.confirmPassword) {
        return this.props.pushNotification({
          topic: 'error',
          text: 'As senhas não coincidem',
        });
      }

      Object.keys(form).forEach((fieldname) => {
        if (!form[fieldname] || !form[fieldname].length) {
          throw new Error('Preencha obrigatoriamente todos os campos');
        }
        return null;
      });

      const { data } = await api.post('/signup', form);

      localStorage.setItem('access_token', data.token);
      this.props.authorized(data.user);
      this.props.pushNotification({
        text: 'Usuário cadastrado com sucesso',
        topic: 'success',
      });
      this.props.history.replace('/app');
    } catch (err) {
      if (err.message) {
        return this.props.pushNotification({
          text: err.message,
          topic: 'error',
        });
      }

      if (err.response.data && err.response.data.error) {
        return this.props.pushNotification({ text: err.response.data.error, topic: 'error' });
      }

      return this.props.pushNotification({
        text: 'Erro inesperado. Tente novamente',
        topic: 'error',
      });
    } finally {
      this.setState({ loading: false });
    }

    return null;
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleOnSubmit}>
          <img src={logo} alt="Facerocket" />
          <label htmlFor="name">
            Nome
            <input
              id="name"
              placeholder="Nome e sobrenome"
              value={this.state.form.name}
              onChange={this.onInputChange('name')}
            />
          </label>
          <label htmlFor="gender">
            Gênero
            <select
              id="gender"
              value={this.state.form.gender}
              onChange={this.onInputChange('gender')}
            >
              <option defaultValue="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </label>
          <label htmlFor="birthday">
            Data de nascimento
            <input
              id="birthday"
              type="date"
              value={moment(this.state.form.birthday).format('YYYY-MM-DD')}
              onChange={this.onInputChange('birthday')}
            />
          </label>
          <label htmlFor="city">
            Cidade
            <input
              id="city"
              placeholder="Onde mora"
              value={this.state.form.city}
              onChange={this.onInputChange('city')}
            />
          </label>
          <label htmlFor="state">
            Estado
            <select id="state" value={this.state.form.state} onChange={this.onInputChange('state')}>
              <option defaultValue="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
            </select>
          </label>
          <label htmlFor="country">
            País
            <select
              id="country"
              value={this.state.form.country}
              onChange={this.onInputChange('country')}
            >
              <option defaultValue="BRA">Brasil</option>
              <option value="EUA">Estados Unidos</option>
            </select>
          </label>
          <hr />
          <label htmlFor="email">
            Email
            <input
              id="email"
              placeholder="facerocket@example.com"
              type="email"
              value={this.state.form.email}
              onChange={this.onInputChange('email')}
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              placeholder="Senha"
              type="password"
              value={this.state.form.password}
              onChange={this.onInputChange('password')}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirmar senha
            <input
              id="confirmPassword"
              placeholder="Confirme sua senha"
              type="password"
              value={this.state.form.confirmPassword}
              onChange={this.onInputChange('confirmPassword')}
            />
          </label>
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : <span>Cadastrar</span>}
          </button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pushNotification: payload => dispatch(NotificationActions.pushNotification(payload)),
  authorized: user => dispatch(UserActions.authorized(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
