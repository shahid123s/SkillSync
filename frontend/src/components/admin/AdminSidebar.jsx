// components/admin/AdminSidebar.jsx
import { Link } from 'react-router-dom';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <div className={`bg-gray-800 text-white w-64 fixed h-full transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-64'} md:ml-0 z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <nav className="space-y-2">
          <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded transition-colors">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block p-2 hover:bg-gray-700 rounded transition-colors">
            Manage Users
          </Link>
          <Link to="/admin/courses" className="block p-2 hover:bg-gray-700 rounded transition-colors">
            Manage Courses
          </Link>
          <Link to="/admin/reviewers" className="block p-2 hover:bg-gray-700 rounded transition-colors">
            Pending Reviewers
          </Link>
        </nav>
      </div>
    </div>
  );
}