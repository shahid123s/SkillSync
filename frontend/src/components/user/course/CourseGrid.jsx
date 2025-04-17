// components/user/course/CourseGrid.jsx
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { userAxiosInstance } from "../../../utils/userAxiosInstance";

export default function CourseGrid() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await userAxiosInstance.get("/course/get-all-courses");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50 flex-1">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.length !== 0 ? (
            courses.map((course) => (
              <CourseCard 
                key={course._id} 
                title={course.name} 
                image={course.imageUrl} 
                courseId={course._id} 
                instructor={course.instructor?.name || "Unknown Instructor"}
                price={course.price || "Free"}
                rating={course.averageRating || 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No courses found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}