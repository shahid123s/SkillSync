import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthImage from "../../components/user/authPage/AuthImage";
import AuthForm from "../../components/user/AuthPage/AuthForm";

export  default function AuthPage() {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);

  // Set initial auth mode based on route state or URL query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') || location.state?.isRegister;
    setIsRegister(mode === 'register' || Boolean(mode));
  }, [location]);

  const authContent = {
    title: isRegister ? "Create an Account" : "Welcome Back!",
    description: isRegister 
      ? "Fill in your details to create a new account" 
      : "Enter your credentials to sign in to your account"
  };

  return (
    <div className="flex min-h-screen">
      <AuthImage />
      
      <div className="flex w-full flex-col px-4 py-8 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {authContent.title}
            </h1>
            <p className="mt-2 text-gray-600">
              {authContent.description}
            </p>
          </div>

          <AuthForm 
            isRegister={isRegister} 
            setIsRegister={setIsRegister} 
          />
        </div>
      </div>
    </div>
  );
}