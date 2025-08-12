import React, { useState } from 'react';
import { Copy, Link2, QrCode, Calendar, Lock, ExternalLink, CheckCircle } from 'lucide-react';

export function URLShortener() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [password, setPassword] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (url.trim()) {
      setShowResult(true);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenedUrl = `linkshort.ly/${customAlias || 'abc123'}`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Shortening Interface */}
      <div className="card mb-8" style={{ borderRadius: '1rem', padding: '2rem' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Shorten Your Links
          </h1>
          <p className="text-gray-600 text-lg">
            Create short, memorable URLs with advanced features and analytics
          </p>
        </div>

        <div className="space-y-6">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="input-field input-field-lg pl-12"
            />
          </div>

          {/* Custom Alias */}
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Alias (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">linkshort.ly/</span>
                </div>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="input-field pl-24"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="btn btn-secondary w-full"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </button>
            </div>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
              
              <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {/* Expiration Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Password Protection */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 mr-2" />
                    Password Protection (Optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Shorten Button */}
          <button
            onClick={handleShorten}

            className="btn btn-primary btn-lg w-full"
          >
            Shorten URL
          </button>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <div className="card animate-slide-up" style={{ borderRadius: '1rem', padding: '2rem' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Link is Ready!
            </h2>
            <p className="text-gray-600">
              Share your shortened URL anywhere
            </p>
          </div>

          {/* Shortened URL Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Shortened URL:</p>
                <p className="text-xl font-semibold text-blue-600">
                  {shortenedUrl}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCopy}
                  className={`btn ${
                    copied
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit</span>
                </button>
              </div>
            </div>
          </div>

          {/* QR Code and Stats */}
          <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* QR Code */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <QrCode className="w-8 h-8 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code</h3>
              <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-900 rounded grid grid-cols-8 gap-px p-2">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                Download QR Code
              </button>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Clicks</span>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold text-gray-900">Just now</span>
                </div>
                {expirationDate && (
                  <div className="flex justify-between items-center py-2 px-4 bg-orange-50 rounded-lg">
                    <span className="text-orange-600">Expires</span>
                    <span className="font-semibold text-orange-700">
                      {new Date(expirationDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {password && (
                  <div className="flex justify-between items-center py-2 px-4 bg-purple-50 rounded-lg">
                    <span className="text-purple-600">Password Protected</span>
                    <Lock className="w-4 h-4 text-purple-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}