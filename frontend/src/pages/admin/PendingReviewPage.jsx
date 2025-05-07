// pages/admin/PendingReviewsPage.jsx
import { useEffect, useState } from 'react';
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
      reviewDate: new Date("2024-03-20"), // Date without specific time
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
      reviewerName: "",
      status: "pending",
      reviewDate: new Date("2024-03-21"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [reviewers, setReviewers] = useState([
    {
      _id: "rev1",
      name: "Dr. Smith",
      specialty: "React Expert",
      email: "smith@example.com"
    },
    {
      _id: "rev2",
      name: "Prof. Johnson",
      specialty: "State Management",
      email: "johnson@example.com"
    }
  ]);

  useEffect(() => {
    const fetchPendingReviews = async () => {
            const result = await adminAxiosInstance.get('/pending-reviews')
            setReviews(result.data.data) 
    }

    const fetchReviewrs = async () => {
        const response = await adminAxiosInstance.get('/get-all-reviewers');
        setReviewers(response.data.data)
    }
    fetchPendingReviews()
    fetchReviewrs()

    // return () => clearInterval(interval);
  }, []);





  const handleAssignReviewer =  async(reviewId, reviewerId ,reviewerName, time) => {
    const result = await adminAxiosInstance.put('/assign-reviewer', {reviewId,reviewerId ,reviewerName, time})

    toast.success(`Assigned to ${reviewer.name} at ${time}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Reviews</h1>
        <div className="text-sm text-gray-500">
          {reviews.filter(r => r.status === "pending").length} pending assignments
        </div>
      </div>
      <PendingReviewsTable 
        reviews={reviews}
        reviewers={reviewers}
        onAssign={handleAssignReviewer}
      />
    </div>
  );
}