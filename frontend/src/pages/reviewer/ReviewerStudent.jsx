// pages/reviewer/ReviewerStudents.jsx
import { Link } from 'react-router-dom';
import ReviewerSidebar from '../../components/reviewer/ReviewerSidebar';
import { useEffect, useState } from 'react';
import { reviewerAxiosInstance } from '../../utils/reviewerAxiosInstance';

export default function ReviewerStudents() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', weekno: 5, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', weekno: 3, email: 'jane@example.com' },
    { id: 3, name: 'Bob Wilson', weekno: 7, email: 'bob@example.com' },
    { id: 4, name: 'Alice Johnson', weekno: 2, email: 'alice@example.com' },
  ]);

   useEffect(() => {
    const fetchStudent = async () => {
      const result = reviewerAxiosInstance.get('/students');
    }
    fetchStudent();
   }, [])

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

          <h1 className="text-2xl font-bold mb-6">Student List</h1>
          
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Week {student.weekno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        to={`/reviewer/students/${student.id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}