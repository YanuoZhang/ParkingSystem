
'use client';

import { useState, useEffect } from 'react';

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  price: string;
  available: number;
  total: number;
  distance: string;
  type: string;
  rating: number;
  prediction: string;
  walkTime: string;
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Collins Street Parking',
    address: '123 Collins Street',
    price: '$8/hour',
    available: 45,
    total: 120,
    distance: '0.2km',
    type: 'Street Parking',
    rating: 4.2,
    prediction: 'filling-fast',
    walkTime: '2 min'
  },
  {
    id: '2',
    name: 'Bourke Street Mall Garage',
    address: '456 Bourke Street',
    price: '$12/hour',
    available: 23,
    total: 200,
    distance: '0.4km',
    type: 'Parking Garage',
    rating: 4.5,
    prediction: 'stable',
    walkTime: '5 min'
  },
  {
    id: '3',
    name: 'Flinders Lane Parking',
    address: '789 Flinders Lane',
    price: '$6/hour',
    available: 67,
    total: 80,
    distance: '0.3km',
    type: 'Street Parking',
    rating: 4.0,
    prediction: 'available',
    walkTime: '3 min'
  },
  {
    id: '4',
    name: 'Queen Street Complex',
    address: '321 Queen Street',
    price: '$10/hour',
    available: 12,
    total: 150,
    distance: '0.5km',
    type: 'Parking Garage',
    rating: 4.3,
    prediction: 'limited',
    walkTime: '6 min'
  },
  {
    id: '5',
    name: 'Little Collins Parking',
    address: '987 Little Collins',
    price: '$9/hour',
    available: 34,
    total: 60,
    distance: '0.4km',
    type: 'Street Parking',
    rating: 3.8,
    prediction: 'stable',
    walkTime: '4 min'
  }
];

export default function ParkingList({ selectedSpot, onSpotSelect }: {
  selectedSpot: any;
  onSpotSelect: (spot: any) => void;
}) {
  const [spots, setSpots] = useState(mockParkingSpots);
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    const timer = setInterval(() => {
      setSpots(prevSpots => prevSpots.map(spot => ({
        ...spot,
        available: Math.max(0, Math.min(spot.total, spot.available + Math.floor(Math.random() * 5 - 2)))
      })));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return 'text-green-600 bg-green-50';
    if (ratio > 0.2) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPredictionIcon = (prediction: string) => {
    const icons = {
      'available': 'ri-checkbox-circle-line text-green-500',
      'filling-fast': 'ri-time-line text-orange-500',
      'limited': 'ri-error-warning-line text-red-500',
      'stable': 'ri-pulse-line text-blue-500'
    };
    return icons[prediction] || 'ri-information-line text-gray-500';
  };

  const sortedSpots = [...spots].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'availability':
        return (b.available / b.total) - (a.available / a.total);
      case 'rating':
        return b.rating - a.rating;
      default:
        return parseFloat(a.distance) - parseFloat(b.distance);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Nearby Parking</h3>
          <span className="text-sm text-gray-500">{spots.length} locations</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="relative">
            <button 
              onClick={() => {
                const options = ['distance', 'price', 'availability', 'rating'];
                const currentIndex = options.indexOf(sortBy);
                const nextIndex = (currentIndex + 1) % options.length;
                setSortBy(options[nextIndex]);
              }}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              <span className="capitalize">{sortBy}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-down-s-line"></i>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {sortedSpots.map((spot) => (
          <div
            key={spot.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedSpot?.id === spot.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
            }`}
            onClick={() => onSpotSelect(spot)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{spot.name}</h4>
                <p className="text-sm text-gray-600">{spot.address}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                getAvailabilityColor(spot.available, spot.total)
              }`}>
                {spot.available} spots
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{spot.price}</span>
                <span>{spot.distance}</span>
                <span>{spot.walkTime} walk</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-400"></i>
                </div>
                <span className="text-sm text-gray-600">{spot.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={getPredictionIcon(spot.prediction)}></i>
                </div>
                <span className="text-xs text-gray-500 capitalize">
                  {spot.prediction.replace('-', ' ')} • {spot.type}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer">
                  Reserve
                </button>
                <button className="px-2 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-navigation-line text-xs"></i>
                  </div>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    spot.available / spot.total > 0.5 ? 'bg-green-500' :
                    spot.available / spot.total > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(spot.available / spot.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((spot.available / spot.total) * 100)}% available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
