// pages/admin/WeeklyTasksPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';
import TaskModal from '../../components/admin/TaskModal';

export default function WeeklyTasksPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  const getTasksForCourse = (courseId) => {
    return tasks.filter(task => task.courseId === courseId);
  };

  const handleSaveTask = async (taskData) => {
    try {
      let response;
      if (taskData._id) {
        response = await adminAxiosInstance.put(`/weekly-tasks/${taskData._id}`, taskData);
      } else {
        response = await adminAxiosInstance.post('/weekly-tasks', taskData);
      }

      if (response.data.success) {
        setTasks(prev => taskData._id
          ? prev.map(t => t._id === taskData._id ? response.data.data : t)
          : [...prev, response.data.data]
        );
        toast.success(`Task ${taskData._id ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await adminAxiosInstance.delete(`/weekly-tasks/${taskId}`);
      if (response.data.success) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Weekly Tasks Management</h1>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Weekly Tasks:</h4>
                  {getTasksForCourse(course._id).length > 0 ? (
                    <ul className="space-y-2">
                      {getTasksForCourse(course._id).map(task => (
                        <li key={task._id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium">Week {task.weekNumber}:</span>
                            <p className="text-sm">{task.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setIsModalOpen(task);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No tasks added yet</p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsModalOpen(true);
                  }}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={!!isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        task={typeof isModalOpen === 'object' ? isModalOpen : null}
        onSave={handleSaveTask}
        existingTasks={selectedCourse ? getTasksForCourse(selectedCourse._id) : []}
      />
    </div>
  );
}