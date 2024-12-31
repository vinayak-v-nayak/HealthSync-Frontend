import React, { useEffect, useState } from 'react';
import './AdminUserDetails.css'; // Import CSS for styling
const baseUrl = 'https://healthsync-backend.onrender.com';// Base URL for API requests


const AdminUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/users`);
        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          setError('Failed to fetch user details');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Something went wrong.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-details-container">
      <h1 className="user-details-title">User Details</h1>

      {error && <p className="error-message">{error}</p>}

      <table className="user-details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserDetails;
