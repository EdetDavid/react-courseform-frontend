// src/components/Dashboard.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar';

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="p-0"> {/* Sidebar Column */}
          <Sidebar />
        </Col>
        <Col md={9} className="p-4"> {/* Main Content Column */}
          <h2>Dashboard</h2>
          <p>Welcome to your dashboard. Here you can manage your profile, submit and view course forms, and more.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
