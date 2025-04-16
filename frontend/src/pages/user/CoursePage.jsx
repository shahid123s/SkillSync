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
  const [courseDetails, setCourseDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchCourseDetails(params.id)
        setCourseDetails(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    getCourseDetails()
  }, [params.id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>
  if (!courseDetails) return <div className="min-h-screen flex items-center justify-center">Course not found</div>

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16">
        <Header/>
      </div>

      <main className="flex-1">
        <CourseHero 
          title={courseDetails.title}
          description={courseDetails.description}
          image={courseDetails.image}
          originalPrice={courseDetails.originalPrice}
          discountedPrice={courseDetails.discountedPrice}
          features={courseDetails.features}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseRating 
                rating={courseDetails.rating}
                reviewsCount={courseDetails.reviewsCount}
                curriculum={courseDetails.curriculum}
                instructor={courseDetails.instructor}
                reviews={courseDetails.reviews}
              />
              <CourseReviews reviews={courseDetails.reviews} />
              <MarketingArticles relatedCourses={courseDetails.relatedCourses} />
            </div>

            <div className="space-y-6">
              <CourseFeatures features={courseDetails.features} />
              <CourseTraining groupFeatures={courseDetails.groupFeatures} />
              <SocialShare courseId={courseDetails.id} courseTitle={courseDetails.title} />
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