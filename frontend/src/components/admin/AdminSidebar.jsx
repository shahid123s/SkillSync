// components/admin/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };

  return (
    <div className={`bg-gray-800 text-white w-64 fixed h-full transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-64'} md:ml-0 z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white">
            ×
          </button>
        </div>
        
        <nav className="space-y-2">
          <Link to="/admin" className={`block p-2 hover:bg-gray-700 rounded transition-colors ${isActive('/admin')}`}>
            Dashboard
          </Link>
          <Link to="/admin/users" className={`block p-2 hover:bg-gray-700 rounded transition-colors ${isActive('/admin/users')}`}>
            Manage Users
          </Link>
          <Link to="/admin/courses" className={`block p-2 hover:bg-gray-700 rounded transition-colors ${isActive('/admin/courses')}`}>
            Manage Courses
          </Link>
          <Link to="/admin/reviewers" className={`block p-2 hover:bg-gray-700 rounded transition-colors ${isActive('/admin/reviewers')}`}>
            Pending Reviewers
          </Link>
          <Link to="/admin/all-reviewers" className={`block p-2 hover:bg-gray-700 rounded transition-colors ${isActive('/admin/all-reviewers')}`}>
            All Reviewers
          </Link>
        </nav>
      </div>
    </div>
  );
}