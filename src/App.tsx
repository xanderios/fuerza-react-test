import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

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
      <JournalsProvider>
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>

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

          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </JournalsProvider>
    </AuthProvider>
  );
}
