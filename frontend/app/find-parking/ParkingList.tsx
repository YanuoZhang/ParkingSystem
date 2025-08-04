
'use client';

import { useState, useEffect } from 'react';
import { apiService, ParkingSpot } from '@/services/api';

interface ParkingSpotDisplay extends ParkingSpot {
  distance: string;
  walkTime: string;
  prediction: string;
}

export default function ParkingList({ selectedSpot, onSpotSelect }: {
  selectedSpot: any;
  onSpotSelect: (spot: any) => void;
}) {
  const [spots, setSpots] = useState<ParkingSpotDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('distance');

  // Load parking spots from API
  useEffect(() => {
    const loadParkingSpots = async () => {
      try {
        setLoading(true);
        const parkingSpots = await apiService.getParkingSpots();
        
        // Transform API data to display format
        const displaySpots: ParkingSpotDisplay[] = parkingSpots.map((spot, index) => ({
          ...spot,
          distance: `${(0.2 + index * 0.1).toFixed(1)}km`,
          walkTime: `${2 + index} min`,
          prediction: spot.availableSpots > spot.totalSpots * 0.5 ? 'available' :
                    spot.availableSpots > spot.totalSpots * 0.2 ? 'filling-fast' : 'limited'
        }));
        
        setSpots(displaySpots);
        setError(null);
      } catch (err) {
        setError('Failed to load parking spots');
        console.error('Error loading parking spots:', err);
      } finally {
        setLoading(false);
      }
    };

    loadParkingSpots();
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSpots(prevSpots => prevSpots.map(spot => ({
        ...spot,
        availableSpots: Math.max(0, Math.min(spot.totalSpots, 
          spot.availableSpots + Math.floor(Math.random() * 5 - 2)))
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
    const icons: { [key: string]: string } = {
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
        return a.hourlyRate - b.hourlyRate;
      case 'availability':
        return (b.availableSpots / b.totalSpots) - (a.availableSpots / a.totalSpots);
      case 'rating':
        return b.rating - a.rating;
      default:
        return parseFloat(a.distance) - parseFloat(b.distance);
    }
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading parking spots...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center text-red-600">
          <i className="ri-error-warning-line text-2xl mb-2"></i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
                getAvailabilityColor(spot.availableSpots, spot.totalSpots)
              }`}>
                {spot.availableSpots} spots
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">${spot.hourlyRate}/hour</span>
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
                  {spot.prediction.replace('-', ' ')} • {spot.features[0] || 'Parking'}
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
                    spot.availableSpots / spot.totalSpots > 0.5 ? 'bg-green-500' :
                    spot.availableSpots / spot.totalSpots > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(spot.availableSpots / spot.totalSpots) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((spot.availableSpots / spot.totalSpots) * 100)}% available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
