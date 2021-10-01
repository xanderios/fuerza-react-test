import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>

      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
}
