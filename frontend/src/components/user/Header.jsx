// components/user/Header.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/courses' && location.pathname.startsWith('/courses/')) 
           ? "text-teal-500 font-medium" 
           : "text-gray-700 hover:text-teal-500";
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center">
          <div
            className="text-2xl font-bold text-teal-600 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            SKILL SYNC
          </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/home" className={`${isActive('/home')} transition duration-200`}>
          Home
        </Link>
        <Link to="/courses" className={`${isActive('/courses')} transition duration-200`}>
          Courses
        </Link>
        <Link to="/my-courses" className={`${isActive('/my-courses')} transition duration-200`}>
          My Courses
        </Link>
        <Link to="/weekly-task" className={`${isActive('/weekly-task')} transition duration-200`}>
          Weekly Task
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="User profile"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-medium">Jane</span>
          <span className="text-gray-500">▼</span>
        </div>
      </div>
    </header>
  );
}