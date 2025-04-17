// pages/user/MyCoursesPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";
import { fetchPurchasedCourses } from "../../services/fetchData";

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchPurchasedCourses();
        console.log(data, 'courseData in my course page')
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const calculateProgress = (course) => {
    // Handle cases where course hasn't started (currentWeek = 0)
    const currentWeek = course.currentWeek || 0;
    const totalWeeks = course.totalWeeks || 1;
    
    // Ensure we don't divide by zero and cap progress at 100%
    const progress = Math.min(
      100,
      Math.round((currentWeek / totalWeeks) * 100)
    );
    
    return {
      percentage: progress,
      currentWeek,
      totalWeeks,
      isCompleted: currentWeek >= totalWeeks
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-6 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600 mb-4"></div>
            <p>Loading your courses...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-6 px-4 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p className="mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Courses</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const progress = calculateProgress(course);
            
            return (
              <div key={course._id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
                <div className="h-40 bg-gray-200 relative">
                  <img 
                    src={course.courseId.imageUrl || '/placeholder.svg'} 
                    alt={course.courseId.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs ${
                    progress.isCompleted 
                      ? 'bg-green-600 text-white' 
                      : 'bg-teal-600 text-white'
                  }`}>
                    {progress.isCompleted 
                      ? 'Completed' 
                      : `Week ${progress.currentWeek} / ${progress.totalWeeks}`}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{course.courseId.name}</h3>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          progress.isCompleted ? 'bg-green-600' : 'bg-teal-600'
                        }`} 
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {progress.isCompleted
                        ? 'Course completed!'
                        : course.lastAccessed 
                          ? `Last accessed: ${course.lastAccessed}`
                          : 'Not started yet'}
                    </span>
                    <Link 
                      to={`/courses/${course.courseId._id}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      {progress.isCompleted ? 'View' : 'Continue'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
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