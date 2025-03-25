import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-2">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-70"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                TOTC
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400">Virtual Class for Zoom</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <h3 className="text-center mb-4">Subscribe to get our Newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md w-full"
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-200">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-4">
          <a href="/careers" className="hover:text-teal-400">
            Careers
          </a>
          <a href="/privacy-policy" className="hover:text-teal-400">
            Privacy Policy
          </a>
          <a href="/terms-conditions" className="hover:text-teal-400">
            Terms & Conditions
          </a>
        </div>

        <div className="text-center text-xs text-gray-500">
          © 2023 Class Technologies Inc.
        </div>
      </div>
    </footer>
  );
}
