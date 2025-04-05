// components/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound({ role = 'user' }) {
  const roleConfig = {
    user: {
      color: 'bg-teal-600 hover:bg-teal-700',
      homePath: '/',
      dashboardName: 'Home'
    },
    admin: {
      color: 'bg-blue-600 hover:bg-blue-700',
      homePath: '/admin',
      dashboardName: 'Admin Dashboard'
    },
    reviewer: {
      color: 'bg-purple-600 hover:bg-purple-700',
      homePath: '/reviewer',
      dashboardName: 'Reviewer Dashboard'
    }
  };

  const { color, homePath, dashboardName } = roleConfig[role];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-900 mb-4">
          Oops! Page not found
        </p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to={homePath}
            className={`px-6 py-3 ${color} text-white rounded-md transition-colors`}
          >
            Back to {dashboardName}
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}