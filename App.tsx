
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RoutePlanner from './components/RoutePlanner';
import CompartmentCheck from './components/CompartmentCheck';
import FeedbackPortal from './components/FeedbackPortal';
import { ShieldCheck, Train, MessageSquare, Home } from 'lucide-react';
import type { Screen } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);
  
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <RoutePlanner />;
      case 'check':
        return <CompartmentCheck />;
      case 'feedback':
        return <FeedbackPortal />;
      default:
        return <RoutePlanner />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-white flex flex-col shadow-lg">
      <Header />
      <main className="flex-grow p-4 overflow-y-auto bg-gray-50 pb-20">
        {renderScreen()}
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
