export default function CourseReviews() {
    const reviews = [
      {
        id: 1,
        name: "Lisa",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "3 weeks",
        content: "Chris launched less than a year ago by Blackboard co-founder Michael Chasen. Integrated exclusively...",
      },
      {
        id: 2,
        name: "Lisa",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "3 weeks",
        content: "Chris launched less than a year ago by Blackboard co-founder Michael Chasen. Integrated exclusively...",
      },
    ]
  
    return (
      <div className="space-y-4 mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">{review.name}</span>
              </div>
              <div className="text-xs text-gray-500">{review.date}</div>
            </div>
            <p className="text-sm">{review.content}</p>
          </div>
        ))}
      </div>
    )
  }