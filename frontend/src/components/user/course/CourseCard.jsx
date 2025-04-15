import React from "react";

export default function CourseCard({ title, image }) {
  return (
    <a href={`/courses/${title.toLowerCase()}`} className="block">
      <div className="relative overflow-hidden rounded-lg group h-[180px]">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} course`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-transparent bg-opacity-30 flex items-end p-4">
          <span className="text-white text-lg font-medium">{title}</span>
        </div>
      </div>
    </a>
  );
}
