import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    padding-bottom: 15px;
    border-bottom: 0.75px solid #bbb;

    span {
      display: flex;
      flex: 1;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  label {
    align-self: center;
    width: 80%;
    margin-top: 15px;
    font-size: 14px;

    input {
      align-self: center;
      width: 100%;
      border: 0.75px solid #8d70ff;
      font-size: 13px;
      padding: 10px;
      color: #333;
      height: 38px;
      background: #eee;
      border-radius: 3px;
    }
  }

  button {
    font-size: 14px;
    width: 80%;
    background: #15d8a5;
    color: #fff;
    font-weight: 600;
    margin-top: 20px;
    padding: 10px 15px;
    border: 0;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #0dbf91;
    }
  }
`;
