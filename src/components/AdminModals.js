import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FormModal } from './CommonComponents';

export const AdminModals = ({
  showModal,
  modalType,
  editingItem,
  setShowModal,
  handleSubmit,
  lecturerForm,
  setLecturerForm,
  studentForm,
  setStudentForm,
  courseForm,
  setCourseForm,
  moduleForm,
  setModuleForm,
  assignmentForm,
  setAssignmentForm,
  courses,
  lecturers,
  students
}) => {
  return (
    <>
      {/* lecturer modal */}
      <FormModal
        show={showModal && modalType === "lecturer"}
        onHide={() => setShowModal(false)}
        title={editingItem ? "Edit Lecturer" : "Add Lecturer"}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Staff Number</Form.Label>
              <Form.Control
                type="text"
                value={lecturerForm.staffNumber}
                onChange={(e) => setLecturerForm({...lecturerForm, staffNumber: e.target.value})}
                required
              />

            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={lecturerForm.email}
                onChange={(e) => setLecturerForm({...lecturerForm, email: e.target.value})}
                required
              />

            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={lecturerForm.name}
                onChange={(e) => setLecturerForm({...lecturerForm, name: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={lecturerForm.surname}
                onChange={(e) => setLecturerForm({...lecturerForm, surname: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={lecturerForm.phone}
                onChange={(e) => setLecturerForm({...lecturerForm, phone: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={lecturerForm.gender}
                onChange={(e) => setLecturerForm({...lecturerForm, gender: e.target.value})}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={lecturerForm.dateOfBirth}
                onChange={(e) => setLecturerForm({...lecturerForm, dateOfBirth: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={lecturerForm.address}
                onChange={(e) => setLecturerForm({...lecturerForm, address: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </FormModal>

      {/* student modal */}
      <FormModal
        show={showModal && modalType === "student"}
        onHide={() => setShowModal(false)}
        title={editingItem ? "Edit Student" : "Add Student"}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                type="text"
                value={studentForm.studentNumber}
                onChange={(e) => setStudentForm({...studentForm, studentNumber: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={studentForm.name}
                onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={studentForm.surname}
                onChange={(e) => setStudentForm({...studentForm, surname: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={studentForm.phone}
                onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={studentForm.gender}
                onChange={(e) => setStudentForm({...studentForm, gender: e.target.value})}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={studentForm.dateOfBirth}
                onChange={(e) => setStudentForm({...studentForm, dateOfBirth: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={studentForm.address}
                onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </FormModal>

      {/* course modal */}
      <FormModal
        show={showModal && modalType === "course"}
        onHide={() => setShowModal(false)}
        title={editingItem ? "Edit Course" : "Add Course"}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                value={courseForm.code}
                onChange={(e) => setCourseForm({...courseForm, code: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={courseForm.name}
                onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={courseForm.description}
                onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </FormModal>

      {/* module modal */}
      <FormModal
        show={showModal && modalType === "module"}
        onHide={() => setShowModal(false)}
        title={editingItem ? "Edit Module" : "Add Module"}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={moduleForm.courseId}
                onChange={(e) => setModuleForm({...moduleForm, courseId: e.target.value})}
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Module Code</Form.Label>
              <Form.Control
                type="text"
                value={moduleForm.code}
                onChange={(e) => setModuleForm({...moduleForm, code: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Module Name</Form.Label>
              <Form.Control
                type="text"
                value={moduleForm.name}
                onChange={(e) => setModuleForm({...moduleForm, name: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={moduleForm.description}
                onChange={(e) => setModuleForm({...moduleForm, description: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </FormModal>

      {/* sssignment mogfgal */}
      <FormModal
        show={showModal && modalType === "assignment"}
        onHide={() => setShowModal(false)}
        title="Assign User to Course"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assignment Type</Form.Label>
              <Form.Select
                value={assignmentForm.type}
                onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})}
                required
              >
                <option value="lecturer">Assign Lecturer</option>
                <option value="student">Enroll Student</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={assignmentForm.courseId}
                onChange={(e) => setAssignmentForm({...assignmentForm, courseId: e.target.value})}
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                {assignmentForm.type === "lecturer" ? "Select Lecturer" : "Select Student"}
              </Form.Label>
              <Form.Select
                value={assignmentForm.userId}
                onChange={(e) => setAssignmentForm({...assignmentForm, userId: e.target.value})}
                required
              >
                <option value="">Select {assignmentForm.type === "lecturer" ? "Lecturer" : "Student"}</option>
                {(assignmentForm.type === "lecturer" ? lecturers : students).map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname} ({assignmentForm.type === "lecturer" ? user.staffNumber : user.studentNumber})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </FormModal>
    </>
  );
};
