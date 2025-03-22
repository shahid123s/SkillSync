import React from "react";
import { Button } from "@/components/ui/button";

export default function CourseHero({ image, price, originalPrice, discount }) {
  return (
    <div className="relative w-full h-[400px] bg-gray-800">
      <img
        src={image || "/placeholder.svg"}
        alt="Course hero image"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 mr-8 w-[300px]">
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt="Course thumbnail"
            width={300}
            height={180}
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">${price.toFixed(2)}</div>
          <div className="flex items-center">
            <span className="text-gray-500 line-through mr-2">${originalPrice.toFixed(2)}</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">{discount}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Prices valid for a limited time</p>
        <Button className="w-full bg-teal-500 hover:bg-teal-600 mb-4">Buy Now</Button>
        <h3 className="font-bold text-lg mb-2">This Course Includes</h3>
        <ul className="space-y-2">
          {[
            "12 hours on-demand video",
            "Access on mobile and TV",
            "Certificate of completion",
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Training 6 or more people?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get your team access to 17,000+ top courses anytime, anywhere.
          </p>
          <Button variant="outline" className="w-full border-teal-500 text-teal-500 hover:bg-teal-50">
            Try Business
          </Button>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Share this course</h3>
          <div className="flex space-x-2">
            {[
              { color: "text-blue-600", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { color: "text-blue-400", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
              { color: "text-red-500", path: "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M6 14h12v4H6z" },
              { color: "text-blue-700", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" },
            ].map((icon, index) => (
              <Button key={index} variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={icon.color}
                >
                  <path d={icon.path}></path>
                </svg>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
