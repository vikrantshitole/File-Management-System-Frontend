import React from 'react';
import Layout from './components/layout/Layout/index';
import './styles/App.scss';
import Toast from './components/common/Toast';

function App() {
  return (
    <div className="app">
      <Layout />
      <Toast />
    </div>
  );
}

export default App;
