import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;

  textarea {
    display: flex;
    flex: 1;
    border: 0;
    width: 100%;
    background: #f9f9f9;
    color: #333;
    padding: 0 5px;
    box-sizing: border-box;
    border-radius: 3px;
    resize: none;
    align-self: stretch;
  }

  i {
    align-self: stretch;
    vertical-align: middle;
    padding: 10px;
    color: #8d70ff;
    background: #f9f9f9;
    font-size: 18px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #e0e0e0;
    }
  }

  input {
    border: 0px;
    padding: 0 5px;
    align-self: stretch;
    background: #f9f9f9;
    color: #8d70ff;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }
  }
`;
