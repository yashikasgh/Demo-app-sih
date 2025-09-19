
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [aadhaar, setAadhaar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    if (aadhaar.length !== 12) return;
    setLoading(true);
    // Simulate API call for verification
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <ShieldCheck className="mx-auto h-16 w-16 text-purple-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Suraksha Shield</h1>
          <p className="mt-2 text-gray-600">
            A secure space for women. Please verify your identity to continue.
          </p>

          <div className="mt-8 text-left">
            <label htmlFor="aadhaar" className="text-sm font-medium text-gray-700">
              Aadhaar Number
            </label>
            <input
              id="aadhaar"
              type="tel"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="xxxx xxxx xxxx"
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              maxLength={12}
            />
          </div>

          <button
            onClick={handleLoginClick}
            disabled={loading || aadhaar.length !== 12}
            className="mt-8 w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Verify & Proceed'
            )}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-500">
            This is a simulated verification for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
