// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile';
import SubmitCourseForm from './components/SubmitCourseForm';
import ViewCourseForms from './components/ViewCourseForms/ViewCourseForms';
import ViewStampedForms from './components/ViewStampedForms/ViewStampedForms'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <NavBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoute role={"student"} />}>
            <Route path="/submit-courseform" element={<SubmitCourseForm />} />
            <Route path="/view-stamped-forms" element={<ViewStampedForms />} /> {/* Add the route for ViewStampedForms */}
          </Route>
          <Route element={<ProtectedRoute role="hod" />}>
            <Route path="/view-courseforms" element={<ViewCourseForms />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
