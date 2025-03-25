import { useNavigate } from "react-router-dom";

export default function LandingPageHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-teal-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          YourLogo
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <button
            onClick={() => navigate("/features")}
            className="hover:text-teal-600"
          >
            Features
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="hover:text-teal-600"
          >
            Pricing
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-teal-600"
          >
            About
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-teal-600"
          >
            Contact
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/auth", { state: { isRegister: false } })}
            className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth", { state: { isRegister: true } })}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
