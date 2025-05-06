// pages/admin/PendingReviewsPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {PendingReviewsTable} from '../../components/admin/PendingReviewsTable';
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
      reviewerName: "Dr. Smith",
      feedback: "",
      meetLink: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "64a1b2c3d4e5f6g7h8i9002",
      studentId: {
        _id: "64a1b2c3d4e5f6g7h8i9102",
        name: "Jane Smith",
        email: "jane@example.com"
      },
      taskId: {
        _id: "64a1b2c3d4e5f6g7h8i9202",
        title: "Week 2 - State Management",
        description: "Implement Redux store"
      },
      week: 2,
      reviewerName: "Prof. Johnson",
      feedback: "",
      meetLink: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "64a1b2c3d4e5f6g7h8i9003",
      studentId: {
        _id: "64a1b2c3d4e5f6g7h8i9103",
        name: "Alex Wong",
        email: "alex@example.com"
      },
      taskId: {
        _id: "64a1b2c3d4e5f6g7h8i9203",
        title: "Week 3 - API Integration",
        description: "Connect React with REST API"
      },
      week: 3,
      reviewerName: "Dr. Lee",
      feedback: "",
      meetLink: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "64a1b2c3d4e5f6g7h8i9004",
      studentId: {
        _id: "64a1b2c3d4e5f6g7h8i9104",
        name: "Maria Garcia",
        email: "maria@example.com"
      },
      taskId: {
        _id: "64a1b2c3d4e5f6g7h8i9204",
        title: "Week 4 - Authentication",
        description: "Implement JWT auth flow"
      },
      week: 4,
      reviewerName: "Prof. Chen",
      feedback: "",
      meetLink: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "64a1b2c3d4e5f6g7h8i9005",
      studentId: {
        _id: "64a1b2c3d4e5f6g7h8i9105",
        name: "David Kim",
        email: "david@example.com"
      },
      taskId: {
        _id: "64a1b2c3d4e5f6g7h8i9205",
        title: "Week 5 - Final Project",
        description: "Complete capstone project"
      },
      week: 5,
      reviewerName: "Dr. Patel",
      feedback: "",
      meetLink: "",
      status: "pending",
      reviewDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [reviewers, setReviewers] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pending reviews
        const reviewsResponse = await adminAxiosInstance.get('/reviews/pending');
        // Fetch available reviewers
        const reviewersResponse = await adminAxiosInstance.get('/reviewers');
        
        if (reviewsResponse.data.success) {
          setReviews(reviewsResponse.data.data);
        }
        
        if (reviewersResponse.data.success) {
          setReviewers(reviewersResponse.data.data);
        }

        toast.success('Data loaded successfully');
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignReviewer = async (reviewId, reviewerId) => {
    try {
      setProcessingId(reviewId);
      const response = await adminAxiosInstance.put(`/reviews/${reviewId}/assign`, {
        reviewerId
      });
      
      if (response.data.success) {
        toast.success('Reviewer assigned successfully');
        setReviews(prev => prev.filter(r => r._id !== reviewId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Assignment failed');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReviewAction = async (id, action, feedback = '', meetLink = '') => {
    try {
      setProcessingId(id);
      const response = await adminAxiosInstance.put(`/reviews/${id}/status`, {
        action,
        feedback,
        meetLink
      });
      
      if (response.data.success) {
        toast.success(`Review ${action} successfully`);
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setProcessingId(null);
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
        <h1 className="text-2xl font-bold">Pending Reviews</h1>
      </div>
      <PendingReviewsTable 
        reviews={reviews}
        onAction={handleReviewAction}
        processingId={processingId}
      />
    </div>
  );
}