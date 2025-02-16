import { useState } from "react";
import FormField from "./form/FormField";
import PasswordField from "./form/password/PasswordField";

export default function AuthForm({ isRegister, setIsRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="mx-auto mt-6 flex w-fit rounded-full bg-[#55C2C3]/10 p-1">
        <button
          className={`rounded-full px-12 py-2 text-sm ${isRegister ? "text-[#55C2C3] hover:bg-[#55C2C3]/10" : "bg-[#55C2C3] text-white"}`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
        <button
          className={`rounded-full px-12 py-2 text-sm ${isRegister ? "bg-[#55C2C3] text-white" : "text-[#55C2C3] hover:bg-[#55C2C3]/10"}`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
      </div>

      <form className="mt-8 space-y-6">
        {isRegister && <FormField id="fullname" label="Full Name" type="text" placeholder="Enter your full name" />}
        <FormField id="email" label="Email" type="email" placeholder="Enter your email" />
        <PasswordField id="password" label="Password" placeholder="Enter your password" showPassword={showPassword} setShowPassword={setShowPassword} />

        {isRegister && (
          <PasswordField id="confirmPassword" label="Confirm Password" placeholder="Confirm your password" showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
        )}

        {!isRegister && (
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#55C2C3] focus:ring-[#55C2C3]" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-[#55C2C3] hover:underline">
              Forgot Password?
            </a>
          </div>
        )}

        <button type="submit" className="w-full rounded-lg bg-[#55C2C3] py-3 text-white hover:bg-[#4BA9AA] focus:outline-none">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}
