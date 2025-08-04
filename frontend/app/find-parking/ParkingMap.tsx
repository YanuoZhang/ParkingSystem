
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
  coordinates: [number, number];
  type: string;
  prediction: string;
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
    coordinates: [-37.8136, 144.9631],
    type: 'street',
    prediction: 'filling-fast'
  },
  {
    id: '2',
    name: 'Bourke Street Mall Garage',
    address: '456 Bourke Street',
    price: '$12/hour',
    available: 23,
    total: 200,
    distance: '0.4km',
    coordinates: [-37.8140, 144.9633],
    type: 'garage',
    prediction: 'stable'
  },
  {
    id: '3',
    name: 'Flinders Lane Parking',
    address: '789 Flinders Lane',
    price: '$6/hour',
    available: 67,
    total: 80,
    distance: '0.3km',
    coordinates: [-37.8159, 144.9669],
    type: 'street',
    prediction: 'available'
  },
  {
    id: '4',
    name: 'Queen Street Complex',
    address: '321 Queen Street',
    price: '$10/hour',
    available: 12,
    total: 150,
    distance: '0.5km',
    coordinates: [-37.8118, 144.9648],
    type: 'garage',
    prediction: 'limited'
  },
  {
    id: '5',
    name: 'Swanston Street Parking',
    address: '654 Swanston Street',
    price: '$7/hour',
    available: 89,
    total: 100,
    distance: '0.6km',
    coordinates: [-37.8102, 144.9628],
    type: 'street',
    prediction: 'available'
  }
];

export default function ParkingMap({ filters, selectedSpot, onSpotSelect }: {
  filters: any;
  selectedSpot: any;
  onSpotSelect: (spot: any) => void;
}) {
  const [spots, setSpots] = useState(mockParkingSpots);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time updates
      setSpots(prevSpots => prevSpots.map(spot => ({
        ...spot,
        available: Math.max(0, spot.available + Math.floor(Math.random() * 5 - 2))
      })));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return 'bg-green-500';
    if (ratio > 0.2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPredictionBadge = (prediction: string) => {
    const badges = {
      'available': 'bg-green-100 text-green-800',
      'filling-fast': 'bg-orange-100 text-orange-800',
      'limited': 'bg-red-100 text-red-800',
      'stable': 'bg-blue-100 text-blue-800'
    };
    return badges[prediction] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Live Parking Map</h3>
            <p className="text-sm text-gray-600" suppressHydrationWarning={true}>
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Limited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Full</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f66e49%3A0x506f0b535df4f0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1647834567890!5m2!1sen!2s"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>

        {/* Overlay Spots */}
        <div className="absolute inset-0 pointer-events-none">
          {spots.map((spot, index) => (
            <div
              key={spot.id}
              className={`absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedSpot?.id === spot.id ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`
              }}
              onClick={() => onSpotSelect(spot)}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                getAvailabilityColor(spot.available, spot.total)
              }`}></div>
              
              {selectedSpot?.id === spot.id && (
                <div className="absolute left-6 top-0 w-72 bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{spot.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getPredictionBadge(spot.prediction)
                    }`}>
                      {spot.prediction.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{spot.address}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Available Spots</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {spot.available}/{spot.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price & Distance</p>
                      <p className="text-sm font-medium text-gray-900">
                        {spot.price} • {spot.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                      Reserve Spot
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-navigation-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {spots.reduce((sum, spot) => sum + spot.available, 0)}
            </p>
            <p className="text-sm text-gray-600">Available Spots</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {spots.filter(spot => spot.available > 0).length}
            </p>
            <p className="text-sm text-gray-600">Active Locations</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">$8.5</p>
            <p className="text-sm text-gray-600">Average Price/Hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
