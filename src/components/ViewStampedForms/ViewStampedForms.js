import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Modal } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import courseFormService from '../../services/courseFormService';
import './ViewStampedForms.css'; // Import custom styles

const ViewStampedForms = () => {
  const [stampedForms, setStampedForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStampedForms = async () => {
      setLoading(true);
      try {
        const data = await courseFormService.getStampedForms();
        setStampedForms(data);
      } catch (error) {
        console.error('Failed to fetch stamped course forms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStampedForms();
  }, []);

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
      setErrorMessage('Course Form Not Yet Signed.');
      setShowErrorModal(true); // Show the error modal
    }
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <div>
      <h2>Stamped Course Forms</h2>
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
          {stampedForms.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No stamped course forms available</td>
            </tr>
          ) : (
            stampedForms.map((form) => (
              <tr key={form.id}>
                <td>{form.file.split('/').pop()}</td>
                <td>{form.student.username}</td>
                <td>{new Date(form.uploaded_at).toLocaleString()}</td>
                
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => downloadFile(form.stamp)}
                    className="d-flex align-items-center"
                  >
                    <FaDownload className="me-2" /> Download Stamped Form
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewStampedForms;
