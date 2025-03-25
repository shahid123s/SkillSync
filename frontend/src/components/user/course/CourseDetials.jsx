import { useState } from "react";

export default function CourseDetails({ courseData }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-4 mb-6 border-b">
        {[
          { key: "overview", label: "Overview" },
          { key: "curriculum", label: "Curriculum" },
          { key: "instructor", label: "Instructor" },
          { key: "reviews", label: "Reviews" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`p-2 text-center font-medium rounded-md transition-colors ${
              activeTab === tab.key ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < courseData.rating ? "text-yellow-400" : "text-gray-300"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {courseData.rating} out of {courseData.totalReviews}
            </span>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && <p>Course curriculum content would go here.</p>}

      {activeTab === "instructor" && (
        <div className="flex items-start space-x-4">
          <img
            src={courseData.instructor.image || "/placeholder.svg"}
            alt={courseData.instructor.name}
            className="rounded-full w-15 h-15"
          />
          <div>
            <h3 className="font-medium">{courseData.instructor.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{courseData.instructor.bio}</p>
          </div>
        </div>
      )}

      {activeTab === "reviews" && <p>Course reviews would go here.</p>}
    </div>
  );
}