'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState } from 'react';

const monthlyData = [
  { month: 'Jan', co2Saved: 45, trips: 22, cost: 180 },
  { month: 'Feb', co2Saved: 67, trips: 31, cost: 245 },
  { month: 'Mar', co2Saved: 89, trips: 42, cost: 320 },
  { month: 'Apr', co2Saved: 112, trips: 54, cost: 410 },
  { month: 'May', co2Saved: 134, trips: 63, cost: 485 },
  { month: 'Jun', co2Saved: 156, trips: 74, cost: 560 },
  { month: 'Jul', co2Saved: 178, trips: 82, cost: 635 },
  { month: 'Aug', co2Saved: 203, trips: 91, cost: 720 },
  { month: 'Sep', co2Saved: 225, trips: 98, cost: 795 },
  { month: 'Oct', co2Saved: 248, trips: 105, cost: 875 },
  { month: 'Nov', co2Saved: 271, trips: 113, cost: 950 },
  { month: 'Dec', co2Saved: 295, trips: 121, cost: 1025 }
];

const weeklyBreakdown = [
  { day: 'Mon', carTrips: 2, publicTransport: 0, biking: 0, walking: 0 },
  { day: 'Tue', carTrips: 1, publicTransport: 1, biking: 0, walking: 0 },
  { day: 'Wed', carTrips: 0, publicTransport: 2, biking: 0, walking: 0 },
  { day: 'Thu', carTrips: 0, publicTransport: 1, biking: 1, walking: 0 },
  { day: 'Fri', carTrips: 1, publicTransport: 1, biking: 0, walking: 0 },
  { day: 'Sat', carTrips: 0, publicTransport: 0, biking: 1, walking: 2 },
  { day: 'Sun', carTrips: 0, publicTransport: 0, biking: 0, walking: 3 }
];

export default function ImpactTracker() {
  const [activeTab, setActiveTab] = useState('yearly');

  const achievements = [
    {
      icon: 'ri-award-line',
      title: 'Eco Warrior',
      description: 'Saved 100kg CO₂ this year',
      progress: 85,
      unlocked: true
    },
    {
      icon: 'ri-bike-line',
      title: 'Cycling Champion',
      description: 'Completed 50 bike trips',
      progress: 74,
      unlocked: true
    },
    {
      icon: 'ri-train-line',
      title: 'Transit Pro',
      description: 'Used public transport 100 times',
      progress: 92,
      unlocked: true
    },
    {
      icon: 'ri-leaf-line',
      title: 'Carbon Neutral',
      description: 'Offset all emissions for a month',
      progress: 45,
      unlocked: false
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Month: ${label}`}</p>
          <div className="space-y-1">
            <p className="text-green-600">CO₂ Saved: {payload[0]?.value} kg</p>
            <p className="text-blue-600">Green Trips: {payload[1]?.value}</p>
            <p className="text-orange-600">Cost Saved: ${payload[2]?.value}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your environmental progress and celebrate your green achievements throughout the year.
        </p>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
              <i className="ri-leaf-line text-2xl"></i>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">295kg</div>
              <div className="text-green-100 text-sm">CO₂ Saved</div>
            </div>
          </div>
          <div className="text-green-100 text-sm">
            Equivalent to 13 trees planted
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
              <i className="ri-route-line text-2xl"></i>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">121</div>
              <div className="text-blue-100 text-sm">Green Trips</div>
            </div>
          </div>
          <div className="text-blue-100 text-sm">
            67% of total journeys
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$1,025</div>
              <div className="text-orange-100 text-sm">Money Saved</div>
            </div>
          </div>
          <div className="text-orange-100 text-sm">
            On fuel and parking costs
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Progress Over Time</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {activeTab === 'yearly' ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="co2Saved"
                  stroke="#10B981"
                  strokeWidth={3}
                  fill="url(#co2Gradient)"
                />
                <Line
                  type="monotone"
                  dataKey="trips"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="carTrips" stackId="1" stroke="#EF4444" fill="#EF4444" />
                <Area type="monotone" dataKey="publicTransport" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="biking" stackId="1" stroke="#10B981" fill="#10B981" />
                <Area type="monotone" dataKey="walking" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements & Milestones</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  achievement.unlocked
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <i className={`${achievement.icon} text-lg`}></i>
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                </div>
                {achievement.unlocked && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-check-line text-green-600"></i>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}