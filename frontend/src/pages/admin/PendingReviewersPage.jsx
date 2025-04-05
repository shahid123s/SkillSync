// pages/admin/PendingReviewersPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminInstance } from '../../utils/axios';
import PendingReviewersTable from '../../components/admin/PendingReviewers';

export default function PendingReviewersPage() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminInstance.get('/admin/reviewers/pending');
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
      const response = await adminInstance.put(`/admin/reviewers/${id}/status`, { action });
      if (response.data.success) {
        toast.success(`Reviewer ${action}d successfully`);
        setReviewers(prev => prev.filter(r => r.id !== id));
      } else {
        toast.error(response.data.message || `Failed to ${action} reviewer`);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Reviewers</h1>
      </div>
      <PendingReviewersTable 
        reviewers={reviewers}
        onAction={handleReviewerAction}
      />
    </div>
  );
}