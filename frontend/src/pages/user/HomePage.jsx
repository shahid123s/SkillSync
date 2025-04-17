// pages/user/HomePage.jsx
import Banner from "../../components/user/Banner";
import CourseGrid from "../../components/user/course/CourseGrid";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Banner />
      <div className="py-12 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Courses</h2>
          <CourseGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}