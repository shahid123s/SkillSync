import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ id, label, placeholder, showPassword, setShowPassword }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm">
        {label}
      </label>
      <div className="relative">
        <input id={id} type={showPassword ? "text" : "password"} placeholder={placeholder} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#55C2C3] focus:outline-none" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
