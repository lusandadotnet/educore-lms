import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'lecturers', label: 'Lecturers' },
    { key: 'students', label: 'Students' },
    { key: 'courses', label: 'Courses' },
    { key: 'modules', label: 'Modules' }
  ];

  return (
    <div className="bg-light border-end sticky-top" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom">
        <div className="d-flex align-items-center">
          <img
            src="/images/educore-logo.png"
            alt="Educore College Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <div>
            <h6 className="mb-0 text-primary">Educore College</h6>
            <small className="text-muted">Admin Portal</small>
          </div>
        </div>
      </div>
      
      <Nav className="flex-column p-3">
        {menuItems.map((item) => (
          <Nav.Item key={item.key} className="mb-2">
            <Button
              variant={activeTab === item.key ? 'primary' : 'outline-secondary'}
              className="w-100 text-start d-flex align-items-center"
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
      
      <div className="p-3 border-top mt-auto">
        <Button
          variant="outline-danger"
          className="w-100"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
