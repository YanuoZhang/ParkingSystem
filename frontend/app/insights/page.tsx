'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { apiService, Insight } from '@/services/api';
import PopulationGrowthChart from './PopulationGrowthChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true);
        const data = await apiService.getInsights();
        setInsights(data);
        setError(null);
      } catch (err) {
        setError('Failed to load insights data');
        console.error('Error loading insights:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  const keyStats = [
    {
      icon: 'ri-car-line',
      value: '2,810',
      label: 'Total Parking Spots',
      change: '+12.5%',
      trend: 'up'
    },
    {
      icon: 'ri-group-line',
      value: '463',
      label: 'Available Spots',
      change: '+8.3%',
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
      value: '$8.9',
      label: 'Avg Price/Hour',
      change: '-2.1%',
      trend: 'down'
    }
  ];

  const renderChart = (insight: Insight) => {
    const data = insight.data.labels.map((label, index) => ({
      name: label,
      value: insight.data.values[index]
    }));

    const colors = insight.colors || ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    switch (insight.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={insight.color || "#3B82F6"} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={insight.color || "#8B5CF6"} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={insight.color || "#10B981"} fill={insight.color || "#10B981"} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'doughnut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading insights...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-600">
            <i className="ri-error-warning-line text-4xl mb-4"></i>
            <p className="text-xl">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            Analyze parking patterns, usage trends, and pricing data to understand Melbourne's evolving transportation landscape.
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
            {/* CBD Population Growth Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">CBD Population Growth</h2>
                <p className="text-gray-600">Track the population growth trends in Melbourne's Central Business District over the years.</p>
              </div>
              <PopulationGrowthChart />
            </div>

            {insights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{insight.title}</h2>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
                {renderChart(insight)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}