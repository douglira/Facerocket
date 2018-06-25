import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  background: #f1f1f1;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const Navegation = styled.nav`
  display: flex;
  flex: 1;
  height: 100%;
  max-height: 100px;
  justify-content: center;
  align-items: center;
  border-top: 0.7px solid #ccc;
  border-bottom: 0.7px solid #ccc;
  padding: 20px;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 0 !important;
    align-self: stretch;

    li {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      list-style: none;
      font-size: 1.2em;
      font-weight: 400;
      align-self: stretch;
      cursor: pointer;

      a {
        color: #8d70ff !important;
        text-decoration: inherit;

        &:hover {
          color: #5d4ba5 !important;
        }
      }

      &:not(:first-child) {
        border-left: 0.8px solid #ccc;
      }
    }
  }
`;
