// components/admin/PendingReviewsTable.jsx
import { User, Calendar, Book, Check, Clock } from 'lucide-react';
import { useState } from 'react';

export const PendingReviewsTable = ({ reviews, reviewers, onAssign }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleAssign = () => {
    if (!selectedReviewer || !selectedTime) {
      alert('Please select both reviewer and time');
      return;
    }
    onAssign(selectedReview._id, selectedReviewer, selectedTime);
    setSelectedReview(null);
    setSelectedReviewer('');
    setSelectedTime('');
  };

  const formatDateTime = (date) => {
    if (!date) return "Not assigned";
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((review) => (
            <tr key={review._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-medium">{review.studentId.name}</p>
                    <p className="text-sm text-gray-500">{review.studentId.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-medium">{review.taskId.title}</p>
                    <p className="text-sm text-gray-500">Week {review.week}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={review.reviewerName ? "" : "text-gray-400"}>
                    {review.reviewerName 
                      ? formatDateTime(review.reviewDate)
                      : `${review.reviewDate.toLocaleDateString()} (Time not set)`}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  review.status === 'assigned' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {review.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {review.status === 'pending' && (
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="text-teal-600 hover:text-teal-900 flex items-center"
                  >
                    <Check className="h-5 w-5 mr-1" />
                    Assign
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Reviewer Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Assign Time Slot</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Review Date:</p>
                <p className="text-gray-600">
                  {selectedReview.reviewDate.toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Reviewer
                </label>
                <select
                  value={selectedReviewer}
                  onChange={(e) => setSelectedReviewer(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select reviewer</option>
                  {reviewers.map((reviewer) => (
                    <option key={reviewer._id} value={reviewer._id}>
                      {reviewer.name} ({reviewer.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select time</option>
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedReview(null);
                    setSelectedReviewer('');
                    setSelectedTime('');
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  disabled={!selectedReviewer || !selectedTime}
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};