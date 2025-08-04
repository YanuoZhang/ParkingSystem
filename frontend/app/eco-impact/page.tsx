'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CO2Calculator from './CO2Calculator';
import GreenAlternatives from './GreenAlternatives';
import ImpactTracker from './ImpactTracker';
import SustainabilityTips from './SustainabilityTips';

export default function EcoImpactPage() {
  const impactStats = [
    {
      icon: 'ri-leaf-line',
      value: '2,340',
      unit: 'kg CO₂',
      label: 'Saved This Month',
      change: '+18%',
      color: 'green'
    },
    {
      icon: 'ri-car-line',
      value: '1,250',
      unit: 'trips',
      label: 'Alternative Transport Used',
      change: '+25%',
      color: 'blue'
    },
    {
      icon: 'ri-time-line',
      value: '420',
      unit: 'hours',
      label: 'Commute Time Saved',
      change: '+12%',
      color: 'orange'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      value: '$8,750',
      unit: '',
      label: 'Fuel Costs Saved',
      change: '+22%',
      color: 'purple'
    }
  ];

  const getStatColor = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Sustainable%20urban%20environment%20with%20green%20transportation%2C%20electric%20vehicles%20charging%2C%20public%20transport%2C%20cycling%20lanes%2C%20and%20clean%20modern%20Melbourne%20cityscape%20showing%20eco-friendly%20commuting%20solutions%2C%20bright%20natural%20lighting%20with%20green%20trees%20and%20clean%20air%2C%20contemporary%20environmental%20consciousness%20theme&width=1920&height=600&seq=eco-hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Reduce Your <span className="text-green-400">Carbon Footprint</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Make smarter travel choices with our CO₂ calculator and discover greener alternatives that benefit both you and the environment.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600">Together, we're making Melbourne a greener city</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${getStatColor(stat.color)}`}>
                    <i className={`${stat.icon} text-2xl`}></i>
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                  <span className="text-lg text-gray-500 font-normal ml-1">{stat.unit}</span>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO₂ Calculator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CO2Calculator />
        </div>
      </section>

      {/* Green Alternatives */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GreenAlternatives />
        </div>
      </section>

      {/* Impact Tracker */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactTracker />
        </div>
      </section>

      {/* Sustainability Tips */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SustainabilityTips />
        </div>
      </section>

      <Footer />
    </div>
  );
}