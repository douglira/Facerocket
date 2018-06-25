import styled from 'styled-components';

export const Post = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px 0;
  border-radius: 3px;
  background: #e1e1e1;
  padding: 10px;
  box-sizing: border-box;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      cursor: pointer;
    }

    p {
      font-size: 14px;
      color: #333;
      font-weight: 700;
      margin-left: 10px;
      display: flex;
      align-items: center;
      margin-bottom: 0;
      padding: 0;
      cursor: pointer;
      text-decoration: initial;
    }
  }

  p {
    align-self: stretch;
    font-weight: 300;
    font-size: 14px;
    color: #333;
    padding-bottom: 5px;
  }
`;

export const PostInteractions = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 5px 0;
  border-top: 0.75px solid #bbb;
  margin-bottom: 0 !important;

  button {
    border: 0;
    display: flex;
    align-self: flex-start;
    align-items: flex-start;
    color: #666;
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    margin-top: 5px;
    background-color: inherit;

    span {
      margin-right: 5px;
      align-self: flex-end;
    }

    i {
      font-size: 20px;
      color: #8d70ff;

      &:hover {
        color: #5d4ba5;
      }
    }
  }
`;
