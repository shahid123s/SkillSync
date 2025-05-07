// pages/admin/ManageCourses.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import CourseTable from '../../components/admin/CoursesTable';
import CourseForm from '../../components/admin/CourseForm';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, tasksRes] = await Promise.all([
        adminAxiosInstance.get('/courses'),
        adminAxiosInstance.get('/weekly-tasks')
      ]);

      if (coursesRes.data.success) {
        setCourses(coursesRes.data.data);
      }
      if (tasksRes.data.success) {
        setTasks(tasksRes.data.data);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, []);

  const getTasksForCourse = (courseId) => {
    return tasks
      .filter(task => task.weeks?.some(week => week.courseId === courseId))
      .flatMap(task => 
        task.weeks
          .filter(week => week.courseId === courseId)
          .map(week => ({
            ...task,
            weekNumber: week.weekNumber,
            weekId: week._id
          }))
      )
      .sort((a, b) => a.weekNumber - b.weekNumber);
  };

  const handleDelete = async (id) => {

    
    try {
      const response = await adminAxiosInstance.delete(`/course/delete-course`, {params: {courseId: id}});
      if (response.data.success) {
        setCourses(prev => prev.filter(course => course.id !== id));
        toast.success('Course deleted successfully');
        fetchData()
      }
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleSave = async (courseData) => {
    const isEdit = !!courseData._id;
    console.log(courseData) 
    try {
      let response;
      console.log(isEdit)

      if (isEdit) {
        response = await adminAxiosInstance.put(`/course/update-course/${courseData._id}`, courseData);
      } else {
        response = await adminAxiosInstance.post('/course/add-course', courseData);
      }

      if (response.data.success) {
        setCourses(prev => isEdit
          ? prev.map(c => c._id === courseData._id ? response.data.data : c)
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
        <div className="space-y-8">
          <CourseTable 
            courses={courses}
            onEdit={(course) => {
              setSelectedCourse(course);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />

          {/* {courses.map(course => (
            <div key={course._id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-4">{course.name} - Weekly Tasks</h3>
                
                <div className="mb-4">
                  {getTasksForCourse(course._id).length > 0 ? (
                    <ul className="space-y-2">
                      {getTasksForCourse(course._id).map(task => (
                        <li key={`${task._id}-${task.weekId}`} className="border-b pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">Week {task.weekNumber}:</span>
                              <p className="text-sm">{task.title}</p>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No tasks assigned to this course yet</p>
                  )}
                </div>
              </div>
            </div>
          ))} */}
        </div>
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