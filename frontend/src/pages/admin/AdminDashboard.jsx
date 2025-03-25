import { useState } from "react";
import PendingReviewers from "../../components/admin/PendingReviewers";
import UserTable from "../../components/admin/UserTable";

// pages/admin/AdminDashboard.jsx
export default function AdminDashboard() {
    // Sample data - replace with real data
    const [pendingReviewers] = useState([
      { id: 1, name: 'Reviewer 1', email: 'reviewer1@example.com', status: 'pending' },
      { id: 2, name: 'Reviewer 2', email: 'reviewer2@example.com', status: 'pending' }
    ]);
  
    const [users] = useState([
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'student' },
      { id: 2, name: 'User 2', email: 'user2@example.com', role: 'student' }
    ]);
  
    const handleReviewerAction = (id, action) => {
      console.log(`Reviewer ${id} ${action}`);
    };
  
    const handleDeleteUser = (id) => {
      console.log(`Delete user ${id}`);
    };
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Pending Reviewers</h2>
            <PendingReviewers
              reviewers={pendingReviewers} 
              onAction={handleReviewerAction} 
            />
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <UserTable users={users} onDelete={handleDeleteUser} />
          </div>
        </div>
      </>
    );
  }