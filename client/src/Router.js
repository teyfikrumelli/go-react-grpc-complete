import React from "react";
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

import { Home, Login, Logout, Register, Profile } from './pages';
import { MainHeader } from './pages/components';

export default function () {
  return (
    <Router>
      <div>
        <MainHeader />
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <PrivateRoute path="/logout">
                <Logout />
            </PrivateRoute>
            <Route path="/register">
                <Register />
            </Route>
            <PrivateRoute path="/profile">
                <Profile />
            </PrivateRoute>
            <Route path="/">
                <Home />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

  const { loggedInUser } = useSelector(state => state.loginReducer);

  return (
    <Route
      {...rest}
      render={({ location }) =>
          loggedInUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}