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
        <CourseHero {...courseDetails} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseRating
                averageRating={courseDetails.averageRating}
                ratingDistribution={courseDetails.ratingDistribution}
              />
              <CourseReviews reviews={courseDetails.reviews || []} />
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