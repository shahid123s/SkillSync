import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthImage from "../../components/user/authPage/AuthImage";
import AuthForm from "../../components/user/authPage/AuthForm";

export default function AuthPage() {
  const location = useLocation();

  // Get initial value from navigation state or default to false
  const [isRegister, setIsRegister] = useState(location.state?.isRegister || false);

  useEffect(() => {
    if (location.state?.isRegister !== undefined) {
      setIsRegister(location.state.isRegister);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <AuthImage />

      {/* Right Side Form */}
      <div className="flex w-full flex-col px-4 py-8 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-semibold">
            {isRegister ? "Create an Account" : "Welcome Back!"}
          </h1>
          <p className="mt-2 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Auth Form Component */}
          <AuthForm isRegister={isRegister} setIsRegister={setIsRegister} />
        </div>
      </div>
    </div>
  );
}
