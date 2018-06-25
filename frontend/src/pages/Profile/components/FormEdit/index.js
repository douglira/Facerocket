import React, { Component } from 'react';
import moment from 'moment';
import { Switch } from 'antd';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/user';
import { Form } from './styles';

class FormEdit extends Component {
  static propTypes = {
    updateProfileRequest: PropTypes.func.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      gender: PropTypes.string,
      birthday: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    enableFields: false,
    form: {
      name: '',
      gender: '',
      birthday: new Date(),
      city: '',
      state: '',
      country: '',
    },
  };

  componentDidMount() {
    this.populate();
  }

  onInputChange = fieldname => (e) => {
    const form = { ...this.state.form };
    form[fieldname] = e.target.value;
    this.setState({ form });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    const data = { birthday: new Date(this.state.form.birthday), ...this.state.form };

    const form = new FormData();
    Object.keys(data).forEach((fieldname) => {
      form.append(fieldname, data[fieldname]);
    });

    this.props.updateProfileRequest(form);
  };

  populate = () => {
    this.setState({ form: { ...this.props.user } });
  };

  render() {
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <div>
          <Switch size="small" onChange={enableFields => this.setState({ enableFields })} />
          <span>Habilitar edição do perfil</span>
          <NavLink to={`/app/profile/${this.props.match.params.id}/change_password`}>
            Alterar senha?
          </NavLink>
        </div>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            placeholder="Nome e sobrenome"
            value={this.state.form.name}
            onChange={this.onInputChange('name')}
            disabled={!this.state.enableFields}
          />
        </label>
        <label htmlFor="gender">
          Gênero
          <select
            id="gender"
            value={this.state.form.gender}
            onChange={this.onInputChange('gender')}
            disabled={!this.state.enableFields}
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
            disabled={!this.state.enableFields}
          />
        </label>
        <label htmlFor="city">
          Cidade
          <input
            id="city"
            placeholder="Onde mora"
            value={this.state.form.city}
            onChange={this.onInputChange('city')}
            disabled={!this.state.enableFields}
          />
        </label>
        <label htmlFor="state">
          Estado
          <select
            id="state"
            value={this.state.form.state}
            onChange={this.onInputChange('state')}
            disabled={!this.state.enableFields}
          >
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
            disabled={!this.state.enableFields}
          >
            <option defaultValue="BRA">Brasil</option>
            <option value="EUA">Estados Unidos</option>
          </select>
        </label>
        <button type="submit" disabled={!this.state.enableFields}>
          Salvar alterações
        </button>
      </Form>
    );
  }
}

const mapStateToProps = ({ user: { data } }) => ({
  user: {
    _id: data._id,
    name: data.name,
    gender: data.gender,
    birthday: data.birthday,
    city: data.city,
    state: data.state,
    country: data.country,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEdit));
