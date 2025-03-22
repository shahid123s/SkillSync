import Banner from "../../components/user/Banner";
import CourseGrid from "../../components/user/course/CourseGrid";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Banner />
      <CourseGrid />
      <Footer />
    </main>
  )
}

