import React, { useState } from 'react';
import { Link2, Menu, X, LogOut, Link } from 'lucide-react';
import { Analytics } from './Analytics';
import LinksSection from './LinkSection';
import { URLShortener } from './URLShortener';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("shorten");
  const navigate = useNavigate();

  const onTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/login", { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "shorten":
        return <URLShortener />;
      case "analytics":
        return <Analytics />;
      case "links":
        return <LinksSection />;
      default:
        return <URLShortener />;
    }
  };

  const navigation = [
    { id: 'shorten', label: 'Shorten', icon: Link2 },
    { id: 'links', label: 'Links', icon: Link },
    // { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">LinkShort</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}


                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">{renderContent()}</main>
    </div>
  );
}
