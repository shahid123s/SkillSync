// pages/admin/ManageCourses.jsx
import { useState } from 'react';
import { toast } from 'sonner';
import CourseTable from '../../components/admin/CoursesTable';
import CourseForm from '../../components/admin/CourseForm';
import { axiosInstance } from '../../utils/axios';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteCourse = async (id) => {
    try {
      const response = await axiosInstance.delete(`/courses/${id}`);
      if (response.data.success) {
        setCourses(courses.filter(course => course.id !== id));
        toast.success('Course deleted successfully');
      } else {
        toast.error('Failed to delete course');
      }
    } catch (error) {
      toast.error('Error deleting course');
    }
  };

  const handleSaveCourse = async (courseData) => {
    try {
      let response;
      if (courseData.id) {
        response = await axiosInstance.put(`/courses/${courseData.id}`, courseData);
      } else {
        response = await axiosInstance.post('/courses', courseData);
      }

      if (response.data.success) {
        setCourses(prev => 
          courseData.id 
            ? prev.map(c => c.id === courseData.id ? response.data.data : c)
            : [...prev, response.data.data]
        );
        toast.success(`Course ${courseData.id ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(`Error ${courseData.id ? 'updating' : 'creating'} course`);
    }
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
        onEdit={(course) => {
          setSelectedCourse(course);
          setIsModalOpen(true);
        }}
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