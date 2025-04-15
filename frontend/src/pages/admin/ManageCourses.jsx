// pages/admin/ManageCourses.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import CourseTable from '../../components/admin/CoursesTable';
import CourseForm from '../../components/admin/CourseForm';
import { adminInstance, axiosInstance } from '../../utils/axios';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await adminInstance.get('/courses');
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await axiosInstance.delete(`/courses/${id}`);
      if (response.data.success) {
        setCourses(prev => prev.filter(course => course.id !== id));
        toast.success('Course deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleSave = async (courseData) => {
    const isEdit = !!courseData.id;
    try {
      let response;
      console.log(isEdit)

      if (isEdit) {
        response = await axiosInstance.put(`/courses/${courseData.id}`, courseData);
      } else {
        response = await axiosInstance.post('/course/add-course', courseData);
      }

      if (response.data.success) {
        setCourses(prev => isEdit
          ? prev.map(c => c.id === courseData.id ? response.data.data : c)
          : [response.data.data, ...prev]
        );
        toast.success(`Course ${isEdit ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} course`);
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
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          + New Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading courses...</div>
      ) : (
        <CourseTable 
          courses={courses}
          onEdit={(course) => {
            setSelectedCourse(course);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <CourseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        onSave={handleSave}
      />
    </div>
  );
}