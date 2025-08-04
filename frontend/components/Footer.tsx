'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-map-pin-line text-2xl text-blue-400"></i>
              </div>
              <span className="font-['Pacifico'] text-xl text-white">ParkSmart</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping Melbourne commuters make smarter parking decisions with real-time data and insights.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/find-parking" className="hover:text-blue-400 cursor-pointer">Real-time Parking</Link></li>
              <li><Link href="/insights" className="hover:text-blue-400 cursor-pointer">Data Insights</Link></li>
              <li><Link href="/eco-impact" className="hover:text-blue-400 cursor-pointer">Eco Impact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 cursor-pointer">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-400 cursor-pointer">Data Sources</a></li>
              <li><a href="#" className="hover:text-blue-400 cursor-pointer">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:text-blue-400 cursor-pointer">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:text-blue-400 cursor-pointer">
                <i className="ri-facebook-line text-lg"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:text-blue-400 cursor-pointer">
                <i className="ri-linkedin-line text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 ParkSmart Melbourne. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}