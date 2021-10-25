import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import JournalList from './pages/JournalList';
import CreateJournal from './pages/CreateJournal';
import Journal from './pages/Journal';

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

        <Route exact path="/create-journal">
          <CreateJournal />
        </Route>

        <Route exact path="/create-journal">
          <Journal />
        </Route>
      </Switch>
    </AuthProvider>
  );
}
