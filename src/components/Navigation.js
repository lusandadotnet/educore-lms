import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// ddmin nvbar
export const AdminNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand 
          href="#home" 
          className="d-flex align-items-center"
          onClick={() => navigate('/admin')}
          style={{ cursor: 'pointer' }}
        >
          <span className="fw-bold text-primary">
            Educore College - Admin Portal
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <span className="fw-semibold">Admin</span>
                </span>
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/admin')}>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// lecturer nav
export const LecturerNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand 
          href="#home" 
          className="d-flex align-items-center"
          onClick={() => navigate('/lecturer')}
          style={{ cursor: 'pointer' }}
        >
          <span className="fw-bold text-primary">
            Educore College - Lecturer Portal
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <span className="fw-semibold">Lecturer</span>
                </span>
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/lecturer')}>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// student nav
export const StudentNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand 
          href="#home" 
          className="d-flex align-items-center"
          onClick={() => navigate('/student')}
          style={{ cursor: 'pointer' }}
        >
          <span className="fw-bold text-primary">
            Educore College - Student Portal
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <span className="fw-semibold">Student</span>
                </span>
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/student')}>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
