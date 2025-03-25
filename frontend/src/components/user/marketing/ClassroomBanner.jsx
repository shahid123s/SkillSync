import { Link } from "react-router-dom";

export default function ClassroomBanner() {
  return (
    <div className="bg-teal-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white font-bold">
              T
            </div>
            <h2 className="text-2xl font-bold">
              Everything you can do in a physical classroom, <span className="text-teal-500">you can do with TOTC</span>
            </h2>
            <p className="text-gray-500">
              TOTC's school management software helps traditional and online schools manage scheduling, attendance,
              payments and virtual classrooms all in one secure cloud-based system.
            </p>
            <Link to="#" className="inline-block text-teal-500 hover:underline">
              Learn more
            </Link>
          </div>

          <div className="h-[300px]">
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Classroom"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}