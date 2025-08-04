'use client';

import { useState } from 'react';

export default function SustainabilityTips() {
  const [activeCategory, setActiveCategory] = useState('commuting');

  const tipCategories: { [key: string]: { title: string; icon: string; tips: any[] } } = {
    commuting: {
      title: 'Smart Commuting',
      icon: 'ri-car-line',
      tips: [
        {
          title: 'Combine Multiple Errands',
          description: 'Plan your trips to handle multiple tasks in one journey, reducing total travel emissions.',
          impact: '15-30% CO₂ reduction',
          difficulty: 'Easy',
          icon: 'ri-route-line'
        },
        {
          title: 'Try the 15-Minute Rule',
          description: 'Walk or bike for any destination within 15 minutes of your location.',
          impact: 'Zero emissions for short trips',
          difficulty: 'Easy',
          icon: 'ri-time-line'
        },
        {
          title: 'Use Off-Peak Hours',
          description: 'Travel during less congested times to reduce fuel consumption and stress.',
          impact: '20% less fuel consumption',
          difficulty: 'Medium',
          icon: 'ri-calendar-line'
        },
        {
          title: 'Start a Carpool Group',
          description: 'Organize carpooling with colleagues or neighbors for regular commutes.',
          impact: '50-75% emission reduction per person',
          difficulty: 'Medium',
          icon: 'ri-group-line'
        }
      ]
    },
    parking: {
      title: 'Efficient Parking',
      icon: 'ri-parking-line',
      tips: [
        {
          title: 'Park Once, Walk Multiple Places',
          description: 'Choose central parking locations and walk to nearby destinations.',
          impact: 'Reduces urban congestion',
          difficulty: 'Easy',
          icon: 'ri-walk-line'
        },
        {
          title: 'Use Parking Apps',
          description: 'Find parking quickly with apps to reduce time spent circling and burning fuel.',
          impact: '25% less search time',
          difficulty: 'Easy',
          icon: 'ri-smartphone-line'
        },
        {
          title: 'Choose Green Parking',
          description: 'Look for parking facilities with EV charging or renewable energy.',
          impact: 'Supports clean infrastructure',
          difficulty: 'Medium',
          icon: 'ri-leaf-line'
        },
        {
          title: 'Consider Park & Ride',
          description: 'Drive to transit hubs and use public transport for the final leg.',
          impact: '40-60% emission reduction',
          difficulty: 'Medium',
          icon: 'ri-subway-line'
        }
      ]
    },
    lifestyle: {
      title: 'Lifestyle Changes',
      icon: 'ri-heart-line',
      tips: [
        {
          title: 'Work From Home More',
          description: 'Negotiate remote work days to eliminate commute emissions entirely.',
          impact: '100% commute emission elimination',
          difficulty: 'Easy',
          icon: 'ri-home-office-line'
        },
        {
          title: 'Choose Local Businesses',
          description: 'Shop and dine locally to reduce travel distances and support community.',
          impact: 'Builds sustainable neighborhoods',
          difficulty: 'Easy',
          icon: 'ri-store-line'
        },
        {
          title: 'Plan Car-Free Days',
          description: 'Designate one day per week for walking, cycling, or public transport only.',
          impact: '14% weekly emission reduction',
          difficulty: 'Medium',
          icon: 'ri-calendar-check-line'
        },
        {
          title: 'Embrace Slow Travel',
          description: 'Choose experiences closer to home and travel more mindfully.',
          impact: 'Significant long-distance emission cuts',
          difficulty: 'Hard',
          icon: 'ri-compass-line'
        }
      ]
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors['Easy'];
  };

  const currentCategory = tipCategories[activeCategory];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainability Tips & Actions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Simple changes that make a real difference. Start with easy wins and gradually adopt more sustainable practices.
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          {Object.entries(tipCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={category.icon}></i>
              </div>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {currentCategory.tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg flex-shrink-0">
                <i className={`${tip.icon} text-xl text-blue-600`}></i>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {tip.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-leaf-line text-green-600"></i>
                    </div>
                    <span className="text-sm text-green-600 font-medium">{tip.impact}</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                    Try This
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">30-Day Green Challenge</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Ready to make a bigger impact? Join our 30-day sustainability challenge and track your progress with our community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Week 1: Awareness</h4>
            <p className="text-sm text-purple-100">Track your current habits and identify opportunities</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Week 2-3: Action</h4>
            <p className="text-sm text-purple-100">Implement 3 new sustainable practices daily</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Week 4: Integration</h4>
            <p className="text-sm text-purple-100">Make these habits part of your routine</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
            Start Challenge
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}