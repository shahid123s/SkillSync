// pages/user/MyCoursesPage.jsx
import React from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";

const MyCoursesPage = () => {
  // Mock data for purchased courses
  const purchasedCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "John Doe",
      thumbnail: "/placeholder.svg",
      currentWeek: 3,
      totalWeeks: 8,
      progress: 65,
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "Node.js Backend Mastery",
      instructor: "Jane Smith",
      thumbnail: "/placeholder.svg",
      currentWeek: 5,
      totalWeeks: 10,
      progress: 42,
      lastAccessed: "1 week ago"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Johnson",
      thumbnail: "/placeholder.svg",
      currentWeek: 1,
      totalWeeks: 6,
      progress: 15,
      lastAccessed: "Yesterday"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-teal-600 text-white px-2 py-1 rounded-md text-xs">
                  Week {course.currentWeek}/{course.totalWeeks}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3">By {course.instructor}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</span>
                  <Link 
                    to={`/courses/${course.id}`}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {purchasedCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No courses purchased yet</h3>
            <p className="text-gray-500 mb-4">Browse our courses to get started</p>
            <Link 
              to="/courses"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md"
            >
              Explore Courses
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyCoursesPage;