import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { axiosInstance } from "../../../utils/axios";

export default function CourseGrid() {

  const [courses, setCourses] = useState([])


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/get-all-courses");
        console.log(response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [])



  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">Courses list</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.length !==0 ? courses.map((course) => (
            <CourseCard key={course._id} title={course.name} image={course.imageUrl} />
          )): 
          <p>No Course Found</p>
          }
        </div>
      </div>
    </section>
  );
}
