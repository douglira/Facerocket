import styled, { keyframes } from 'styled-components';

export const Animations = {
  fadeIn: keyframes`
    0% {
      -webkit-transform: translateX(-50px);
              transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  `,
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;

  & > * {
    align-self: stretch;
  }

  h1 {
    font-size: 18px;
    color: #666;
    font-weight: bold;
    align-self: flex-start;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    input {
      padding: 10px 20px;
      color: #333;
      border-radius: 3px;
      border: 0.75px solid #999;
      background: #f9f9f9;
      font-size: 14px;
    }
  }

  button {
    padding: 10px 20px;
    color: #fff;
    border-radius: 3px;
    border: 0;
    background: #15d8a5;
    font-size: 14px;
    font-weight: bold
    cursor: pointer;
    margin-top: 10px;
  }

  i {
    font-size: 24px;
    padding: 5px;
  }
`;
