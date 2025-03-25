// pages/admin/ManageUsers.jsx
import { useState } from 'react';
import UserTable from '../../components/admin/UserTable';

export default function ManageUsers() {
  const [users] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', role: 'student' },
    { id: 2, name: 'User 2', email: 'user2@example.com', role: 'student' }
  ]);

  const handleDeleteUser = (id) => {
    console.log(`Delete user ${id}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <UserTable 
        users={users} 
        onDelete={handleDeleteUser} 
      />
    </>
  );
}