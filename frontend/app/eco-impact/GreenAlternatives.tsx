'use client';

import { useState } from 'react';

export default function GreenAlternatives() {
  const [selectedRoute, setSelectedRoute] = useState('cbd-to-suburbs');

  interface Alternative {
    mode: string;
    icon: string;
    co2: string;
    cost: string;
    time: string;
    color: string;
    pros: string[];
    cons: string[];
  }

  interface Route {
    title: string;
    alternatives: Alternative[];
  }

  const routes: { [key: string]: Route } = {
    'cbd-to-suburbs': {
      title: 'CBD to Suburbs (15km)',
      alternatives: [
        {
          mode: 'Private Car (Petrol)',
          icon: 'ri-car-line',
          co2: '6.3 kg',
          cost: '$18.50',
          time: '35 min',
          color: 'red',
          pros: ['Door-to-door convenience', 'Climate controlled'],
          cons: ['High emissions', 'Expensive parking', 'Traffic congestion']
        },
        {
          mode: 'Public Transport',
          icon: 'ri-train-line',
          co2: '1.8 kg',
          cost: '$4.50',
          time: '42 min',
          color: 'blue',
          pros: ['70% less CO₂', 'Cost effective', 'No parking needed'],
          cons: ['Fixed schedule', 'Potential crowding']
        },
        {
          mode: 'Electric Car',
          icon: 'ri-charging-pile-2-line',
          co2: '1.6 kg',
          cost: '$12.20',
          time: '35 min',
          color: 'green',
          pros: ['75% less CO₂', 'Quiet operation', 'Future-proof'],
          cons: ['Higher upfront cost', 'Charging infrastructure']
        },
        {
          mode: 'Bike + Train',
          icon: 'ri-bike-line',
          co2: '0.9 kg',
          cost: '$3.20',
          time: '48 min',
          color: 'emerald',
          pros: ['85% less CO₂', 'Health benefits', 'Very low cost'],
          cons: ['Weather dependent', 'Requires fitness']
        }
      ]
    },
    'short-distance': {
      title: 'Short Distance (5km)',
      alternatives: [
        {
          mode: 'Private Car',
          icon: 'ri-car-line',
          co2: '2.1 kg',
          cost: '$8.50',
          time: '15 min',
          color: 'red',
          pros: ['Quick and direct', 'Comfortable'],
          cons: ['High emissions for short trip', 'Parking costs']
        },
        {
          mode: 'Electric Scooter',
          icon: 'ri-motorbike-line',
          co2: '0.3 kg',
          cost: '$4.00',
          time: '18 min',
          color: 'blue',
          pros: ['85% less CO₂', 'No parking issues', 'Fun to ride'],
          cons: ['Weather dependent', 'Safety concerns']
        },
        {
          mode: 'Bicycle',
          icon: 'ri-bike-line',
          co2: '0 kg',
          cost: '$0.50',
          time: '20 min',
          color: 'green',
          pros: ['Zero emissions', 'Great exercise', 'Very cheap'],
          cons: ['Weather dependent', 'Physical effort required']
        },
        {
          mode: 'Walking',
          icon: 'ri-walk-line',
          co2: '0 kg',
          cost: '$0',
          time: '60 min',
          color: 'emerald',
          pros: ['Zero emissions', 'Free', 'Health benefits'],
          cons: ['Time consuming', 'Weather dependent']
        }
      ]
    }
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      red: 'bg-red-50 border-red-200 text-red-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    };
    return colors[color] || colors.blue;
  };

  const currentRoute = routes[selectedRoute];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Green Travel Alternatives</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare different transportation options and their environmental impact for common Melbourne routes.
        </p>
      </div>

      {/* Route Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          {Object.entries(routes).map(([key, route]) => (
            <button
              key={key}
              onClick={() => setSelectedRoute(key)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedRoute === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {route.title}
            </button>
          ))}
        </div>
      </div>

      {/* Alternatives Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentRoute.alternatives.map((alternative, index) => (
          <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(alternative.color)}`}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-white rounded-full">
                <i className={`${alternative.icon} text-2xl text-gray-700`}></i>
              </div>
              <h3 className="font-semibold text-gray-900">{alternative.mode}</h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CO₂ Emissions:</span>
                <span className="font-semibold">{alternative.co2}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost:</span>
                <span className="font-semibold">{alternative.cost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Travel Time:</span>
                <span className="font-semibold">{alternative.time}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-thumb-up-line text-green-600"></i>
                  </div>
                  Pros
                </h4>
                <ul className="text-xs space-y-1">
                  {alternative.pros.map((pro, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-1">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <i className="ri-thumb-down-line text-red-600"></i>
                  </div>
                  Cons
                </h4>
                <ul className="text-xs space-y-1">
                  {alternative.cons.map((con, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-600 mr-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Section */}
      <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Go Green?</h3>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Small changes in your commute can make a big difference. Start with one alternative transport method this week.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
            Plan My Green Route
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
            Track My Impact
          </button>
        </div>
      </div>
    </div>
  );
}