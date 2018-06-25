import React from 'react';
import PropTypes from 'prop-types';

import { Form } from './styles';

const PostForm = props => (
  <Form onSubmit={props.onSubmit}>
    <textarea
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      value={props.textareaValue}
      onChange={props.onChange}
    />
    {props.children}
    {props.sendIcon ? (
      /* eslint-disable */
      <i className="fa fa-check" onClick={props.onSubmit} />
    ) : (
      <input type={props.buttonType} value={props.buttonText} />
    )}
  </Form>
);

PostForm.defaultProps = {
  placeholder: '',
  textareaValue: '',
  buttonType: 'submit',
  buttonText: 'Enviar',
  sendIcon: false,
  children: null,
};

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textareaValue: PropTypes.string,
  buttonType: PropTypes.string,
  buttonText: PropTypes.string,
  sendIcon: PropTypes.bool,
  children: PropTypes.node,
};

export default PostForm;
