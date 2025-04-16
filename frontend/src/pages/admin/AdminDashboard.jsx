// pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';
<<<<<<< HEAD
=======

>>>>>>> d683b24071c1e03de0424c7b2a1c46684f511ac8

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAxiosInstance.get('/admin/stats');
        if (response.data.success) {
          setStats(response.data.data);
          toast.success('Dashboard data loaded');
        } else {
          toast.error(response.data.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl mt-2">{stats?.users || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold">Total Courses</h3>
          <p className="text-3xl mt-2">{stats?.courses || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold">Active Reviewers</h3>
          <p className="text-3xl mt-2">{stats?.reviewers || 0}</p>
        </div>
      </div>
    </>
  );
}