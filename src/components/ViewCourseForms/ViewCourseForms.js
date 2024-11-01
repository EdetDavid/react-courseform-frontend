import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaDownload, FaStamp } from 'react-icons/fa';
import courseFormService from '../../services/courseFormService';
import './ViewCourseForms.css';

function ViewCourseForms() {
  const [courseForms, setCourseForms] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFormId, setCurrentFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalMessageType, setModalMessageType] = useState(''); // 'error' or 'success'
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourseForms = async () => {
      setLoading(true);
      try {
        const data = await courseFormService.getCourseForms();
        setCourseForms(data);
      } catch (error) {
        setModalMessage('No courseforms Submitted.');
        setModalMessageType('error');
        setShowModal(true);
        console.error('Failed to fetch course forms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseForms();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleStamp = async () => {
    if (selectedFile && currentFormId) {
      try {
        setLoading(true);
        await courseFormService.stampCourseForm(currentFormId, selectedFile);
        setModalMessage('Course form stamped successfully!');
        setModalMessageType('success');
        setShowModal(true);
        // Refetch course forms to update the UI
        const data = await courseFormService.getCourseForms();
        setCourseForms(data);
      } catch (error) {
        setModalMessage('Failed to stamp course form.');
        setModalMessageType('error');
        setShowModal(true);
        console.error('Failed to stamp course form:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setModalMessage('Please select a stamp image.');
      setModalMessageType('error');
      setShowModal(true);
    }
  };

 
  const downloadFile = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileUrl.split('/').pop(); // Set the default file name
      document.body.appendChild(a); // Append the anchor to the body
      a.click();
      a.remove(); // Remove the anchor from the document
    } catch (error) {
      console.error("Error downloading file:", error);
      alert('Failed to download the file. Please try again later.');
    }
  };


  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h2>Course Forms</h2>
      {loading && <Spinner animation="border" />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Form Name</th>
            <th>Student Name</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseForms.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No course forms available</td>
            </tr>
          ) : (
            courseForms.map((form) => (
              <tr key={form.id}>
                <td>{form.file.split('/').pop()}</td>
                <td>{form.student.username}</td>
                <td>{new Date(form.uploaded_at).toLocaleString()}</td>
                <td>
                  <Row className="g-2 align-items-center">
                    <Col xs="auto">
                      <Form.Group>
                        <Form.Control
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="file-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setCurrentFormId(form.id);
                          handleStamp();
                        }}
                        className="d-flex align-items-center"
                      >
                        <FaStamp className="me-2" /> Stamp
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="secondary"
                        onClick={() => downloadFile(form.file)}
                        className="d-flex align-items-center"
                      >
                        <FaDownload className="me-2" /> Download
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal for displaying error or success messages */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessageType === 'error' ? 'Error' : 'Success'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewCourseForms;
