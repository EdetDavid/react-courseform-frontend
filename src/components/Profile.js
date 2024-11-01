import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const [username, setUsername] = useState(currentUser?.user?.username || '');
  const [department, setDepartment] = useState(currentUser?.user?.department?.name || '');
  const [isHod, setIsHod] = useState(currentUser?.user?.is_hod || false);
  const [message, setMessage] = useState('');
  const [departments, setDepartments] = useState([]);

  // Fetch the list of departments from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setMessage('Failed to load departments.');
      }
    };

    fetchDepartments();
  }, []);
  

  // If currentUser is null, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await authService.updateProfile(username, department, isHod);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Profile</h2>
          <Form onSubmit={handleUpdate} className="p-4 border rounded bg-light shadow-sm">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group controlId="formDepartment" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="rounded-pill"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formIsHod" className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="Head of Department?" 
                checked={isHod} 
                onChange={(e) => setIsHod(e.target.checked)} 
                className="rounded-pill"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill">
              Update Profile
            </Button>

            {message && <div className={`mt-3 text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>{message}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
