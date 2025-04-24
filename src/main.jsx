import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
