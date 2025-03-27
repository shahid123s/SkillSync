import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white">
      <div className="flex items-center">
          <div
            className="text-2xl font-bold text-teal-600 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            SKILL SYNC
          </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/home" className="text-gray-700 hover:text-teal-500">
          Home
        </Link>
        <Link to="/courses" className="text-gray-700 hover:text-teal-500">
          Courses
        </Link>
        <Link to="/careers" className="text-gray-700 hover:text-teal-500">
          Careers
        </Link>
        <Link to="/blog" className="text-gray-700 hover:text-teal-500">
          Blog
        </Link>
        <Link to="/about-us" className="text-gray-700 hover:text-teal-500">
          About Us
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
