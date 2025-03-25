import React from "react";

export default function CourseReviews({ reviews }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">Student Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <img
                src={review.user.image || "/placeholder.svg"}
                alt={review.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{review.user.name}</h3>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
