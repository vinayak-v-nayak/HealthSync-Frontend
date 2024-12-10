import React, { useState, useEffect } from 'react';
import './FitnessScore.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const baseUrl = "https://healthsync-backend.onrender.com";

const FitnessScore = () => {
  const [fitnessData, setFitnessData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    diabetes: '',
    bloodPressureProblems: '',
    anyTransplants: '',
    anyChronicDiseases: '',
    knownAllergies: '',
    historyOfCancerInFamily: '',
    numberOfMajorSurgeries: '',
    fitnessScore: '', // Add fitnessScore here
  });

  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token'); // Retrieve token from cookies
      if (!token) {
        console.error('No token found. Redirecting to login...');
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/api/fitness-data`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
          withCredentials: true, // Include cookies if needed
        });

        if (response.data) {
          setFitnessData(response.data); // Set fetched data
        }
      } catch (error) {
        console.error('Error fetching fitness data', error);
        if (error.response && error.response.status === 401) {
          // Handle token expiration or invalid token
          Cookies.remove('token'); // Clear token if invalid
          navigate('/login'); // Redirect to login
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleModify = () => {
    navigate('/userform'); // Redirect to the user form page to modify details
  };

  return (
    <div className="fitness-container">
      <div className="fitness-card">
        <h1 className="fitness-title">User Fitness Data</h1>

        <div className="fitness-data">
          <div className="data-item">
            <label>Age:</label>
            <span>{fitnessData.age}</span>
          </div>
          <div className="data-item">
            <label>Gender:</label>
            <span>{fitnessData.gender}</span>
          </div>
          <div className="data-item">
            <label>Height:</label>
            <span>{fitnessData.height} cm</span>
          </div>
          <div className="data-item">
            <label>Weight:</label>
            <span>{fitnessData.weight} kg</span>
          </div>
          <div className="data-item">
            <label>Diabetes:</label>
            <span>{fitnessData.diabetes ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>Blood Pressure Issues:</label>
            <span>{fitnessData.bloodPressureProblems ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>Any Transplants:</label>
            <span>{fitnessData.anyTransplants ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>Chronic Diseases:</label>
            <span>{fitnessData.anyChronicDiseases ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>Known Allergies:</label>
            <span>{fitnessData.knownAllergies ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>History of Cancer in Family:</label>
            <span>{fitnessData.historyOfCancerInFamily ? 'Yes' : 'No'}</span>
          </div>
          <div className="data-item">
            <label>Number of Major Surgeries:</label>
            <span>{fitnessData.numberOfMajorSurgeries}</span>
          </div>

          {/* Fitness Score Display */}
          <div className="fitness-score-container">
            <label>Fitness Score:</label>
            <h2 className="fitness-score">{fitnessData.fitnessScore}</h2>
          </div>

          <button onClick={handleModify} className="modify-button">
            Modify Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessScore;
