import { useState } from "react";
import AuthImage from "../components/AuthPage/AuthImage";
import AuthForm from "../components/AuthPage/AuthForm";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

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
