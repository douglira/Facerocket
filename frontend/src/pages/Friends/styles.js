import styled from 'styled-components';

export const AntdPainel = {
  background: '#f1f1f1',
  borderRadius: 3,
  border: 0,
  overflow: 'hidden',
};

export const AntdCollapse = {
  width: '100%',
};

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
`;

export const HeaderCollapse = styled.p`
  font-size: 16px;
  vertical-align: middle;
  color: #8d70ff;
`;

export const FriendCard = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-height: 70px;

  img {
    height: 42px;
    width: 42px;
    border-radius: 42px;
    cursor: pointer;
  }

  section {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;

    a {
      text-decoration: initial;
      color: initial;
    }

    strong {
      font-size: 13px;
      color: #444;
    }

    p {
      font-size: 12px;
      color: #444;
      margin: 0 !important;
    }
  }

  button {
    border: 0;
    background: #f1f1f1;
    padding: 5px;
    box-sizing: border-box;
    margin-left: 10px;

    i {
      cursor: pointer;
    }
  }
`;
