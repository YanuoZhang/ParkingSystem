import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Go back home
          </Link>
          <div>
            <Link
              href="/find-parking"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Find Parking
            </Link>
            <span className="mx-2 text-gray-400">•</span>
            <Link
              href="/insights"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}