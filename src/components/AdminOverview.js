import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

export const AdminOverview = ({ lecturers, students, courses, modules, onAssignUsers, onListUsers }) => {
  const stats = [
    {
      title: 'Total Lecturers',
      value: lecturers.length,
      color: 'primary',
      description: 'Registered lecturers'
    },
    {
      title: 'Total Students',
      value: students.length,
      color: 'success',
      description: 'Enrolled students'
    },
    {
      title: 'Total Courses',
      value: courses.length,
      color: 'info',
      description: 'Available courses'
    },
    {
      title: 'Total Modules',
      value: modules.length,
      color: 'warning',
      description: 'Course modules'
    }
  ];

  const recentLecturers = lecturers.slice(0, 3); 
  const recentStudents = students.slice(0, 3);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard Overview</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={onAssignUsers}>
            Assign Users
          </Button>
          <Button variant="outline-secondary" onClick={onListUsers}>
            List Users
          </Button>
        </div>
      </div>
      
      {/* statistics cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col md={3} key={index} className="mb-3">
            <Card className="text-center h-100">
              <Card.Body>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
                <h6 className="text-muted">{stat.title}</h6>
                <small className="text-muted">{stat.description}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* recent lecturers */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Lecturers</h5>
            </Card.Header>
            <Card.Body>
              {recentLecturers.length === 0 ? (
                <p className="text-muted">No lecturers found</p>
              ) : (
                <div>
                  {recentLecturers.map((lecturer) => (
                    <div key={lecturer.id} className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                      <img
                        src="/images/lecturer.png"
                        alt="Lecturer"
                        width="40"
                        height="40"
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h6 className="mb-0">{lecturer.name} {lecturer.surname}</h6>
                        <small className="text-muted">{lecturer.staffNumber}</small>
                        <br />
                        <small className="text-muted">{lecturer.email}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* recent students */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Students</h5>
            </Card.Header>
            <Card.Body>
              {recentStudents.length === 0 ? (
                <p className="text-muted">No students found</p>
              ) : (
                <div>
                  {recentStudents.map((student) => (
                    <div key={student.id} className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                      <img
                        src="/images/student.png"
                        alt="Student"
                        width="40"
                        height="40"
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h6 className="mb-0">{student.name} {student.surname}</h6>
                        <small className="text-muted">{student.studentNumber}</small>
                        <br />
                        <small className="text-muted">{student.email}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  );
};
