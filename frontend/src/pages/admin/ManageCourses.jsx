// pages/admin/ManageCourses.jsx
import { useState } from 'react';
import CourseTable from '../../components/admin/CoursesTable';
import CourseForm from '../../components/admin/CourseForm';

export default function ManageCourses() {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'Web Development', 
      description: 'Full stack web development course',
      imageUrl: '/course-web.jpg',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Mobile Development', 
      description: 'React Native mobile app development',
      imageUrl: '/course-mobile.jpg',
      status: 'draft'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleSaveCourse = (courseData) => {
    if (courseData.id) {
      setCourses(courses.map(c => c.id === courseData.id ? courseData : c));
    } else {
      setCourses([...courses, { ...courseData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <button
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      <CourseTable 
        courses={courses} 
        onEdit={setSelectedCourse}
        onDelete={handleDeleteCourse}
      />

      <CourseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        onSave={handleSaveCourse}
      />
    </div>
  );
}