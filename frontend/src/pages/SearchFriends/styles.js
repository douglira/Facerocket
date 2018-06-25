import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;

  section {
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: column;
    min-height: 70px;

    &:not(:first-child) {
      border-bottom: 0.8px solid #ddd;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 5px 10px 5px;

      img {
        width: 64px;
        height: 64px;
        border-radius: 64px;
        margin-right: 10px;
      }

      div {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-self: stretch;
        align-items: flex-start !important;
        justify-content: center;
        padding: 0;

        strong: {
          color: #333;
          font-size: 10px;
          margin-left: 5px;
        }

        span: {
          flex: 1;
          color: #666;
          font-size: 9px;
        }
      }

      button {
        border: 0;
        background: inherit;
        padding: 5px;
        box-sizing: border-box;
        margin-left: 10px;

        i {
          cursor: pointer;
        }
      }
    }
  }
`;

export const FormSearch = styled.form`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  border-radius: 3px;
  margin: 10px;
  max-height: 64px;

  input {
    align-self: stretch;
    flex: 1;
    border: 0 !important;
    border-radius: 0 0 3px 3px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 16px;
    background: #ccc;
    color: #444;
  }

  button {
    display: flex;
    align-items: center;
    align-self: stretch;
    box-sizing: border-box;
    padding: 20px;
    font-size: 18px;
    border-radius: 3px 3px 0 0;
    background: #ccc;
    color: #444;
    border: 0;
    cursor: pointer;
  }
`;
