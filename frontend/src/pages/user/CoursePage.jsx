import CourseHero from "../../components/user/course/CourseHero"
import CourseRating from "../../components/user/course/CourseRating"
import CourseReviews from "../../components/user/course/CourseReview"
import CourseFeatures from "../../components/user/course/CourseFeatures"
import CourseTraining from "../../components/user/course/CourseTraining"
import SocialShare from "../../components/user/course/SocialShare"
import MarketingArticles from "../../components/user/marketing/MarketingArticles"
import ClassroomBanner from "../../components/user/marketing/ClassroomBanner"
import Header from "../../components/user/Header"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../../services/fetchDatas"

export default function CoursePage() {
  const params = useParams();
  const [courseDetails, setCourseDetails] = useState([])

  useEffect(() => {
  setCourseDetails(fetchCourseDetails(params.id));
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16">
      <Header/>
        
      </div>

      <main className="flex-1">
        <CourseHero />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseRating />
              <CourseReviews />
              <MarketingArticles />
            </div>

            <div className="space-y-6">
              <CourseFeatures />
              <CourseTraining />
              <SocialShare />
            </div>
          </div>
        </div>

        <ClassroomBanner />
      </main>

      {/* Space for footer */}
      <div className="h-16"></div>
    </div>
  )
}

