import React, { useState } from "react";
import {
  Copy,
  Link2,
  QrCode,
  Calendar,
  Lock,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

export function URLShortener() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [password, setPassword] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [customAliasError, setCustomAliasError] = useState("");
const token = localStorage.getItem("token");
 const isValidUrl = (input: string) => {
  try {
    if (!/^https?:\/\//i.test(input)) return false;
    new URL(input); 
    return true;
  } catch {
    return false;
  }
};

  
  
 const handleShorten = async () => {
  setUrlError("");

  const token = localStorage.getItem("token");
  if (!token) {
    setUrlError("You must be logged in to shorten URLs.");
    return;
  }

  if (!url.trim()) {
    setUrlError("Please enter a URL to shorten.");
    return;
  }

  if (!isValidUrl(url)) {
    setUrlError("Oops! That doesn’t look like a valid or reachable URL.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5295/api/ShortUrl/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl: url.startsWith("http") ? url : `https://${url}`,
          customAlias: customAlias || null,
          expirationDate: expirationDate || null,
          password: password || null,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));

      if (response.status === 400) {
        setUrlError("Oops! That doesn’t look like a valid URL. Please check and try again.");
      } else if (response.status === 401) {
        setUrlError("You are not authorized. Please log in again.");
      } else if (response.status === 409) {
        setUrlError("This custom link is already taken. Please choose another one.");
      } else {
        setUrlError("Something went wrong. Please try again later.");
      }
      return;
    }

    const data = await response.json();
    setShortenedUrl(data.shortUrl);
    setQrCodeUrl(data.qrCodeUrl);
    setShowResult(true);
  } catch (error) {
    console.error(error);
    setUrlError("Something went wrong. Please try again later.");
  }
};

  
  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Shortening Interface */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
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
          <div className="w-full">
            <div className="relative">
              {/* Icon inside input */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link2 className="h-5 w-5 text-gray-400" />
              </div>

              {/* Input */}
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className={`w-full pl-12 pr-4 py-4 text-lg border rounded-xl transition-colors duration-200 ${
                  urlError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
            </div>

            {/* Error message below input */}
            {urlError && (
              <p className="text-red-500 text-sm mt-2">{urlError}</p>
            )}
          </div>

          {/* Custom Alias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Alias (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">
                    http://localhost:5295/
                  </span>
                </div>
                <input
                  type="text"
                  value={customAlias}
                  required
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full pl-40 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                {showAdvanced ? "Hide" : "Show"} Advanced Options
              </button>
            </div>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Advanced Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Shorten Button */}
          <button
            onClick={handleShorten}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            Shorten URL
          </button>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Link is Ready!
            </h2>
            <p className="text-gray-600">Share your shortened URL anywhere</p>
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit</span>
                </a>
              </div>
            </div>
          </div>

          {/* QR Code and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <QrCode className="w-8 h-8 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                QR Code
              </h3>

              <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt=""
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No QR available</span>
                )}
              </div>

              {qrCodeUrl && (
                <a
                  href={qrCodeUrl}
                  download="qrcode.png"
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  Download QR Code
                </a>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Stats
              </h3>
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
