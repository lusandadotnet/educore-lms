import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminOverview } from "../components/AdminOverview";
import { DataTable, SearchBox, AlertMessage } from "../components/CommonComponents";
import { AdminModals } from "../components/AdminModals";
import { mockData, generateId, searchUsers, getCourseById, getModuleById } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [lecturers, setLecturers] = useState(mockData.lecturers);
  const [students, setStudents] = useState(mockData.students);
  const [courses, setCourses] = useState(mockData.courses);
  const [modules, setModules] = useState(mockData.modules);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  // Form data for lecturer, currently empty @nkosi might generate staffNumber idk how
  const [lecturerForm, setLecturerForm] = useState({
    staffNumber: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: ""
  });

   // for student
  const [studentForm, setStudentForm] = useState({
    studentNumber: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: ""
  });
  // for course
  const [courseForm, setCourseForm] = useState({
    name: "",
    code: "",
    description: ""
  });
  // for module
  const [moduleForm, setModuleForm] = useState({
    courseId: "",
    name: "",
    code: "",
    description: ""
  });
  /// for assignment
  const [assignmentForm, setAssignmentForm] = useState({
    type: "lecturer",
    userId: "",
    courseId: ""
  });

  // show alert message - crud
  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 5000);
  };

  // Handle modal operations
  const handleShowModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
    
    if (item) {
      switch (type) {
        case "lecturer":
          setLecturerForm(item);
          break;
        case "student":
          setStudentForm(item);
          break;
        case "course":
          setCourseForm(item);
          break;
        case "module":
          setModuleForm(item);
          break;
        default:
          break;
      }
    } else {
      // rsets again for new items or cancelled
      setLecturerForm({
        staffNumber: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: ""
      });
      setStudentForm({
        studentNumber: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: ""
      });
      setCourseForm({
        name: "",
        code: "",
        description: ""
      });
      setModuleForm({
        courseId: "",
        name: "",
        code: "",
        description: ""
      });
    }
  };

  // handle form submissions @nkosi again
  const handleSubmit = (e) => {
    e.preventDefault();
    
    switch (modalType) {
      case "lecturer":
        handleLecturerSubmit();
        break;
      case "student":
        handleStudentSubmit();
        break;
      case "course":
        handleCourseSubmit();
        break;
      case "module":
        handleModuleSubmit();
        break;
      case "assignment":
        handleAssignmentSubmit();
        break;
      default:
        break;
    }
  };

  // lecturer crud i only have 2 buttons
  const handleLecturerSubmit = () => {
    if (editingItem) {
      setLecturers(lecturers.map(lec => 
        lec.id === editingItem.id ? { ...lecturerForm, id: editingItem.id } : lec
      ));
      showAlert("success", "Lecturer updated successfully!"); // edit
    } else {
      const newLecturer = { ...lecturerForm, id: generateId(), assignedCourses: [] };
      setLecturers([...lecturers, newLecturer]);
      showAlert("success", "Lecturer added successfully!");  //add
    }
    setShowModal(false);
  };

  const handleLecturerDelete = (lecturer) => {
    if (window.confirm(`Are you sure you want to delete ${lecturer.name} ${lecturer.surname}?`)) {
      setLecturers(lecturers.filter(lec => lec.id !== lecturer.id));
      showAlert("success", "Lecturer deleted successfully!");
    }
  };

  // student crud
  const handleStudentSubmit = () => {
    if (editingItem) {
      setStudents(students.map(student => 
        student.id === editingItem.id ? { ...studentForm, id: editingItem.id } : student
      ));
      showAlert("success", "Student updated successfully!");  // edit
    } else {
      const newStudent = { ...studentForm, id: generateId(), enrolledCourses: [] };
      setStudents([...students, newStudent]);
      showAlert("success", "Student added successfully!");  // add
    }
    setShowModal(false);
  };

  const handleStudentDelete = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name} ${student.surname}?`)) {
      setStudents(students.filter(stu => stu.id !== student.id));
      showAlert("success", "Student deleted successfully!");
    }
  };

  // course crud
  const handleCourseSubmit = () => {
    if (editingItem) {
      setCourses(courses.map(course => 
        course.id === editingItem.id ? { ...courseForm, id: editingItem.id } : course
      ));
      showAlert("success", "Course updated successfully!");
    } else {
      const newCourse = { ...courseForm, id: generateId(), modules: [] };
      setCourses([...courses, newCourse]);
      showAlert("success", "Course added successfully!");
    }
    setShowModal(false);
  };

  const handleCourseDelete = (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      setCourses(courses.filter(c => c.id !== course.id));
      showAlert("success", "Course deleted successfully!");
    }
  };

  // module operations
  const handleModuleSubmit = () => {
    if (editingItem) {
      setModules(modules.map(module => 
        module.id === editingItem.id ? { ...moduleForm, id: editingItem.id } : module
      ));
      showAlert("success", "Module updated successfully!");
    } else {
      const newModule = { ...moduleForm, id: generateId() };
      setModules([...modules, newModule]);
      
      // add a module to course
      setCourses(courses.map(course => 
        course.id === parseInt(moduleForm.courseId) 
          ? { ...course, modules: [...(course.modules || []), newModule.id] }
          : course
      ));
      showAlert("success", "Module added successfully!");
    }
    setShowModal(false);
  };

  const handleModuleDelete = (module) => {
    if (window.confirm(`Are you sure you want to delete ${module.name}?`)) {
      setModules(modules.filter(m => m.id !== module.id));
      showAlert("success", "Module deleted successfully!");
    }
  };

  // assignment crud
  const handleAssignmentSubmit = () => {
    const { type, userId, courseId } = assignmentForm;
    
    if (type === "lecturer") {
      setLecturers(lecturers.map(lecturer => 
        lecturer.id === parseInt(userId) 
          ? { ...lecturer, assignedCourses: [...(lecturer.assignedCourses || []), parseInt(courseId)] }
          : lecturer
      ));
      showAlert("success", "Lecturer assigned to course successfully!");
    } else {
      setStudents(students.map(student => 
        student.id === parseInt(userId) 
          ? { ...student, enrolledCourses: [...(student.enrolledCourses || []), parseInt(courseId)] }
          : student
      ));
      showAlert("success", "Student enrolled in course successfully!");
    }
    setShowModal(false);
  };

  // search input
  const handleSearch = () => {
    
  };

  const getFilteredLecturers = () => {
    return searchUsers(lecturers, searchTerm, ['staffNumber', 'name', 'surname', 'email']);
  };

  const getFilteredStudents = () => {
    return searchUsers(students, searchTerm, ['studentNumber', 'name', 'surname', 'email']);
  };

  // table columns
  const lecturerColumns = [
    { key: 'staffNumber', header: 'Staff Number' },
    { key: 'name', header: 'Name' },
    { key: 'surname', header: 'Surname' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'gender', header: 'Gender' },
    { 
      key: 'assignedCourses', 
      header: 'Assigned Courses',
      render: (courses) => courses ? courses.length : 0
    }
  ];

  const studentColumns = [
    { key: 'studentNumber', header: 'Student Number' },
    { key: 'name', header: 'Name' },
    { key: 'surname', header: 'Surname' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'gender', header: 'Gender' },
    { 
      key: 'enrolledCourses', 
      header: 'Enrolled Courses',
      render: (courses) => courses ? courses.length : 0
    }
  ];

  const courseColumns = [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { 
      key: 'modules', 
      header: 'Modules',
      render: (modules) => modules ? modules.length : 0
    }
  ];

  const moduleColumns = [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { 
      key: 'courseId', 
      header: 'Course',
      render: (courseId) => {
        const course = getCourseById(courseId);
        return course ? course.name : 'Unknown';
      }
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleAssignUsers = () => {
    setActiveTab("assign");
  };

  const handleListUsers = () => {
    setActiveTab("list");
  };


     // this renders page, i start on the overview page
  const renderContent = () => {
    if (activeTab === "overview") {
      return <AdminOverview 
        lecturers={lecturers} 
        students={students} 
        courses={courses} 
        modules={modules}
        onAssignUsers={handleAssignUsers}
        onListUsers={handleListUsers}
      />;
    }

    return (
      <div>
        {alert.show && (
          <AlertMessage 
            variant={alert.variant} 
            message={alert.message} 
            onClose={() => setAlert({ show: false, variant: "", message: "" })}
          />
        )}
        
        {activeTab === "lecturers" && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Manage Lecturers</h4>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal("lecturer")}
              >
                Add Lecturer
              </Button>
            </Card.Header>

            <Card.Body>
              <SearchBox
                placeholder="Search lecturers by staff number, name, surname, or email."
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
              />

              <DataTable
                columns={lecturerColumns}
                data={getFilteredLecturers()}
                onEdit={(lecturer) => handleShowModal("lecturer", lecturer)}
                onDelete={handleLecturerDelete}
                emptyMessage="No lecturers found"
              />
            </Card.Body>
          </Card>
        )}  

        {activeTab === "students" && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Manage Students</h4>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal("student")}
              >
                Add Student
              </Button>
            </Card.Header>
            <Card.Body>
              <SearchBox
                placeholder="Search students by student number, name, surname, or email."
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={handleSearch}
              />

              <DataTable
                columns={studentColumns}
                data={getFilteredStudents()}
                onEdit={(student) => handleShowModal("student", student)}
                onDelete={handleStudentDelete}
                emptyMessage="No students found"
              />
            </Card.Body>
          </Card>
        )}

        {activeTab === "courses" && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Manage Courses</h4>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal("course")}
              >
                Add Course
              </Button>
            </Card.Header>

            <Card.Body>
              <DataTable
                columns={courseColumns}
                data={courses}
                onEdit={(course) => handleShowModal("course", course)}
                onDelete={handleCourseDelete}
                emptyMessage="No courses found"
              />
            </Card.Body>
          </Card>
        )}

        {activeTab === "modules" && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Manage Modules</h4>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal("module")}
              >
                Add Module
              </Button>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={moduleColumns}
                data={modules}
                onEdit={(module) => handleShowModal("module", module)}
                onDelete={handleModuleDelete}
                emptyMessage="No modules found"
              />
            </Card.Body>
          </Card>
        )}

        {activeTab === "assign" && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Assign users to Courses</h4>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal("assignment")}
              >
                Make Assignment
              </Button>
            </Card.Header>
            <Card.Body>
              <p>Use the "Make Assignment" button to assign users to courses.</p>
            </Card.Body>
          </Card>
        )}

        {activeTab === "list" && (
          <Card>
            <Card.Header>
              <h4 className="mb-0">List Users by Type</h4>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>Lecturers ({lecturers.length})</h5>
                  <DataTable
                    columns={lecturerColumns}
                    data={lecturers}
                    showActions={false}
                    emptyMessage="No lecturers found"
                  />
                </Col>

                <Col md={6}>
                  <h5>Students ({students.length})</h5>
                  <DataTable
                    columns={studentColumns}
                    data={students}
                    showActions={false}
                    emptyMessage="No students found"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-grow-1 p-4">
        {renderContent()}

        {/* modals */}
        <AdminModals
          showModal={showModal}
          modalType={modalType}
          editingItem={editingItem}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          lecturerForm={lecturerForm}
          setLecturerForm={setLecturerForm}
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          courseForm={courseForm}
          setCourseForm={setCourseForm}
          moduleForm={moduleForm}
          setModuleForm={setModuleForm}
          assignmentForm={assignmentForm}
          setAssignmentForm={setAssignmentForm}
          courses={courses}
          lecturers={lecturers}
          students={students}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;