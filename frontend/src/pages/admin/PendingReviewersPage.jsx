// pages/admin/PendingReviewers.jsx
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PendingReviewersTable from '../../components/admin/PendingReviewers';
import { axiosInstance } from '../../utils/axios';

export default function PendingReviewersPage() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pending reviewers
  useEffect(() => {
    const fetchPendingReviewers = async () => {
      try {
        const response = await axiosInstance.get('/admin/reviewers/pending');
        setReviewers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pending reviewers');
        setLoading(false);
      }
    };

    fetchPendingReviewers();
  }, []);

  // Handle approve/reject actions
  const handleReviewerAction = async (reviewerId, action) => {
    try {
      await axiosInstance.put(`/admin/reviewers/${reviewerId}/status`, {
        action: action
      });
      
      // Update local state
      setReviewers(prev => prev.filter(r => r.id !== reviewerId));
    } catch (err) {
      console.error('Error updating reviewer status:', err);
      alert('Failed to update reviewer status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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