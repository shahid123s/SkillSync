// pages/admin/AllReviewers.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function AllReviewers() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // Track processing state per reviewer

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await adminAxiosInstance.get('/get-all-reviewers');
        if (response.data.success) {
          setReviewers(response.data.data);
          toast.success('Reviewers loaded successfully');
        } else {
          toast.error(response.data.message || 'Failed to fetch reviewers');
        }
      } catch (error) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchReviewers();
  }, []);

  const handleBlock = async (reviewerId, isBlocked) => {
    try {
      setProcessingId(reviewerId); // Set processing state for this reviewer
      const response = await adminAxiosInstance.put(`/reviewer/toggle-block`, {
        block: !isBlocked,
        reviewerId
      });
      if (response.data.success) {
        setReviewers(prev => prev.map(r =>
          r._id === reviewerId ? { ...r, isBlocked: !isBlocked } : r
        ));
        toast.success(`Reviewer ${!isBlocked ? 'blocked' : 'unblocked'} successfully`);
      } else {
        toast.error(response.data.message || 'Failed to update reviewer status');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setProcessingId(null); // Reset processing state
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Reviewers</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviewers.length !== 0 ? reviewers.map(reviewer => (
              <tr key={reviewer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${reviewer.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {reviewer.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleBlock(reviewer._id, reviewer.isBlocked)}
                    disabled={processingId === reviewer._id}
                    className={`px-3 py-1 rounded-md text-sm disabled:opacity-50 disabled:cursor-wait ${reviewer.isBlocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {processingId === reviewer._id ? (
                      <span className="flex items-center gap-1">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : reviewer.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            )) : <tr><td colSpan={5} className="text-center p-5">No pending reviewers</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}