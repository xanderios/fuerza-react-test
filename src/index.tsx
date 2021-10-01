import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Container from './components/Container';
import { setupServer } from './services/mirage/server';
import './styles/index.css';

if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
