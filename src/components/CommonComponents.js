import React from 'react';
import { Modal, Button, Form, Table, Alert, Spinner } from 'react-bootstrap';

// Generic Modal Component
export const GenericModal = ({ show, onHide, title, children, size = "md" }) => {
  return (
    <Modal show={show} onHide={onHide} size={size} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

// Generic Form Modal Component
export const FormModal = ({ show, onHide, title, onSubmit, children, submitText = "Save" }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Table Component
export const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView, 
  emptyMessage = "No data available",
  showActions = true 
}) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {showActions && (
                  <td>
                    <div className="btn-group" role="group">
                      {onView && (
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => onView(row)}
                          title="View"
                        >
                          View
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

// search input
export const SearchBox = ({ placeholder, value, onChange, onSearch }) => {
  return (
    <div className="d-flex mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="me-2"
      />
      <Button variant="primary" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

// bootstrapped, check mui dawg
export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center p-4">
      <Spinner animation="border" role="status" className="me-2" />
      <span>{message}</span>
    </div>
  );
};

// Alert Message Component
export const AlertMessage = ({ variant, message, onClose }) => {
  return (
    <Alert variant={variant} dismissible onClose={onClose}>
      {message}
    </Alert>
  );
};
