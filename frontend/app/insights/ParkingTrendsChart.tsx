'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

const weekdayData = [
  { hour: '6:00', occupancy: 15, demand: 12, availability: 85 },
  { hour: '7:00', occupancy: 35, demand: 32, availability: 65 },
  { hour: '8:00', occupancy: 72, demand: 68, availability: 28 },
  { hour: '9:00', occupancy: 89, demand: 85, availability: 11 },
  { hour: '10:00', occupancy: 85, demand: 82, availability: 15 },
  { hour: '11:00', occupancy: 82, demand: 79, availability: 18 },
  { hour: '12:00', occupancy: 88, demand: 86, availability: 12 },
  { hour: '13:00', occupancy: 91, demand: 89, availability: 9 },
  { hour: '14:00', occupancy: 87, demand: 84, availability: 13 },
  { hour: '15:00', occupancy: 84, demand: 81, availability: 16 },
  { hour: '16:00', occupancy: 86, demand: 83, availability: 14 },
  { hour: '17:00', occupancy: 78, demand: 75, availability: 22 },
  { hour: '18:00', occupancy: 65, demand: 62, availability: 35 },
  { hour: '19:00', occupancy: 45, demand: 42, availability: 55 },
  { hour: '20:00', occupancy: 32, demand: 29, availability: 68 },
  { hour: '21:00', occupancy: 25, demand: 22, availability: 75 },
  { hour: '22:00', occupancy: 18, demand: 15, availability: 82 }
];

const weekendData = [
  { hour: '6:00', occupancy: 8, demand: 5, availability: 92 },
  { hour: '7:00', occupancy: 12, demand: 10, availability: 88 },
  { hour: '8:00', occupancy: 25, demand: 22, availability: 75 },
  { hour: '9:00', occupancy: 45, demand: 42, availability: 55 },
  { hour: '10:00', occupancy: 65, demand: 62, availability: 35 },
  { hour: '11:00', occupancy: 78, demand: 75, availability: 22 },
  { hour: '12:00', occupancy: 82, demand: 79, availability: 18 },
  { hour: '13:00', occupancy: 85, demand: 82, availability: 15 },
  { hour: '14:00', occupancy: 88, demand: 85, availability: 12 },
  { hour: '15:00', occupancy: 86, demand: 83, availability: 14 },
  { hour: '16:00', occupancy: 84, demand: 81, availability: 16 },
  { hour: '17:00', occupancy: 81, demand: 78, availability: 19 },
  { hour: '18:00', occupancy: 75, demand: 72, availability: 25 },
  { hour: '19:00', occupancy: 68, demand: 65, availability: 32 },
  { hour: '20:00', occupancy: 58, demand: 55, availability: 42 },
  { hour: '21:00', occupancy: 45, demand: 42, availability: 55 },
  { hour: '22:00', occupancy: 32, demand: 29, availability: 68 }
];

export default function ParkingTrendsChart() {
  const [selectedView, setSelectedView] = useState('weekday');
  const data = selectedView === 'weekday' ? weekdayData : weekendData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Time: ${label}`}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}%`}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Toggle Buttons */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setSelectedView('weekday')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
            selectedView === 'weekday'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Weekdays
        </button>
        <button
          onClick={() => setSelectedView('weekend')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
            selectedView === 'weekend'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Weekends
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="hour" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line
              type="monotone"
              dataKey="occupancy"
              stroke="#DC2626"
              strokeWidth={3}
              name="Occupancy Rate"
              dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#F59E0B"
              strokeWidth={3}
              name="Demand Level"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="availability"
              stroke="#10B981"
              strokeWidth={3}
              name="Availability"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Peak Hours</h4>
          <p className="text-sm text-gray-600">
            {selectedView === 'weekday' ? '9:00 AM - 2:00 PM' : '12:00 PM - 6:00 PM'}
          </p>
          <p className="text-xs text-red-600 mt-1">Highest occupancy rates</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Best Availability</h4>
          <p className="text-sm text-gray-600">
            {selectedView === 'weekday' ? '6:00 AM - 8:00 AM' : '6:00 AM - 9:00 AM'}
          </p>
          <p className="text-xs text-green-600 mt-1">Easiest time to find parking</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Average Wait</h4>
          <p className="text-sm text-gray-600">
            {selectedView === 'weekday' ? '18 minutes' : '12 minutes'}
          </p>
          <p className="text-xs text-orange-600 mt-1">Time to find a spot</p>
        </div>
      </div>
    </div>
  );
}