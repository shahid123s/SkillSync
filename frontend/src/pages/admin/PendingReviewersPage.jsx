// pages/admin/PendingReviewersPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import PendingReviewersTable from '../../components/admin/PendingReviewers';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function PendingReviewersPage() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // Track processing state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminAxiosInstance.get('/get-all-pending-reviewers');
        if (response.data.success) {
          setReviewers(response.data.data);
          toast.success('Pending reviewers loaded');
        } else {
          toast.error(response.data.message || 'Failed to fetch pending reviewers');
        }
      } catch (error) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReviewerAction = async (id, action) => {
    try {
      setProcessingId(id); // Set processing state
      const response = await adminAxiosInstance.put(`/reviewer/toggle-status`, { action, reviewerId: id });
      if (response.data.success) {
        toast.success(`Reviewer ${action}d successfully`);
        setReviewers(prev => prev.filter(r => r._id !== id));
      } else {
        toast.error(response.data.message || `Failed to ${action} reviewer`);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Reviewers</h1>
      </div>
      <PendingReviewersTable 
        reviewers={reviewers}
        onAction={handleReviewerAction}
        processingId={processingId}
      />
    </div>
  );
}