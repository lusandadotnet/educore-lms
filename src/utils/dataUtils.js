// Mock data @nkosi
export const mockData = {
  lecturers: [
    {
      id: 1,
      staffNumber: '',
      name: 'Thabo',
      surname: 'Nkoko',
      email: 'thabo.nkoko@educore.ac.za',
      phone: '+27123456789',
      gender: 'Male',
      dateOfBirth: '198705-15',
      address: '123 University, Port Elizabeth',
      assignedCourses: [1, 2]
    },
    {
      id: 2,
      staffNumber: 'L229036822',
      name: 'Lusanda',
      surname: 'Ndlovu',
      email: 'lusanda.ndlovu@educore.ac.za',
      phone: '+2734567891',
      gender: 'Male',
      dateOfBirth: '2005-05-24',
      address: '456 Academic Avenue, Cape Town',
      assignedCourses: [1, 3]
    }
  ],
  students: [
    {
      id: 1,
      studentNumber: 's229036821',
      name: 'Luyanda',
      surname: 'Mthembu',
      email: 's229036821@educore.ac.za',
      phone: '0123456791',
      gender: 'Female',
      dateOfBirth: '2000-03-10',
      address: '789 Student Lane, North End',
      enrolledCourses: [1]
    },
    {
      id: 2,
      studentNumber: 's229036876',
      name: 'Lusanda',
      surname: 'Ndlovu',
      email: '229036876@educore.ac.za',
      phone: '+2734567891',
      gender: 'Male',
      dateOfBirth: '2005-11-25',
      address: '38 Campus Road, Cape North End',
      enrolledCourses: [2]
    }
  ],
  courses: [
    {
      id: 1,
      name: 'Diploma Info Tech (Software Development)',
      code: 'SD2024',
      description: 'Comprehensive Software Development Program',
      modules: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Diploma Info Tech (Communication Networks)',
      code: 'WD201',
      description: 'CISCO Networking and Routing',
      modules: [3, 4, 5]
    },
  ],
  modules: [
    {
      id: 1,
      courseId: 1,
      name: 'Internet Programming',
      code: 'ITP2020',
      description: 'Basic Web Programming'
    },
    {
      id: 2,
      courseId: 1,
      name: 'Technical Programming',
      code: 'PRT2030',
      description: 'DSA, BIG 0'
    },
    {
      id: 3,
      courseId: 1,
      name: 'Development Software 2',
      code: 'ONT2030',
      description: '.NET Framework, C# Programming'
    },
    {
      id: 4,
      courseId: 2,
      name: 'Communication Networks 2',
      code: 'WD201-M1',
      description: 'CCNA Routing and Switching'
    },
  ],
  tasks: [
    {
      id: 1,
      taskId: 'TASK001',
      name: 'Sem 2 Capstone',
      dueDate: '2025-02-15',
      moduleId: 1,
      status: 'Not Started',
      studentId: 1
    },
    {
      id: 2,
      taskId: 'TASK002',
      name: 'Data Structures Practical',
      dueDate: '2025-02-20',
      moduleId: 2,
      status: 'In Progress',
      studentId: 1
    },
    {
      id: 3,
      taskId: 'TASK003',
      name: 'Packet Tracer Assignment',
      dueDate: '2025-02-25',
      moduleId: 4,
      status: 'Complete',
      studentId: 2
    }
  ]
};


export const generateId = () => {
  return Date.now() + Math.random();
};

export const generateTaskId = () => {
  const tasks = mockData.tasks;
  const lastTask = tasks[tasks.length - 1];
  if (lastTask) {
    const lastNumber = parseInt(lastTask.taskId.replace('TASK', ''));
    return `TASK${String(lastNumber + 1).padStart(3, '0')}`;
  }
  return 'TASK001';
};

export const searchUsers = (users, searchTerm, searchFields) => {
  if (!searchTerm) return users;
  
  return users.filter(user => 
    searchFields.some(field => 
      user[field] && user[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const getCourseById = (courseId) => {
  return mockData.courses.find(course => course.id === parseInt(courseId));
};

export const getModuleById = (moduleId) => {
  return mockData.modules.find(module => module.id === parseInt(moduleId));
};

export const getLecturerById = (lecturerId) => {
  return mockData.lecturers.find(lecturer => lecturer.id === parseInt(lecturerId));
};

export const getStudentById = (studentId) => {
  return mockData.students.find(student => student.id === parseInt(studentId));
};

export const getTasksByStudentId = (studentId) => {
  return mockData.tasks.filter(task => task.studentId === parseInt(studentId));
};

export const getTasksByModuleId = (moduleId) => {
  return mockData.tasks.filter(task => task.moduleId === parseInt(moduleId));
};

export const getModulesByCourseId = (courseId) => {
  return mockData.modules.filter(module => module.courseId === parseInt(courseId));
};

export const getStudentsByCourseId = (courseId) => {
  return mockData.students.filter(student => 
    student.enrolledCourses.includes(parseInt(courseId))
  );
};

export const getLecturersByCourseId = (courseId) => {
  return mockData.lecturers.filter(lecturer => 
    lecturer.assignedCourses.includes(parseInt(courseId))
  );
};
