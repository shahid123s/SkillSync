// pages/admin/AllReviewers.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function AllReviewers() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await adminAxiosInstance.put(`/admin/reviewers/${reviewerId}/block`, {
        block: !isBlocked
      });
      if (response.data.success) {
        setReviewers(prev => prev.map(r => 
          r.id === reviewerId ? { ...r, isBlocked: !isBlocked } : r
        ));
        toast.success(`Reviewer ${!isBlocked ? 'blocked' : 'unblocked'} successfully`);
      } else {
        toast.error(response.data.message || 'Failed to update reviewer status');
      }
    } catch (error) {
      toast.error('Network error');
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
            {reviewers.map(reviewer => (
              <tr key={reviewer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reviewer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    reviewer.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {reviewer.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleBlock(reviewer.id, reviewer.isBlocked)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      reviewer.isBlocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reviewer.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}