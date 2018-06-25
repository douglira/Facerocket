import styled from 'styled-components';

export const Container = styled.div`
  border: 0;
  padding: 0;

  & div {
    border: 0 !important;
    border-radius: 128px !important;
    width: 128px !important;
    height: 128px !important;
    cursor: pointer;

    img {
      border-radius: 128px;
      width: 128px;
      height: 128px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

      &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      }
    }
  }

  span {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    opacity: ${props => (props.hover ? 1 : 0)};
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
