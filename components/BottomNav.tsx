
import React from 'react';
import { Home, Shield, MessageSquareText } from 'lucide-react';
import type { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
      }`}
    >
      {icon}
      <span className={`text-xs font-medium mt-1 ${isActive ? 'font-bold' : ''}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    {
      id: 'home' as Screen,
      label: 'Route',
      icon: <Home className="h-6 w-6" />,
    },
    {
      id: 'check' as Screen,
      label: 'Safety Check',
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: 'feedback' as Screen,
      label: 'Feedback',
      icon: <MessageSquareText className="h-6 w-6" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around max-w-md mx-auto shadow-top">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={activeScreen === item.id}
          onClick={() => setActiveScreen(item.id)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
