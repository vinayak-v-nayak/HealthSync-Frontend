import React, { useEffect, useState } from 'react';
import './AdminFeedbacks.css'; // Import CSS for styling
const baseUrl = 'https://healthsync-backend.onrender.com'; // Base URL for API requests

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/feedbacks`);
        const data = await response.json();

        if (response.ok) {
          setFeedbacks(data);
        } else {
          setError('Failed to fetch feedbacks');
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError('Something went wrong.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedbacks-container">
      <h1 className="feedbacks-title">User Feedbacks</h1>

      {error && <p className="error-message">{error}</p>}

      <table className="feedbacks-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.userId.name} ({feedback.userId.email})</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}</td>
              <td>{new Date(feedback.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbacks;
