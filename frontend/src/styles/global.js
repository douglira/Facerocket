import { injectGlobal } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

import 'antd/dist/antd.css';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #8d70ff;
    font-family: 'sans-serif';
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  #root {
    height: 100%;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
