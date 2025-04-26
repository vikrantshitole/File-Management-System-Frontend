import React from 'react';
import Layout from '@components/layout';
import '@styles/App.scss';
import Toast from '@components/common/Toast';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Layout />
        <Toast />
      </div>
    </AuthProvider>
  );
}

export default App;
