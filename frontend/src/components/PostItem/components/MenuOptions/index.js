import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';

import { Container } from './styles';

const MenuOptions = ({ onClick }) => {
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="0">Editar</Menu.Item>
      <Menu.Item key="1">Excluir</Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="fa fa-ellipsis-v" />
      </Dropdown>
    </Container>
  );
};

MenuOptions.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuOptions;
