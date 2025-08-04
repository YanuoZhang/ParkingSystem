'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CarOwnershipChart from './CarOwnershipChart';
import PopulationGrowthChart from './PopulationGrowthChart';
import ParkingTrendsChart from './ParkingTrendsChart';
import TrafficInsights from './TrafficInsights';

export default function InsightsPage() {
  const keyStats = [
    {
      icon: 'ri-car-line',
      value: '1.2M',
      label: 'Registered Cars',
      change: '+8.5%',
      trend: 'up'
    },
    {
      icon: 'ri-group-line',
      value: '5.2M',
      label: 'Melbourne Population',
      change: '+12.3%',
      trend: 'up'
    },
    {
      icon: 'ri-parking-line',
      value: '89%',
      label: 'Peak Occupancy',
      change: '+5.2%',
      trend: 'up'
    },
    {
      icon: 'ri-time-line',
      value: '23min',
      label: 'Avg Search Time',
      change: '-15%',
      trend: 'down'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Modern%20data%20visualization%20dashboard%20with%20graphs%20and%20charts%20displayed%20on%20large%20screens%20in%20a%20professional%20Melbourne%20city%20traffic%20control%20center%2C%20clean%20minimalist%20design%20with%20blue%20and%20white%20color%20scheme%2C%20multiple%20monitors%20showing%20traffic%20patterns%20and%20urban%20analytics%2C%20contemporary%20workspace%20with%20city%20skyline%20visible%20through%20windows&width=1920&height=600&seq=insights-hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Melbourne Parking <span className="text-blue-400">Data Insights</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Analyze car ownership trends, population growth, and parking patterns to understand Melbourne's evolving transportation landscape.
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                    <i className={`${stat.icon} text-2xl text-blue-600`}></i>
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{stat.change}</span>
                    <div className="w-4 h-4 flex items-center justify-center ml-1">
                      <i className={`ri-arrow-${stat.trend === 'up' ? 'up' : 'down'}-line`}></i>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Car Ownership Growth */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Ownership Growth Trends</h2>
                <p className="text-gray-600">Track vehicle registration growth across Melbourne over the past decade</p>
              </div>
              <CarOwnershipChart />
            </div>

            {/* Population Growth */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Melbourne CBD Population Growth</h2>
                <p className="text-gray-600">Understand how population changes impact parking demand</p>
              </div>
              <PopulationGrowthChart />
            </div>

            {/* Parking Trends */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Historical Parking Trends</h2>
                <p className="text-gray-600">Analyze peak hours and seasonal patterns in parking usage</p>
              </div>
              <ParkingTrendsChart />
            </div>
          </div>
        </div>
      </section>

      {/* Traffic Insights */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrafficInsights />
        </div>
      </section>

      <Footer />
    </div>
  );
}