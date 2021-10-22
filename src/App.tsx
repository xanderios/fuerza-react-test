import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import JournalList from './pages/JournalList';

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route path="/journals">
          <ProtectedRoute>
            <JournalList />
          </ProtectedRoute>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </AuthProvider>
  );
}
