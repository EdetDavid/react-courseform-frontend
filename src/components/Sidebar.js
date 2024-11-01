import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Sidebar = () => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();  // Clear the user session
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className="sidebar d-flex flex-column p-3 bg-dark text-white vh-100">
      <h4 className="text-center">Menu</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="text-white">
          Dashboard
        </Nav.Link>
        {currentUser && !currentUser.user.is_hod && (
          <Nav.Link as={Link} to="/submit-courseform" className="text-white">
            Submit Course Form
          </Nav.Link>
        )}
        {currentUser && currentUser.user.is_hod && (
          <Nav.Link as={Link} to="/view-courseforms" className="text-white">
            View Course Forms
          </Nav.Link>
        )}
        <Nav.Link as={Link} to="/profile" className="text-white">
          Profile
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="text-white">
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
