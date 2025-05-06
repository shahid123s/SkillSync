// pages/admin/PendingReviewsPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PendingReviewsTable } from '../../components/admin/PendingReviewsTable';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function PendingReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      _id: "64a1b2c3d4e5f6g7h8i9001",
      studentId: {
        _id: "64a1b2c3d4e5f6g7h8i9101",
        name: "John Doe",
        email: "john@example.com"
      },
      taskId: {
        _id: "64a1b2c3d4e5f6g7h8i9201",
        title: "Week 1 - React Fundamentals",
        description: "Build a basic React component"
      },
      week: 1,
      reviewerName: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // ... (keep other dummy reviews)
  ]);

  const [reviewers, setReviewers] = useState([
    {
      _id: "rev1",
      name: "Dr. Smith",
      specialty: "React Expert",
      email: "smith@example.com",
      availability: ["Monday", "Wednesday", "Friday"]
    },
    {
      _id: "rev2",
      name: "Prof. Johnson",
      specialty: "State Management",
      email: "johnson@example.com",
      availability: ["Tuesday", "Thursday"]
    },
    {
      _id: "rev3",
      name: "Dr. Lee",
      specialty: "API Design",
      email: "lee@example.com",
      availability: ["Monday", "Wednesday", "Friday"]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from API:
        // const reviewsRes = await adminAxiosInstance.get('/reviews/pending');
        // const reviewersRes = await adminAxiosInstance.get('/reviewers');
        // setReviews(reviewsRes.data.data);
        // setReviewers(reviewersRes.data.data);
        toast.success('Data loaded successfully');
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignReviewer = async (reviewId, reviewerId, reviewDate) => {
    try {
      setProcessingId(reviewId);
      // In a real app:
      // const response = await adminAxiosInstance.put(`/reviews/${reviewId}/assign`, {
      //   reviewerId,
      //   reviewDate
      // });
      
      // For demo purposes, update locally
      const reviewer = reviewers.find(r => r._id === reviewerId);
      setReviews(prev => prev.map(review => 
        review._id === reviewId 
          ? { 
              ...review, 
              reviewerName: reviewer.name,
              reviewDate: reviewDate || review.reviewDate,
              status: "assigned"
            } 
          : review
      ));
      
      toast.success(`Assigned to ${reviewer.name}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Assignment failed');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Reviews</h1>
        <div className="text-sm text-gray-500">
          {reviews.length} reviews pending assignment
        </div>
      </div>
      <PendingReviewsTable 
        reviews={reviews}
        reviewers={reviewers}
        onAssign={handleAssignReviewer}
        processingId={processingId}
      />
    </div>
  );
}