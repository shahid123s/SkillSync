// pages/admin/ManageUsers.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import UserTable from '../../components/admin/UserTable';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminAxiosInstance.get('/admin/users');
        if (response.data.success) {
          setUsers(response.data.data);
          toast.success('Users loaded successfully');
        } else {
          toast.error(response.data.message || 'Failed to fetch users');
        }
      } catch (error) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId, currentStatus) => {
    try {
      const response = await adminAxiosInstance.put(`/admin/users/${userId}/block`, {
        block: !currentStatus
      });
      if (response.data.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isBlocked: !currentStatus } : user
        ));
        toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'} successfully`);
      } else {
        toast.error(response.data.message || 'Failed to update user status');
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
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <UserTable 
        users={users} 
        onBlock={handleBlockUser} 
      />
    </div>
  );
}