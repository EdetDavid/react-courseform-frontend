import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import courseFormService from '../services/courseFormService';
import authService from '../services/authService';

function SubmitCourseForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        setMessage('You need to be logged in to submit a course form.');
        return;
      }
  
      const userId = currentUser.user.id;
  
      // Ensure the student ID exists in your backend before submitting
      await courseFormService.uploadCourseForm(userId, file);
      setMessage('Course form submitted successfully!');
      setFile(null);
    } catch (error) {
      setMessage('Failed to submit course form. Please try again. ' + error.response.data.detail);
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Submit Course Form</h2>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Course Form</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                required
                className="rounded-pill"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill">
              Submit
            </Button>

            {message && <div className={`mt-3 text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>{message}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitCourseForm;
