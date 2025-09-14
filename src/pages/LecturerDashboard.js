import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form, Badge, Alert, Nav } from "react-bootstrap";
import { DataTable, FormModal, AlertMessage } from "../components/CommonComponents";
import { mockData, generateTaskId, getModulesByCourseId, getTasksByModuleId } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [taskForm, setTaskForm] = useState({
    name: "",
    dueDate: "",
    moduleId: ""
  });

  // Get modules for all assigned courses
  const getAllModules = () => {
    const allModules = [];
    assignedCourses.forEach(course => {
      const courseModules = getModulesByCourseId(course.id);
      courseModules.forEach(module => {
        allModules.push({
          ...module,
          courseName: course.name
        });
      });
    });
    return allModules;
  };

  // @nkosi your line, this is hust to make app tests
  const lecturerId = 1;

  useEffect(() => {
    // Getcourses for the lecturer
    const lecturer = mockData.lecturers.find(lec => lec.id === lecturerId);
    if (lecturer) {
      const courses = lecturer.assignedCourses.map(courseId => 
        mockData.courses.find(course => course.id === courseId)
      ).filter(Boolean);
      setAssignedCourses(courses);
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
      const moduleTasks = getTasksByModuleId(selectedModule.id);
      setTasks(moduleTasks);
    }
  }, [selectedModule]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 5000);
  };

  const handleCreateTask = () => {
    setTaskForm({
      name: "",
      dueDate: "",
      moduleId: ""
    });
    setShowTaskModal(true);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: Date.now(),
      taskId: generateTaskId(),
      name: taskForm.name,
      dueDate: taskForm.dueDate,
      moduleId: parseInt(taskForm.moduleId),
      status: "Not Started",
      studentId: null // @nkosi
    };

    // @nkosi just to make app tests
    mockData.tasks.push(newTask);
    
    // update local state, does not work yet
    setTasks([...tasks, newTask]);
    setShowTaskModal(false);
    showAlert("success", "Task created successfully!");
  };

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
      render: (status) => (
        <Badge bg={
          status === 'Complete' ? 'success' : 
          status === 'In Progress' ? 'warning' : 'secondary'
        }>
          {status}
        </Badge>
      )
    }
  ];

  return (
    <div className="d-flex">
      {/* sidebar */}
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
              <small className="text-muted">Lecturer Portal</small>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <div className="d-flex align-items-center mb-3">
            <img
              src="/images/lecturer.png"
              alt="Lecturer"
              width="40"
              height="40"
              className="rounded-circle me-3"
            />
            <div>
              <h6 className="mb-0">Lecturer</h6>
              <small className="text-muted"></small>
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

      {/* main Content */}
      <div className="flex-grow-1 p-4">
        {alert.show && (
          <AlertMessage 
            variant={alert.variant} 
            message={alert.message} 
            onClose={() => setAlert({ show: false, variant: "", message: "" })}
          />
        )}

        <h2>Lecturer Dashboard</h2>
        <p className="text-muted">Manage Modules and Tasks.</p>

        {/* Assigned Courses */}
        <Card className="mb-4">
          <Card.Header>
            <h4 className="mb-0">Assigned Courses</h4>
          </Card.Header>
          <Card.Body>
            {assignedCourses.length === 0 ? (
              <p className="text-muted">No courses assigned yet.</p>
            ) : (
              <DataTable
                columns={courseColumns}
                data={assignedCourses}
                showActions={false}
                emptyMessage="No courses assigned"
              />
            )}
          </Card.Body>
        </Card>

        {/* All Modules for All Courses */}
        <Card className="mb-4">
          <Card.Header>
            <h4 className="mb-0">All Course Modules</h4>
          </Card.Header>
          <Card.Body>
            {assignedCourses.length === 0 ? (
              <p className="text-muted">No courses assigned yet.</p>
            ) : (
              <div>
                {assignedCourses.map((course) => {
                  const courseModules = getModulesByCourseId(course.id);
                  return (
                    <div key={course.id} className="mb-4">
                      <h5 className="text-primary mb-3">{course.name} ({course.code})</h5>
                      {courseModules.length === 0 ? (
                        <p className="text-muted">No modules found for this course.</p>
                      ) : (
                        <DataTable
                          columns={moduleColumns}
                          data={courseModules}
                          showActions={false}
                          emptyMessage="No modules found for this course"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Body>
        </Card>

        {/* All Tasks for all Modules */}
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">All Tasks</h4>
            <Button 
              variant="primary" 
              onClick={() => {
                if (assignedCourses.length === 0) {
                  showAlert("warning", "No courses assigned yet");
                  return;
                }
                setShowTaskModal(true);
              }}
            >
              Create New Task
            </Button>
          </Card.Header>
          <Card.Body>
            {assignedCourses.length === 0 ? (
              <p className="text-muted">No courses assigned yet.</p>
            ) : (
              <div>
                {assignedCourses.map((course) => {
                  const courseModules = getModulesByCourseId(course.id);
                  return courseModules.map((module) => {
                    const moduleTasks = getTasksByModuleId(module.id);
                    return (
                      <div key={module.id} className="mb-4">
                        <h5 className="text-info mb-3">{module.name} - {course.name}</h5>
                        {moduleTasks.length === 0 ? (
                          <p className="text-muted">No tasks created for this module yet.</p>
                        ) : (
                          <DataTable
                            columns={taskColumns}
                            data={moduleTasks}
                            showActions={false}
                            emptyMessage="No tasks created for this module yet"
                          />
                        )}
                      </div>
                    );
                  });
                })}
              </div>
            )}
          </Card.Body>
        </Card>

        {/* task creation modal */}
        <FormModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          title="Create New Task"
          onSubmit={handleTaskSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={taskForm.name}
              onChange={(e) => setTaskForm({...taskForm, name: e.target.value})}
              placeholder="Enter task name"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Module</Form.Label>
            <Form.Select
              value={taskForm.moduleId}
              onChange={(e) => setTaskForm({...taskForm, moduleId: e.target.value})}
              required
            >
              <option value="">Select Module</option>
              {getAllModules().map(module => (
                <option key={module.id} value={module.id}>
                  {module.name} - {module.courseName}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              Select the module for this task
            </Form.Text>
          </Form.Group>
        </FormModal>
      </div>
    </div>
  );
};

export default LecturerDashboard;
