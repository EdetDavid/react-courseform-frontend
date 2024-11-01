import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Course-Form Acknowlegment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            {currentUser && !currentUser.user.is_hod && (
              <>
                <Nav.Link as={Link} to="/submit-courseform">
                  Submit Course Form
                </Nav.Link>
                <Nav.Link as={Link} to="/view-stamped-forms">
                  View Stamped Forms
                </Nav.Link>
              </>
            )}
            {currentUser && currentUser.user.is_hod && (
              <Nav.Link as={Link} to="/view-courseforms">
                View Course Forms
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>
          {currentUser ? (
            <Nav className="ml-auto">
              <Navbar.Text className="me-3">
                Signed in as: <strong>{currentUser.user.username}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
