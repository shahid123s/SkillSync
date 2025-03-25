"use client"

import { useState } from "react"

export default function CourseRating() {
  const [activeTab, setActiveTab] = useState("overview")

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
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-gray-500">out of 5</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs w-8">5 Stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs w-8">4 Stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs w-8">3 Stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs w-8">2 Stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs w-8">1 Star</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">Top Rating</div>
        </div>
      )}

      {activeTab === "curriculum" && <p>Course curriculum content will go here.</p>}

      {activeTab === "instructor" && <p>Instructor information will go here.</p>}

      {activeTab === "reviews" && <p>All reviews will go here.</p>}
    </div>
  )
}

