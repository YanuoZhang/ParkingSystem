
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ParkingMap from './ParkingMap';
import ParkingFilters from './ParkingFilters';
import ParkingList from './ParkingList';
import { useState } from 'react';

export default function FindParkingPage() {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    duration: '2h',
    distance: '1km',
    availability: 'available'
  });

  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Available Parking
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time parking availability across Melbourne CBD. Save time and reduce stress with live updates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ParkingFilters filters={filters} onFiltersChange={setFilters} />
            <div className="mt-6">
              <ParkingList selectedSpot={selectedSpot} onSpotSelect={setSelectedSpot} />
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <ParkingMap 
              filters={filters} 
              selectedSpot={selectedSpot} 
              onSpotSelect={setSelectedSpot} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
