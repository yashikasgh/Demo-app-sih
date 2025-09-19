
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-700 text-white shadow-md w-full">
      <div className="h-16 flex items-center justify-between px-4 max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-7 w-7" />
          <h1 className="text-xl font-bold tracking-tight">Suraksha Shield</h1>
        </div>
        {/* Placeholder for potential icons like notifications or profile */}
      </div>
    </header>
  );
};

export default Header;
