import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import authService from '../services/authService';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [isHod, setIsHod] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, password, department, isHod);  // No response variable needed
      navigate('/');  // Redirect to the dashboard after successful registration
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleRegister} className="p-4 border rounded bg-light shadow-sm">
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

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group controlId="formDepartment" className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type="text" 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)} 
                required 
                className="rounded-pill"
              />
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
              Register
            </Button>

            {error && <div className="mt-3 text-center text-danger">{error}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
