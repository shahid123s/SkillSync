import { Link } from "react-router-dom";

export default function MarketingArticles() {
  const articles = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      image: "/placeholder.svg?height=150&width=250",
      author: "Lisa",
      price: 50,
      description: "Learn to design scalable, reliable, and cost-effective systems on AWS",
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      image: "/placeholder.svg?height=150&width=250",
      author: "Lisa",
      price: 55,
      description: "Learn to design scalable, reliable, and cost-effective systems on AWS",
    },
    {
      id: 3,
      title: "AWS Certified Solutions Architect",
      image: "/placeholder.svg?height=150&width=250",
      author: "Lisa",
      price: 60,
      description: "Learn to design scalable, reliable, and cost-effective systems on AWS",
    },
    {
      id: 4,
      title: "AWS Certified Solutions Architect",
      image: "/placeholder.svg?height=150&width=250",
      author: "Lisa",
      price: 65,
      description: "Learn to design scalable, reliable, and cost-effective systems on AWS",
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Marketing Articles</h2>
        <Link to="#" className="text-teal-500 text-sm hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-40">
              <img 
                src={article.image || "/placeholder.svg"} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-medium text-sm mb-1">{article.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{article.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg?height=24&width=24"
                    alt={article.author}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-xs">{article.author}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-500 line-through mr-1">$99</span>
                  <span className="text-sm font-medium">${article.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
