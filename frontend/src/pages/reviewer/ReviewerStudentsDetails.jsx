// pages/reviewer/ReviewerStudentDetails.jsx
import { Link, useParams } from 'react-router-dom';
import ReviewerSidebar from '../../components/reviewer/ReviewerSidebar';
import { useState } from 'react';

export default function ReviewerStudentDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
  
  // Sample data - Replace with actual API call
  const [students] = useState([
    { 
      id: 1, 
      name: 'John Doe',
      email: 'john@example.com',
      weekno: 5,
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      project: {
        name: 'E-commerce Platform',
        description: 'A full-stack e-commerce application with payment integration',
        techStack: ['MERN Stack', 'Redux', 'Stripe API'],
        status: 'In Progress'
      }
    },
    // Add other students similarly...
  ]);

  const student = students.find(s => s.id === Number(id));

  if (!student) return <div>Student not found</div>;

  return (
    <div className="min-h-screen flex">
      <ReviewerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
        <div className="p-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden mb-4 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ☰
          </button>

          <Link
            to="/reviewer/students"
            className="mb-4 inline-block text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Students
          </Link>

          <h1 className="text-2xl font-bold mb-6">{student.name}'s Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Information */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <img 
                src={student.photo} 
                alt={student.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center mb-2">{student.name}</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-900">{student.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Current Week</label>
                  <p className="text-gray-900">Week {student.weekno}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Skills</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Project Name</label>
                  <p className="text-gray-900 font-medium">{student.project.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  <p className="text-gray-900">{student.project.description}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Project Status</label>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    student.project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}