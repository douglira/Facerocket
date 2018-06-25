import styled from 'styled-components';

export const Comment = styled.div`
  display: flex;
  flex: 1;
  margin-top: 15px;

  img {
    height: 32px;
    width: 32px;
    border-radius: 32px;
  }

  section {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    background: #f1f1f1;
    border-radius: 6px;
    margin-left: 5px;

    div {
      display: flex;
      flex: 1;
      align-items: center;

      strong {
        display: flex;
        flex: 1;
        font-size: 13px;
        color: #333;
        margin-bottom: 5px;
      }

      button {
        background: inherit;
        border: 0;
        padding: 5px;
        color: #bbb;

        &:hover {
          cursor: pointer;
        }
      }
    }

    p {
      font-size: 12px;
      color: #222;
    }
  }
`;
