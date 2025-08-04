'use client';

import { useState } from 'react';

export default function CO2Calculator() {
  const [formData, setFormData] = useState({
    distance: '',
    transportMode: 'car',
    passengers: '1',
    fuelType: 'petrol',
    frequency: 'daily'
  });

  const [result, setResult] = useState(null);

  const transportModes = [
    { value: 'car', label: 'Private Car', icon: 'ri-car-line', emissions: 0.21 },
    { value: 'bus', label: 'Public Bus', icon: 'ri-bus-line', emissions: 0.089 },
    { value: 'train', label: 'Train', icon: 'ri-train-line', emissions: 0.041 },
    { value: 'bike', label: 'Bicycle', icon: 'ri-bike-line', emissions: 0 },
    { value: 'walk', label: 'Walking', icon: 'ri-walk-line', emissions: 0 },
    { value: 'electric', label: 'Electric Car', icon: 'ri-charging-pile-2-line', emissions: 0.053 }
  ];

  const calculateEmissions = () => {
    const distance = parseFloat(formData.distance) || 0;
    const passengers = parseInt(formData.passengers) || 1;
    const mode = transportModes.find(m => m.value === formData.transportMode);
    
    if (!mode || distance === 0) return;

    let emissionFactor = mode.emissions;
    
    // Adjust for fuel type if car
    if (formData.transportMode === 'car') {
      const fuelMultipliers = {
        'petrol': 1.0,
        'diesel': 1.15,
        'hybrid': 0.6,
        'electric': 0.25
      };
      emissionFactor *= fuelMultipliers[formData.fuelType] || 1.0;
      emissionFactor /= passengers; // Divide by passengers for carpooling
    }

    const dailyEmissions = distance * emissionFactor * 2; // Round trip
    
    const frequencyMultipliers = {
      'daily': 365,
      'weekly': 52,
      'monthly': 12,
      'occasional': 10
    };

    const annualEmissions = dailyEmissions * (frequencyMultipliers[formData.frequency] || 1);
    
    // Calculate savings compared to single-occupant petrol car
    const baselineEmissions = distance * 0.21 * 2 * (frequencyMultipliers[formData.frequency] || 1);
    const savings = Math.max(0, baselineEmissions - annualEmissions);

    setResult({
      daily: dailyEmissions,
      annual: annualEmissions,
      savings: savings,
      treesEquivalent: Math.round(annualEmissions / 22), // 1 tree absorbs ~22kg CO₂/year
      costSavings: Math.round(savings * 2.5), // Approximate cost per kg CO₂
      mode: mode.label
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">CO₂ Emissions Calculator</h2>
        <p className="text-gray-600">Calculate your travel emissions and discover potential savings</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="space-y-6">
            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Travel Distance (km)
              </label>
              <input
                type="number"
                value={formData.distance}
                onChange={(e) => handleInputChange('distance', e.target.value)}
                placeholder="e.g., 25"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Transportation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                {transportModes.map((mode) => (
                  <label
                    key={mode.value}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.transportMode === mode.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="transportMode"
                      value={mode.value}
                      checked={formData.transportMode === mode.value}
                      onChange={(e) => handleInputChange('transportMode', e.target.value)}
                      className="sr-only"
                    />
                    <div className="w-6 h-6 flex items-center justify-center mr-3">
                      <i className={`${mode.icon} text-lg text-gray-600`}></i>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Options for Car */}
            {formData.transportMode === 'car' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Passengers
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
                  >
                    <option value="1">1 (Just me)</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4+ people</option>
                  </select>
                </div>
              </div>
            )}

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Travel Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
              >
                <option value="daily">Daily commute</option>
                <option value="weekly">Weekly trips</option>
                <option value="monthly">Monthly trips</option>
                <option value="occasional">Occasional use</option>
              </select>
            </div>

            <button
              onClick={calculateEmissions}
              disabled={!formData.distance}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Calculate Impact
            </button>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Carbon Footprint</h3>
                  <p className="text-gray-600">Using {result.mode}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {result.daily.toFixed(2)} kg
                    </div>
                    <div className="text-sm text-gray-600">Daily CO₂</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {result.annual.toFixed(0)} kg
                    </div>
                    <div className="text-sm text-gray-600">Annual CO₂</div>
                  </div>
                </div>

                {result.savings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 flex items-center justify-center mr-2">
                        <i className="ri-leaf-line text-green-600"></i>
                      </div>
                      <h4 className="font-semibold text-green-900">Environmental Savings</h4>
                    </div>
                    <div className="space-y-2 text-sm text-green-800">
                      <p>• Saves {result.savings.toFixed(0)} kg CO₂ annually</p>
                      <p>• Equivalent to planting {result.treesEquivalent} trees</p>
                      <p>• Potential cost savings: ${result.costSavings}</p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Carpool to reduce per-person emissions</li>
                    <li>• Consider public transport for longer trips</li>
                    <li>• Combine multiple errands into one trip</li>
                    <li>• Walk or bike for trips under 3km</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                  <i className="ri-calculator-line text-2xl"></i>
                </div>
                <p>Enter your travel details to calculate your carbon footprint</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}