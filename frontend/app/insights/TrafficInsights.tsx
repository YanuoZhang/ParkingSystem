'use client';

export default function TrafficInsights() {
  const insights = [
    {
      icon: 'ri-car-washing-line',
      title: 'Morning Rush Impact',
      description: 'Parking demand increases 340% between 7-9 AM on weekdays, with Collins Street experiencing the highest congestion.',
      trend: '+23%',
      period: 'vs last year'
    },
    {
      icon: 'ri-building-line',
      title: 'CBD Density Growth',
      description: 'New office developments have added 15,000 daily commuters, increasing parking pressure in the eastern CBD.',
      trend: '+15k',
      period: 'new workers'
    },
    {
      icon: 'ri-train-line',
      title: 'Public Transport Integration',
      description: 'Areas within 400m of train stations show 28% lower parking demand, highlighting transit accessibility benefits.',
      trend: '-28%',
      period: 'parking demand'
    },
    {
      icon: 'ri-calendar-event-line',
      title: 'Event Day Patterns',
      description: 'Major events at MCG and Crown increase CBD parking demand by 180%, with bookings starting 3 hours early.',
      trend: '+180%',
      period: 'on event days'
    }
  ];

  const recommendations = [
    {
      icon: 'ri-time-line',
      title: 'Off-Peak Incentives',
      description: 'Implement dynamic pricing to encourage parking during low-demand hours (10 AM - 2 PM).'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Smart Reservations',
      description: 'Allow advance bookings for popular areas to reduce search time and traffic congestion.'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Green Corridors',
      description: 'Promote eco-friendly zones with discounts for electric vehicles and carpooling.'
    },
    {
      icon: 'ri-map-pin-2-line',
      title: 'Peripheral Hubs',
      description: 'Develop parking facilities near public transport to reduce CBD vehicle pressure.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Key Insights */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Traffic Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Data-driven insights from traffic patterns, commuter behavior, and urban development trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg flex-shrink-0">
                  <i className={`${insight.icon} text-xl text-blue-600`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{insight.trend}</div>
                      <div className="text-xs text-gray-500">{insight.period}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evidence-based recommendations to improve parking efficiency and reduce urban congestion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg flex-shrink-0">
                  <i className={`${recommendation.icon} text-lg text-green-600`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{recommendation.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Projected Impact</h3>
        <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
          Implementing these data-driven solutions could reduce average parking search time by 35% 
          and decrease CBD traffic congestion by 22% within two years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">-35%</div>
            <div className="text-blue-100">Search Time Reduction</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">-22%</div>
            <div className="text-blue-100">Traffic Congestion</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">+40%</div>
            <div className="text-blue-100">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}