import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import 'styles/global';
import 'react-image-crop/dist/ReactCrop.css';

import 'config/reactotron';
import Routes from 'routes';
import store from 'store';

const App = () => (
  <Fragment>
    <Provider store={store}>
      <Routes />
    </Provider>
  </Fragment>
);

export default App;
