import styled, { keyframes } from 'styled-components';

export const Animations = {
  bounceIn: keyframes`
    0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
    }
    38% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
      opacity: 0.80;
    }
    55% {
      -webkit-transform: scale(0.7);
              transform: scale(0.7);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
    }
    81% {
      -webkit-transform: scale(0.84);
              transform: scale(0.84);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
    }
    89% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
    }
    95% {
      -webkit-transform: scale(0.95);
              transform: scale(0.95);
      -webkit-animation-timing-function: ease-in;
              animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-animation-timing-function: ease-out;
              animation-timing-function: ease-out;
    }
  `,
  scaleOut: keyframes`
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 0.80;
    }
    100% {
      -webkit-transform: scale(0);
              transform: scale(0);
      opacity: 0.80;
    }
  `,
};

export const Container = styled.div`
  position: absolute;
  top: ${props => `${props.topPosition}px`};
  left: 25px;
  max-width: 380px;
  background: ${props => (props.topic === 'success' ? '#16ca00' : '#ff5252')};
  padding: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 6;
  opacity: 0;

  p {
    color: #fff;
    font-size: 14px;
    margin: 0 !important;
    opacity: 1 !important;
  }
`;
