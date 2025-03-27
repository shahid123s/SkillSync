import { useNavigate } from "react-router-dom";
import LandingPageHeader from "../../components/user/LandingPageHeader";

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <LandingPageHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-400 to-teal-100 px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-gray-900">Online is now much easier</h1>
          <p className="mt-4 text-lg text-gray-700">
            Manage your work, collaborate with your team, and stay productive.
          </p>
          <div className="mt-6 space-x-4">
            <button onClick={()=>navigate('/auth')} className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Get Started
            </button>
            {/* <button className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-100">
              Learn More
            </button> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["15K+ Students", "75% Time Saved", "35 Instructors", "16 Years of Experience"].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-gray-900">{stat.split(" ")[0]}</div>
              <div className="mt-2 text-sm text-gray-600">{stat.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl grid gap-16">
          {["A user interface designed for the classroom", "Assessments, Quizzes, Tests", "Class Management Tools for Education", "One-on-One Discussions"].map(
            (feature, index) => (
              <div key={index} className="rounded-lg shadow-lg p-6 bg-white grid md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{feature}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur advising edit.
                  </p>
                </div>
                <div className="aspect-video rounded-lg bg-gray-200" />
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
