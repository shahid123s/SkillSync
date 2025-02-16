import { Link } from "react-router-dom";

export default function LandingPageHeader() {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-teal-600">YourLogo</div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link to="/features" className="hover:text-teal-600">Features</Link>
          <Link to="/pricing" className="hover:text-teal-600">Pricing</Link>
          <Link to="/about" className="hover:text-teal-600">About</Link>
          <Link to="/contact" className="hover:text-teal-600">Contact</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
