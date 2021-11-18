import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Button from './components/Button';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import JournalList from './pages/JournalList';
import CreateJournal from './pages/CreateJournal';
import CreateNote from './pages/CreateNote';
import JournalPage from './pages/JournalList';
import JournalEntriesPage from './pages/JournalEntries';
import { JournalsProvider } from './contexts/JournalsContext';

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <JournalsProvider>
          <Route exact path="/journals">
            <ProtectedRoute>
              <JournalList />
            </ProtectedRoute>
          </Route>

          <Route exact path="/create-journal">
            <ProtectedRoute>
              <CreateJournal />
            </ProtectedRoute>
          </Route>

          <Route exact path="/create-note/:journalId">
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          </Route>

          <Route exact path="/journals/:journalId">
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/journals/entries/:journalId">
            <ProtectedRoute>
              <JournalEntriesPage />
            </ProtectedRoute>
          </Route>
        </JournalsProvider>

        <Route>
          <div className="default-page">
            <p>Page not found</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </Route>
      </Switch>
    </AuthProvider>
  );
}
