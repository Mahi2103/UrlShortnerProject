import React, { useState } from 'react';
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
  PieChart
} from 'lucide-react';

export function Analytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  
  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const mockLinks = [
    { 
      id: '1', 
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      shortUrl: 'linkshort.ly/abc123',
      clicks: 245,
      created: '2024-01-15T10:30:00Z',
      lastClicked: '2024-01-20T14:22:00Z'
    },
    { 
      id: '2', 
      originalUrl: 'https://mywebsite.com/blog/post/amazing-article',
      shortUrl: 'linkshort.ly/blog-post',
      clicks: 89,
      created: '2024-01-18T09:15:00Z',
      lastClicked: '2024-01-20T11:45:00Z'
    },
    { 
      id: '3', 
      originalUrl: 'https://docs.company.com/product/documentation/guide',
      shortUrl: 'linkshort.ly/docs',
      clicks: 156,
      created: '2024-01-10T16:20:00Z',
      lastClicked: '2024-01-20T13:10:00Z'
    },
  ];

  const deviceData = [
    { name: 'Desktop', count: 180, percentage: 60, color: 'bg-blue-500' },
    { name: 'Mobile', count: 90, percentage: 30, color: 'bg-green-500' },
    { name: 'Tablet', count: 30, percentage: 10, color: 'bg-purple-500' },
  ];

  const locationData = [
    { country: 'United States', clicks: 145, flag: '🇺🇸' },
    { country: 'United Kingdom', clicks: 89, flag: '🇬🇧' },
    { country: 'Germany', clicks: 67, flag: '🇩🇪' },
    { country: 'Canada', clicks: 45, flag: '🇨🇦' },
    { country: 'Australia', clicks: 34, flag: '🇦🇺' },
  ];

  const totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your link performance and audience insights</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
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
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Links</p>
              <p className="text-2xl font-bold text-gray-900">{mockLinks.length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
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

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Clicks/Link</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalClicks / mockLinks.length)}</p>
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
        </div>

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Device Breakdown</h3>
            <Monitor className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {deviceData.map((device) => (
              <div key={device.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${device.color}`}></div>
                  <span className="text-gray-700 font-medium">{device.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${device.color}`}
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{device.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Locations</h3>
            <MapPin className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {locationData.map((location) => (
              <div key={location.country} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{location.flag}</span>
                  <span className="text-gray-700 font-medium">{location.country}</span>
                </div>
                <span className="text-sm text-gray-600 font-semibold">{location.clicks} clicks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Links</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Click
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-blue-600 font-medium">{link.shortUrl}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 truncate max-w-xs" title={link.originalUrl}>
                      {link.originalUrl}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 font-semibold">{link.clicks}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowra text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {new Date(link.created).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      {new Date(link.lastClicked).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}