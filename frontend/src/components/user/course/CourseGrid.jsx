import React from "react";
import CourseCard from "./CourseCard";

const courses = [
  { id: 1, title: "UI/UX", image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "React", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "PHP", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "JavaScript", image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "UI/UX", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "React", image: "/placeholder.svg?height=200&width=300" },
  { id: 7, title: "PHP", image: "/placeholder.svg?height=200&width=300" },
  { id: 8, title: "JavaScript", image: "/placeholder.svg?height=200&width=300" },
  { id: 9, title: "UI/UX", image: "/placeholder.svg?height=200&width=300" },
  { id: 10, title: "React", image: "/placeholder.svg?height=200&width=300" },
  { id: 11, title: "PHP", image: "/placeholder.svg?height=200&width=300" },
  { id: 12, title: "JavaScript", image: "/placeholder.svg?height=200&width=300" },
];

export default function CourseGrid() {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8">Courses list</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} title={course.title} image={course.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
