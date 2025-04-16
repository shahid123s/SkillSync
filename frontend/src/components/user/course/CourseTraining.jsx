export default function CourseTraining({ groupFeatures }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4">Training 5 or more people</h3>
      <p className="text-sm text-gray-500 mb-4">
        Get your team access to top courses anytime, anywhere.
      </p>
      <ul className="text-sm space-y-2 mb-4">
        {groupFeatures?.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded">
        Contact Sales
      </button>
    </div>
  )
}