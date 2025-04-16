import { Link } from "react-router-dom";

export default function MarketingArticles({ relatedCourses }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Related Courses</h2>
        <Link to="#" className="text-teal-500 text-sm hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedCourses?.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-40">
              <img 
                src={course.image || "/placeholder.svg"} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-medium text-sm mb-1">{course.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{course.shortDescription}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructorAvatar || "/placeholder.svg"}
                    alt={course.instructor}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-xs">{course.instructor}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-500 line-through mr-1">${course.originalPrice}</span>
                  <span className="text-sm font-medium">${course.discountedPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}