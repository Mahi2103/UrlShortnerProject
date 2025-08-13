import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Download } from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    clickAlerts: false,
    weeklyReports: true,
  });

  const [theme, setTheme] = useState('light');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company (Optional)
            </label>
            <input
              type="text"
              placeholder="Your company name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Domain
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>linkshort.ly</option>
              <option>custom.domain.com</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium transform hover:scale-105">
            Save Profile
          </button>
        </div>
      </div>

      {/* Notifications */}
      {/* <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive email updates about your account</p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notifications.email ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Click Alerts</h3>
              <p className="text-sm text-gray-600">Get notified when your links are clicked</p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, clickAlerts: !prev.clickAlerts }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notifications.clickAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.clickAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Weekly Reports</h3>
              <p className="text-sm text-gray-600">Receive weekly analytics summaries</p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, weeklyReports: !prev.weeklyReports }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notifications.weeklyReports ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
              Update Password
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Theme</h3>
          <div className="flex space-x-4">
            {['light', 'dark', 'auto'].map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  theme === themeOption
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Export Your Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download a copy of all your links and analytics data
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium">
              Export Data
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all associated data
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}