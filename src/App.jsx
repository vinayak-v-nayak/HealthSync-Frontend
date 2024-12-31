import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InsuranceServices from './components/Policies/InsuranceServices/InsuranceServices';
import HealthSync from './HealthSync';
import Blog from './components/Blog/Blog';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FitnessScore from './components/Fitness Score/FitnessScore';
import Auth from './components/Sign In/login';
import Profile from './components/Profile/profile';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component
import UserForm from './components/UserDetails/UserForm';
import UserFeedback from './components/Feedback/UserFeedback';
import AdminLogin from './components/Admin/Admin-login/AdminLogin';
import AdminUserDetails from './components/Admin/User-details/AdminUserDetails';
import AdminFeedbacks from './components/Admin/User-feedback/AdminFeedbacks';
import AdminPrivateRoute from './AdminPrivateRoute';
import AdminNavBar from './components/Admin/Admin-Nav/AdminNav';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/users" element={<AdminPrivateRoute><AdminNavBar /><AdminUserDetails /></AdminPrivateRoute>} />
      <Route path="/admin/feedbacks" element={<AdminPrivateRoute><AdminNavBar /><AdminFeedbacks /></AdminPrivateRoute>} />


      </Routes>
      <Routes>
        {/* Public Routes */}
        <Route path="/blog" element={<PrivateRoute><Header /><Blog /><Footer /></PrivateRoute>} />
        <Route path="/fitness" element={<PrivateRoute><Header /><FitnessScore /><Footer /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><Header /><InsuranceServices /><Footer /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Header /><UserFeedback /><Footer /></PrivateRoute>} />
        <Route path="/login" element={<><Header /><Auth /><Footer /></>} />
        
        {/* Private Route - Protected */}
        <Route path="/" element={ <><Header /><HealthSync /><Footer /></>} />
        <Route path="/profile" element={<PrivateRoute><Header /><Profile /><Footer /></PrivateRoute>} />
        
        {/* Other Routes */}
        <Route path="/userform" element={<PrivateRoute><Header /><UserForm /><Footer /></PrivateRoute>} />
      </Routes>
      
    </Router>

  );
}

export default App;
