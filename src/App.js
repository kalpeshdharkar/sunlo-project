import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './components/Resso/MainPage';
import GoogleAd from './components/GoogleAd'; // Google Ad import

const App = () => {
  return (
    <ErrorBoundary>
      {/* Top Ad */}
      <GoogleAd />

      <MainPage />

      {/* Bottom Ad */}
      <GoogleAd />
    </ErrorBoundary>
  );
};

export default App;
