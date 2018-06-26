import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: 50px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 20px 40px;
  background: #fff;
  width: 80%;

  hr {
    border: 0.25px solid #ddd;
    width: 100%;
    margin-top: 20px;
  }

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 0.75px solid #bbb;

    span:first-child {
      flex: 0 1;
    }

    span {
      display: flex;
      flex: 1;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  label {
    align-self: center;
    width: 100%;
    margin-top: 15px;
    font-size: 14px;

    input,
    select {
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
    width: 100%;
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
