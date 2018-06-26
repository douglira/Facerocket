import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
  height: 100%;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #fff;
    padding: 30px;

    img {
      border-radius: 5px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 350px;
      border-radius: 5px;
      padding: 15px;
      box-sizing: border-box;

      & > * {
        align-self: stretch;
      }


      input {
        padding: 10px 20px;
        color: #333;
        margin-top: 15px;
        border-radius: 3px;
        border: 0.75px solid #999;
        background: #f9f9f9;
        font-size: 14px;

      }

      button {
        padding: 10px 20px;
        margin-top: 10px;
        color: #fff;
        border-radius: 3px;
        border: 0;
        background: #15d8a5;
        font-size: 14px;
        font-weight: bold
        cursor: pointer;
      }
    }
  }
`;

export const Style = {
  resetPass: {
    marginTop: '0',
    fontSize: '12px',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    color: '#999',
    paddingBottom: '10px',
    paddingTop: '2px',
  },
  newAccount: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '10px 20px',
    border: '.7px solid #8d70ff',
    borderRadius: '3px',
    fontSize: '14px',
    color: '#8d70ff',
    marginTop: '20px',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
};

// export const Header = styled.header`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   max-width: 350px;
//   font-size: 48px;
//   word-spacing: 2px;
//   color: #4124b1;
//   padding: 15px 0;
// `;
