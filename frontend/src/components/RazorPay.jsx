import React, { useEffect, useState, useRef } from "react";
import { useRazorpay } from "react-razorpay";
import { toast } from 'sonner'
import { userAxiosInstance } from "../utils/userAxiosInstance";

const RazorPay = ({ amount, handlePlaceOrder }) => {
  const { error, Razorpay } = useRazorpay();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const razorpayInitialized = useRef(false);

  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        try {
          const response = await userAxiosInstance.get("/student/get-user-info");
          setUserInfo({
            name: response.data.fullName,
            email: response.data.email,
            contact: response.data.phoneNumber,
          });
        } catch (err) {
          console.error("Error fetching user info:", err);
          toast.error("Failed to load user information");
        } finally {
          setIsLoadingUserInfo(false);
        }
      };
      getUserInfo();
    }
  }, [userInfo]);

  useEffect(() => {
    if (Razorpay && !razorpayInitialized.current) {
      razorpayInitialized.current = true;
    }
  }, [Razorpay]);

  const handlePayment = async () => {
    if (!userInfo || !Razorpay) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: Number(amount).toFixed(0) * 100,
      currency: "INR",
      name: "XPWIDE",
      description: "Course Purchase",
      handler: (response) => {
        handlePlaceOrder("Success");
      },
      prefill: { ...userInfo },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    
    razorpayInstance.on("payment.failed", (response) => {
      console.error("Payment failed:", response);
      handlePlaceOrder("Failed");
      toast.error(`Payment failed: ${response.error.description}`);
      razorpayInstance.close();
    });

    razorpayInstance.open();
  };

  if (!razorpayInitialized.current || isLoadingUserInfo) {
    return (
      <button 
        className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded mb-6 cursor-not-allowed"
        disabled
      >
        Loading payment options...
      </button>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-2">
        Error loading payment gateway: {error.message}
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="text-red-500 text-center py-2">
        Failed to load user information. Please refresh the page.
      </div>
    );
  }

  return (
    <button
      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded mb-6 transition-colors duration-200"
      onClick={handlePayment}
      aria-label="Pay with RazorPay"
    >
      Buy Now (Rs. {amount})
    </button>
  );
};

export default RazorPay;