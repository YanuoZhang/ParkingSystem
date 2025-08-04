'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  const stats = [
    { icon: 'ri-map-pin-line', value: '2,450+', label: 'Parking Spots Monitored' },
    { icon: 'ri-time-line', value: '15min', label: 'Average Search Time Saved' },
    { icon: 'ri-leaf-line', value: '2.3k kg', label: 'CO₂ Reduced This Month' },
    { icon: 'ri-car-line', value: '95%', label: 'User Satisfaction Rate' }
  ];

  const features = [
    {
      icon: 'ri-search-eye-line',
      title: 'Real-time Parking',
      description: 'Find available parking spots instantly with live data updates across Melbourne CBD.',
      href: '/find-parking'
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Data Insights',
      description: 'Analyze trends, population growth, and parking patterns to plan your journey better.',
      href: '/insights'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Eco Impact',
      description: 'Track your environmental impact and discover greener commuting alternatives.',
      href: '/eco-impact'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Modern%20urban%20Melbourne%20city%20skyline%20with%20busy%20traffic%20and%20parking%20areas%20during%20golden%20hour%2C%20aerial%20view%20showing%20organized%20parking%20lots%20and%20city%20buildings%2C%20professional%20photography%20style%20with%20warm%20lighting%20and%20clear%20urban%20infrastructure%2C%20contemporary%20cityscape%20with%20efficient%20transportation%20systems&width=1920&height=1080&seq=hero-melbourne&orientation=landscape')`
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Smart Parking for<br />
            <span className="text-blue-400">Melbourne Commuters</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Find available parking spots in real-time, analyze traffic trends, and reduce your environmental impact with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-parking" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap">
              Find Parking Now
            </Link>
            <Link href="/insights" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap">
              View Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-blue-100 rounded-full">
                  <i className={`${stat.icon} text-2xl text-blue-600`}></i>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Parking
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides real-time data, predictive insights, and environmental impact tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                href={feature.href}
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
                  <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  <span>Explore</span>
                  <div className="w-4 h-4 flex items-center justify-center ml-2">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Melbourne commuters who save time and reduce emissions with smart parking decisions.
          </p>
          <Link href="/find-parking" className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer whitespace-nowrap">
            Start Finding Parking
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}