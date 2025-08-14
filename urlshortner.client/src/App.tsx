import React, { useState } from 'react';
import { Header } from './components/Header';
import { URLShortener } from './components/URLShortener';

import { Settings } from './components/Settings';
import { Analytics } from './components/Analytics';
import { Register } from './components/Register';
import { Login } from './components/Login';


function App() {
  const [activeTab, setActiveTab] = useState('shorten');

  const renderContent = () => {
    switch (activeTab) {
      case 'shorten':
        return <URLShortener />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <URLShortener />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

    </div>
  );
}

export default App;