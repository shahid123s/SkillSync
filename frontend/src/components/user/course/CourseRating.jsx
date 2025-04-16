import { useState } from "react"

export default function CourseRating({ 
  rating, 
  reviewsCount, 
  curriculum, 
  instructor, 
  reviews 
}) {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate star distribution
  const starDistribution = [
    { stars: 5, percentage: rating?.fiveStarPercentage || 0 },
    { stars: 4, percentage: rating?.fourStarPercentage || 0 },
    { stars: 3, percentage: rating?.threeStarPercentage || 0 },
    { stars: 2, percentage: rating?.twoStarPercentage || 0 },
    { stars: 1, percentage: rating?.oneStarPercentage || 0 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-4 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === "overview" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === "curriculum" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("curriculum")}
        >
          Curriculum
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === "instructor" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("instructor")}
        >
          Instructor
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === "reviews" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{rating?.average || 0}</div>
              <div className="text-sm text-gray-500">out of 5</div>
            </div>

            <div className="flex-1">
              {starDistribution.map((star) => (
                <div key={star.stars} className="flex items-center gap-2 mb-1">
                  <div className="text-xs w-8">{star.stars} Stars</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-500 h-full rounded-full" 
                      style={{ width: `${star.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Based on {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <div>
          <h3 className="font-semibold mb-4">Course Curriculum</h3>
          {curriculum?.sections?.map((section, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-medium mb-2">{section.title}</h4>
              <ul className="space-y-2">
                {section.lessons.map((lesson, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50">
                    <span>{lesson.title}</span>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "instructor" && (
        <div className="flex items-start gap-4">
          <img 
            src={instructor?.avatar} 
            alt={instructor?.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{instructor?.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{instructor?.title}</p>
            <p className="text-sm">{instructor?.bio}</p>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          {reviews?.map((review, index) => (
            <div key={index} className="border-b border-gray-100 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{review.name}</span>
                </div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}