import React, { useState } from "react";
import {
  TrendingUp,
  Eye,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  BarChart3,
  PieChart,
  Tablet,
  Search,
} from "lucide-react";

export function Analytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedUrl, setSelectedUrl] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("7d");

  const mockUrls = [
    {
      id: "1",
      shortUrl: "linkshort.ly/abc123",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      clicks: 245,
      created: "2024-01-15",
    },
    {
      id: "2",
      shortUrl: "linkshort.ly/blog-post",
      originalUrl: "https://mywebsite.com/blog/post/amazing-article",
      clicks: 89,
      created: "2024-01-18",
    },
    {
      id: "3",
      shortUrl: "linkshort.ly/docs",
      originalUrl: "https://docs.company.com/product/documentation/guide",
      clicks: 156,
      created: "2024-01-10",
    },
  ];

  const mockClickData = [
    {
      id: "1",
      shortUrl: "linkshort.ly/abc123",
      ipAddress: "192.168.1.100",
      browser: "Chrome 120.0.0",
      device: "Windows Desktop",
      deviceType: "Desktop",
      timestamp: "2024-01-20 14:22:15",
      location: "New York, US",
    },
    {
      id: "2",
      shortUrl: "linkshort.ly/abc123",
      ipAddress: "10.0.0.45",
      browser: "Safari 17.2.1",
      device: "iPhone 15 Pro",
      deviceType: "Mobile",
      timestamp: "2024-01-20 13:15:30",
      location: "Los Angeles, US",
    },
    {
      id: "3",
      shortUrl: "linkshort.ly/blog-post",
      ipAddress: "172.16.0.23",
      browser: "Firefox 121.0",
      device: "iPad Air",
      deviceType: "Tablet",
      timestamp: "2024-01-20 12:30:45",
      location: "London, UK",
    },
    {
      id: "4",
      shortUrl: "linkshort.ly/docs",
      ipAddress: "203.0.113.15",
      browser: "Chrome 120.0.0",
      device: "MacBook Pro",
      deviceType: "Desktop",
      timestamp: "2024-01-20 11:45:20",
      location: "Toronto, CA",
    },
    {
      id: "5",
      shortUrl: "linkshort.ly/abc123",
      ipAddress: "198.51.100.42",
      browser: "Edge 120.0.0",
      device: "Surface Pro",
      deviceType: "Tablet",
      timestamp: "2024-01-20 10:20:10",
      location: "Sydney, AU",
    },
  ];

  const filteredClickData = mockClickData.filter((click) => {
    const matchesUrl = selectedUrl === "all" || click.shortUrl === selectedUrl;
    const matchesSearch =
      searchTerm === "" ||
      click.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      click.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      click.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      click.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUrl && matchesSearch;
  });

  

  const deviceStats = [
    {
      type: "Desktop",
      count: 180,
      percentage: 60,
      icon: Monitor,
      color: "bg-blue-500",
    },
    {
      type: "Mobile",
      count: 90,
      percentage: 30,
      icon: Smartphone,
      color: "bg-green-500",
    },
    {
      type: "Tablet",
      count: 30,
      percentage: 10,
      icon: Tablet,
      color: "bg-purple-500",
    },
  ];

  // Browser statistics
  const browserStats = [
    { name: "Chrome", count: 145, percentage: 48 },
    { name: "Safari", count: 89, percentage: 30 },
    { name: "Firefox", count: 45, percentage: 15 },
    { name: "Edge", count: 21, percentage: 7 },
  ];

  const mockLinks = [
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "linkshort.ly/abc123",
      clicks: 245,
      created: "2024-01-15T10:30:00Z",
      lastClicked: "2024-01-20T14:22:00Z",
    },
    {
      id: "2",
      originalUrl: "https://mywebsite.com/blog/post/amazing-article",
      shortUrl: "linkshort.ly/blog-post",
      clicks: 89,
      created: "2024-01-18T09:15:00Z",
      lastClicked: "2024-01-20T11:45:00Z",
    },
    {
      id: "3",
      originalUrl: "https://docs.company.com/product/documentation/guide",
      shortUrl: "linkshort.ly/docs",
      clicks: 156,
      created: "2024-01-10T16:20:00Z",
      lastClicked: "2024-01-20T13:10:00Z",
    },
  ];

  const deviceData = [
    { name: "Desktop", count: 180, percentage: 60, color: "bg-blue-500" },
    { name: "Mobile", count: 90, percentage: 30, color: "bg-green-500" },
    { name: "Tablet", count: 30, percentage: 10, color: "bg-purple-500" },
  ];

  const locationData = [
    { country: "United States", clicks: 145, flag: "🇺🇸" },
    { country: "United Kingdom", clicks: 89, flag: "🇬🇧" },
    { country: "Germany", clicks: 67, flag: "🇩🇪" },
    { country: "Canada", clicks: 45, flag: "🇨🇦" },
    { country: "Australia", clicks: 34, flag: "🇦🇺" },
  ];

  const totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track your link performance and audience insights
          </p>
        </div>

        {/* <div className="mt-4 sm:mt-0">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Links</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLinks.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+12%</span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+24%</span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Clicks/Link
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(totalClicks / mockLinks.length)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+8%</span>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div> */}

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-900">87</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+15%</span>
            <span className="text-sm text-gray-500 ml-2">vs yesterday</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Types */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Device Types
          </h3>
          <div className="space-y-4">
            {deviceStats.map((device) => {
              const Icon = device.icon;
              return (
                <div
                  key={device.type}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      {device.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${device.color}`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {device.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Browser Stats */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Browser Distribution
          </h3>
          <div className="space-y-4">
            {browserStats.map((browser) => (
              <div
                key={browser.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    {browser.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${browser.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {browser.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Click Details
            </h3>

            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search IP, browser, device..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              {/* URL Filter */}
              {/* <select
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All URLs</option>
                {mockUrls.map((url) => (
                  <option key={url.id} value={url.shortUrl}>
                    {url.shortUrl}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Browser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClickData.map((click) => (
                <tr
                  key={click.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 font-medium">
                      {click.shortUrl}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 font-mono text-sm">
                      {click.ipAddress}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{click.browser}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {click.deviceType === "Desktop" && (
                        <Monitor className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      {click.deviceType === "Mobile" && (
                        <Smartphone className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      {click.deviceType === "Tablet" && (
                        <Tablet className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      <span className="text-gray-900">{click.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{click.location}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {click.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClickData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No clicks found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
