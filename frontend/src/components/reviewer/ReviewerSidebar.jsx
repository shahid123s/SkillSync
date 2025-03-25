// components/reviewer/ReviewerSidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewerSidebar({ isOpen, setIsOpen }) {
  return (
    <div className={`bg-gray-800 text-white w-64 fixed h-full transition-all duration-300 ${isOpen ? 'ml-0' : '-ml-64'} md:ml-0 z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reviewer Panel</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <nav className="space-y-2">
          <Link
            to="/reviewer"
            className="block p-2 hover:bg-gray-700 rounded transition-colors"
          >
            Home
          </Link>
          <Link
            to="/reviewer/students"
            className="block p-2 hover:bg-gray-700 rounded transition-colors"
          >
            Students
          </Link>
          <Link
            to="/reviewer/profile"
            className="block p-2 hover:bg-gray-700 rounded transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
}