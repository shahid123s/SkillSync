// pages/user/CoursesPage.jsx
import React from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import CourseGrid from "../../components/user/course/CourseGrid";

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <CourseGrid />
      </div>
      <Footer />
    </main>
  );
}