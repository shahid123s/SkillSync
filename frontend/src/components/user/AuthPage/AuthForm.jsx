import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { axiosInstance } from "../../../utils/axios";

export default function AuthForm({ isRegister, setIsRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isRegister && formData.password !== formData.confirmPassword) {
      toast("Passwords do not match");
      setLoading(false);
      return;
    }
  
    try {
      if (isRegister) {
        const response = await axiosInstance.post("/auth/student/register", formData);
        if(response.data.success) {
          toast.success('User Registered Successfully')
        }
        toast.error(response.data.message)
        setIsRegister(false)
      } else {
        const response  = await axiosInstance.post('/auth/student/login', formData)
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {error && (
          <div className="p-3 m-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-4 text-sm font-medium ${!isRegister
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:bg-gray-50"
            }`}
          onClick={() => setIsRegister(false)}
          type="button"
        >
          Login
        </button>
        <button
          className={`flex-1 py-4 text-sm font-medium ${isRegister
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:bg-gray-50"
            }`}
          onClick={() => setIsRegister(true)}
          type="button"
        >
          Register
        </button>
      </div>
            
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {isRegister && <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="phone"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>}
        {isRegister && <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Of Birth
          </label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>}

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {!isRegister && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isRegister ? "Creating account..." : "Signing in..."}
            </span>
          ) : isRegister ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
