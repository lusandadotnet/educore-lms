import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form, Badge, Alert } from "react-bootstrap";
import { DataTable, AlertMessage } from "../components/CommonComponents";
import { mockData, getTasksByStudentId, getModulesByCourseId, getCourseById } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  // @nkosi your line, this is hust to make app tests
  const studentId = 1;

  useEffect(() => {
    // get courses for the student
    const student = mockData.students.find(stu => stu.id === studentId);
    if (student) {
      const courses = student.enrolledCourses.map(courseId => 
        mockData.courses.find(course => course.id === courseId)
      ).filter(Boolean);
      setEnrolledCourses(courses);
    }
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const courseModules = getModulesByCourseId(selectedCourse.id);
      setModules(courseModules);
      setSelectedModule(null);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedModule) {
      // get all tasks for this module and filter by student
      const moduleTasks = mockData.tasks.filter(task => 
        task.moduleId === selectedModule.id && 
        (task.studentId === studentId || task.studentId === null)
      );
      setTasks(moduleTasks);
    }
  }, [selectedModule]);

  useEffect(() => {
    // flter tasks by status - button is still off
    if (statusFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === statusFilter));
    }
  }, [tasks, statusFilter]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 5000);
  };


  // @nkosi your line, this is hust to make app tests
  const handleStatusUpdate = (taskId, newStatus) => {
    // Update task in mock data
    const taskIndex = mockData.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      mockData.tasks[taskIndex].status = newStatus;
      mockData.tasks[taskIndex].studentId = studentId; // Assign to student
    }

    // Update local state
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus, studentId: studentId } : task
    ));
    
    showAlert("success", "Task status updated successfully!");
  }; // dous not do anything yet

  const handleLogout = () => {
    navigate('/');
  };

  const courseColumns = [
    { key: 'code', header: 'Course Code' },
    { key: 'name', header: 'Course Name' },
    { key: 'description', header: 'Description' },
    { 
      key: 'modules', 
      header: 'Modules',
      render: (modules) => modules ? modules.length : 0
    }
  ];

  const moduleColumns = [
    { key: 'code', header: 'Module Code' },
    { key: 'name', header: 'Module Name' },
    { key: 'description', header: 'Description' }
  ];

  const taskColumns = [
    { key: 'taskId', header: 'Task ID' },
    { key: 'name', header: 'Task Name' },
    { 
      key: 'dueDate', 
      header: 'Due Date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (status, task) => (
        <div className="d-flex align-items-center gap-2">
          <Badge bg={
            status === 'Complete' ? 'success' : 
            status === 'In Progress' ? 'warning' : 'secondary'
          }>
            {status}
          </Badge>
          <Form.Select
            size="sm"
            style={{ width: 'auto' }}
            value={status}
            onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </Form.Select>
        </div>
      )
    }
  ];

  const getTaskStats = () => {
    const total = tasks.length;
    const notStarted = tasks.filter(task => task.status === 'Not Started').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const complete = tasks.filter(task => task.status === 'Complete').length;
    
    return { total, notStarted, inProgress, complete };
  };

  const stats = getTaskStats();

  return (
    <div className="d-flex">
      {/* Sidebar */}
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
              <small className="text-muted">Student Portal</small>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <div className="d-flex align-items-center mb-3">
            <img
              src="/images/student.png"
              alt="Student"
              width="40"
              height="40"
              className="rounded-circle me-3"
            />
            <div>
              <h6 className="mb-0">Student</h6>
              <small className="text-muted">Lusanda Ndlovu</small>
            </div>
          </div>
        </div>
        
        <div className="p-3 border-top mt-auto">
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* main content */}
      <div className="flex-grow-1 p-4">
        {alert.show && (
          <AlertMessage 
            variant={alert.variant} 
            message={alert.message} 
            onClose={() => setAlert({ show: false, variant: "", message: "" })}
          />
        )}

        <h2>Student Dashboard</h2>
        <p className="text-muted">View your enrolled courses, modules, and manage your tasks.</p>

        {/* task statistics @ the top, only pop when clicked*/}
        {selectedModule && (
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-primary">{stats.total}</h5>
                  <p className="mb-0">Total Tasks</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-secondary">{stats.notStarted}</h5>
                  <p className="mb-0">Not Started</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-warning">{stats.inProgress}</h5>
                  <p className="mb-0">In Progress</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-success">{stats.complete}</h5>
                  <p className="mb-0">Complete</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">My Enrolled Courses</h4>
              </Card.Header>
              <Card.Body>
                {enrolledCourses.length === 0 ? (
                  <p className="text-muted">No courses enrolled yet.</p>
                ) : (
                  <DataTable
                    columns={courseColumns}
                    data={enrolledCourses}
                    onView={(course) => setSelectedCourse(course)}
                    showActions={true}
                    emptyMessage="No courses enrolled"
                  />
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="mb-0">Course Modules</h4>
              </Card.Header>
              <Card.Body>
                {selectedCourse ? (
                  <>
                    <h5>{selectedCourse.name}</h5>
                    <DataTable
                      columns={moduleColumns}
                      data={modules}
                      onView={(module) => setSelectedModule(module)}
                      showActions={true}
                      emptyMessage="No modules found for this course"
                    />
                  </>
                ) : (
                  <p className="text-muted">Select a course to view its modules.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {selectedModule ? `Tasks for ${selectedModule.name}` : 'Tasks'}
                </h4>
                {selectedModule && (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Label className="mb-0">Filter by status:</Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ width: 'auto' }}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Tasks</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                    </Form.Select>
                  </div>
                )}
              </Card.Header>
              <Card.Body>
                {selectedModule ? (
                  <>
                    <p className="text-muted mb-3">
                      Showing {filteredTasks.length} of {tasks.length} tasks
                    </p>
                    <DataTable
                      columns={taskColumns}
                      data={filteredTasks}
                      showActions={false}
                      emptyMessage="No tasks available for this module"
                    />
                  </>
                ) : (
                  <p className="text-muted">Select a module to view and manage tasks.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StudentDashboard;
