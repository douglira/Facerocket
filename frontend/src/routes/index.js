import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Notification from 'components/Notification';

import Login from 'pages/SignIn';
import Signup from 'pages/Signup';
import ResetPass from 'pages/ResetPass';
import Main from 'pages/Main';

const Routes = () => (
  <Router>
    <Fragment>
      <Notification />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/reset_password" component={ResetPass} />
        <Route path="/app" component={Main} />
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
