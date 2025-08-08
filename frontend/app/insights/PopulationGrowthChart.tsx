'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService, PopulationData } from '../../services/api';

export default function PopulationGrowthChart() {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPopulationData();
        setPopulationData(data);
      } catch (err) {
        setError('Failed to load population data');
        console.error('Error fetching population data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopulationData();
  }, []);

  // 转换数据格式以适配图表
  const chartData = populationData.map(item => ({
    year: item.year.toString(),
    population: item.population
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Year: ${label}`}</p>
          <div className="space-y-1">
            <p className="text-blue-600">
              {`Population: ${payload[0]?.value?.toLocaleString()}`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-gray-500">Loading population data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (populationData.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-gray-500">No population data available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="year" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="population" 
              fill="url(#populationGradient)" 
              stroke="#3B82F6"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="font-medium text-gray-900">Population</span>
          </div>
          <p className="text-sm text-gray-600">Total metropolitan population including suburbs</p>
        </div>
      </div>
    </div>
  );
}