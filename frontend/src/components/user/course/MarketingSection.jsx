import Image from "next/image"
import Link from "next/link"

// Custom button component
function Button({ children, className, variant }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors"
  const variantClasses =
    variant === "outline"
      ? "border border-teal-500 text-teal-500 hover:bg-teal-50"
      : "bg-teal-500 hover:bg-teal-600 text-white"

  return <button className={`${baseClasses} ${variantClasses} ${className || ""}`}>{children}</button>
}

export default function MarketingSection({ articles }) {
  return (
    <div>
      {/* Marketing Articles Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Marketing Articles</h2>
          <Link href="#" className="text-teal-500 text-sm font-medium hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={article.instructor.image || "/placeholder.svg"}
                      alt={article.instructor.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-gray-600">{article.instructor.name}</span>
                  </div>
                  <span className="font-bold text-teal-500">${article.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-teal-50 rounded-lg p-6">
            <div className="inline-block bg-teal-500 text-white rounded-full px-4 py-1 text-sm font-medium mb-4">
              Anything you can do in a physical classroom, you can do with TOTC
            </div>
            <p className="text-gray-700 mb-6">
              TOTC's school management software helps traditional and online schools manage scheduling, attendance,
              payments and virtual classrooms all in one secure cloud-based system.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600">Learn More</Button>
          </div>
          <div className="relative h-80">
            <Image
              src="/placeholder.svg?height=320&width=500"
              alt="Classroom comparison"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

