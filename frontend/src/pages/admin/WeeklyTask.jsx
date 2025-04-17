// pages/admin/WeeklyTasksPage.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utils/adminAxiosInstance';
import TaskFormModal from '../../components/admin/TaskFormModal';
import AddWeekModal from '../../components/admin/AddWeekModal';

// Dummy data for courses
const dummyCourses = [
  {
    _id: 'course1',
    name: 'React Fundamentals',
    description: 'Learn the basics of React programming',
    status: 'active'
  },
  {
    _id: 'course2',
    name: 'Advanced JavaScript',
    description: 'Deep dive into modern JavaScript',
    status: 'active'
  },
  {
    _id: 'course3',
    name: 'Node.js Backend',
    description: 'Build server-side applications with Node',
    status: 'active'
  }
];

// Dummy data for tasks
const dummyTasks = [
  {
    _id: 'task1',
    title: 'Introduction to Components',
    description: 'Learn about React components and props',
    weeks: [
      {
        _id: 'week1',
        courseId: 'course1',
        weekNumber: 1
      }
    ]
  },
  {
    _id: 'task2',
    title: 'State Management',
    description: 'Understand useState and useEffect hooks',
    weeks: [
      {
        _id: 'week2',
        courseId: 'course1',
        weekNumber: 2
      },
      {
        _id: 'week3',
        courseId: 'course2',
        weekNumber: 1
      }
    ]
  }
];

export default function WeeklyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksRes, coursesRes] = await Promise.all([
          adminAxiosInstance.get('/weekly-tasks'),
          adminAxiosInstance.get('/courses')
        ]);

        if (tasksRes.data.success && coursesRes.data.success) {
          setTasks(tasksRes.data.data);
          setCourses(coursesRes.data.data);
          setUseDummyData(false);
        } else {
          // Fallback to dummy data if API fails
          setTasks(dummyTasks);
          setCourses(dummyCourses);
          setUseDummyData(true);
        }
      } catch (error) {
        console.error('Failed to load data, using dummy data instead:', error);
        setTasks(dummyTasks);
        setCourses(dummyCourses);
        setUseDummyData(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveTask = async (taskData) => {
    if (useDummyData) {
      // Handle dummy data case
      if (taskData._id) {
        // Update existing task
        setTasks(prev => prev.map(t => 
          t._id === taskData._id ? { ...t, ...taskData } : t
        ));
      } else {
        // Add new task
        const newTask = {
          ...taskData,
          _id: `task${Date.now()}`, // Generate unique ID
          weeks: []
        };
        setTasks(prev => [...prev, newTask]);
      }
      toast.success(`Task ${taskData._id ? 'updated' : 'created'} successfully`);
      setIsTaskModalOpen(false);
      // return;
    }

    try {
      let response;
      if (taskData._id) {
        response = await adminAxiosInstance.put(`/weekly-task/${taskData._id}`, taskData);
      } else {
        response = await adminAxiosInstance.post('/weekly-task', taskData);
      }

      if (response.data.success) {
        setTasks(prev => taskData._id
          ? prev.map(t => t._id === taskData._id ? response.data.data : t)
          : [...prev, response.data.data]
        );
        toast.success(`Task ${taskData._id ? 'updated' : 'created'} successfully`);
        setIsTaskModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    }
  };

  const handleAddWeek = async (weekData) => {
    if (useDummyData) {
      // Handle dummy data case
      
      setTasks(prev => prev.map(task => {
        if (task._id === weekData.taskId) {
          const newWeek = {
            _id: `week${Date.now()}`,
            courseId: weekData.courseId,
            weekNumber: weekData.weekNumber
          };
          return {
            ...task,
            weeks: [...(task.weeks || []), newWeek]
          };
        }
        return task;
      }));
      toast.success('Week added successfully');
      setIsWeekModalOpen(false);
      return;
    }

    try {
      const response = await adminAxiosInstance.post(
        `/weekly-tasks/${weekData.taskId}/weeks`,
        { courseId: weekData.courseId, weekNumber: weekData.weekNumber }
      );

      if (response.data.success) {
        setTasks(prev => prev.map(task => 
          task._id === weekData.taskId ? response.data.data : task
        ));
        toast.success('Week added successfully');
        setIsWeekModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add week');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    if (useDummyData) {
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
      return;
    }

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

  const handleDeleteWeek = async (taskId, weekId) => {
    if (!window.confirm('Are you sure you want to remove this week assignment?')) return;
    
    if (useDummyData) {
      setTasks(prev => prev.map(task => {
        if (task._id === taskId) {
          return {
            ...task,
            weeks: task.weeks.filter(week => week._id !== weekId)
          };
        }
        return task;
      }));
      toast.success('Week assignment removed successfully');
      return;
    }

    try {
      const response = await adminAxiosInstance.delete(
        `/weekly-tasks/${taskId}/weeks/${weekId}`
      );
      if (response.data.success) {
        setTasks(prev => prev.map(task => 
          task._id === taskId ? response.data.data : task
        ));
        toast.success('Week assignment removed successfully');
      }
    } catch (error) {
      toast.error('Failed to remove week assignment');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Weekly Tasks Management</h1>
        <div className="flex items-center gap-4">
          {useDummyData && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
              Using demo data - changes won't persist
            </div>
          )}
          <button
            onClick={() => {
              setSelectedTask(null);
              setIsTaskModalOpen(true);
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            + New Task
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{task.title || 'Untitled Task'}</h3>
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Assigned Weeks:</h4>
                    {task.weeks?.length > 0 ? (
                      <ul className="space-y-2">
                        {task.weeks.map(week => (
                          <li key={week._id} className="flex justify-between items-center border-b pb-2">
                            <div>
                              <span className="font-medium">
                                {courses.find(c => c._id === week.courseId)?.name || 'Unknown Course'} - Week {week.weekNumber}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteWeek(task._id, week._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No weeks assigned yet</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsWeekModalOpen(true);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Week
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskModalOpen(true);
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No tasks created yet. Click "New Task" to get started.
            </div>
          )}
        </div>
      )}

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
      />

      <AddWeekModal
        isOpen={isWeekModalOpen}
        onClose={() => setIsWeekModalOpen(false)}
        task={selectedTask}
        courses={courses}
        onSave={handleAddWeek}
        existingWeeks={selectedTask?.weeks || []}
      />
    </div>
  );
}