'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2014', cars: 920000, projection: null },
  { year: '2015', cars: 945000, projection: null },
  { year: '2016', cars: 975000, projection: null },
  { year: '2017', cars: 1010000, projection: null },
  { year: '2018', cars: 1045000, projection: null },
  { year: '2019', cars: 1085000, projection: null },
  { year: '2020', cars: 1095000, projection: null },
  { year: '2021', cars: 1120000, projection: null },
  { year: '2022', cars: 1155000, projection: null },
  { year: '2023', cars: 1185000, projection: null },
  { year: '2024', cars: 1220000, projection: 1220000 },
  { year: '2025', cars: null, projection: 1265000 },
  { year: '2026', cars: null, projection: 1315000 },
  { year: '2027', cars: null, projection: 1370000 }
];

export default function CarOwnershipChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Year: ${label}`}</p>
          {payload[0].value && (
            <p className="text-blue-600">
              {`Cars: ${payload[0].value.toLocaleString()}`}
            </p>
          )}
          {payload[1]?.value && (
            <p className="text-orange-600">
              {`Projection: ${payload[1].value.toLocaleString()}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="carsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="projectionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
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
            <Area
              type="monotone"
              dataKey="cars"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#carsGradient)"
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="projection"
              stroke="#F59E0B"
              strokeWidth={3}
              strokeDasharray="5 5"
              fill="url(#projectionGradient)"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-gray-600">Historical Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 border-2 border-dashed border-orange-500"></div>
          <span className="text-gray-600">Projected Growth</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-information-line text-gray-500"></i>
          </div>
          <span className="text-gray-600">8.5% annual growth rate (2020-2024)</span>
        </div>
      </div>
    </div>
  );
}