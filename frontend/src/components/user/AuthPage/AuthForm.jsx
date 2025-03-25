import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/userSlice"; // Redux async thunk for login
import { axiosInstance } from "../../../utils/axios";

export default function AuthForm({ isRegister, setIsRegister }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (isRegister) {
      // Registration process: using direct API call for now.
      try {
        const res = await axiosInstance.post("/auth/register", { 
          fullname: formData.fullname, 
          email: formData.email, 
          password: formData.password 
        });
        if (res.data.success) {
          setIsRegister(false); // Switch to login mode after registration
        } else {
          setError(res.data.message || "Something went wrong");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      // Login process: using Redux async thunk.
      try {
        await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
        navigate("/"); // Redirect to homepage on successful login
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Toggle Login/Register */}
      <div className="flex justify-center mb-4">
        <button 
          className={`px-4 py-2 ${!isRegister ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
        <button 
          className={`px-4 py-2 ${isRegister ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <input 
            type="text" 
            name="fullname" 
            placeholder="Full Name" 
            className="input" 
            onChange={handleChange} 
          />
        )}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="input" 
          onChange={handleChange} 
        />
        
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            className="input" 
            onChange={handleChange} 
          />
          <button 
            type="button" 
            className="eye-icon" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {isRegister && (
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            className="input" 
            onChange={handleChange} 
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded" 
          disabled={loading}
        >
          {loading ? "Processing..." : isRegister ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}
