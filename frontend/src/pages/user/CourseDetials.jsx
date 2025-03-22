import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import CourseHero from "../components/course/CourseHero";
import CourseDetails from "../components/course/CourseDetails";
import CourseReviews from "../components/course/CourseReviews";
import MarketingArticles from "../components/marketing/MarketingArticles";
import ComparisonSection from "../components/marketing/ComparisonSection";

export default function CoursePage() {
  const courseData = {
    title: "This Course Included",
    price: 49.65,
    originalPrice: 99.99,
    discount: "50% OFF",
    rating: 4,
    totalReviews: 5,
    features: ["12 hours on-demand video", "Access on mobile and TV", "Certificate of completion"],
    instructor: {
      name: "Lisa",
      image: "/placeholder.svg?height=40&width=40",
      bio: "Create beautiful websites faster than ever by downloading our course templates and using them for your own projects.",
    },
    reviews: [
      {
        id: 1,
        user: {
          name: "Lisa",
          image: "/placeholder.svg?height=40&width=40",
        },
        content: "Create beautiful websites faster than ever by downloading our course templates and using them for your own projects.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        user: {
          name: "Tim",
          image: "/placeholder.svg?height=40&width=40",
        },
        content: "This course was great! It was so easy to download and use the templates for my own projects.",
        date: "3 weeks ago",
      },
    ],
  };

  const marketingArticles = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: "/placeholder.svg?height=150&width=250",
      instructor: {
        name: "Lisa",
        image: "/placeholder.svg?height=30&width=30",
      },
      price: 99,
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: "/placeholder.svg?height=150&width=250",
      instructor: {
        name: "Lisa",
        image: "/placeholder.svg?height=30&width=30",
      },
      price: 99,
    },
    {
      id: 3,
      title: "AWS Certified Solutions Architect",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: "/placeholder.svg?height=150&width=250",
      instructor: {
        name: "Lisa",
        image: "/placeholder.svg?height=30&width=30",
      },
      price: 99,
    },
    {
      id: 4,
      title: "AWS Certified Solutions Architect",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: "/placeholder.svg?height=150&width=250",
      instructor: {
        name: "Lisa",
        image: "/placeholder.svg?height=30&width=30",
      },
      price: 99,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CourseHero
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rIqIo2KRIKKZgrImLSQOnyeOntDyJb.png"
          price={courseData.price}
          originalPrice={courseData.originalPrice}
          discount={courseData.discount}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseDetails courseData={courseData} />
              <CourseReviews reviews={courseData.reviews} />
            </div>
            <div className="lg:col-span-1">{/* Sidebar content */}</div>
          </div>
          <MarketingArticles articles={marketingArticles} />
          <ComparisonSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
