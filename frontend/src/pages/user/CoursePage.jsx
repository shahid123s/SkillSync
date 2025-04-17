import CourseHero from "../../components/user/course/CourseHero";
import CourseRating from "../../components/user/course/CourseRating";
import CourseReviews from "../../components/user/course/CourseReview";
import SocialShare from "../../components/user/course/SocialShare";
import ClassroomBanner from "../../components/user/marketing/ClassroomBanner";
import Header from "../../components/user/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../services/fetchData";
export default function CoursePage() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(id);
        setCourseDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCourseDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!courseDetails) return <div>Course not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16">
        <Header />
      </div>

      <main className="flex-1">
        <CourseHero
          title={courseDetails.title}
          description={courseDetails.description}
          imageUrl={courseDetails.imageUrl}
          originalPrice={courseDetails.originalPrice}
          discountedPrice={courseDetails.discountedPrice}
          discountPercentage={courseDetails.discountPercentage}
          hoursLeft={courseDetails.hoursLeft}
          features={courseDetails.features}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseRating
                averageRating={4.2}
                ratingDistribution={{
                  5: 45,
                  4: 30,
                  3: 15,
                  2: 7,
                  1: 3
                }}
              />
              <CourseReviews
                reviews={[
                  {
                    id: 1,
                    name: "John Doe",
                    avatar: "/user1.jpg",
                    date: "2 weeks ago",
                    content: "Great course with excellent content!"
                  },
                  {
                    id: 2,
                    name: "Jane Smith",
                    date: "1 month ago", // Missing avatar will use fallback
                    content: "Very informative and well structured."
                  }
                ]}
              />
            </div>

            <div className="space-y-6">
              <SocialShare />
            </div>
          </div>
        </div>

        <ClassroomBanner />
      </main>

      {/* Space for footer */}
      <div className="h-16"></div>
    </div>
  );
}
