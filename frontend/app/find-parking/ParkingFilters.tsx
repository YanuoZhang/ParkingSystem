
'use client';

import { useState } from 'react';

export default function ParkingFilters({ filters, onFiltersChange }: {
  filters: any;
  onFiltersChange: (filters: any) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const filterOptions = {
    priceRange: [
      { value: 'all', label: 'All Prices' },
      { value: '0-10', label: 'Under $10/hour' },
      { value: '10-20', label: '$10-20/hour' },
      { value: '20+', label: 'Over $20/hour' }
    ],
    duration: [
      { value: '1h', label: '1 Hour' },
      { value: '2h', label: '2 Hours' },
      { value: '4h', label: '4 Hours' },
      { value: 'all-day', label: 'All Day' }
    ],
    distance: [
      { value: '0.5km', label: '0.5km' },
      { value: '1km', label: '1km' },
      { value: '2km', label: '2km' },
      { value: '5km', label: '5km+' }
    ],
    availability: [
      { value: 'all', label: 'All Spots' },
      { value: 'available', label: 'Available Only' },
      { value: 'limited', label: 'Limited (<20%)' },
      { value: 'good', label: 'Good Availability' }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line`}></i>
            </div>
          </button>
        </div>
      </div>

      <div className={`p-4 space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            <div className="w-4 h-4 flex items-center justify-center inline-block mr-2">
              <i className="ri-money-dollar-circle-line"></i>
            </div>
            Price Range
          </label>
          <div className="space-y-2">
            {filterOptions.priceRange.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={option.value}
                  checked={filters.priceRange === option.value}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            <div className="w-4 h-4 flex items-center justify-center inline-block mr-2">
              <i className="ri-time-line"></i>
            </div>
            Duration
          </label>
          <div className="space-y-2">
            {filterOptions.duration.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="duration"
                  value={option.value}
                  checked={filters.duration === option.value}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            <div className="w-4 h-4 flex items-center justify-center inline-block mr-2">
              <i className="ri-map-pin-range-line"></i>
            </div>
            Distance
          </label>
          <div className="space-y-2">
            {filterOptions.distance.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="distance"
                  value={option.value}
                  checked={filters.distance === option.value}
                  onChange={(e) => handleFilterChange('distance', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            <div className="w-4 h-4 flex items-center justify-center inline-block mr-2">
              <i className="ri-parking-line"></i>
            </div>
            Availability
          </label>
          <div className="space-y-2">
            {filterOptions.availability.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={filters.availability === option.value}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
              Apply Filters
            </button>
            <button 
              onClick={() => onFiltersChange({
                priceRange: 'all',
                duration: '2h',
                distance: '1km',
                availability: 'available'
              })}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
