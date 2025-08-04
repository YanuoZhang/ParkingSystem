'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';

const populationData = [
  { year: '2014', population: 4200000, cbdPopulation: 42000, growthRate: 2.1 },
  { year: '2015', population: 4320000, cbdPopulation: 45200, growthRate: 2.9 },
  { year: '2016', population: 4440000, cbdPopulation: 48800, growthRate: 2.8 },
  { year: '2017', population: 4580000, cbdPopulation: 52500, growthRate: 3.2 },
  { year: '2018', population: 4720000, cbdPopulation: 56400, growthRate: 3.1 },
  { year: '2019', population: 4870000, cbdPopulation: 60800, growthRate: 3.2 },
  { year: '2020', population: 4920000, cbdPopulation: 58500, growthRate: 1.0 },
  { year: '2021', population: 4980000, cbdPopulation: 61200, growthRate: 1.2 },
  { year: '2022', population: 5150000, cbdPopulation: 65800, growthRate: 3.4 },
  { year: '2023', population: 5280000, cbdPopulation: 70200, growthRate: 2.5 },
  { year: '2024', population: 5420000, cbdPopulation: 74800, growthRate: 2.7 }
];

export default function PopulationGrowthChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`Year: ${label}`}</p>
          <div className="space-y-1">
            <p className="text-blue-600">
              {`Melbourne: ${payload[0]?.value?.toLocaleString()}`}
            </p>
            <p className="text-green-600">
              {`CBD: ${payload[1]?.value?.toLocaleString()}`}
            </p>
            <p className="text-orange-600">
              {`Growth Rate: ${payload[2]?.value}%`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
              yAxisId="population"
              orientation="left"
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <YAxis 
              yAxisId="growth"
              orientation="right"
              stroke="#F59E0B"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              yAxisId="population"
              dataKey="population" 
              fill="url(#populationGradient)" 
              stroke="#3B82F6"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="population"
              dataKey="cbdPopulation" 
              fill="#10B981" 
              stroke="#059669"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="growth"
              type="monotone"
              dataKey="growthRate"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="font-medium text-gray-900">Greater Melbourne</span>
          </div>
          <p className="text-sm text-gray-600">Total metropolitan population including suburbs</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="font-medium text-gray-900">CBD Population</span>
          </div>
          <p className="text-sm text-gray-600">Central business district residents and workers</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-1 bg-orange-500 rounded"></div>
            <span className="font-medium text-gray-900">Growth Rate</span>
          </div>
          <p className="text-sm text-gray-600">Annual population increase percentage</p>
        </div>
      </div>
    </div>
  );
}