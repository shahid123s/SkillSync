export default function CourseHero() {
    const originalPrice = 99.99
    const discountedPrice = 49.65
    const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
  
    return (
      <div className="relative w-full">
        <div className="w-full h-[300px] md:h-[400px] relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0sWdtPw8W9NK61Kmn7EsqhBdbA7wXK.png"
            alt="Course hero image"
            className="w-full h-full object-cover brightness-90"
          />
        </div>
  
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 md:-mt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{/* Course image will be here */}</div>
  
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-baseline justify-between mb-4">
                <div className="text-2xl font-bold">${discountedPrice}</div>
                <div className="text-gray-500 line-through text-sm">${originalPrice}</div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  {discountPercentage}% Off
                </div>
              </div>
  
              <div className="text-xs text-gray-500 mb-4">5 hours left at this price</div>
  
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded mb-6">Buy Now</button>
  
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">This Course Included</h3>
  
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">25 hours on-demand video</span>
                  </div>
  
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Access on mobile and TV</span>
                  </div>
  
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Certificate of completion</span>
                  </div>
  
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }