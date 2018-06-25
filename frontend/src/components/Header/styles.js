import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.85px solid #ddd;
  padding-bottom: 20px;

  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    button {
      border: 0;
      color: #666;
      font-weight: 300;
      margin-right: 10px;
      background-color: inherit;
      position: relative;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 11px;
        height: 15px;
        width: 15px;
        border-radius: 15px;
        background: #ef5350;
        color: #f9f9f9;
        font-weight: bold;
        padding: 10px;
        box-sizing: border-box;
      }

      i {
        font-size: 20px;
        padding: 10px;
        color: #8d70ff;
        cursor: pointer;
      }

      &:hover > i {
        color: #5d4ba5;
      }

      &:hover > span {
        background: #e4413d;
      }
    }
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  height: auto;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 128px;
      height: 128px;
      border-radius: 128px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }
    }

    p {
      color: #4b379a;
      font-size: 24px;
      margin-top: 15px;
      font-weight: 500;
    }
  }

  form {
    display: flex;
    margin-left: 20px;
    flex: 1;
    flex-direction: column;

    & > * {
      align-self: stretch;
      border-radius: 3px;
    }

    textarea {
      font-size: 14px;
      color: #444;
      background: #eee;
      border: 0;
      padding: 20px;
      box-sizing: border-box;
      height: 120px;
      resize: none;
    }

    button {
      font-size: 14px;
      background: #15d8a5;
      color: #fff;
      font-weight: 600;
      margin-top: 10px;
      padding: 15px;
      border: 0;
      cursor: pointer;

      &:hover {
        background: #0dbf91;
      }
    }
  }
`;
