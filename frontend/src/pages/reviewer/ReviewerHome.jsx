// pages/reviewer/ReviewerHome.jsx
import { useEffect, useState } from 'react';
import ReviewerSidebar from '../../components/reviewer/ReviewerSidebar';
import { fetchReviewerStatus } from '../../services/fetchData';

const MeetingModal = ({ isOpen, onClose, meetingLink, setMeetingLink, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Meeting Details</h3>
                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="Enter Google Meet Link"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReviewerHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [meetingLink, setMeetingLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive , setIsActive] = useState(true);
  const [reviews, setReviews] = useState([
    { id: 1, student: 'John Doe', stack: 'MERN', date: '2024-03-20', status: 'pending' },
    { id: 2, student: 'Jane Smith', stack: 'Java', date: '2024-03-21', status: 'pending' },
    { id: 3, student: 'Bob Wilson', stack: 'Python', date: '2024-03-22', status: 'accepted' },
  ]);

  const [todaysReviews, setTodaysReviews] = useState([
    { id: 4, student: 'Alice Johnson', stack: 'React', date: new Date().toISOString().split('T')[0], time: '15:00', status: 'scheduled' }
  ]);

  useEffect(() => {
    const checkReviewerStatus = async () => {
      const result =  await fetchReviewerStatus();
      console.log(result)
      if(!result.isBlocked) setIsActive(false);
    }
  checkReviewerStatus()
  },[])

  const handleReviewAction = (id, action) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: action } : review
    ));
  };

  const handleSubmitLink = (id) => {
    setTodaysReviews(todaysReviews.map(review =>
      review.id === id ? { ...review, status: 'completed', meetingLink } : review
    ));
    setMeetingLink('');
    setIsModalOpen(false);
  };

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

          {isActive ? <>
            <h1 className="text-2xl font-bold mb-6">Assigned Reviews</h1>
          
          {/* Pending Reviews Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stack</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map(review => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.stack}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleReviewAction(review.id, 'accepted')}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleReviewAction(review.id, 'declined')}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className={`capitalize ${review.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                            {review.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Reviews */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todaysReviews.map(review => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{review.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.status === 'scheduled' && (
                          <button
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                            onClick={() => setIsModalOpen(true)}
                          >
                            Meet Link
                          </button>
                        )}
                        {review.status === 'completed' && (
                          <span className="text-green-600">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <MeetingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            meetingLink={meetingLink}
            setMeetingLink={setMeetingLink}
            onSubmit={() => handleSubmitLink(4)}
          />
          </> : "Your Profile is Reviwing By the Admin "}
        </div>
      </div>
    </div>
  );
}