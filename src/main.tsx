import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SplashScreen from './components/SplashScreen';
import './index.css';

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
  <StrictMode>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
    <App />
      )}
  </StrictMode>
);
};

createRoot(document.getElementById('root')!).render(<Root />);
