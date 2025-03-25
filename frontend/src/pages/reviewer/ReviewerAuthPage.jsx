import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReviewerAuthForm from "../../components/reviewer/auth/ReviewerAuthForm";

export default function ReviewerAuthPage() {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') || location.state?.isRegister;
    setIsRegister(mode === 'register' || Boolean(mode));
  }, [location]);

  const authContent = {
    title: isRegister ? "Become a Reviewer" : "Reviewer Login",
    description: isRegister 
      ? "Join our team of expert reviewers" 
      : "Sign in to access reviewer dashboard"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {authContent.title}
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            {authContent.description}
          </p>
        </div>

        <ReviewerAuthForm 
          isRegister={isRegister} 
          setIsRegister={setIsRegister} 
        />
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isRegister ? "Sign in instead" : "Create account"}
        </button>
      </div>
    </div>
  );
}