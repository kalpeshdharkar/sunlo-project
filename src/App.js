import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './components/Resso/MainPage';

const App = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;