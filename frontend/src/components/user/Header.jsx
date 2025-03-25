import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-70"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
              TOTC
            </span>
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-gray-700 hover:text-teal-500">Home</Link>
        <Link to="/courses" className="text-gray-700 hover:text-teal-500">Courses</Link>
        <Link to="/careers" className="text-gray-700 hover:text-teal-500">Careers</Link>
        <Link to="/blog" className="text-gray-700 hover:text-teal-500">Blog</Link>
        <Link to="/about-us" className="text-gray-700 hover:text-teal-500">About Us</Link>
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
